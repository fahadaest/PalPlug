import Image from 'next/image';
import PolygonSvg from '@/assets/images/Polygon.svg';
import StarImg from '@/assets/images/star.svg';
import CheckImg from '@/assets/images/check.svg';
import PropTypes from 'prop-types';
import { selectEmployees } from '@/app/redux/slice/employee/employeeSlice';

const EmployeeCard = ({
    employee,
    onClick,
    showAbout = false,
    showReviews = false,
}) => {

    return (
        
          <div className="bg-white border  border-gray-300 rounded-lg  p-6 mb-6 w-full max-w-[1000px] h-auto flex flex-col items-start">
            <div className="flex flex-wrap items-start w-full">
                <div className="flex items-center w-full sm:w-1/2">
                    <Image
                        src={employee.image}
                        alt={employee.name}
                        width={90}
                        height={90}
                        className="rounded-full object-cover"
                    />
                    <div className="ml-4 text-left">
                        <h2 className="text-2xl font-semibold">
                            {employee.name}
                        </h2>
                        <h3 className="text-sm font-lightbold text-heading">
                            {employee.role}
                        </h3>
                        <p className="text-sm text-grey">
                            {employee.city}, {employee.country}
                        </p>
                    </div>
                </div>

                <div className="hidden md:flex items-center ml-auto w-full sm:w-1/2 justify-end">
                    <div className="flex items-center">
                        <Image
                            src={PolygonSvg}
                            alt="Top rated"
                            width={16}
                            height={13}
                            className="mr-2"
                        />
                        <h4 className="text-[16px] font-semibold text-heading">
                            Top Rated
                        </h4>
                    </div>
                </div>
            </div>

            {showAbout && (
                <div className="w-full mt-6">
                    <h3 className="text-sm font-semibold mb-2">
                        About {employee.name}
                    </h3>
                    <p className="text-sm text-gray-700">
                        Whatever the role, I know that I'll always stay true to
                        my favorite Haas School of Business defining principle ~
                        Student Always.
                    </p>
                </div>
            )}

            <div className="w-full h-px bg-gray-200 my-4"></div>

            <div
                className={`flex flex-col pb-[16px] pt-[16px] pl-[16px] w-full ${showReviews ? 'mb-2' : 'mb-6'}`}
            >
                <div className="flex items-center mb-2">
                    <Image
                        src={StarImg}
                        alt="Rating"
                        width={12}
                        height={13}
                        className="mr-2"
                    />
                    <p className="text-[14px] font-semibold text-heading">
                        {employee.reviews}
                    </p>
                    <p className="text-[14px] font-lightbold text-employecard-card-grey-text ml-1">
                        ({employee?.totalReviews} Reviews)
                    </p>
                </div>

                <div className="flex items-center">
                    <Image
                        src={CheckImg}
                        alt="Successful Hires"
                        width={10}
                        height={12}
                        className="mr-2"
                    />
                    <p className="text-sm font-semibold text-heading">
                        {employee.hires}
                    </p>
                </div>
            </div>

             {showReviews && (
                <div className="flex flex-col w-full mx-5">
                    {employee?.services?.map((service) => (
                        <div className="flex items-center mb-1" key={service?.title}>
                            <span className="text-[14px] font-medium text-heading mr-2">
                                {service?.reviewsCount}
                            </span>
                            <p className="text-[14px] text-grey">via {service?.title}</p>
                        </div>
                    ))}
                </div>
            )}
            {!showReviews && (
                <div
                    className="flex flex-wrap   w-full gap-4 mb-4"
                    onClick={() => onClick(employee)}
                >
                 {employee?.services.map((service) => (
                        <div
                            key={service.title}
                            className="group pb-[16px] pt-[16px] pl-[16px] flex-1 bg-primary border border-gray-300 rounded-lg p-2 cursor-pointer hover:bg-employecard-card-blue-hover transition-colors flex flex-col justify-between"
                            onClick={() => onClick(employee)}
                        >
                            <h5 className="text-lg font-semibold text-heading truncate group-hover:text-primary">
                                {service?.title}
                            </h5>
                            <p className="text-sm text-grey truncate group-hover:text-primary">
                                {service?.description}
                            </p>
                            <p className="text-sm text-heading truncate group-hover:text-primary">
                                ${service?.price?.toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
};

EmployeeCard.propTypes = {
    employee: PropTypes.object.isRequired,
    showAbout: PropTypes.bool,
    showReviews: PropTypes.bool,
    onClick: PropTypes.func,
};
export default EmployeeCard;
