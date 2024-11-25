import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Tick from "@/assets/images/Tick.svg";
import { setCurrentStep } from '../../app/redux/slice/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const StepProgressBar = ({ className }) => {
    const dispatch = useDispatch();
    const currentStep = useSelector((state) => state.user.currentStep);
    const stepsRef = useRef([]);
    const progressRef = useRef(null);
    const handleStepClick = (step) => {
        console.log(`Step ${step} clicked`);
        if (step <= stepsRef.current.length) {
            dispatch(setCurrentStep(step));
        }
    };
    useEffect(() => {
        const updateSteps = () => {
            stepsRef.current.forEach((step, index) => {
                step.classList.toggle('active', index + 1 === currentStep);
                step.classList.toggle('completed', index + 1 < currentStep);
            });
            if (progressRef.current) {
                const progressWidth = ((currentStep - 1) / (stepsRef.current.length - 1)) * 100;
                progressRef.current.style.width = `${progressWidth}%`;
            }
        };

        updateSteps();
    }, [currentStep]);

    return (
        <div className="flex items-center w-full">
            <ol className="flex items-center w-full">
                <li className="flex w-full max-w-[182px] items-center">
                    <span
                        ref={(el) => stepsRef.current[0] = el}
                        onClick={() => handleStepClick(1)}
                        className={`outercircle1 flex items-center justify-center w-[32px] h-[32px] border-[2px] ${currentStep > 1 ? 'border-[#005382] bg-[#005382]' : currentStep === 1 ? 'border-[#005382]' : 'border-gray-700'
                            } rounded-full`}
                    >
                        {currentStep > 1 ? (
                            <Image src={Tick} alt="Tick" className="w-[12px] h-[8px]" />
                        ) : (
                            <span className={`innercircle1 flex items-center justify-center w-[10px] h-[10px] ${currentStep === 1 ? 'bg-[#005382]'  : 'bg-[#005382]'} rounded-full`}></span>
                        )}
                    </span>
                    <span className={`line2 min-w-[93px] max-w-[150px] flex-1 h-[2px] ${currentStep >= 2 ? 'bg-[#005382]' : 'bg-gray-100'} dark:${currentStep >= 3 ? 'bg-[#005382]' : 'bg-gray-100'}`}></span>
                </li>
                <li className="flex w-full max-w-[182px] items-center">
                    <span
                        ref={(el) => stepsRef.current[1] = el}
                        onClick={() => handleStepClick(2)}
                        className={`outercircle2 flex items-center justify-center w-[32px] h-[32px]  border-[2px] ${currentStep > 2 ? 'border-[#005382] bg-[#005382]' : currentStep === 2 ? 'border-[#005382]' : 'border-gray-100'
                            } rounded-full`}
                    >
                        {currentStep > 2 ? (
                            <Image src={Tick} alt="Tick" className="w-[12px] h-[8px]" />
                        ) : (
                            <span className={`innercircle2 flex items-center justify-center w-[10px] h-[10px] ${currentStep === 2 ? 'bg-[#005382]' : 'hidden'} rounded-full`}></span>
                        )}
                    </span>
                    <span className={`line2 min-w-[93px] max-w-[150px] flex-1 h-[2px] ${currentStep >= 3 ? 'bg-[#005382]' : 'bg-gray-100'} dark:${currentStep >= 3 ? 'bg-[#005382]' : 'bg-gray-100'}`}></span>
                </li>
                <li className="flex  w-full max-w-[182px] items-center">
                    <span
                        ref={(el) => stepsRef.current[2] = el}
                        onClick={() => handleStepClick(3)}
                        className={`outercircle3 flex items-center justify-center w-[32px] h-[32px] border-[2px] ${currentStep > 3 ? 'border-[#005382] bg-[#005382]' : currentStep === 3 ? 'border-[#005382]' : 'border-gray-100'
                            } rounded-full`}
                    >
                        {currentStep > 3 ? (
                            <Image src={Tick} alt="Tick" className="w-[12px] h-[8px]" />
                        ) : (
                            <span className={`innercircle3 flex items-center justify-center w-[10px] h-[10px] ${currentStep === 3 ? 'bg-[#005382]' : 'hidden'} rounded-full`}></span>
                        )}
                    </span>
                </li>
            </ol>
        </div>
    );
};

export default StepProgressBar;
