"use client";
import Image from "next/image";
import TimerIcon from "@/assets/images/timer.svg";
import Movies from "@/assets/images/movies.svg";
import { useState } from "react";
import Link from "next/link";

const ReferralPackage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [promoCode, setPromoCode] = useState('');

  const prices = {
    standard: 20.00,
    interview: 25.00,
    resume: 15.00,
  };

  const handleCheckboxChange = (type) => {
    if (selectedPackage === type) {
      setSelectedPackage(null); t
    } else {
      setSelectedPackage(type);
    }
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const totalSelectedPrice = selectedPackage
    ? prices[selectedPackage]
    : 0;

  const serviceFee = 2.83;
  const totalPrice = totalSelectedPrice + serviceFee;

  const isAnyPackageSelected = selectedPackage !== null;

  const selectedPackages = [];
  if (selectedPackage === "standard") selectedPackages.push("Standard Employee Referral");
  if (selectedPackage === "interview") selectedPackages.push("Interview Preparation");
  if (selectedPackage === "resume") selectedPackages.push("Resume Review");

  const paymentSummaryHeading = selectedPackages.length > 0
    ? selectedPackages.join(" + ")
    : "Payment Summary";

  return (
    <>
      <div className="flex justify-center">
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
                <div className="flex gap-[16px] h-[150px]">
                  <label className="cursor-pointer">
                    <input
                      type="checkbox"
                      className="accent-[#005382]"
                      onChange={() => handleCheckboxChange("standard")}
                      checked={selectedPackage === "standard"}
                    />
                  </label>
                  <div className="flex flex-col w-full md:max-w-[541px] gap-[16px]">
                    <div className="flex justify-between text-base font-semibold">
                      Standard Employee Referral
                      <p className="text-black font-lightbold text-base">${prices.standard}</p>
                    </div>
                    <div className="w-full flex flex-col gap-[12px]">
                      <p className="text-base font-lightbold">About this package</p>
                      <p className="text-sm font-lightbold text-[#555555]">
                        Employee referral to Slack. Video call required to determine if candidate is a good fit for the position.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-[16px] h-[150px]">
                  <label className="cursor-pointer">
                    <input
                      type="checkbox"
                      className="accent-[#005382]"
                      onChange={() => handleCheckboxChange("interview")}
                      checked={selectedPackage === "interview"}
                    />
                  </label>
                  <div className="flex flex-col w-full md:max-w-[541px] gap-[16px]">
                    <div className="flex justify-between text-base font-semibold">
                      Interview Preparation
                      <p className="text-black font-lightbold text-base">${prices.interview}</p>
                    </div>
                    <div className="w-full flex flex-col gap-[12px]">
                      <p className="text-base font-lightbold">About this package</p>
                      <p className="text-sm font-lightbold text-[#555555]">
                        30 min call for interview preparation. Tips and tricks to help you ace the interview (successful hire not guaranteed).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-[16px] h-[150px]">
                  <label className="cursor-pointer">
                    <input
                      type="checkbox"
                      className="accent-[#005382]"
                      onChange={() => handleCheckboxChange("resume")}
                      checked={selectedPackage === "resume"}
                    />
                  </label>
                  <div className="flex flex-col w-full md:max-w-[541px] gap-[16px]">
                    <div className="flex justify-between text-base font-semibold">
                      Resume Review
                      <p className="text-black font-lightbold text-base">${prices.resume}</p>
                    </div>
                    <div className="w-full flex flex-col gap-[12px]">
                      <p className="text-base font-lightbold">About this package</p>
                      <p className="text-sm font-lightbold text-[#555555]">
                        30 min resume review call with feedback and improvement suggestions.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {isAnyPackageSelected && (
            <div className="border rounded-[8px] p-[20px] w-full md:w-[436px] h-auto md:h-[515px]">
              <div className="flex flex-col h-auto md:h-[426px] w-full gap-[40px]">
                <h3 className="text-lg font-semibold mb-3">{paymentSummaryHeading}</h3>
                <div className="flex flex-col gap-[12px]">
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

                <div>
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={handlePromoCodeChange}
                    className="w-full pt-[16px] pb-[16px] text-[#939393] text-base font-semibold"
                  />
                </div>

                <div className="flex justify-between pt-[10px] pb-[10px]">
                  <p className="font-semibold text-[#939393] text-[16px]">Service fee</p>
                  <span className="font-semibold text-[#939393] text-[16px]">${serviceFee.toFixed(2)}</span>
                </div>

                <div className="flex justify-between pt-[10px] pb-[10px]">
                  <h3 className="text-[24px] font-semibold">Total</h3>
                  <span className="text-[24px] font-semibold">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex flex-col gap-[10px]">
                  <Link href="/servicePayment">
                    <button className="w-full h-[40px] text-[12px] font-semibold p-[11px_20px_11px_20px] bg-[#005382] text-white rounded-[8px]">
                      Confirm & Pay
                    </button>
                  </Link>
                  <p className="text-center text-xs text-gray-500">All secure payment</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div >
    </>
  );
};

export default ReferralPackage;

