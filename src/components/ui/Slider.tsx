import React, { useCallback, useRef, useState, useEffect } from "react";
import { cn } from "../../utils/classNames";

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  className,
}) => {
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const getPercentage = useCallback(
    (value: number) => {
      return ((value - min) / (max - min)) * 100;
    },
    [min, max]
  );

  const getValueFromPosition = useCallback(
    (position: number) => {
      if (!trackRef.current) return min;

      const trackRect = trackRef.current.getBoundingClientRect();
      const percentage = (position - trackRect.left) / trackRect.width;

      const rawValue = percentage * (max - min) + min;
      const steppedValue = Math.round(rawValue / step) * step;

      return Math.max(min, Math.min(max, steppedValue));
    },
    [min, max, step]
  );

  const handleMouseDown = (type: "min" | "max") => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const newValue = getValueFromPosition(e.clientX);

      if (isDragging === "min") {
        onChange([Math.min(newValue, value[1] - step), value[1]]);
      } else {
        onChange([value[0], Math.max(newValue, value[0] + step)]);
      }
    },
    [isDragging, value, getValueFromPosition, step, onChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const minThumbPosition = getPercentage(value[0]);
  const maxThumbPosition = getPercentage(value[1]);

  return (
    <div className={cn("relative w-full py-4", className)}>
      <div ref={trackRef} className="h-2 bg-gray-200 rounded-full">
        <div
          className="absolute h-2 bg-blue-900 rounded-full"
          style={{
            left: `${minThumbPosition}%`,
            width: `${maxThumbPosition - minThumbPosition}%`,
          }}
        />
      </div>

      <div
        className="absolute h-5 w-5 bg-blue-900 rounded-full -mt-1.5 transform -translate-x-1/2 cursor-pointer"
        style={{ left: `${minThumbPosition}%` }}
        onMouseDown={handleMouseDown("min")}
      />

      <div
        className="absolute h-5 w-5 bg-blue-900 rounded-full -mt-1.5 transform -translate-x-1/2 cursor-pointer"
        style={{ left: `${maxThumbPosition}%` }}
        onMouseDown={handleMouseDown("max")}
      />
    </div>
  );
};
