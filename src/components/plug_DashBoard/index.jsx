'use client';
import React, { useState } from 'react';
import Dashboard from "@/assets/images/DashRobort.svg";
import Promo from "@/assets/images/promo.svg";
import Image from 'next/image';
import DropdownComponent from '../profileDetails/DropdownComponent';

const inboxData = [
    { date: '2023/12/24', name: 'jacklyn', description: 'How are you.', image: 'https://via.placeholder.com/40' },
    { date: '2023/12/23', name: 'Jack', description: 'Got it thanks', image: 'https://via.placeholder.com/40' },
    { date: '2023/12/22', name: 'John ', description: 'Waooo', image: 'https://via.placeholder.com/40' },
    { date: '2023/12/22', name: 'joe ', description: 'Coool!', image: 'https://via.placeholder.com/40' },
    { date: '2023/12/22', name: 'Idris', description: 'Good Work', image: 'https://via.placeholder.com/40' },
];

const Plug_Dashboard = () => {
    const [selectOrders, setSelectOrders] = useState('');
    const [showInbox, setShowInbox] = useState(false);

    const handleOptionChange = (updatedOption) => {
        setSelectOrders(updatedOption);
    };

    const toggleInboxView = () => {
        setShowInbox(!showInbox);
    };

    return (
        <>
            <div className="bg- min-h-screen p-5">
                <div className="flex flex-col lg:flex-row gap-5 max-w-[1240px] mx-auto">
                    <div className="flex flex-col gap-5 lg:w-[363px]">
                        <div className="w-full border flex flex-col gap-4 h-auto bg-white rounded-lg p-4">
                            <div className="flex items-center gap-4">
                                <div className="w-[44px] h-[44px] rounded-full bg-gray-300"></div>
                                <span className="text-base font-semibold">UserName</span>
                            </div>
                            <ul className="flex flex-col gap-4">
                                <li className="flex justify-between ">
                                    <p className="text-base font-semibold text-[#555555]">Rating</p>
                                    <span className="text-base font-mediumbold text-[#555555]">-</span>
                                </li>
                                <li className="flex justify-between">
                                    <p className="text-base font-semibold text-[#555555]">Successful Hires</p>
                                    <span className="text-base font-mediumbold text-[#555555]">-</span>
                                </li>
                            </ul>
                            <div className="flex flex-col items-center">
                                <button className="h-[40px] mt-3 rounded-lg border border-[#D5D4DC] w-full max-w-[324px] font-semibold text-sm">
                                    Go to level overview
                                </button>
                            </div>
                        </div>
                        <ul className="w-full bg-white h-auto rounded-lg border p-4">
                            <li className="flex justify-between">
                                <p className="text-base font-semibold text-[#555555]">Earned in June</p>
                                <span className="text-base font-mediumbold text-[#555555]">120$</span>
                            </li>
                        </ul>
                        <div className="w-full bg-white flex flex-col rounded-lg border">
                            <ul className="flex flex-col gap-4 p-4">
                                <li className="flex justify-between">
                                    <p className="text-base font-lightbold text-[#555555]">Inbox</p>
                                    <button
                                        className="text-base font-lightbold text-[#005382]"
                                        onClick={toggleInboxView}
                                    >
                                        {showInbox ? "Hide" : "View All"}
                                    </button>
                                </li>
                            </ul>
                            {showInbox &&
                                inboxData.map((item, index) => (
                                    <div key={index} className="flex border h-auto p-4 w-full">
                                        <img src={item.image} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
                                        <div className="flex justify-between w-full gap-2">
                                            <div>
                                                <h4 className="text-base font-semibold text-gray-800">{item.name}</h4>
                                                <p className="text-base font-lightbold">{item.description}</p>
                                            </div>
                                            <p className="text-xs text-gray-400">{item.date}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-6">
                        <div className="rounded-lg">
                            <div className="flex flex-wrap items-center pb-1 gap-4">
                                <h1 className="text-lg font-semibold">Stats overview for</h1>
                                <div className="w-full h-[48px] max-w-[190px] text-[#4A504B] text-base font-lightbold">
                                    <DropdownComponent
                                        options={['Active Orders', 'Replace Order', 'Return order']}
                                        selectedOption={selectOrders}
                                        onOptionChange={handleOptionChange}
                                        dropdownKey=""
                                        label="Select Orders"
                                        width="100%"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap bg-white">
                                {["Total Views", "Visits", "Orders", "Revenue"].map((stat, i) => (
                                    <div key={i} className="border flex flex-col gap-2 rounded-lg min-w-[150px] flex-1 p-4 text-center hover:bg-gray-100 transition-colors">
                                        <div className="h-[93px]">
                                            <p className="text-[17px] font-lightbold">{stat}</p>
                                            <p className="text-2xl font-bold">
                                                {stat === "Revenue" ? "$41.78" : stat === "Orders" ? "2" : stat === "Visits" ? "171" : "294"}
                                            </p>
                                            <p className="text-gray-500">YoY</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-[#D2EFFF] flex flex-col lg:flex-row p-6 rounded-lg">
                            <div className="flex-1 max-w-[500px] flex flex-col gap-4">
                                <h2 className="text-base font-semibold">A quick guide to getting your first sale</h2>
                                <ul className="flex flex-col gap-4">
                                    {["Set up your profile to completion", "Start at a low price point and work your way up as you grow in your business", "Stay active. Make sure to consistently check your alerts for requests or messages from your customers.", "Deliver on time!", "Follow up with your customers"].map((step, i) => (
                                        <li key={i} className="flex items-center gap-4">
                                            <span className="h-[24px] w-[24px] bg-white flex-shrink-0 rounded-full flex items-center justify-center text-[#005382] text-sm font-semibold">{i + 1}</span>
                                            <span className="text-base font-lightbold leading-[16px]">{step}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="lg:ml-[30px]">
                                <Image src={Dashboard} alt="Dashboard" width={228} height={268} />
                            </div>
                        </div>
                        <div className="bg-[#01669F] flex flex-wrap lg:flex-nowrap p-6 text-white rounded-lg">
                            <div className="flex-1">
                                <h2 className="text-[32px] font-semibold">Promo Page 1</h2>
                                <p className="text-base font-lightbold leading-[16px]">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis possimus id non incidunt odio? Nisi veritatis iure autem nulla voluptate, odio consequuntur impedit quis ab incidunt molestiae repudiandae, ullam minima!
                                </p>
                            </div>
                            <div className="w-full lg:w-auto">
                                <Image src={Promo} alt="promo" width={140} height={128.65} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Plug_Dashboard;

