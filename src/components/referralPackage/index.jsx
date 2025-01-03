"use client";
import Image from "next/image";
import TimerIcon from "@/assets/images/timer.svg";
import Movies from "@/assets/images/movies.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Male from "@/assets/images/male.svg";
import { PopupWidget } from "react-calendly";
const packagesData = [
  {
    id: "standard",
    name: "Standard Employee Referral",
    price: 20.00,
    details: "You will receive a 30 min call about your submitted resume with feedback on improvements. You will also receive one 15 min follow up review upon revision",
    delivery_time: "1 day",
    requirements: ["Video screening required"]
  },
  {
    id: "interview",
    name: "Interview Preparation",
    details: "You will receive a 30 min call about your submitted resume with feedback on improvements. You will also receive one 15 min follow up review upon revision",
    price: 25.00,
    delivery_time: "3 day",
    requirements: ["Video screening required"]
  },
  {
    id: "resume",
    name: "Resume Review",
    price: 15.00,
    details: "You will set up a 30 min call for preparation for an interview. I will go into detail on what the company looks for in the position as well as some tips and tricks to help you crush the interview and land you the job (successful hire not guaranteed)",
    delivery_time: "2 day",
    requirements: ["Video screening required"]
  }
];

const ReferralPackage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const router = useRouter(); 

  const handleCheckboxChange = (type) => {
    if (selectedPackage === type) {
      setSelectedPackage(null);
    } else {
      setSelectedPackage(type);
    }
  };

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handlePaymentRoute = () => {
    router.push("/servicePayment");
  };

  const selectedPackageData = packagesData.find((pkg) => pkg.id === selectedPackage);
  const totalSelectedPrice = selectedPackageData ? selectedPackageData.price : 0;

  const serviceFee = 3.90;
  const totalPrice = totalSelectedPrice + serviceFee;

  const paymentSummaryHeading = selectedPackageData
    ? selectedPackageData.name
    : "Payment Summary";


  return (
    <>
      <div className="flex justify-center">
        <div className="flex gap-[30px] justify-between flex-wrap pt-[40px] pr-[24px] pb-[40px] pl-[24px]  w-full max-w-[1252px] h-auto bg-white rounded-[8px]">
          <div className="w-full md:max-w-[632px] flex flex-col gap-[60px]">
            <div>
              <div className="flex items-center gap-[16px] h-[92px]">
              <Image
                  src={Male}
                  alt="Male"
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
                {packagesData.map((pkg) => (
                  <div key={pkg.id} className="flex gap-[16px] h-[150px]">
                    <label className="cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-[#005382]"
                        onChange={() => handleCheckboxChange(pkg.id)}
                        checked={selectedPackage === pkg.id}
                      />
                    </label>
                    <div className="flex flex-col w-full md:max-w-[541px] gap-[16px]">
                      <div className="flex justify-between">
                        <p className="text-base font-semibold">{pkg.name}</p>
                        <p className="text-black font-lightbold text-base">${pkg.price.toFixed(2)}</p>
                      </div>
                      <div className="w-full md:w-[355px] flex flex-col gap-[12px]">
                        <p className="text-base font-lightbold">About this package</p>
                        <p className="text-sm font-lightbold text-[#555555]">
                          {pkg.details}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {selectedPackage && (
            <div className="border rounded-[8px] p-[20px] w-full mt-[40px] md:w-[436px] h-auto md:h-[515px]">
              <div className="flex flex-col h-auto md:h-[426px] w-full gap-[30px]">
                <h3 className="text-lg font-semibold">{paymentSummaryHeading}</h3>
                <div className="flex flex-col gap-[12px]">
                  <div className="flex gap-[12px]">
                    <Image
                      src={TimerIcon}
                      alt="TimerIcon"
                      width={24}
                      height={24}
                      className="rounded-full border"
                    />
                    <span>{selectedPackageData.delivery_time} delivery</span>
                  </div>
                  {selectedPackageData.requirements.map((requirement, idx) => (
                    <div key={idx} className="flex gap-[12px]">
                      <Image
                        src={Movies}
                        alt="Movies Icon"
                        width={24}
                        height={24}
                        className="rounded-full border"
                      />
                      <span>{requirement}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={handlePromoCodeChange}
                    className="w-full text-[#939393] text-base font-semibold"
                  />
                </div>

                <div className="flex justify-between ">
                  <p className="font-semibold text-[#939393] text-[16px]">Service fee</p>
                  <span className="font-semibold text-[#939393] text-[16px]">${serviceFee.toFixed(2)}</span>
                </div>

                <div className="flex justify-between pt-[0px] pb-[0px]">
                  <h3 className="text-[24px] font-semibold">Total</h3>
                  <span className="text-[24px] font-semibold">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex h-[138px] flex-col gap-[36px] ">
                  <button className="w-full h-[40px] border border-[#005382] text-[12px] font-semibold p-[11px_20px_11px_20px] text-[#005382] rounded-[8px]">
                    Schedule Video Call with Idris
                  </button>

                  <button  onClick={handlePaymentRoute} className="w-full h-[40px] text-[12px] font-semibold p-[11px_20px_11px_20px] bg-[#005382] text-white rounded-[8px]">
                    Confirm & Pay
                  </button>
                  <div>
                  <p className="text-center text-xs text-gray-500">All secure payment</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <PopupWidget
    url="https://calendly.com/ali-rayhan29"
    rootElement={typeof window !== "undefined" ? document.body : null}
    text="Click here to schedule!"
    textColor="#ffffff"
    color="#005382"
/>
    </>
  );
};

export default ReferralPackage;