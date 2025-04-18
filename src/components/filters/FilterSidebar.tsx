import React from "react";
import { FilterState } from "../../types";
import { Slider } from "../ui/Slider";
import { Checkbox } from "../ui/Checkbox";
import { Star } from "lucide-react";
import { cn } from "../../utils/classNames";

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: Partial<FilterState>) => void;
  className?: string;
}

const BRANDS = [
  "Apple",
  "Samsung",
  "Sony",
  "LG",
  "Dell",
  "HP",
  "Lenovo",
  "Asus",
  "Acer",
  "Microsoft",
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  className,
}) => {
  const handlePriceChange = (value: [number, number]) => {
    onChange({ priceRange: value });
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];

    onChange({ brands: newBrands });
  };

  const handleRatingChange = (rating: number) => {
    onChange({ rating: filters.rating === rating ? null : rating });
  };

  const handleInStockChange = (checked: boolean) => {
    onChange({ inStock: checked });
  };

  const clearFilters = () => {
    onChange({
      priceRange: [0, 5000],
      brands: [],
      rating: null,
      inStock: false,
    });
  };

  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-6", className)}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        <button
          className="text-sm text-blue-900 hover:text-blue-700"
          onClick={clearFilters}
        >
          Clear All
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
        <Slider
          min={0}
          max={5000}
          step={100}
          value={filters.priceRange}
          onChange={handlePriceChange}
        />
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-500">
            ₹{filters.priceRange[0]}
          </span>
          <span className="text-sm text-gray-500">
            ₹{filters.priceRange[1]}
          </span>
        </div>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Brands</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {BRANDS.map((brand) => (
            <div key={brand} className="flex items-center">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
              <label
                htmlFor={`brand-${brand}`}
                className="ml-2 text-sm text-gray-700"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              className={`flex items-center w-full px-2 py-1 rounded-md ${
                filters.rating === rating ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
              onClick={() => handleRatingChange(rating)}
            >
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-700">& Up</span>
            </button>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <div>
        <div className="flex items-center">
          <Checkbox
            id="in-stock"
            checked={filters.inStock}
            onChange={(e) => handleInStockChange(e.target.checked)}
          />
          <label htmlFor="in-stock" className="ml-2 text-sm text-gray-700">
            In Stock Only
          </label>
        </div>
      </div>
    </div>
  );
};
