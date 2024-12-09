import React, { useState, useEffect, useRef } from 'react';
import RotatingIcon from './icon';

const DropdownComponent = ({ 
  options = [],
  selectedOption = [],  
  onOptionChange,
  label = 'Select an option',
  loading = false,
  width = '100%',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownWidth, setDropdownWidth] = useState(200);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleOptionChange = (option) => {
    onOptionChange(option); 
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
        const buttonWidth = buttonRef.current.getBoundingClientRect().width;
        setDropdownWidth(buttonWidth);
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef} style={{ width }}>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="flex justify-between items-center h-[48px] w-full text-[16px] text-[black] bg-white border px-4 py-2 rounded-[8px] leading-tight"
      >
        {loading ? (
          'Loading...'
        ) : selectedOption.length > 0 ? (
          selectedOption
        ) : (
          label
        )}
        <RotatingIcon isRotated={isOpen} />
      </button>

      {isOpen && (
        <div
          className=" bg-white border rounded-[8px] overflow-y-auto"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 50,
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            maxHeight: '200px',
            overflowY: 'auto',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            width: buttonRef.current ? `${buttonRef.current.offsetWidth}px` : '100%',
          }}
        >
          {options.length > 0 ? (
            options.map((option) => (
              <div
                key={option}
                className={`block px-4 py-2 cursor-pointer hover:bg-[#005382] hover:text-white ${selectedOption.includes(option) ? 'bg-gray-100' : ''
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