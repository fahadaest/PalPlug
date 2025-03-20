import React, { useState, useEffect, useRef } from "react";
import RotatingIcon from "./icon";

const DropdownComponent = ({
  options = [],
  selectedOption = "",
  onOptionChange,
  label = "Select an option",
  loading = false,
  width = "100%",
  className = "",
  dropdownClassName = "",
  buttonClassName = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState(200);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleOptionChange = (option) => {
    if (option === selectedOption) {
      onOptionChange("");
    } else {
      onOptionChange(option);
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (buttonRef.current) {
        setDropdownWidth(buttonRef.current.getBoundingClientRect().width);
      }
    });

    if (buttonRef.current) {
      resizeObserver.observe(buttonRef.current);
    }

    return () => {
      if (buttonRef.current) {
        resizeObserver.unobserve(buttonRef.current);
      }
    };
  }, [buttonRef.current]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef} style={{ width }}>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-label={label}
        className={`flex justify-between items-center h-[48px] w-full text-[16px] text-[black] bg-white border px-4 py-2 rounded-[8px] leading-tight ${buttonClassName}`}
      >
        {loading ? "Loading..." : (selectedOption || label)}
        <RotatingIcon isRotated={isOpen} />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full left-0 z-50 border rounded-[8px] overflow-y-auto shadow-md ${dropdownClassName}`}
          style={{
            backgroundColor: "white",
            maxHeight: "200px",
            overflowY: "auto",
            width: `${dropdownWidth}px`,
          }}
        >
          {options.length > 0 ? (
            options.map((option) => (
              <div
                key={option}
                className={`block px-4 py-2 cursor-pointer hover:bg-gray-100 text-black ${
                  selectedOption === option ? "bg-gray-100 font-semibold" : ""
                }`}
                onClick={() => handleOptionChange(option)}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="p-4 text-gray-500">No options available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;