import React from "react";
import { MonitorFilters as MonitorFiltersType } from "../../types";
import { FilterSidebar } from "./FilterSidebar";
import { Checkbox } from "../ui/Checkbox";
import { cn } from "../../utils/classNames";

interface MonitorFiltersProps {
  filters: MonitorFiltersType;
  onChange: (filters: Partial<MonitorFiltersType>) => void;
  className?: string;
}

const SCREEN_SIZES = ['24"', '27"', '32"', '34"', '38"', '49"'];
const RESOLUTIONS = ["1080p (FHD)", "1440p (QHD)", "4K (UHD)", "5K", "8K"];
const PANEL_TYPES = ["IPS", "VA", "TN", "OLED", "Mini LED"];
const REFRESH_RATES = [
  "60Hz",
  "75Hz",
  "120Hz",
  "144Hz",
  "165Hz",
  "240Hz",
  "360Hz",
];

export const MonitorFilters: React.FC<MonitorFiltersProps> = ({
  filters,
  onChange,
  className,
}) => {
  const handleBaseFilterChange = (baseFilters: Partial<MonitorFiltersType>) => {
    onChange(baseFilters);
  };

  const handleArrayFilterChange = (
    filterName: "screenSize" | "resolution" | "panelType" | "refreshRate",
    value: string
  ) => {
    const currentValues = filters[filterName];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    onChange({ [filterName]: newValues } as Partial<MonitorFiltersType>);
  };

  const renderCheckboxGroup = (
    title: string,
    filterName: "screenSize" | "resolution" | "panelType" | "refreshRate",
    options: string[]
  ) => (
    <div className="mb-6">
      <h4 className="font-medium text-gray-900 mb-3">{title}</h4>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <Checkbox
              id={`${filterName}-${option}`}
              checked={filters[filterName].includes(option)}
              onChange={() => handleArrayFilterChange(filterName, option)}
            />
            <label
              htmlFor={`${filterName}-${option}`}
              className="ml-2 text-sm text-gray-700"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={className}>
      <FilterSidebar filters={filters} onChange={handleBaseFilterChange} />

      <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
        {renderCheckboxGroup("Screen Size", "screenSize", SCREEN_SIZES)}
        {renderCheckboxGroup("Resolution", "resolution", RESOLUTIONS)}
        {renderCheckboxGroup("Panel Type", "panelType", PANEL_TYPES)}
        {renderCheckboxGroup("Refresh Rate", "refreshRate", REFRESH_RATES)}
      </div>
    </div>
  );
};
