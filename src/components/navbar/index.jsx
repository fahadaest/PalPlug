import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Logo from '@/assets/images/logo.svg';
import BellIcon from '@/assets/images/bell.svg';
import MailIcon from '@/assets/images/mail.svg';
import UserImg from '@/assets/images/user.svg';
import ArrowIcon from '@/assets/images/navarrow.svg';
import mobileLogo from '@/assets/images/mblLogo.svg';
import Search from '@/assets/images/search-loupe.svg';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import SignInModal from '@/components/signInModal/index';
import StepProgressBar from './StepProgressBar';
import ServicesProgressBar from './ServicesProgressBar';
import PlugDashboardBar from './PlugDashboardBar';
import { setCurrentStep, setServicesCurrentStep } from '@/app/redux/slice/user/userSlice';
import { selectCompanies, selectOtherCompanies } from '@/app/redux/slice/companies/companiesSlice';

const NavbarDropdown = dynamic(() => import('../navbarDropdown'), {
  ssr: false,
});

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const currentStep = useSelector((state) => state.user.currentStep);
  const currentStepservices = useSelector((state) => state.user.servicescurrentStep);
  const mainCompanies = useSelector(selectCompanies);
  const otherCompanies = useSelector(selectOtherCompanies);
  const allCompanies = [...mainCompanies, ...otherCompanies];
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);
  const handleStepClick = (step) => {
    if (currentStepservices > step) {
      dispatch(setServicesCurrentStep(step));
    }
  };

  useEffect(() => {
    if (user && !hasLoggedIn) {
      setHasLoggedIn(true);
      setModalOpen(false);
    }
  }, [user, hasLoggedIn]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = (e) => {
    if (e?.target?.tagName === 'IMG') {
      e.stopPropagation();
      router.push('/');
    }
    dispatch(setCurrentStep(1));
    dispatch(setServicesCurrentStep(1));
  };

  const toggleDropdown = () => {
    if (isMobile) {
      setDropdownOpen((prevState) => !prevState);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
      if (
        !event.target.closest('.search-suggestions') &&
        !event.target.closest('.search-input-container')
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLoginClick = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const isProfilePage = pathname?.includes('/profile');
  const isServicesSelectionPage = pathname?.includes('/servicesselection');
  const isPlugDashboard = pathname?.includes('/plugDashboard');
  const inlineStyle = isProfilePage ? { boxShadow: '0px 8px 20px 0px #B8B4B41A' } : {};
  const filteredCompanies = allCompanies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };
  const handleCompanyClick = (companyName) => {
    router.push(`/company/${companyName.toLowerCase()}`);
    setShowSuggestions(false);
  };

  const isStepEnabled = (step) => step <= currentStepservices;

  return (
    <div className="flex flex-col">
      <nav
        className="bg-white p-4 sm:p-5 flex flex-row justify-between items-center sticky z-10 w-full top-0 left-0 min-h-[64px] sm:min-h-[80px]"
        style={inlineStyle}
      >
        <div className="flex items-center md:space-x-12 flex-grow xs:w-[390px]">
          <div className="relative w-10 h-6 sm:w-24 sm:h-8 cursor-pointer" onClick={handleClick}>
            <Image
              src={Logo}
              alt="Logo"
              layout="fill"
              className="hidden md:block object-contain"
              priority
            />
            <Image
              src={mobileLogo}
              alt="Mobile Logo"
              layout="fill"
              className="block md:hidden object-contain"
              priority
            />
          </div>

          {isProfilePage && (
            <div className="flex items-center justify-end w-full max-w-xl ml-auto h-full">
              <StepProgressBar currentStep={currentStep} className="w-full h-full" />
            </div>
          )}
          {!isProfilePage &&
            (isPlugDashboard ? (
              <PlugDashboardBar />
            ) : (
              <div className="relative w-full max-w-[452px] min-w-[211px]">
                <div className="search-input-container border rounded-md h-[40px] flex items-center px-3">
                  <Image
                    src={Search.src}
                    alt="Search"
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    placeholder="Search by company"
                    className="w-full text-sm tracking-tight placeholder-gray-500 focus:outline-none border-none"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                {showSuggestions && searchQuery && (
                  <div className="search-suggestions absolute mt-2 w-full bg-white rounded-md shadow-lg border border-gray-200 z-30 max-h-60 overflow-y-auto">
                    {filteredCompanies.length > 0 ? (
                      filteredCompanies.map((company) => (
                        <div
                          key={company.name}
                          onClick={() => handleCompanyClick(company.name)}
                          className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                          <Image
                            src={company.image}
                            alt={company.name}
                            width={20}
                            height={20}
                            className="object-contain mr-2"
                          />
                          <span className="text-sm">{company.name}</span>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        No matching companies found
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>
        {!isProfilePage && (
          <div className="h-[36px] min-w-[96px] ml-4 md:ml-0 md:w-[248px] flex items-center gap-4">
            {user ? (
              <>
                <div className="flex gap-4">
                  <Image
                    src={BellIcon}
                    alt="Bell Icon"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                  />
                  <Image
                    src={MailIcon}
                    alt="Mail Icon"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src={UserImg}
                    alt="User Image"
                    width={36}
                    height={36}
                    className="cursor-pointer"
                    onClick={toggleDropdown}
                  />
                  {isMobile && isDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-10"
                      ref={dropdownRef}
                    >
                      <NavbarDropdown
                        isOpen={isDropdownOpen}
                        userId={user.id || user.uid}
                        setDropdownOpen={setDropdownOpen}
                      />
                    </div>
                  )}
                  <div className="hidden md:flex items-center">
                    <span className="text-sm font-semibold">
                      {user.displayName && user.displayName.length > 20
                        ? `${user.displayName.substring(0, 20)}...`
                        : user.displayName || 'Unknown User'}
                    </span>
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                        className={`ml-2 inline-flex items-center justify-center w-4 h-4 transition-transform ${
                          isDropdownOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                        type="button"
                      >
                        <Image
                          src={ArrowIcon}
                          alt="Arrow Icon"
                          width={16}
                          height={16}
                        />
                      </button>
                      {isDropdownOpen && (
                        <NavbarDropdown
                          isOpen={isDropdownOpen}
                          userId={user.id || user.uid}
                          setDropdownOpen={setDropdownOpen}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <button
                onClick={handleLoginClick}
                className="bg-[#005382] text-primary text-sm font-semibold rounded-md py-2 px-4"
              >
                Log in
              </button>
            )}
          </div>
        )}
      </nav>
      {isServicesSelectionPage && (
        <ServicesProgressBar
          currentStepservices={currentStepservices}
          onStepClick={handleStepClick}
        />
      )}
      <SignInModal isOpen={isModalOpen && !user} onClose={handleModalClose} ref={modalRef} />
    </div>
  );
};

export default Navbar;
