import React, { forwardRef } from "react";
import { cn } from "../../utils/classNames";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, error, label, ...props }, ref) => {
    return (
      <div className="flex items-center">
        <input
          type="checkbox"
          className={cn(
            "h-4 w-4 rounded border-gray-300 text-blue-900 focus:ring-blue-900",
            error && "border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {label && (
          <label className="ml-2 text-sm text-gray-700" htmlFor={props.id}>
            {label}
          </label>
        )}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
