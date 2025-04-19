'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Done from "@/assets/images/Done.svg";
import User from "@/assets/images/user11.svg";
import Docuemnt from "@/assets/images/document-checkmark.svg";
import User_message from "@/assets/images/users-message-support.svg";
import { setPlugRoute, setResumeUploaded } from '@/app/redux/slice/user/userSlice';
import { useRouter } from 'next/navigation';
import Resume from "../resumeFile/resume";
import CloseIcon from '@/assets/images/Closeicon.svg';
import ViewPublicProfile from "../viewPublicprofile/index";
import Doc from '@/assets/images/doc.svg';
import Pen from '@/assets/images/Pen.svg';

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const userId = user?.id || user?.uid;
  
  useEffect(() => {
    if (!user) {
      localStorage.removeItem('resumeData');
      setResumeData({
        fileName: '',
        fileSize: '',
        linkedInUrl: '',
        portfolioLink: ''
      });
    }
  }, [user]);

  const [resumeData, setResumeData] = useState({
    fileName: '',
    fileSize: '',
    linkedInUrl: '',
    portfolioLink: ''
  });
  
  useEffect(() => {
    const savedResume = localStorage.getItem('resumeData');
    if (savedResume) {
      setResumeData(JSON.parse(savedResume));
    }
  }, []);

  const handleGetStartedClick = () => {
    dispatch(setPlugRoute(false));
    router.push(`/profile/${userId}`);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleGetStartedClicke = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    
    const savedResume = localStorage.getItem('resumeData');
    if (savedResume) {
      setResumeData(JSON.parse(savedResume));
    }
  };

  const [isPublicProfileVisible, setIsPublicProfileVisible] = useState(false);

  const handleViewPublicProfile = () => {
    setIsPublicProfileVisible(true);
  };

  const closePublicProfile = () => {
    setIsPublicProfileVisible(false);
  };

  const handleSaveResume = (data) => {
    setResumeData(data);
    localStorage.setItem('resumeData', JSON.stringify(data));
    dispatch(setResumeUploaded(true));
  };

  const profileCompletion = useSelector((state) => state.user.profileCompletion);
