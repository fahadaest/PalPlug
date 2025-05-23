'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import EmployeeCard from '../employeCard';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import TimeImg from '@/assets/images/Group.svg';
import MovieImg from '@/assets/images/movies.svg';
import SignInModal from '@/components/signInModal';
import { selectEmployees } from '@/app/redux/slice/employee/employeeSlice';
import { useSelector } from 'react-redux';
import {
  selectCompanyStyles,
  selectLogoClassNames,
  selectCompanies,
  selectOtherCompanies,
} from '@/app/redux/slice/companies/companiesSlice';

const EmployeeDetails = () => {
  const [activeTab, setActiveTab] = useState('Referral');
  const searchParams = useSearchParams();
  const user = useSelector((state) => state.user.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, employeeId } = useParams();
  const companyStyles = useSelector(selectCompanyStyles);
  const logoClassNames = useSelector(selectLogoClassNames);
  const employees = useSelector(selectEmployees);
  const companies = [
        ...useSelector(selectCompanies),
        ...useSelector(selectOtherCompanies),
      ];
  const router = useRouter();
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      setActiveTab(serviceParam);
    }
  }, [searchParams]);
  const employee = employees?.find(
    (emp) => emp?.id.toString() === employeeId
  );

  useEffect(() => {
    if (!employee) {
      router.push('/');
    }
  }, [employee, router]);

  const company = companies.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
  const displayName = company?.name ?? name;
  const bgColor = companyStyles[company?.name]
    ? companyStyles[company?.name]?.replace(/(.*?:)?hover:/, '')
    : 'bg-gray-800';

  const activeService = employee?.services?.find(
    (service) => service?.title === activeTab
  );
  const renderTabContent = () => {
    if (activeTab === 'Calendly Booking') {
      return (
        <div className="pt-4 pb-4">
          <div className="flex justify-between mb-4 text-base text-text-heading">
            <h5 className="text-lg font-semibold">Schedule a Meeting</h5>
          </div>
          <div className="text-sm text-grey30 mb-4">
            Book a meeting with {employee?.name} to discuss your career opportunities.
          </div>
          <div className="flex items-center mb-4">
            <Image
              src={TimeImg}
              alt="30 minutes meeting"
              width={24}
              height={24}
              className="mr-2"
            />
            <p className="text-sm">30 minutes meeting</p>
          </div>
          <button
            onClick={() => {
              if (employee?.calendlyLink) {
                window.open(employee.calendlyLink, '_blank');
              } else {
                alert('Calendly link not available for this employee.');
              }
            }}
            className="w-full py-2 bg-[#005382] text-primary rounded-lg mt-4"
          >
            Book Meeting
          </button>
        </div>
      );
    }
    if (activeService) {
      return (
        <div className="pt-4 pb-4">
          <div className="flex justify-between mb-4 text-base text-text-heading">
            <h5 className="text-lg font-semibold">
              Standard Employee {activeService.title}
            </h5>
            <p className="text-lg ">${activeService?.price?.toFixed(2)}</p>
          </div>
          <div className="mb-[40px]"></div> 
          <h6 className="text-base font-lightbold mb-2">About this package</h6>
          <p className="text-sm text-grey30 mb-4">
            {activeService?.package ||
              'No package details available. Please contact the employee for more information.'}
          </p>
          <div className="mb-[40px]"></div> 
          <div className="flex items-center mb-4">
            <Image
              src={TimeImg}
              alt="1 day delivery"
              width={24}
              height={24}
              className="mr-2"
            />
            <p className="text-sm">1 day delivery</p>
          </div>
          <div className="flex items-center mb-6">
            <Image
              src={MovieImg}
              alt="Video screening required"
              width={24}
              height={24}
              className="mr-2"
            />
            <p className="text-sm">Video screening required</p>
          </div>
          <button
            onClick={() => {
              setIsModalOpen(true);
              router.push(
                `/refPayment?employeeId=${employee.id}&service=${encodeURIComponent(
                  activeTab
                )}`
              );
            }}
            className="w-full py-2 bg-[#005382] text-primary rounded-lg mt-4"
          >
            Select Package
          </button>
          <SignInModal
            isOpen={isModalOpen && !user}
            onClose={() => setIsModalOpen(false)}
          />
          <p className="text-sm text-center mt-4">Contact {employee?.name}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <>
      <div className={`w-full h-[48px] md:h-[96px] ${bgColor} flex items-center justify-center`}>
        <div className="w-full flex items-center justify-center">
          <div className="flex items-center gap-[15px]">
            {company?.image ? (
              <Image
                src={company?.image}
                alt={displayName}
                className="h-[21px] w-[21px] md:h-[42px] md:w-[42px]"
              />
            ) : (
              <div className="w-[24px] h-[24px] bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-white">N/A</span>
              </div>
            )}
            <h1 className="text-primary text-[21px] md:text-[42px] font-semibold">
              {displayName}
            </h1>
          </div>
        </div>
      </div>
      <div className="bg-employecard-bg-main-card pr-[16px] pl-[16px] pb-[24px] pt-[24px] min-h-screen">
        <div className="flex flex-col lg:flex-row gap-[16px] justify-center">
          <div className="flex-1 max-w-[1000px] flex flex-col gap-[16px]">
            <EmployeeCard
              employee={employee}
              showAbout={true}
              showReviews={true}
            />
            <div className="bg-white p-4 border-[#F0F0F0] rounded-md">
              <h2 className="text-lg font-semibold mb-2 text-text-heading">
                How it works
              </h2>
              <p className="text-sm font-lightbold text-text-heading mb-4">
                If you’re looking to land an amazing job of your dreams at {displayName}, I’m the person
                that gives you the best shot. I have been at {displayName} for 4 years and have built a
                great reputation in the partnership team and a referral from me will carry huge weight.
                I’ve gotten 12 people hired through palplug referrals, resume reviews and interview prep.
              </p>
            
              <p className="text-sm font-lightbold text-text-heading">
                Even though I would love to get everyone hired, I would need to see your skillset
                to evaluate if you would be a good candidate for the job to save everyone the time and effort.
              </p>
              <div className='mt-5'>
              <p className="text-sm font-semibold text-employecard-card-grey-text">
                Referrals:
              </p>
              </div>
              <p className="text-sm text-grey40">
                Once you request a referral, I will reach out to you to schedule a time to hop on a quick video
                call to review your experience. Please have your resume uploaded or sent to me at
                idrisgettani@slack.com prior to our call.
                <br /><br />
                This isn’t necessarily an interview but a chance to assess if the referral is worth it for you
                (Don’t want anyone spending $20 if there isn’t really an opportunity to get hired).
                <br /><br />
                Once everything looks good, I’ll accept the request and get to work on your referral.
                After I submit it, I will send you the referral confirmation to finalize the transaction.
                At that point, I will close the transaction and the money will be transferred.
                <br /><br />
                Best of luck!
              </p>
            </div>
          </div>
          <div className="flex-1 rounded-[8px] lg:max-w-[436px] bg-primary p-4 h-[522px]">
            <ul className="flex justify-between text-sm font-semibold text-center text-gray-500 mb-[20px]">
              {['Referral', 'Resume Review', 'Interview Prep'].map((tab) => (
                <li key={tab} className="flex-1">
                  <a
                    href="#"
                    className={`h-[40px] w-full flex items-center justify-center rounded-[8px] ${
                      activeTab === tab
                        ? 'bg-[#D2EFFF] text-employecard-card-blue-hover font-semibold text-[14px] leading-[100%] tracking-[-0.02em] align-middle'
                        : 'hover:text-employecard-card-blue-hover hover:bg-gray-100 font-semibold text-[14px] leading-[100%] tracking-[-0.02em] align-middle'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(tab);
                    }}
                  >
                    {tab}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex-1 overflow-auto">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetails;
