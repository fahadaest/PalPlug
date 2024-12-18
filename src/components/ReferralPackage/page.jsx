"use client";
import Image from "next/image";
import TimerIcon from "@/assets/images/timer.svg";
import Movies from "@/assets/images/movies.svg";

const ReferralPackage = () => {
  return (
    <>
      <div className="bg-gray-300 flex justify-center">

        <div className="flex items-center gap-[30px] justify-between flex-wrap pt-[40px] pr-[24px] pb-[40px] pl-[24px] mt-[25px] w-full max-w-[1252px] h-auto bg-white rounded-[8px]">
          <div className="w-full md:max-w-[632px] flex flex-col gap-[60px]">
            <div>
              <div className="flex items-center gap-[16px] h-[92px]">
                <Image
                  src=""
                  alt=""
                  width={64}
                  height={64}
                  className="rounded-full border"
                />
                <div>
                  <h2 className="text-2xl font-semibold">Idris Gettani</h2>
                  <p className="text-sm font-lightbold text-black">Partner Success @ Airbnb</p>
                  <p className="text-sm font-lightbold text-[#939393]">San Francisco, CA</p>
                </div>
              </div>
              <div className="border border-[#F0F0F0] w-full"></div>
            </div>

            <div className="flex justify-center">
              <div className="flex flex-col w-full md:max-w-[573px] gap-[45px]">
                {[1, 2, 3].map((item, index) => (
                  <div key={index} className="flex gap-[16px] h-[150px]">
                    <label className="cursor-pointer">
                      <input type="checkbox" className="accent-[#005382]" />
                    </label>
                    <div className="flex flex-col w-full md:max-w-[541px] gap-[16px]">
                      <div className="flex justify-between text-base font-semibold">
                        Standard Employee Referral
                        <p className="text-black font-lightbold text-base">$20.00</p>
                      </div>

                      <div className="w-full flex flex-col gap-[12px]">
                        <p className="text-base font-lightbold">About this package</p>
                        <p className="text-sm font-lightbold text-[#555555]">
                          {item === 1 && "Employee referral to Slack. Video call required to determine if candidate is a good fit for the position. Once accepted, you will receive a referral confirmation (You are not guaranteed to receive an offer from Slack)"}
                          {item === 2 && "You will receive a 30 min call about your submitted resume with feedback on improvements. You will also receive one 15 min follow-up review upon revision."}
                          {item === 3 && "You will set up a 30 min call for preparation for an interview. I will go into detail on what the company looks for in the position as well as some tips and tricks to help you crush the interview and land you the job (successful hire not guaranteed)"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border rounded-[8px] mt-[50px] p-[20px] w-full md:w-[436px] h-auto md:h-[515px]">
            <div className="flex flex-col h-auto md:h-[426px] w-full gap-[40px]">

              <div className="h-[100px] flex flex-col gap-[24px]">
                <h3 className="text-lg font-semibold mb-3">Standard Employee Referral</h3>

                <div className="text-sm text-gray-600 flex flex-col gap-[12px]">
                  <div className="flex gap-[12px]">
                    <Image
                      src={TimerIcon}
                      alt="TimerIcon"
                      width={24}
                      height={24}
                      className="rounded-full border"
                    />
                    <span>1 day delivery</span>
                  </div>
                  <div className="flex gap-[12px]">
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
              </div>

              <input
                type="text"
                placeholder="Enter promo code"
                className="w-full pt-[16px] pb-[16px] text-[#939393] text-base font-semibold"
              />

              <div className="flex justify-between pt-[10px] pb-[10px]">
                <p className="font-semibold text-[#939393] text-[16px]">
                  Service fee
                </p>
                <span className="font-semibold text-[#939393] text-[16px]">$2.83</span>
              </div>

              <div className="flex justify-between pt-[10px] pb-[10px]">
                <h3 className="text-[24px] font-semibold">
                  Total
                </h3>
                <span className="text-[24px] font-semibold">$22.83</span>
              </div>

              <div className="flex flex-col gap-[10px]">
                <button className="w-full h-[40px] text-[12px] font-semibold p-[11px_20px_11px_20px] bg-[#005382] text-white rounded-[8px]">
                  Confirm & Pay
                </button>
                <p className="text-center text-xs text-gray-500">All secure payment</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ReferralPackage;
