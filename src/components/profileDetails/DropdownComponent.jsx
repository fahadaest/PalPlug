import React, { useState, useEffect, useRef } from 'react';
import RotatingIcon from './icon';

const DropdownComponent = ({
  options = [],
  selectedOption = [],  
  onOptionChange,
  dropdownKey,
  label,
  loading,
  width = '100%'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionChange = (option) => {
    const updatedSelection = [option];
    onOptionChange(updatedSelection);  
    setIsOpen(false);  
  };

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef} style={{ width }}>
      <button
        onClick={toggleDropdown}
        className="flex justify-between items-center h-[48px] w-full text-[16px] text-[#4A504B] bg-white border px-4 py-2 rounded-md leading-tight"
        style={{ width }}
      >
        {loading ? (
          'Loading...'
        ) : selectedOption.length > 0 ? (  
          selectedOption.join(', ')  
        ) : (
          label  
        )}
        <RotatingIcon
          className="transition-transform"
          style={{ transition: 'transform 0.1s ease', transform: `rotate(${isOpen ? '180deg' : '0deg'})` }} />
      </button>

      {isOpen && (
        <div className="dropdown bg-white border rounded-md w-full h-[200px] overflow-y-auto " style={{ maxHeight: '200px', width }}>
          {options.length > 0 ? (
            options.map((option) => (
              <div
                key={option}
                className={`block px-4 py-2 cursor-pointer hover:bg-[#005382] hover:text-white ${
                  selectedOption.includes(option) ? 'bg-gray-100' : ''
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
