import { useEffect, useRef } from 'react';

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
        <div className={`step-progress-bar ${className}`} style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <div className="steps flex relative w-full items-center">
                {['Personal Info', 'Professional Info', 'Account Security'].map((label, index) => (
                    <div key={index} className="step-container flex flex-col items-center relative flex-1">
                        <div
                            className={`step ${index + 1 <= currentStep ? 'active' : ''} flex items-center justify-center w-6 h-6 bg-white border-3 border-gray-300 rounded-full cursor-pointer transition relative`}
                            ref={el => stepsRef.current[index] = el}
                        >
                            <div className="outer-circle w-8 h-8 rounded-full border-2 border-gray-300 absolute flex items-center justify-center">
                                <div className="inner-circle w-4 h-4 rounded-full bg-[#005580] border-2 border-[#005580]"></div>
                            </div>
                        </div>
                        <div className="label mt-2 text-sm text-gray-600">{label}</div>
                    </div>
                ))}
                <div className="progress-bar absolute top-[13px] left-0 w-full h-0.5 bg-gray-300 z-[-1]">
                    <div className="progress h-full bg-[#005580] transition" ref={progressRef}></div>
                </div>
            </div>
        </div>
    );
};

export default StepProgressBar;
