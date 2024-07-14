import { useEffect, useRef } from "react";
import {
  calculateCrossProductPercentage,
  getRandomNumber,
} from "../../constants/helpers";

function Calendar() {
  const MIN = 1;
  const MAX = 10;
  const COLS = 13;
  const ROWS = 7;
  const TRANSITION_DELAY = 1000; // in milliseconds
  const data = Array.from({ length: COLS * ROWS }, () =>
    getRandomNumber(MIN, MAX)
  ); // Fake data
  const containerRef = useRef<HTMLDivElement>(null);

  // Transition called after TRANSITION_DELAY
  useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current) {
        Array.from(containerRef.current.children).forEach((child, index) => {
          (
            child as HTMLDivElement
          ).style.opacity = `${calculateCrossProductPercentage(
            data[index],
            MAX
          )}%`;
        });
      }
    }, TRANSITION_DELAY);

    return () => clearTimeout(timer);
  }, [data]);

  return (
    <div className="grid grid-flow-col grid-rows-7 gap-1" ref={containerRef}>
      {data.map((c, i) => (
        <div
          key={`${i}_${c}`}
          className="h-3.5 w-full rounded bg-blue opacity-0 transition-[opacity] duration-500"
          style={{
            transitionDelay: `${calculateCrossProductPercentage(c, MAX) * 2}ms`, // Small transition delay effect
          }}
        />
      ))}
    </div>
  );
}

export default Calendar;
