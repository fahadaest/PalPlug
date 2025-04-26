'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserDetailsByEmail } from '@/app/redux/slice/user/userDetailsSlice';
import CloseIcon from '@/assets/images/Closeicon.svg';
import DefaultAvatar from '@/assets/images/user11.svg';
import Doc from '@/assets/images/doc.svg'; 

const ViewPublicProfile = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userDetails = useSelector((state) => state.userDetails.data);
  const userDetailsLoading = useSelector((state) => state.userDetails.loading);
  const userDetailsError = useSelector((state) => state.userDetails.error);

  useEffect(() => {
    if (user?.email && !userDetails) {
      dispatch(fetchUserDetailsByEmail(user.email));
    }
  }, [user, userDetails, dispatch]);

  if (!isOpen) return null;
  if (userDetailsLoading) return <div>Loading...</div>;
  if (userDetailsError) return <div>Error loading user details.</div>;
  if (!userDetails) return <div>No user details found.</div>;

  const data = {
    displayName: `${userDetails.first_name || ''} ${userDetails.last_name || ''}`.trim(),
    photoURL: userDetails.profile_image
      ? userDetails.profile_image.startsWith('http')
        ? userDetails.profile_image
        : `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}${userDetails.profile_image}`
      : DefaultAvatar,
    title: userDetails.occupation || '',
    location: userDetails.country || '',
    about: userDetails.description || '',
    education: {},
    resume: {
      fileName: '', 
      size: '',    
    },
    socialLinks: {
      linkedin: userDetails.linkedin_url || '',
      portfolio: userDetails.portfolio_url || '',
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0B0B0B] bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto">
      <div className="w-full max-w-[95vw] md:w-[881px] h-fit bg-white rounded-[8px] p-4 md:p-10 relative mt-6 md:mt-[73px] gap-2">
        <div className="absolute top-4 right-4">
          <button onClick={onClose} className="text-gray-500">
            <Image src={CloseIcon} alt="close" className="w-6 h-6 cursor-pointer" />
          </button>
        </div>

        <div className="w-full flex flex-col gap-4 md:gap-6 border border-[#F0F0F0] rounded-[8px] p-3 md:p-6">
          <div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-[#D9D9D9] flex items-center justify-center mx-auto md:mx-0">
                <Image
                  src={data.photoURL}
                  alt="Profile"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-[590px] flex flex-col gap-2">
                <div>
                  <h2 className="text-[20px] md:text-[24px] font-semibold leading-[100%] tracking-[-0.02em] align-middle mb-2 text-center md:text-left">
                    {data.displayName}
                  </h2>
                  <div className="flex items-center justify-center md:justify-start mb-1">
                    <span className="text-[13px] md:text-[14px] font-normal leading-[100%] tracking-[-0.02em] align-middle text-[#000000]">{data.title}</span>
                  </div>
                  <p className="text-sm text-[#555555] text-center md:text-left">{data.location}</p>
                </div>
              </div>
            </div>
            <div className="w-full h-[1px] bg-[#F0F0F0] mt-4 md:mt-6"></div>
          </div>

          <div>
            <div className="w-full md:w-[753px]">
              <h3 className="font-poppins text-[14px] font-semibold leading-[150%] tracking-[0%] align-middle">
                About {data.displayName.split(' ')[0]}
              </h3>
              <p className="font-poppins text-[13px] font-normal leading-[150%] tracking-[0%] align-middle text-[#000000]">
                {data.about}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-poppins text-[14px] font-semibold leading-[150%] tracking-[0%] align-middle">Education</h3>
            <p className="font-poppins text-[13px] font-normal leading-[150%] tracking-[0%] align-middle text-[#000000]">
              {userDetails.colleges && userDetails.colleges.length > 0 ? (
                <>
                  {userDetails.colleges[0].degree && <>{userDetails.colleges[0].degree} in </>}
                  {userDetails.colleges[0].major && <span className="font-medium">{userDetails.colleges[0].major}</span>}
                  {userDetails.colleges[0].college && <> at <span className="font-medium">{userDetails.colleges[0].college},</span></>}
                  {userDetails.colleges[0].country && <>  <span className="font-medium"> {userDetails.colleges[0].country}</span></>}
                </>
              ) : (
                <>No education info</>
              )}
            </p>
          </div>

          <div>
            <h3 className="font-poppins text-[14px] font-semibold leading-[150%] tracking-[0%] align-middle text-[#2F2F2F] mb-1">Resume</h3>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#D2EFFF]">
                <Image
                  src={Doc}
                  alt="Document"
                  width={24}
                  height={24}
                  className="text-[#005382]"
                />
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span className="font-medium text-[#005382] text-center md:text-left">{data.resume.fileName}</span>
                <span className="text-sm text-gray-500 lowercase text-center md:text-left">{data.resume.size}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-poppins text-[14px] font-semibold leading-[150%] tracking-[0%] align-middle text-[#2F2F2F] mb-1">LinkedIn URL</h3>
            <input 
              type="text" 
              value={data.socialLinks.linkedin}
              readOnly
              className="w-full p-2 border rounded-lg text-gray-600 text-xs md:text-base"
            />
          </div>

          <div className="h-fit">
            <h3 className="font-poppins text-[14px] font-semibold leading-[150%] tracking-[0%] align-middle text-[#2F2F2F] mb-1">Portfolio link</h3>
            <input 
              type="text" 
              value={data.socialLinks.portfolio}
              readOnly
              className="w-full p-2 border rounded-lg text-gray-600 text-xs md:text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPublicProfile;