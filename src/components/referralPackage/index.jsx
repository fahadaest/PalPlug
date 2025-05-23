'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import TimerIcon from "@/assets/images/timer.svg";
import Movies from "@/assets/images/movies.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { selectEmployees } from "@/app/redux/slice/employee/employeeSlice";
import Male from "@/assets/images/male.svg";
import { PopupButton } from "react-calendly";
import PaymentProgressBar from "@/components/navbar/PaymentProgressBar";
import { setServicesCurrentStep, setScheduledEvent } from "@/app/redux/slice/user/userSlice";
import { useCalendlyEventListener } from 'react-calendly';
import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { calendlyInstance } from '@/axios';
const packagesData = [
  {
    id: "standard",
    name: "Standard Employee Referral",
    price: 20.0,
    details:
      "You will receive a 30 min call about your submitted resume with feedback on improvements. You will also receive one 15 min follow up review upon revision",
    delivery_time: "1 day",
    requirements: ["Video screening required"],
  },
  {
    id: "interview",
    name: "Interview Preparation",
    details:
      "You will receive a 30 min call about your submitted resume with feedback on improvements. You will also receive one 15 min follow up review upon revision",
    price: 25.0,
    delivery_time: "3 day",
    requirements: ["Video screening required"],
  },
  {
    id: "resume",
    name: "Resume Review",
    price: 15.0,
    details:
      "You will set up a 30 min call for preparation for an interview. I will go into detail on what the company looks for in the position as well as some tips and tricks to help you crush the interview and land you the job (successful hire not guaranteed)",
    delivery_time: "2 day",
    requirements: ["Video screening required"],
  },
];
const serviceToPackageId = {
  Referral: "standard",
  "Resume Review": "resume",
  "Interview Prep": "interview",
};
const ReferralPackage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const employeeIdParam = searchParams.get("employeeId");
  const serviceParam = searchParams.get("service");
  const selectedPackagesParam = searchParams.get("selectedPackages");
  const employees = useSelector(selectEmployees);
  const currentStepservices = useSelector((state) => state.user.servicescurrentStep);
  const scheduledEvent = useSelector((state) => state.user.scheduledEvent);
  const isConfirmPayDisabled = !scheduledEvent || !scheduledEvent.start_time || !scheduledEvent.end_time;
  useEffect(() => {
    dispatch(setServicesCurrentStep(1));
  }, [dispatch]);
  const employee = employees.find(
    (emp) => emp.id.toString() === employeeIdParam
  );
  const [selectedPackage, setSelectedPackage] = useState([]);
  useEffect(() => {
    if (selectedPackagesParam) {
      const packagesFromUrl = selectedPackagesParam.split(",").filter(Boolean);
      setSelectedPackage(packagesFromUrl);
    } else if (serviceParam && serviceToPackageId[serviceParam]) {
      setSelectedPackage((prev) => {
        const pkgId = serviceToPackageId[serviceParam];
        return prev.includes(pkgId) ? prev : [...prev, pkgId];
      });
    }
  }, [serviceParam, selectedPackagesParam]);
  const [promoCode, setPromoCode] = useState("");
  const selectedEmployeeService = employee?.services?.find(
    (s) => s.title === serviceParam
  );
  const modifiedPackagesData = packagesData.map((pkg) => {
    if (
      pkg.id === serviceToPackageId[serviceParam] &&
      selectedEmployeeService
    ) {
      return {
        ...pkg,
        price: selectedEmployeeService.price,
        details:
          selectedEmployeeService.package || pkg.details,
      };
    }
    return pkg;
  });
    const handleCheckboxChange = (type) => {
        setSelectedPackage((prev) => {
          if (prev.includes(type)) {
            if (type === requiredPackageId) {
              return prev;
            }
            return prev.filter((id) => id !== type);
          }
          return [...prev, type];
        });
      };
  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };
  const selectedPackageData = modifiedPackagesData.filter(
    (pkg) => selectedPackage.includes(pkg.id)
  );
  const totalSelectedPrice = selectedPackageData.reduce(
    (sum, pkg) => sum + pkg.price,
    0
  );
  const totalDeliveryDays = selectedPackageData.reduce(
    (sum, pkg) => sum + parseInt(pkg.delivery_time),
    0
  );
  const serviceFee = 3.90;
  const totalPrice = totalSelectedPrice + serviceFee;
  const packageNames = selectedPackageData.map((pkg) => pkg.name);
  const paymentSummaryHeading =
    packageNames.length === 0
      ? "Payment Summary"
      : packageNames.length === 1
      ? packageNames[0]
      : packageNames.length === 2
      ? packageNames.join(" & ")
      : packageNames.slice(0, packageNames.length - 1).join(", ") +
        " & " +
        packageNames[packageNames.length - 1];
  const handlePaymentRoute = () => {
    dispatch(setServicesCurrentStep(2));
    router.push(
      `/servicePayment?employeeId=${employeeIdParam}&service=${serviceParam}` +
        `&totalPrice=${totalPrice.toFixed(2)}&serviceFee=${serviceFee.toFixed(
          2
        )}&totalDeliveryDays=${totalDeliveryDays}` +
        `&selectedPackages=${selectedPackage.join(",")}`
    );
  };
  const requiredPackageId = serviceToPackageId[serviceParam];
  const handleStepClick = (step) => {
    if (currentStepservices > step) {
      dispatch(setServicesCurrentStep(step));
    }
  };
  useCalendlyEventListener({
    onEventScheduled: async (e) => {
      try {
        const eventUri = e.data.payload.event.uri;
        const eventUuid = eventUri.split('/').pop();
        const inviteeResponse = await fetch(`/api/calendly-invitees?eventUuid=${eventUuid}`);
        const inviteeData = await inviteeResponse.json();
        const invitee = inviteeData.collection[0];
        const eventResponse = await fetch(`/api/calendly-event?eventUuid=${eventUuid}`);
        const eventData = await eventResponse.json();
        const employeeName = employee?.name || 'Unknown';
        if (invitee && eventData.resource) {
          ({
            start_time: eventData.resource.start_time,
            end_time: eventData.resource.end_time,
            employee_name: employeeName,
          });
          dispatch(
            setScheduledEvent({
              start_time: eventData.resource.start_time,
              end_time: eventData.resource.end_time,
              employee_name: employeeName,
            })
          );
        } else {
          ({
            invitee: invitee,
            eventData: eventData,
          });
        }
      } catch (error) {
        ({
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      }
    },
  });
  const getButtonText = () => {
    if (scheduledEvent && scheduledEvent.start_time) {
      try {
        const start = parseISO(scheduledEvent.start_time);
        const formattedTime = formatInTimeZone(start, 'Asia/Karachi', 'MMMM do - h:mm a');
        return `${formattedTime}`;
      } catch (error) {
        (error);
        return `Schedule Video Call with ${employee?.name || 'Unknown'}`;
      }
    }
    return `Schedule Video Call with ${employee?.name || 'Unknown'}`;
  };
  return (
    <>
      <PaymentProgressBar
        currentStepservices={currentStepservices}
        onStepClick={handleStepClick}
      />
      <div className="flex justify-center">
        <div className="flex gap-[30px] justify-between flex-wrap pt-[40px] pr-[24px] pb-[40px] pl-[24px] w-full max-w-[1252px] h-auto bg-white rounded-[8px]">
          <div className="w-full md:max-w-[632px] flex flex-col gap-[60px]">
            <div>
              <div className="flex items-center gap-[16px] h-[92px]">
                <Image
                  src={employee ? employee.image : Male}
                  alt={employee ? employee.name : "Employee"}
                  width={64}
                  height={64}
                  className="rounded-full border"
                />
                <div>
                  <h2 className="text-2xl font-semibold">
                    {employee ? employee.name : "Unknown Employee"}
                  </h2>
                  <p className="text-sm font-lightbold text-black">
                    {employee ? employee.role : ""}
                  </p>
                  <p className="text-sm font-lightbold text-[#939393]">
                    {employee ? `${employee.city}, ${employee.country}` : ""}
                  </p>
                </div>
              </div>
              <div className="border border-[#F0F0F0] w-full"></div>
            </div>
            <div className="flex justify-center">
              <div className="flex flex-col w-full md:max-w-[573px] gap-[45px]">
                {modifiedPackagesData.map((pkg) => (
                  <div key={pkg.id} className="flex gap-[16px] h-[150px]">
                    <label className="cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-[#005382]"
                        disabled={pkg.id === requiredPackageId}
                        onChange={() => handleCheckboxChange(pkg.id)}
                        checked={selectedPackage.includes(pkg.id)}
                      />
                    </label>
                    <div className="flex flex-col w-full md:max-w-[541px] gap-[16px]">
                      <div className="flex justify-between">
                        <p className="text-base font-semibold">{pkg.name}</p>
                        <p className="text-black font-lightbold text-base">
                          ${pkg.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="w-full md:w-[355px] flex flex-col gap-[12px]">
                        <p className="text-base font-lightbold">
                          About this package
                        </p>
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
          {selectedPackage.length > 0 && (
            <div className="border rounded-[8px] p-[20px] w-full mt-[40px] md:w-[436px] h-auto md:h-[515px]">
              <div className="flex flex-col h-auto md:h-[426px] w-full gap-[30px]">
                <h3 className="text-lg font-semibold ">
                  {paymentSummaryHeading}
                </h3>
                <div className="flex flex-col gap-[12px]">
                  <div className="flex gap-[12px]">
                    <Image
                      src={TimerIcon}
                      alt="TimerIcon"
                      width={24}
                      height={24}
                      className="rounded-full border"
                    />
                    <span>
                      {totalDeliveryDays} day
                      {totalDeliveryDays > 1 ? "s" : ""} delivery
                    </span>
                  </div>
                  {Array.from(
                    new Set(
                      selectedPackageData.flatMap((pkg) => pkg.requirements)
                    )
                  ).map((requirement, idx) => (
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
                  <p className="font-semibold text-[#939393] text-[16px]">
                    Service fee
                  </p>
                  <span className="font-semibold text-[#939393] text-[16px]">
                    ${serviceFee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between pt-[0px] pb-[0px]">
                  <h3 className="text-[24px] font-semibold">Total</h3>
                  <span className="text-[24px] font-semibold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex h-[138px] flex-col gap-[36px] ">
                  <PopupButton
                    url="https://calendly.com/anasnajmi780"
                    rootElement={
                      typeof window !== "undefined" ? document.body : null
                    }
                    text={getButtonText()}
                    styles={{
                      width: "100%",
                      height: "40px",
                      border: "1px solid #005382",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#005382",
                      borderRadius: "8px",
                      padding: "11px 20px",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  />
                  <button
                    onClick={handlePaymentRoute}
                    disabled={isConfirmPayDisabled}
                    className={`"w-full h-[40px] text-[12px] font-semibold p-[11px_20px_11px_20px] bg-[#005382] text-white rounded-[8px]"
                    ${
                      isConfirmPayDisabled
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed rounded-[8px] text-[12px] font-semibold p-[11px_20px_11px_20px]"
                        : "bg-[#005382] text-white text-[12px] font-semibold p-[11px_20px_11px_20px] rounded-[8px]"
                    }`}
                  >
                    Confirm & Pay
                  </button>
                  <div>
                    <p className="text-center text-xs text-gray-500">
                      All secure payment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ReferralPackage;
