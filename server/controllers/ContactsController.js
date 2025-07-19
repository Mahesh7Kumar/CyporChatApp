import mongoose from 'mongoose';
import User from '../models/UserModules.js';
import Message from '../models/MessagesModel.js';

export const searchContacts = async (request, response, next) => {
    try {
        const { searchTerm } = request.body;
        if (searchTerm === undefined || searchTerm === null) {
            return response.status(400).send("SearchTerm is requried.")
        }

        const sanitizedSearchTerm = searchTerm.replace(
            /[.*+?^${}|[\]\\]/g,
            "\\$&"
        );

        const regex = new RegExp(sanitizedSearchTerm, "i");
        const contacts = await User.find({
            $and: [{ _id: { $ne: request.userId } }, {
                $or: [{ firstName: regex }, { lastName: regex }, { email: regex }],
            },
            ],
        })

        return response.status(200).json({ contacts });
        
    } catch (error) {
        console.error({ error })
        return response.status(500).send("Internal Server Error.");
    }
};

export const getContactsForDMList = async (request, response, next) => {
    try {
        let { userId } = request;
        userId = new mongoose.Types.ObjectId(userId)

// pipline used to retriev alist of unique chat contact for the 2 users for MongoDB
// input message _id,sender,recipient,timestamp,message

        const contacts = await Message.aggregate([

            // filter messages where the current user message involving
            {
                $match: {
                    $or: [{ sender: userId }, { recipient: userId }],
                },
            },

            // sort all those message in descending order by timestamp (recent message come first)
            {
                $sort: { timestamp: -1 },
            },

            // Groups messages by the other user in the converstion 
            {
                $group: {
                    _id: {
                        $cond: {
                            if: { $eq: ["$sender", userId] }, //if your sender - group by recipient
                            then: "$recipient",
                            else: "$sender",                //if your recipient - group by sender
                        },
                    },
                    lastMessageTime: { $first: "$timestamp" },
                },
            },

            // fetch contact profile details for the other person in the chat
            {
                $lookup:{
                    from:"users",
                    localField:"_id",
                    foreignField:"_id",
                    as:"contactInfo"
                },
            },

            //when lookup return array . this flatten into single object 
            {
              $unwind:"$contactInfo",  
            },

            // Selects only the necessary field to return - hide any extra info
            {
                $project:{
                    _id:1,
                    lastMessageTime:1,
                    email:"$contactInfo.email",
                    firstName:"$contactInfo.firstName",
                    lastName:"$contactInfo.lastName",
                    image:"$contactInfo.image",
                    color:"$contactInfo.color",
                },
            },

            // Ensures the contact list is sorted from most recent to least recent convertion
            {
                $sort:{lastMessageTime:-1},
            },
        ]);

        return response.status(200).json({ contacts });
    } catch (error) {
        console.error({ error })
        return response.status(500).send("Internal Server Error.");
    }
};

export const getAllContacts = async (request, response, next) => {
    try {
        const users = await User.find(
            {_id:{$ne: request.userId}},
            "firstName lastName _id email"
        );
        const contacts = users.map((user)=>({
            label:user.firstName? `${user.firstName}${user.lastName}`: user.email,
            value:user._id,
        }));

        return response.status(200).json({ contacts });
    } catch (error) {
        console.error({ error })
        return response.status(500).send("Internal Server Error.");
    }
};