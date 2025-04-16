'use client';

import React from 'react';
import Image from 'next/image';
import CloseIcon from '@/assets/images/Closeicon.svg';
import DefaultAvatar from '@/assets/images/user11.svg';
import Doc from '@/assets/images/doc.svg'; // Add this import for the document icon

const ViewPublicProfile = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  const defaultData = {
    displayName: 'Idris Gettani',
    photoURL: DefaultAvatar,
    title: 'Software Engineer',
    location: 'San Francisco, CA',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed dignissim leo. Suspendisse posuere eu leo vitae porta. Sed imperdiet sapien quis pellentesque cursus.',
    education: {
      degree: 'Bachelors of Science',
      major: 'Computer Science',
      university: 'University of California, Berkeley'
    },
    resume: {
      fileName: 'Idris Gettani Resume.pdf',
      size: '1 mb'
    },
    socialLinks: {
      linkedin: 'http://www.linkedin.com/idrisgettani',
      portfolio: 'http://www.idrisgettani.com'
    }
  };

  const data = {
    displayName: user?.displayName || defaultData.displayName,
    photoURL: user?.photoURL || defaultData.photoURL,
    title: user?.title || defaultData.title,
    location: user?.location || defaultData.location,
    about: user?.about || defaultData.about,
    education: user?.education || defaultData.education,
    resume: user?.resume || defaultData.resume,
    socialLinks: user?.socialLinks || defaultData.socialLinks
  };

  return (
    <div className="fixed inset-0 bg-[#0B0B0B] bg-opacity-50 flex items-start justify-center z-50">
      <div className="w-[881px] h-fit bg-white rounded-[8px] p-10 relative mt-[73px] gap-2">
        <div className="absolute top-4 right-4">
          <button onClick={onClose} className="text-gray-500">
            <Image src={CloseIcon} alt="close" className="w-6 h-6 cursor-pointer" />
          </button>
        </div>

        <div className="w-[801px] flex flex-col gap-6 border border-[#F0F0F0] rounded-[8px] p-6">
          <div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-[#D9D9D9] flex items-center justify-center">
                <Image
                  src={data.photoURL}
                  alt="Profile"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div className="w-[590px] h-[68px] flex flex-col gap-2">
                <div>
                  <h2 className="w-[144px] h-[24px] text-[24px] font-semibold leading-[100%] tracking-[-0.02em] align-middle mb-2">
                    {data.displayName}
                  </h2>
                  <div className="flex items-center mb-1">
                    <span className="text-[14px] font-normal leading-[100%] tracking-[-0.02em] align-middle text-[#000000]">{data.title}</span>
                  </div>
                  <p className="text-sm text-[#555555]">{data.location}</p>
                </div>
              </div>
            </div>
            <div className="w-[753px] h-[1px] bg-[#F0F0F0] mt-6"></div>
          </div>

          <div>
            <div className="w-[753px] h-[96px]">
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
              {data.education.degree} in <span className="font-medium">{data.education.major}</span> at{' '}
              <span className="font-medium">{data.education.university}</span>
            </p>
          </div>

          <div>
            <h3 className="font-poppins text-[14px] font-semibold leading-[150%] tracking-[0%] align-middle text-[#2F2F2F] mb-1">Resume</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#D2EFFF]">
                <Image
                  src={Doc}
                  alt="Document"
                  width={24}
                  height={24}
                  className="text-[#005382]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-[#005382]">{data.resume.fileName}</span>
                <span className="text-sm text-gray-500 lowercase">{data.resume.size}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-poppins text-[14px] font-semibold leading-[150%] tracking-[0%] align-middle text-[#2F2F2F] mb-1">LinkedIn URL</h3>
            <input 
              type="text" 
              value={data.socialLinks.linkedin}
              readOnly
              className="w-full p-2 border rounded-lg text-gray-600"
            />
          </div>

          <div className="h-fit">
            <h3 className="font-poppins text-[14px] font-semibold leading-[150%] tracking-[0%] align-middle text-[#2F2F2F] mb-1">Portfolio link</h3>
            <input 
              type="text" 
              value={data.socialLinks.portfolio}
              readOnly
              className="w-full p-2 border rounded-lg text-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPublicProfile;