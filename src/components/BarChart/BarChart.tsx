import { useEffect, useRef } from "react";
import {
  calculateCrossProductPercentage,
  getRandomNumber,
} from "../../constants/helpers";

function BarChart() {
  const MIN = 1;
  const MAX = 10;
  const TRANSITION_DELAY = 1000; // in milliseconds
  const cols = Array.from({ length: 14 }, () => getRandomNumber(MIN, MAX)); // Fake data
  const containerRef = useRef<HTMLDivElement>(null);

  // Transition called after TRANSITION_DELAY
  useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current) {
        Array.from(containerRef.current.children).forEach((child, index) => {
          (
            child as HTMLDivElement
          ).style.height = `${calculateCrossProductPercentage(
            cols[index],
            MAX
          )}%`;
        });
      }
    }, TRANSITION_DELAY);

    return () => clearTimeout(timer);
  }, [cols]);

  return (
    <div className="flex flex-1 items-end gap-1.5" ref={containerRef}>
      {cols.map((c, i) => (
        <div
          key={`${i}_${c}`}
          id={`${i}_${c}`}
          className="w-4 bg-blue-500 h-[0%] rounded transition-[height] duration-500"
          style={{ opacity: `${calculateCrossProductPercentage(c, MAX)}%` }}
        />
      ))}
    </div>
  );
}

export default BarChart;