const { personalInfo, professionalInfo, finalStep, resumeUploaded } = profileCompletion;
const isProfileComplete = personalInfo && professionalInfo && finalStep;

  const calculateProfileProgress = () => {
    const { personalInfo, professionalInfo, finalStep, resumeUploaded } = profileCompletion;
    if (personalInfo && professionalInfo && finalStep) {
     if (resumeUploaded) return 66;
      return 33;
    }
    return 0;
  };

  return (
    <div className="bg-white flex flex-col lg:flex-row min-h-screen p-5 lg:p-10 gap-8">
      <div className="flex flex-col">
        <div className="bg-white p-4 md:p-6 border rounded-lg h-auto md:h-[248px] w-full md:w-[363px]">
          <div className="flex items-center h-[50px] mb-1 w-full md:w-[206px]">
            <div className="w-[44px] h-[44px] bg-[#D9D9D9] rounded-full"></div>
            <div className="ml-4">
              <h2 className="text-[14px] md:text-[16px] font-semibold leading-tight">{user?.displayName}</h2>
              <p className="text-[12px] md:text-[14px]">@{user?.username}</p>
            </div>
          </div>
          <div className='pl-2'>
            <h3 className="text-[#555555] font-semibold text-sm md:text-lg mb-2">Verified info</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] md:text-[16px] font-normal text-[#555555]">Email Address</span>
              <Image src={Done} alt="Done" height={24} width={24} />
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] md:text-[16px] font-normal text-[#555555]">Phone Number</span>
              <Image src={Done} alt="Done" height={24} width={24} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] md:text-[16px] font-normal text-[#555555]">LinkedIn</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[361px] pl-4">
          <p className="font-light text-xs md:text-[14px] leading-tight text-gray-600 mt-4">
            You're currently on your buyer profile. To access your freelancer profile, switch to
          </p>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4 md:p-6 w-full lg:w-[853px] h-auto lg:h-[450px] pt-6 border-t border-gray-200">
        <div className="pb-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Profile Checklist</h2>
            <button 
              onClick={handleViewPublicProfile}
              className="text-[#005382] text-[14px] md:text-[16px] font-medium cursor-pointer"
            >
              View Public Profile
            </button>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-[511px] bg-[#D2EFFF] mt-1 rounded-[4px] h-[4px]">
              <div 
                className="bg-[#005382] h-[4px] rounded-[4px]" 
                style={{ width: `${calculateProfileProgress()}%` }}
              />
            </div>
            <div>
              <h1 className="text-sm font-medium">{calculateProfileProgress()}%</h1>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {/* Fill out Profile Section */}
          <div className="flex flex-col md:flex-row items-center justify-between bg-white h-auto md:h-[76px] rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="h-[40px] w-[40px] rounded-full flex justify-center items-center bg-[#D2EFFF] text-[#005382] mb-2 md:mb-0">
              <Image src={User} alt="User" height={24} width={24} />
            </div>
            <div className="flex-1 px-2 md:px-4 text-center md:text-left">
              <h3 className="text-[14px] md:text-[18px] font-semibold">Fill out Profile</h3>
              <p className="text-[12px] md:text-[14px] leading-tight text-[#939393]">
                Let others know more about you when they visit your profile by filling out your profile.
              </p>
            </div>
            {isProfileComplete ? (
              <div className="flex items-center gap-2">
                <button onClick={handleGetStartedClick}>
                  <Image src={Pen} alt="Edit" width={20} height={20} className="cursor-pointer" />
                </button>
                <span className="text-[#005382] text-base font-normal leading-none tracking-[-0.02em]">
                  100%
                </span>
              </div>
            ) : (
              <button
                onClick={handleGetStartedClick}
                className="text-[#005382] text-base font-normal leading-none tracking-[-0.02em] cursor-pointer"
              >
                Get Started
              </button>
            )}
          </div>

                {resumeData.fileName ? (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="h-[40px] w-[40px] rounded-full flex justify-center items-center bg-[#D2EFFF]">
                          <Image src={Docuemnt} alt="Document" height={24} width={24} />
                        </div>
                        <div>
                          <h3 className="text-[14px] md:text-[18px] font-semibold">Add Your Resume</h3>
                          <p className="text-[12px] md:text-[14px] text-[#939393]">
                            Upload your resume so Plugs can assess if you're a good fit for their company
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={handleGetStartedClicke}>
                          <Image src={Pen} alt="Edit" width={20} height={20} className="cursor-pointer" />
                        </button>
                        <span className="text-[#005382] text-base font-normal leading-none tracking-[-0.02em]">
                          100%
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-2 ml-[52px]">
                      <div className="flex flex-col">
                        <span className="font-medium text-[#005382]">{resumeData.fileName}</span>
                        <span className="text-sm text-gray-500 lowercase">{resumeData.fileSize}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row items-center justify-between bg-white h-auto md:h-[76px] rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="h-[40px] w-[40px] rounded-full flex justify-center items-center bg-[#D2EFFF] text-[#005382] mb-2 md:mb-0">
                      <Image src={Docuemnt} alt="Document" height={24} width={24} />
                    </div>
                    <div className="flex-1 px-2 md:px-4 text-center md:text-left">
                      <h3 className="text-[14px] md:text-[18px] font-semibold">Add Your Resume</h3>
                      <p className="text-[12px] md:text-[14px] leading-tight text-[#939393]">
                        Upload your resume so Plugs can assess if you're a good fit for their company.
                      </p>
                    </div>
                    <div 
                      onClick={handleGetStartedClicke} 
                      className="text-[#005382] text-base font-normal leading-none tracking-[-0.02em] cursor-pointer"
                    >
                      Get Started
                    </div>
                  </div>
                )}

          <div className="flex flex-col md:flex-row items-center justify-between bg-white h-auto md:h-[76px] rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="h-[40px] w-[40px] rounded-full flex justify-center items-center bg-[#D2EFFF] text-[#005382] mb-2 md:mb-0">
              <Image src={User_message} alt="User_message" height={24} width={24} />
            </div>
            <div className="flex-1 px-2 md:px-4 text-center md:text-left">
              <h3 className="text-[14px] md:text-[18px] font-semibold">Set Communication Preferences</h3>
              <p className="text-[12px] md:text-[14px] leading-tight text-[#939393]">
                Let Plugs know your communication preferences.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button>
                <Image src={Pen} alt="Edit" width={20} height={20} className="cursor-pointer" />
              </button>
              <span className="text-[#005382] text-base font-normal leading-none tracking-[-0.02em]">
                50%
              </span>
            </div>
          </div>
        </div>
      </div>

      {isModalVisible && (
        <div className="fixed inset-0 bg-[#0B0B0B] bg-opacity-50 p-[20px] flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-[400px] p-6 rounded-lg relative">
            <div className='flex justify-end'>
              <button className="text-gray-500" onClick={closeModal}>
                <Image src={CloseIcon} alt="close" className="w-6 h-6 cursor-pointer" />
              </button>
            </div>
            <Resume
              isOpen={isModalVisible}
              onClose={closeModal}
              onSave={handleSaveResume}
              initialData={resumeData}
            />
          </div>
        </div>
      )}
      <ViewPublicProfile 
        isOpen={isPublicProfileVisible} 
        onClose={closePublicProfile}
        user={{...user, resume: resumeData}}
      />
    </div>
  );
};

export default Dashboard;
