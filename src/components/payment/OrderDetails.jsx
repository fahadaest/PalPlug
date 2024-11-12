'use client';

import React from "react";
import timer from "@/assets/images/timer.svg";
import movies from "@/assets/images/movies.svg";

const OrderDetails = () => {
 

  return (
    <>
    <div className='w-[100%] pt-[27.07px] pb-[20px] pl-[147px] pr-[781.48px] inline-flex justify-start items-start gap-[36px]'>
            <div class="w-[632px] h-[674px]    flex flex-col justify-start items-center gap-[60px] ">
    <div class="h-[92px] flex flex-col justify-start items-start gap-[16px]">
        <div class="h-[92px] flex flex-col justify-start items-start gap-[24px]">
            <div class=" flex justify-center items-center gap-[24px]">
                <img class="border w-[60px] h-[60px] rounded-full"/>
                <div class="flex justify-center items-center gap-[272px]">
                    <div class="flex justify-start items-start gap-[300px]">
                        <div class="flex flex-col justify-start items-start gap-[8px]">
                            <div class="text-black text-[24px] font-semibold leading-[24px] break-words">Idris Gettani</div>
                            <div class="text-black text-[14px] font-normal leading-[14px] break-words">Partner Success @ Airbnb</div>
                            <div class="text-[#939393] text-[14px] font-normal leading-[14px] break-words">San Francisco, CA</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-[632px] h-0 border border-[#F0F0F0]"></div>
        </div>
    </div>
    <div class="flex flex-col   justify-start items-start gap-[45px]">
        <div class="h-[150px] flex justify-center items-start gap-[16px]">
            <div class="flex justify-start items-center gap-[12px]">
            <div class="flex items-center">
                <input type="checkbox"  class="w-[16px] h-[16px] bg-[#005382] border border-[#005382] rounded-[2px] accent-[#005382] "/>
        </div>
            </div>
            <div class="flex flex-col  justify-start items-start gap-[16px]">
                <div class="flex justify-start items-start gap-[118px]">
                    <div class="w-[371px] text-black text-[16px] font-semibold leading-[16px] break-words">Standard Employee Referral</div>
                    <div class="text-black text-[16px] font-normal leading-[16px] break-words">$20.00</div>
                </div>
                <div class="flex flex-col justify-start items-start gap-[12px]">
                    <div class="text-black text-[16px] font-normal leading-[16px] break-words">About this package</div>
                    <div class="w-[355px] text-[#555555] text-[14px] font-normal leading-[18.20px] break-words">Employee referral to Slack. Video call required to determine if candidate is a good fit for the position. Once accepted, you will receive a referral confirmation (You are not guaranteed to receive an offer from Slack)</div>
                </div>
            </div>
        </div>
        <div class="h-[150px]  flex justify-center items-start gap-[16px]">
        <div class="flex items-center">
   <input type="checkbox"  class="w-[16px] h-[16px] bg-[#005382] border border-[#D5D4DC] rounded-[2px] accent-[#005382] "/>
</div>
            <div class="flex flex-col justify-start items-start gap-[16px]">
                <div class="flex justify-start items-start gap-[118px]">
                    <div class="w-[371px] text-black text-[16px] font-semibold leading-[16px] break-words">Resume Review</div>
                    <div class="text-black text-[16px] font-normal leading-[16px] break-words">$20.00</div>
                </div>
                <div class="flex flex-col justify-start items-start gap-[12px]">
                    <div class="text-black text-[16px] font-normal leading-[16px] break-words">About this package</div>
                    <div class="w-[355px] text-[#555555] text-[14px] font-normal leading-[18.20px] break-words">You will receive a 30 min call about your submitted resume with feedback on improvements. You will also receive one 15 min follow up review upon revision</div>
                </div>
            </div>
        </div>
        <div class="h-[150px]  flex justify-center items-start gap-[16px]">
        <div class="flex items-center">
   <input type="checkbox"  class="w-[16px] h-[16px] bg-[#005382] border border-[#D5D4DC] rounded-[2px] accent-[#005382] "/>
</div>
            <div class="flex flex-col justify-start items-start gap-[16px]">
                <div class="flex justify-start items-start gap-[118px]">
                    <div class="w-[371px] text-black text-[16px] font-semibold leading-[16px] break-words">Interview Prep</div>
                    <div class="text-black text-[16px] font-normal leading-[16px] break-words">$20.00</div>
                </div>
                <div class="flex flex-col justify-start items-start gap-[12px]">
                    <div class="text-black text-[16px] font-normal leading-[16px] break-words">About this package</div>
                    <div class="w-[355px] text-[#555555] text-[14px] font-normal leading-[18.20px] break-words">You will set up a 30 min call for preparation for an interview. I will go into detail on what the company looks for in the position as well as some tips and tricks to help you crush the interview and land you the job (successful hire not guaranteed)</div>
                </div>
            </div>
        </div>
    </div>
            </div>
            <div class="w-[436px] mt-[20px] h-[515px] pt-5 pb-16 px-5  border border-[#D5D4DC] rounded-[8px] flex flex-col items-center">
    <div class="self-stretch flex flex-col items-start gap-10">
        <div class="flex flex-col items-start gap-6">
            <div class="h-[100px] flex flex-col items-start gap-6">
                <div class="pr-1 flex items-start justify-between w-full">
                    <div class="text-black text-[16px] font-semibold leading-[16px]">Standard Employee Referral</div>
                    <div class="text-black text-[16px] font-normal leading-[16px]">$20.00</div>
                </div>
                <div class="flex flex-col items-start gap-3">
                    <div class="flex items-center gap-3">
                        <div class="w-6 h-6 flex justify-center items-center">
                            <div class=" w-6 h-6">
                            <img src={timer} alt="Timer" height={20} width={20} />
                            </div>
                        </div>
                        <div class="text-black text-[14px] font-normal leading-[18.20px]">1 day delivery</div>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="w-6 h-6 flex justify-center items-center">
                            <div class=" w-6 h-6">
                                <img  src={movies} alt="Movies" height={20} width={20} />
                             </div>
                        </div>
                        <div class="text-black text-[14px] font-normal leading-[18.20px]">Video screening required</div>
                    </div>
                </div>
            </div>
            <div class="flex justify-between items-center w-[406px] pt-4 pb-4">
                <div class="text-[#939393] text-[16px] font-semibold leading-[16px]">enter promo code</div>
            </div>
            <div class="flex justify-between items-center w-[406px] pt-4 pb-4">
                <div class="text-[#939393] text-[16px] font-semibold leading-[16px]">service fee</div>
                <div class="text-right text-[#939393] text-[16px] font-semibold leading-[16px]">$2.83</div>
            </div>
            <div class="flex justify-between items-center w-[406px] pt-4 pb-4">
                <div class="text-[#2F2F2F] text-[24px] font-semibold leading-[24px]">Total</div>
                <div class="text-[#2F2F2F] text-[24px] font-semibold leading-[24px]">$22.83</div>
            </div>
            <div class="flex flex-col items-start gap-9">
                <div class="flex flex-col items-center gap-5">
                    <div class="w-[396px] px-5 py-3 bg-[#005382] rounded-lg flex justify-center items-center">
                        <div class="text-center text-white text-[12px] font-semibold leading-[12px]">confirm & pay</div>
                    </div>
                    <div class="text-center text-[#555555] text-[12px] font-semibold leading-[12px]">ssl secure payment</div>
                </div>
            </div>
        </div>
    </div>
</div>
            </div>
    </>
  );
};

export default OrderDetails;