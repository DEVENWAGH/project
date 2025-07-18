import React, { forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helperText, 
    leftIcon, 
    rightIcon, 
    fullWidth = false,
    className,
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    
    const inputClasses = clsx(
      "block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
      {
        "w-full": fullWidth,
        "pl-10": leftIcon,
        "pr-10": rightIcon,
        "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500": error
      },
      className
    );
  
    return (
      <div className={clsx("", { "w-full": fullWidth })}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-description` : undefined}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-red-600" id={`${inputId}-error`}>
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500" id={`${inputId}-description`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';