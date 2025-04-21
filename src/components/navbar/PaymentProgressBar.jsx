import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Logo from '@/assets/images/logo.svg';
import Check from '@/assets/images/check.svg';
import Link from 'next/link';

const PaymentProgressBar = ({ currentStepservices, onStepClick }) => {
    const progressRef = useRef(null);

    useEffect(() => {
        if (progressRef.current) {
            const progress = ((currentStepservices - 1) / 2) * 100;
            progressRef.current.style.width = `${progress}%`;
        }
    }, [currentStepservices]);

    const handleStepClick = (step) => {
        if (currentStepservices >= step) {
            onStepClick(step);
        }
    };

    return (
        <div className="w-full h-[112px] bg-white shadow-[0_8px_20px_0px_#B8B4B41A]">
            <div className="h-full px-6 flex items-center">
                <Link href="/">
                    <div className="relative w-[100px] h-6">
                        <Image
                            src={Logo}
                            alt="Palplug Logo"
                            layout="fill"
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>
                <div className="ml-12 flex-1 max-w-[600px]">
                    <div className="flex justify-between items-start relative">
                        <div className="flex flex-col items-center cursor-pointer z-10" onClick={() => handleStepClick(1)}>
                            <div className="relative">
                                <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 
                    ${currentStepservices > 1
                                            ? 'bg-[#005382]'
                                            : currentStepservices === 1
                                                ? 'border-2 border-sky-800 bg-white'
                                                : 'border-2 border-[#939393] bg-white'
                                        }`}
                                >
                                    {currentStepservices > 1 ? (
                                        <Image src={Check} alt="Completed" width={12} height={12} />
                                    ) : currentStepservices === 1 ? (
                                        <div className="w-2 h-2 rounded-full bg-sky-800"></div>
                                    ) : (
                                        <div className="w-2 h-2 rounded-full bg-[#939393]"></div>
                                    )}
                                </div>
                                <div className="absolute top-1/2 left-[24px] w-[calc(300px-48px)] h-[2px] bg-[#E5E7EB]"></div>
                                <div
                                    className={`absolute top-1/2 left-[24px] w-[calc(300px-48px)] h-[2px] bg-[#005382] transition-all duration-300 
                    ${currentStepservices > 1 ? 'opacity-100' : 'opacity-0'}`}
                                ></div>
                            </div>
                            <span
                                className={`mt-2 text-sm font-medium transition-colors duration-300 
                  ${currentStepservices >= 1 ? 'text-black' : 'text-[#939393]'}`}
                            >
                                order details
                            </span>
                        </div>
                        <div className="flex flex-col items-center cursor-pointer z-10" onClick={() => handleStepClick(2)}>
                            <div className="relative">
                                <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 
                    ${currentStepservices > 2
                                            ? 'bg-[#005382]'
                                            : currentStepservices === 2
                                                ? 'border-2 border-sky-800 bg-white'
                                                : 'border-2 border-[#939393] bg-white'
                                        }`}
                                >
                                    {currentStepservices > 2 ? (
                                        <Image src={Check} alt="Completed" width={12} height={12} />
                                    ) : currentStepservices === 2 ? (
                                        <div className="w-2 h-2 rounded-full bg-sky-800"></div>
                                    ) : (
                                        <div className="w-2 h-2 rounded-full bg-[#939393]"></div>
                                    )}
                                </div>
                                <div className="absolute top-1/2 left-[24px] w-[calc(300px-48px)] h-[2px] bg-[#E5E7EB]"></div>
                                <div
                                    className={`absolute top-1/2 left-[24px] w-[calc(300px-48px)] h-[2px] bg-[#005382] transition-all duration-300 ${currentStepservices > 2 ? 'opacity-100' : 'opacity-0'}`}
                                ></div>
                            </div>
                            <span
                                className={`mt-2 text-sm font-medium transition-colors duration-300 ${currentStepservices >= 2 ? 'text-black' : 'text-[#939393]'}`}
                            >
                                confirm & pay
                            </span>
                        </div>
                        <div className="flex flex-col items-center cursor-pointer z-10" onClick={() => handleStepClick(3)}>
                            <div className="relative">
                                <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 
                                            ${currentStepservices > 3
                                            ? 'bg-[#005382]'
                                            : currentStepservices === 3
                                                ? 'border-2 border-sky-800 bg-white'
                                                : 'border-2 border-[#939393] bg-white'
                                        }`}
                                >
                                    {currentStepservices > 3 ? (
                                        <Image src={Check} alt="Completed" width={12} height={12} />
                                    ) : currentStepservices === 3 ? (
                                        <div className="w-2 h-2 rounded-full bg-sky-800"></div>
                                    ) : (
                                        <div className="w-2 h-2 rounded-full bg-[#939393]"></div>
                                    )}
                                </div>
                            </div>
                            <span
                                className={`mt-2 text-sm font-medium transition-colors duration-300 
                                ${currentStepservices >= 3 ? 'text-black' : 'text-[#939393]'}`}
                            >
                                submit requirements
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentProgressBar;