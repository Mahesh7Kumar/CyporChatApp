import React, { useEffect, useRef, useState } from 'react'
import { useAppStore } from '@/store/index.js'
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { getColor, colors } from '@/lib/utils'
import { FaTrash, FaPlus } from 'react-icons/fa'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { ADD_PROFILE_IMAGE_ROUTE, HOST, REMOVE_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_ROUTES } from '@/utils/constants';


const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [image, setImage] = useState(null)
  const [hovered, setHovered] = useState(false)
  const [selectedColor, setSelectedColor] = useState(0);
  const fileInputRef = useRef(null);


  // After update the Profile the data will be set in default also it will referce the page
  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }
    if (userInfo.image) {
      setImage(`${HOST}/${userInfo.image}`);
    }
  }, [userInfo])



  // Validation for the profile
  const validateProfile = () => {
    if (!firstName) {
      toast.error('First Name is Required.')
      return false;
    }
    if (!lastName) {
      toast.error("Last Name is Required.")
      return false;
    }
    return true;
  };

  // saving the changes made in profilesetup when valideation is true
  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTES,
          { firstName, lastName, color: selectedColor },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data })
          toast.success("Profile Update Successfully")
          navigate("/chat")
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  // the <- button in the profile page.
  const handleNavigate = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Please setup Profile.")
    }
  }

  // Handling the image file of the profile

  const handleFileInputClick = () => {
    fileInputRef.current.click()
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    console.log({ file });
    if (file) {
      const formData = new FormData();
      formData.append('profile-image', file);
      const response = await apiClient.post(ADD_PROFILE_IMAGE_ROUTE, formData,
        {
          withCredentials: true,
        });
      if (response.status === 200 && response.data.image) {
        setUserInfo({ ...userInfo, image: response.data.image });
        toast.success('Image updated successfully.');
      }
    }
  }

  const handleDeleteChange = async () => {
    try {
      const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setUserInfo({ ...userInfo, image: null });
        toast.success("Image removed Successfully.")
        setImage(null);
      }
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <div className='bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10'>
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div onClick={handleNavigate}>
          <IoArrowBack className='text-4xl lg:text-6xl text-white/90 cursor-pointer' />
        </div>
        <div className='grid grid-cols-2'>
          <div className='h-full w-32 md:w-48 relative flex items-center justify-center'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className='h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden'>
              {image ? (
                <AvatarImage
                  src={image}
                  alt='Profile'
                  className='object-cover w-full h-full bg-black' />
              ) : (
                <div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>
                  {firstName ? firstName.split('').shift()
                    : userInfo.email.split('').shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div className='absolute  h-32 w-32 md:w-48 md:h-48 flex items-center justify-center bg-black/50 ring-fuchsia-50 rounded-full cursor-pointer'
                onClick={image ? handleDeleteChange : handleFileInputClick}
              >
                {image ? (
                  <FaTrash className='text-white text-3xl cursor-pointer' />
                ) : (
                  <FaPlus className='text-white text-3xl cursor-pointer' />

                )}
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className='hidden'
              onChange={handleImageChange}
              name='profile-image'
              accept='.png, .jpg, .jpeg, .svg, .webp'
            />
          </div>
          <div className='flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center'>
            <div className='w-full'>
              <Input placeholder="Email"
                type='email' disabled
                value={userInfo.email}
                className='rounded-lg p-6 bg-[#2c2e3b] border-none' />
            </div>
            <div className='w-full'>
              <Input placeholder="FirstName"
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className='rounded-lg p-6 bg-[#2c2e3b] border-none' />
            </div>
            <div className='w-full'>
              <Input placeholder="Last Name"
                type='text'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className='rounded-lg p-6 bg-[#2c2e3b] border-none' />
            </div>
            <div className="w-full flex gap-5">
              {
                colors.map((color, index) => (
                  <div
                    className={`${color} h-7 w-7  rounded-full cursor-pointer transition-all duration-300
                    ${selectedColor === index
                        ? " outline outline-white/50 outline-1"
                        : ""
                      }
                    `}
                    key={index}
                    onClick={() => setSelectedColor(index)}
                  ></div>
                ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button className="bg-[#0a0635] w-full h-full text-white px-6 py-2 rounded-full shadow-md ring-2 ring-[#4B0082] transition-all duration-300 ease-in-out 
           hover:bg-[#1E1E1E] hover:text-[#B794F4] hover:ring-[#6A0DAD] hover:shadow-[0_0_20px_#6A0DAD]"
            onClick={saveChanges}
          >Save Changes</Button>
        </div>
      </div>

    </div>
  )
}

export default Profile
