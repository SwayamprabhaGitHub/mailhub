import React, { useEffect, useRef, useState } from "react";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { FaCaretDown } from "react-icons/fa";

const DropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCheckboxClicked, setIsCheckboxClicked] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsActive(false); //reset bg color when clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
    setIsActive((prevState) => !prevState);
  };

  const handleOptionClick = () => {
    setSelectedOption(option);
    setIsOpen(false);
    setIsActive(false); //reset bg color when selecting an option
  };

  const handleCheckboxClick = () => {
    setIsCheckboxClicked((prevState) => !prevState);
  };

  console.log(dropdownRef);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div
        className={`flex rounded-md ${
          isActive ? "bg-gray-300" : ""
        } transition-colors duration-1000 cursor-pointer`}
      >
        <div className="flex items-center">
          <button
            onClick={handleCheckboxClick}
            className="px-1 rounded-sm border-none bg-transparent cursor-pointer py-1 hover:bg-gray-100 transition-all duration-200 ease-in-out"
          >
            {/* <input
              type="checkbox"
              onClick={() => setIsActive((prevIsActive) => !prevIsActive)}
            /> */}
            {!isCheckboxClicked && <BiCheckbox size={"22px"} />}
            {isCheckboxClicked && <BiCheckboxChecked size={"22px"} />}
          </button>

          <button
            onClick={toggleDropdown}
            className="rounded-sm border-none bg-transparent cursor-pointer py-2 hover:bg-gray-100 transition-all duration-1000 ease-in-out"
          >
            <FaCaretDown />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="absolute mt-2 w-36 rounded-lg shadow-xl bg-white ring-2 ring-black ring-opacity-5">
          <div className="py-1">
            {["All", "None", "Read", "UnRead", "Starred", "Unstarred"].map(
              (option) => {
                return (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    className="block w-full text-left text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-1000 ease-in-out"
                  >
                    {option}
                  </button>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
