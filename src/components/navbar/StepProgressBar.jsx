import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Tick from "@/assets/images/Tick.svg";

const StepProgressBar = ({ className, currentStep }) => {
    const stepsRef = useRef([]);
    const progressRef = useRef(null);

    useEffect(() => {
        const updateSteps = () => {
            stepsRef.current.forEach((step, index) => {
                step.classList.toggle('active', index + 1 === currentStep);
                step.classList.toggle('completed', index + 1 < currentStep);
            });

            if (progressRef.current) {
                progressRef.current.style.width = `${((currentStep - 1) / (stepsRef.current.length - 1)) * 100}%`;
            }
        };

        updateSteps();
    }, [currentStep]);

    return (
        <div className="flex items-center w-full">
            <ol className="flex items-center w-full">
                {/* Step 1 */}
                <li className="flex w-full items-center">
                    <span
                        className={`outercircle1 flex items-center justify-center w-10 h-10 border-2 ${
                            currentStep > 1 ? 'border-[#005382] bg-[#005382]' : currentStep === 1 ? 'border-[#005382]' : 'border-gray-700'
                        } rounded-full`}
                    >
                        {currentStep > 1 ? (
                            <Image src={Tick} alt="Tick" className="w-3 h-3" />
                        ) : (
                            <span className={`innercircle1 flex items-center justify-center w-3 h-3 ${currentStep === 1 ? 'bg-[#005382]' : 'bg-gray-300'} rounded-full`}></span>
                        )}
                    </span>
                    {/* Line 1: Turn blue if currentStep is greater than 1 */}
                    <span className={`line2 flex-1 h-1 ${currentStep >= 3 ? 'bg-[#005382]' : 'bg-gray-100'} dark:${currentStep >= 3 ? 'bg-[#005382]' : 'bg-gray-100'}`}></span>
                </li>

                {/* Step 2 */}
                <li className="flex w-full items-center">
                    <span
                        className={`outercircle2 flex items-center justify-center w-10 h-10  border-2 ${
                            currentStep > 2 ? 'border-[#005382] bg-[#005382]' : currentStep === 2 ? 'border-[#005382]' : 'border-gray-100'
                        } rounded-full`}
                    >
                        {currentStep > 2 ? (
                            <Image src={Tick} alt="Tick" className="w-3 h-3" />
                        ) : (
                            <span className={`innercircle2 flex items-center justify-center w-3 h-3 ${currentStep === 2 ? 'bg-[#005382]' : 'bg-gray-300'} rounded-full`}></span>
                        )}
                    </span>
                    {/* Line 2: Turn blue if currentStep is greater than 2 */}
                    <span className={`line2 flex-1 h-1 ${currentStep >= 3 ? 'bg-[#005382]' : 'bg-gray-100'} dark:${currentStep >= 3 ? 'bg-[#005382]' : 'bg-gray-100'}`}></span>
                </li>

                {/* Step 3 */}
                <li className="flex w-full items-center">
                    <span
                        className={`outercircle3 flex items-center justify-center w-10 h-10  border-2 ${
                            currentStep > 3 ? 'border-[#005382] bg-[#005382]' : currentStep === 3 ? 'border-[#005382]' : 'border-gray-100'
                        } rounded-full`}
                    >
                        {currentStep > 3 ? (
                            <Image src={Tick} alt="Tick" className="w-3 h-3" />
                        ) : (
                            <span className={`innercircle3 flex items-center justify-center w-3 h-3 ${currentStep === 3 ? 'bg-[#005382]' : 'bg-gray-300'} rounded-full`}></span>
                        )}
                    </span>
                </li>
            </ol>
        </div>
    );
};

export default StepProgressBar;
