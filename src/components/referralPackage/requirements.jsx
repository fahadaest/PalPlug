'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import TimerIcon from '@/assets/images/timer.svg';
import Movies from '@/assets/images/movies.svg';
import Male from '@/assets/images/male.svg';
import defaultData from '@/assets/data/defaultData.json';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import PaymentProgressBar from '@/components/navbar/PaymentProgressBar';
import { setServicesCurrentStep } from '@/app/redux/slice/user/userSlice';
const Requirements = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useSearchParams();
  useEffect(() => {
    const nav = document.querySelector('nav');
    if (nav) nav.style.display = 'none';
    return () => {
      if (nav) nav.style.display = '';
    };
  }, []);
  const employeeIdParam = params.get('employeeId');
  const serviceParam = params.get('service');
  const selectedPackagesParam = params.get('selectedPackages');
  const totalPriceParam = params.get('totalPrice');
  const serviceFeeParam = params.get('serviceFee');
  const totalDeliveryDaysParam = Number(params.get('totalDeliveryDays')) || 1;
  const packageIdToName = {
        standard: 'Standard Employee Referral',
        interview: 'Interview Preparation',
        resume: 'Resume Review',
      };
      const selectedPackageIds = selectedPackagesParam
        ? selectedPackagesParam.split(',').filter(Boolean)
        : [];
      const packageNames = selectedPackageIds.map(
        (id) => packageIdToName[id] || id
      );
      let paymentSummaryHeading = '';
      if (packageNames.length === 0) {
        paymentSummaryHeading = 'Payment Summary';
      } else if (packageNames.length === 1) {
        paymentSummaryHeading = packageNames[0];
      } else if (packageNames.length === 2) {
        paymentSummaryHeading = packageNames.join(' & ');
      } else {
        paymentSummaryHeading =
          packageNames.slice(0, -1).join(', ') +
          ' & ' +
          packageNames[packageNames.length - 1];
      }
  const currentStepservices = useSelector(s => s.user.servicescurrentStep);
  useEffect(() => {
    dispatch(setServicesCurrentStep(3));
  }, [dispatch]);
  const handleStepClick = (step) => {
    if (currentStepservices >= step) {
      dispatch(setServicesCurrentStep(step));
      if (step === 1) {
        router.push(
          `/refPayment?employeeId=${employeeIdParam}` +
          `&service=${encodeURIComponent(serviceParam)}` +
          `&selectedPackages=${encodeURIComponent(selectedPackagesParam || '')}` +
          `&totalPrice=${totalPriceParam || ''}` +
          `&serviceFee=${serviceFeeParam || ''}` +
          `&totalDeliveryDays=${totalDeliveryDaysParam || ''}`
        );
      } else if (step === 2) {
        router.push(
          `/servicePayment?employeeId=${employeeIdParam}` +
          `&service=${encodeURIComponent(serviceParam)}` +
          `&selectedPackages=${selectedPackagesParam || ''}` +
          `&totalPrice=${totalPriceParam || ''}` +
          `&serviceFee=${serviceFeeParam || ''}` +
          `&totalDeliveryDays=${totalDeliveryDaysParam}`
        );
      }
    }
  };
  const [jobUrl, setJobUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const user = useSelector(state => state.user.userData);
  const data = {
    displayName: user?.displayName || defaultData.displayName,
    photoURL: user?.photoURL || defaultData.photoURL,
    title: user?.title || defaultData.title,
    location: user?.location || defaultData.location,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/');
  };
  return (
    <>
      <PaymentProgressBar
        currentStepservices={currentStepservices}
        onStepClick={handleStepClick}
      />
      <div className="bg-white min-h-screen">
        <div className="max-w-[1200px] mx-auto p-4">
          <div className="flex gap-8 mt-8">
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
                  <label className="block text-sm font-medium mb-2 text-[#2F2F2F]">
                    URL for desired job referral
                  </label>
                  <input
                    type="url"
                    value={jobUrl}
                    onChange={e => setJobUrl(e.target.value)}
                    className="w-[440px] h-[48px] p-[12px] border border-gray-300 rounded-[8px] placeholder-[#D5D4DC]"
                    placeholder="http://airbnb.careers.partner/strategy.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#2F2F2F]">
                    Portfolio link
                  </label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={e => setPortfolioUrl(e.target.value)}
                    className="w-[440px] h-[48px] p-[12px] border border-gray-300 rounded-[8px] placeholder-[#D5D4DC]"
                    placeholder="http://www.idrisgettani.com"
                  />
                </div>
              </form>
            </div>
            <div className="w-[436px]">
              <div className="border border-gray-300 rounded-[8px] p-6 h-[318px] mt-[60px] ml-auto flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold mb-4">{paymentSummaryHeading}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src={TimerIcon}
                        alt="Timer Icon"
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <span className="text-sm">
                        {totalDeliveryDaysParam} day
                        {totalDeliveryDaysParam > 1 ? 's' : ''} delivery
                      </span>
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
                  className="w-full bg-[#005382] text-white py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Requirements;