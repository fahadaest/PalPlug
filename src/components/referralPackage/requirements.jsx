'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import TimerIcon from "@/assets/images/timer.svg";
import Movies from "@/assets/images/movies.svg";
import DefaultAvatar from '@/assets/images/user11.svg';
import { useSelector } from 'react-redux';
import Male from "@/assets/images/male.svg";

const Requirements = () => {
    const [jobUrl, setJobUrl] = useState('');
    const [portfolioUrl, setPortfolioUrl] = useState('');
    const user = useSelector((state) => state.user.userData);

    const defaultData = {
        displayName: 'Idris Gettani',
        photoURL: DefaultAvatar,
        title: 'Partner Success @ Airbnb',
        location: 'San Francisco, CA',
    };

    const data = {
        displayName: user?.displayName || defaultData.displayName,
        photoURL: user?.photoURL || defaultData.photoURL,
        title: user?.title || defaultData.title,
        location: user?.location || defaultData.location,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle submission logic here
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1200px] mx-auto p-4">
                <div className="flex gap-8 mt-8">
                    {/* Left Section */}
                    <div className="flex-1">
                        <div className="flex items-center gap-[16px] h-[92px]">
                            <Image
                                src={Male}
                                alt="Male"
                                width={64}
                                height={64}
                                className="rounded-full border"
                            />
                            <div>
                                <h2 className="text-2xl font-semibold">{data.displayName}</h2>
                                <p className="text-sm font-lightbold text-black">{data.title}</p>
                                <p className="text-sm font-lightbold text-[#939393]">{data.location}</p>
                            </div>
                        </div>
                        <div className="w-[640px] border-b border-[#F0F0F0] my-5"></div>

                        <p className="font-poppins text-[14px] font-semibold leading-[150%] tracking-[0%] align-middle mb-6">
                            {data.displayName.split(' ')[0]} is requesting the following items to review before your scheduled call
                        </p>

                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-[#2F2F2F]">URL for desired job referral</label>
                                <input
                                    type="url"
                                    value={jobUrl}
                                    onChange={(e) => setJobUrl(e.target.value)}
                                    className="w-[440px] h-[48px] p-[12px] border border-gray-300 rounded-[8px] gap-[10px] placeholder-[#D5D4DC]"
                                    placeholder="http://airbnb.careers.partner/strategy.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-[#2F2F2F]">Portfolio link</label>
                                <input
                                    type="url"
                                    value={portfolioUrl}
                                    onChange={(e) => setPortfolioUrl(e.target.value)}
                                    className="w-[440px] h-[48px] p-[12px] border border-gray-300 rounded-[8px] gap-[10px] placeholder-[#D5D4DC]"
                                    placeholder="http://www.idrisgettani.com"
                                />
                            </div>
                        </form>
                    </div>

                    {/* Right Section */}
                    <div className="w-[436px]">
                        <div className="border border-gray-300 rounded-[8px] p-6 h-[318px] mt-[60px] ml-auto flex flex-col justify-between">
                            <div>
                                <h3 className="font-semibold mb-4">Standard Employee Referral</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={TimerIcon}
                                            alt="Timer Icon"
                                            width={20}
                                            height={20}
                                            className="rounded-full"
                                        />
                                        <span className="text-sm">1 day delivery</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={Movies}
                                            alt="Calendar Icon"
                                            width={20}
                                            height={20}
                                            className="rounded-full"
                                        />
                                        <span className="text-sm">June 2nd - 1:30 pm</span>
                                    </div>
                                </div>
                            </div>
                            
                            <button 
                                onClick={handleSubmit}
                                className="w-full bg-[#005382] text-white py-2 rounded-md">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Requirements;