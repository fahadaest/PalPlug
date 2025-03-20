'use client';
import { useState } from "react";
import DropdownComponent from "../profileDetails/DropdownComponent";

const PlugDashboardBar = () => {
  const [dropdownStates, setDropdownStates] = useState({
    myBusiness: "",
    analytics: "",
  });

  const handleDropdownChange = (key, value) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [key]: prevState[key] === value ? "" : value, // Toggle selection
    }));
  };

  return (
    <div className="w-full max-w-[420px] flex justify-center items-center">
      <div className="w-[auto] md:w-[140px] h-[66px] pl-1 pr-1 pt-2 pb-2 bg-white flex justify-center items-center">
        <p className="fontcolor">Dashboard</p>
      </div>

      <div className="w-[100px] md:w-[140px] h-[66px] pl-1 pr-1 pt-2 pb-2 bg-white flex justify-center items-center">
        <DropdownComponent
          label="My Business"
          options={["Option 1", "Option 2", "Option 3"]}
          selectedOption={dropdownStates.myBusiness}
          onOptionChange={(value) => handleDropdownChange("myBusiness", value)}
          buttonClassName="border-none flex gap-1 fontcolor"
          allowDeselect={true}
        />
      </div>

      <div className="w-[100px] md:w-[140px] h-[66px] pl-1 pr-1 pt-2 pb-2 bg-white flex justify-center items-center">
        <DropdownComponent
          label="Analytics"
          options={["Option A", "Option B", "Option C"]}
          selectedOption={dropdownStates.analytics}
          onOptionChange={(value) => handleDropdownChange("analytics", value)}
          buttonClassName="border-none flex gap-2 fontcolor"
          allowDeselect={true}
        />
      </div>
    </div>
  );
};

export default PlugDashboardBar;