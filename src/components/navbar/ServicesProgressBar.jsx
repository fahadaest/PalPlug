import { useEffect, useRef } from 'react';
import Image from 'next/image';
import StepperArrow from "@/assets/images/StepperArrow.svg";

const ServicesProgressBar = ({ currentStepservices }) => {
    const stepsRef = useRef([]);
    const progressRef = useRef(null);

    useEffect(() => {
        const updateSteps = () => {
            stepsRef.current.forEach((step, index) => {
                step.classList.toggle('active', index + 1 === currentStepservices);
                step.classList.toggle('completed', index + 1 < currentStepservices);
            });
            if (progressRef.current) {
                progressRef.current.style.width = `${((currentStepservices - 1) / (stepsRef.current.length - 1)) * 100}%`;
            }
        };

        updateSteps();
    }, [currentStepservices]);

    return (
            <div className="flex flex-row     h-[24px] w-[436px]    xs:ml-0.5 xs:space-x-0  sm:flex-row items-center md:space-x-4 md:ml-5">
                {/* Step 1 */}
                <div
                    className="flex  items-center space-x-2 cursor-pointer"
                    ref={el => stepsRef.current[0] = el}
                >
                    <div
                        className={`w-[24px] h-[24px]  rounded-full flex items-center justify-center font-semibold text-[14px] ${
                            currentStepservices === 1
                                ? 'bg-[#005382] text-white font-semibold'
                                : currentStepservices > 1
                                    ? 'bg-[#005382] text-white'
                                    : 'bg-[#939393] text-white'
                        }`}
                    >
                        1
                    </div>
                    <span
                        className={`xs:text-[12px] md:text-[14px] ${
                            currentStepservices === 1
                                ? 'text-black font-semibold'
                                : currentStepservices > 1
                                    ? 'text-black font-semibold'
                                    : 'text-[#939393] font-semibold'
                        }`}
                    >
                        Package 
                    </span>
                </div>

                {/* Arrow for Step 1 */}
                <div className={`transition-colors ${currentStepservices > 1 ? 'text-black' : 'text-gray-400'}`}>
                    <Image
                        src={StepperArrow}
                        alt="Stepper Arrow"
                        width={20}
                        height={20}
                        className="fill-current"
                    />
                </div>

                {/* Step 2 */}
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                    ref={el => stepsRef.current[1] = el}
                >
                    <div
                        className={`w-[24px] h-[24px] rounded-full flex items-center justify-center font-semibold text-sm ${
                            currentStepservices === 2
                                ? 'bg-[#005382] text-white font-semibold'
                                : currentStepservices > 2
                                    ? 'bg-[#005382] text-white'
                                    : 'bg-[#939393] text-white'
                        }`}
                    >
                        2
                    </div>
                    <span
                        className={` xs:text-[12px] md:text-[14px] ${
                            currentStepservices === 2
                                ? 'text-black font-semibold'
                                : currentStepservices > 2
                                    ? 'text-black font-semibold'
                                    : 'text-[#939393] font-semibold'
                        }`}
                    >
                        Requirements
                    </span>
                </div>

                {/* Arrow for Step 2 */}
                <div className={`transition-colors ${currentStepservices > 2 ? 'text-black' : 'text-gray-400'}`}>
                    <Image
                        src={StepperArrow}
                        alt="Stepper Arrow"
                        width={20}
                        height={20}
                        className="fill-current"
                    />
                </div>

                {/* Step 3 */}
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                    ref={el => stepsRef.current[2] = el}
                >
                    <div
                        className={`w-[24px] h-[24px] rounded-full flex items-center justify-center font-semibold text-sm ${
                            currentStepservices === 3
                                ? 'bg-[#005382] text-white font-semibold'
                                : currentStepservices > 3
                                    ? 'bg-[#005382] text-white'
                                    : 'bg-[#939393] text-white'
                        }`}
                    >
                        3
                    </div>
                    <span
                        className={` xs:text-[12px] md:text-[14px] ${
                            currentStepservices === 3
                                ? 'text-black font-semibold'
                                : currentStepservices > 3
                                    ? 'text-black font-semibold'
                                    : 'text-[#939393] font-semibold'
                        }`}
                    >
                        Publish
                    </span>
                </div>

                <div className="progress-bar absolute top-[13px] left-0 w-full h-0.5 bg-gray-300 z-[-1]">
                    <div className="progress h-full bg-[#005580] transition" ref={progressRef}></div>
                </div>
            </div>
    );
};

export default ServicesProgressBar;