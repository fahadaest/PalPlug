import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Logo from '@/assets/images/logo.svg';
import Check from '@/assets/images/check.svg';

const PaymentProgressBar = ({currentStepservices, onStepClick}) => {
    const progressRef = useRef(null);

    useEffect(() => {
        if (progressRef.current) {
            // Calculate progress width based on current step
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
                {/* Logo */}
                <div className="relative w-[100px] h-6">
                    <Image
                        src={Logo}
                        alt="Palplug Logo"
                        layout="fill"
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Progress Bar Container */}
                <div className="ml-12 flex-1 max-w-[600px]">
                    <div className="flex justify-between items-start relative">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center cursor-pointer z-10" onClick={() => handleStepClick(1)}>
                            <div className="relative">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                                    ${currentStepservices >= 1 ? 'bg-[#005382]' : 'bg-[#939393]'}`}
                                >
                                    {currentStepservices > 1 ? (
                                        <Image src={Check} alt="Completed" width={12} height={12} />
                                    ) : (
                                        <span className="w-2 h-2 bg-white rounded-full"></span>
                                    )}
                                </div>
                                {/* Line to next step */}
                                <div className="absolute top-1/2 left-[24px] w-[calc(300px-48px)] h-[2px] bg-[#E5E7EB]"></div>
                                <div 
                                    className={`absolute top-1/2 left-[24px] w-[calc(300px-48px)] h-[2px] bg-[#005382] transition-all duration-300
                                    ${currentStepservices > 1 ? 'opacity-100' : 'opacity-0'}`}
                                ></div>
                            </div>
                            <span className={`mt-2 text-sm font-medium transition-colors duration-300
                                ${currentStepservices >= 1 ? 'text-black' : 'text-[#939393]'}`}
                            >
                                order details
                            </span>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center cursor-pointer z-10" onClick={() => handleStepClick(2)}>
                            <div className="relative">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                                    ${currentStepservices >= 2 ? 'bg-[#005382]' : 'bg-[#939393]'}`}
                                >
                                    {currentStepservices > 2 ? (
                                        <Image src={Check} alt="Completed" width={12} height={12} />
                                    ) : (
                                        <span className="w-2 h-2 bg-white rounded-full"></span>
                                    )}
                                </div>
                                {/* Line to next step */}
                                <div className="absolute top-1/2 left-[24px] w-[calc(300px-48px)] h-[2px] bg-[#E5E7EB]"></div>
                                <div 
                                    className={`absolute top-1/2 left-[24px] w-[calc(300px-48px)] h-[2px] bg-[#005382] transition-all duration-300
                                    ${currentStepservices > 2 ? 'opacity-100' : 'opacity-0'}`}
                                ></div>
                            </div>
                            <span className={`mt-2 text-sm font-medium transition-colors duration-300
                                ${currentStepservices >= 2 ? 'text-black' : 'text-[#939393]'}`}
                            >
                                confirm & pay
                            </span>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center cursor-pointer z-10" onClick={() => handleStepClick(3)}>
                            <div className="relative">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                                    ${currentStepservices >= 3 ? 'bg-[#005382]' : 'bg-[#939393]'}`}
                                >
                                    {currentStepservices === 3 && (
                                        <span className="w-2 h-2 bg-white rounded-full"></span>
                                    )}
                                    {currentStepservices > 3 && (
                                        <Image src={Check} alt="Completed" width={12} height={12} />
                                    )}
                                </div>
                            </div>
                            <span className={`mt-2 text-sm font-medium transition-colors duration-300
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