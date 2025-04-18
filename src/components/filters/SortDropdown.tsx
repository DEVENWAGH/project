import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { FilterState } from "../../types";

interface SortDropdownProps {
  value: FilterState["sortBy"];
  onChange: (value: FilterState["sortBy"]) => void;
}

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Best Selling", value: "best_selling" },
  { label: "Rating", value: "rating" },
];

export const SortDropdown: React.FC<SortDropdownProps> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption =
    SORT_OPTIONS.find((option) => option.value === value) || SORT_OPTIONS[0];

  const handleOptionClick = (optionValue: FilterState["sortBy"]) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Sort: {currentOption.label}</span>
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="py-1">
            {SORT_OPTIONS.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    option.value === value
                      ? "bg-blue-50 text-blue-900"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
