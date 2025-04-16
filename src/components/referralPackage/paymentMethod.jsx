'use client';

import React, { useState } from "react";
import Image from "next/image";
import TimerIcon from "@/assets/images/timer.svg";
import Movies from "@/assets/images/movies.svg";
import Discover from "@/assets/images/Discover.svg";
import Amex from "@/assets/images/Amex.svg";
import Master from "@/assets/images/Mastercard.svg";
import Visa from "@/assets/images/Visa.svg";
import Pay from "@/assets/images/Pay.svg";
import Pal from "@/assets/images/Pal.svg";
import { useRouter } from 'next/navigation';

const PaymentMethod = () => {
    const [selectedMethod, setSelectedMethod] = useState("");
    const router = useRouter();

    const handleSelect = (method) => {
        setSelectedMethod(method);
    };
    
    return (
        <div className="bg-white min-h-screen flex flex-col md:flex-row justify-center items-center gap-[20px] md:gap-[40px] p-4">
            <div className="h-auto  border-[#D5D4DC] w-full md:w-[822px] md:h-[515px] border rounded-[8px] overflow-hidden">
                <div className="pl-[20px] flex items-center h-[64px] bg-[#F8F8F8] rounded-t-[8px] border-b border-[#D5D4DC]">
                    <h1 className="font-[600] text-[16px]">Payment Options</h1>
                </div>
                <div
                    className="pl-[15px] h-[64px] flex items-center gap-[5px] md:flex-nowrap cursor-pointer border-b border-[#D5D4DC]"
                    onClick={() => handleSelect("cards")}
                >
                    <div className="w-full min-w-[358px] flex items-center ">
                        <div className="h-[19px] min-w-[161px] flex gap-[8px] items-center">
                            <input
                                type="radio"
                                name="payment-method"
                                checked={selectedMethod === "cards"}
                                onChange={() => handleSelect("cards")}
                                className="h-[16px] w-[16px] rounded-full border-2 border-[#939393] focus:ring-0 checked:border-[#25B2F8] checked:bg-[#25B2F8]"
                            />
                            <label className="text-[12px] font-lightbold">Credit & Debit Cards</label>
                        </div>
                        <div className="flex gap-[8px] h-[44px] w-[172px]">
                            <Image src={Visa} alt="Visa" width={35} height={24} />
                            <Image src={Master} alt="Master" width={35} height={24} />
                            <Image src={Discover} alt="Discover" width={35} height={24} />
                            <Image src={Amex} alt="Amex" width={35} height={24} />
                        </div>
                    </div>
                </div>

                {selectedMethod === "cards" && (
                    <div className="flex flex-col justify-evenly bg-[#F8F8F8] h-auto md:h-[320px] p-4">
                        <div className="flex flex-wrap md:flex-nowrap gap-[20px]">
                            <div className="flex flex-col gap-[8px] w-full md:w-auto">
                                <label className="text-[14px] font-[600]">Card Number</label>
                                <input
                                    type="text"
                                    className="h-[48px] text-[#939393] text-[16px] w-full md:w-[328px] p-[12px] rounded-[8px] border border-[#D5D4DC] focus:border-[#005382] focus:outline-none"
                                    placeholder="Card number"
                                />
                            </div>
                            <div className="flex flex-col gap-[8px] w-full md:w-auto">
                                <label className="text-[14px] font-[600]">Expiration Date</label>
                                <input
                                    type="date"
                                    className="h-[48px] w-full md:w-[168px] text-[#939393] text-[16px] p-[12px] rounded-[8px] border border-[#D5D4DC] focus:border-[#005382] focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col w-full gap-[8px] md:w-auto">
                                <label className="text-[14px] font-[600]">Security Code</label>
                                <input
                                    type="text"
                                    className="h-[48px] w-full md:w-[168px] text-[#939393] text-[16px] p-[12px] rounded-[8px] border border-[#D5D4DC] focus:border-[#005382] focus:outline-none"
                                    placeholder="CVV"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap md:flex-nowrap gap-[20px] mt-[8px]">
                            <div className="flex flex-col w-full gap-[8px] md:w-auto">
                                <label className="text-[14px] font-[600]">First Name</label>
                                <input
                                    type="text"
                                    className="h-[48px] text-[#939393] text-[16px] w-full md:w-[328px] p-[12px] rounded-[8px] border border-[#D5D4DC] focus:border-[#005382] focus:outline-none"
                                    placeholder="First name"
                                />
                            </div>
                            <div className="flex flex-col w-full gap-[8px] md:w-auto">
                                <label className="text-[14px] font-[600]">Last Name</label>
                                <input
                                    type="text"
                                    className="h-[48px] text-[#939393] text-[16px] w-full md:w-[328px] p-[12px] rounded-[8px] border border-[#D5D4DC] focus:border-[#005382] focus:outline-none"
                                    placeholder="Last name"
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div
                  className={`h-[64px] flex items-center gap-[10px] pl-[15px] cursor-pointer border-[#D5D4DC] ${selectedMethod === "paypal" ? "border-t-0 border-b": selectedMethod === "cards" ? "border-t border-b-0" : "border-t border-b"}`}
                    onClick={() => handleSelect("paypal")}
                >
                    <input
                        type="radio"
                        name="payment-method"
                        checked={selectedMethod === "paypal"}
                        onChange={() => handleSelect("paypal")}
                        className="h-[16px] w-[16px] rounded-full border border-[#939393] focus:ring-0 checked:border-[#25B2F8] checked:bg-[#25B2F8]"
                    />
                    <div className="flex">
                        <Image src={Pay} alt="Pay" width={46} height={32} />
                        <Image src={Pal} alt="Pal" width={36} height={18} />
                    </div>
                </div>

                {selectedMethod === "paypal" && (
                    <div className="flex flex-col justify-evenly bg-[#F8F8F8] h-auto md:h-[320px] p-4">
                        <div className="flex flex-wrap md:flex-nowrap gap-[20px]">
                            <div className="flex flex-col gap-[8px] w-full md:w-auto">
                                <label className="text-[14px] font-[600]">Card Number</label>
                                <input
                                    type="text"
                                    className="h-[48px] text-[#939393] text-[16px] w-full md:w-[328px] p-[12px] rounded-[8px] border border-[#D5D4DC] focus:border-[#005382] focus:outline-none"
                                    placeholder="Card number"
                                />
                            </div>
                            <div className="flex flex-col gap-[8px] w-full md:w-auto">
                                <label className="text-[14px] font-[600]">Expiration Date</label>
                                <input
                                    type="date"
                                    className="h-[48px] w-full md:w-[168px] text-[#939393] text-[16px] p-[12px] rounded-[8px] border border-[#D5D4DC] focus:border-[#005382] focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col w-full gap-[8px] md:w-auto">
                                <label className="text-[14px] font-[600]">Security Code</label>
                                <input
                                    type="text"
                                    className="h-[48px] w-full md:w-[168px] text-[#939393] text-[16px] p-[12px] rounded-[8px] border border-[#D5D4DC] focus:border-[#005382] focus:outline-none"
                                    placeholder="CVV"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap md:flex-nowrap gap-[20px] mt-[8px]">
                            <div className="flex flex-col w-full gap-[8px] md:w-auto">
                                <label className="text-[14px] font-[600]">First Name</label>
                                <input
                                    type="text"
                                    className="h-[48px] text-[#939393] text-[16px] w-full md:w-[328px] p-[12px] rounded-[8px] border border-[#D5D4DC] focus:border-[#005382] focus:outline-none"
                                    placeholder="First name"
                                />
                            </div>
                            <div className="flex flex-col w-full gap-[8px] md:w-auto">
                                <label className="text-[14px] font-[600]">Last Name</label>
                                <input
                                    type="text"
                                    className="h-[48px] text-[#939393] text-[16px] w-full md:w-[328px] p-[12px] rounded-[8px] border border-[#D5D4DC] focus:border-[#005382] focus:outline-none"
                                    placeholder="Last name"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="border rounded-[8px] p-[20px] w-full md:w-[436px] h-auto md:h-[515px]">
                <div className="flex flex-col h-auto w-full gap-[20px]">
                    <h3 className="text-lg font-semibold mb-3">Payment Summary</h3>
                    <div className="flex flex-col gap-[12px]">
                        <div className="flex items-center gap-[12px]">
                            <Image
                                src={TimerIcon}
                                alt="Timer Icon"
                                width={24}
                                height={24}
                                className="rounded-full border"
                            />
                            <span>1-day delivery</span>
                        </div>
                        <div className="flex items-center gap-[12px]">
                            <Image
                                src={Movies}
                                alt="Movies Icon"
                                width={24}
                                height={24}
                                className="rounded-full border"
                            />
                            <span>Video screening required</span>
                        </div>
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Enter promo code"
                            className="w-full pt-[16px] pb-[16px] text-[#939393] text-base font-semibold "
                        />
                    </div>

                    <div className="flex justify-between pt-[10px] pb-[10px]">
                        <p className="font-semibold text-[#939393] text-[16px]">Service fee</p>
                        <span className="font-semibold text-[#939393] text-[16px]">$20</span>
                    </div>

                    <div className="flex justify-between pt-[10px] pb-[10px]">
                        <h3 className="text-[24px] font-semibold">Total</h3>
                        <span className="text-[24px] font-semibold">$22</span>
                    </div>

                    <div className="flex flex-col gap-[36px]">
                        <button 
                            className="w-full h-[40px] text-[12px] font-semibold bg-[#005382] text-white rounded-[8px]">
                            Confirm & Pay
                        </button>
                        <p className="text-center text-xs text-gray-500">All secure payment</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;