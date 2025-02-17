import { Icon } from "@iconify/react";
import { format, formatDistanceToNow } from "date-fns";
import { DataType } from "../../../constants/types";
import BarChart from "../../../components/barChart/BarChart";
import Calendar from "../../../components/calendar/Calendar";
import Stats from "../../../components/stats/Stats";

interface Props {
  title?: string;
  updatedAt?: number;
  logsCount?: number;
  dataName?: string;
  dataType?: DataType;
  dataUpdatedAt?: number;
  isLoading?: boolean;
  className?: string;
  appearDelay?: string;
}

function Card({
  title,
  updatedAt,
  logsCount,
  dataName,
  dataType,
  dataUpdatedAt,
  isLoading,
  className,
  appearDelay,
}: Props) {
  function dataRender() {
    switch (dataType) {
      case "barChart":
        return <BarChart />;
      case "calendar":
        return <Calendar />;
      case "stats":
        return <Stats />;
    }
  }

  return (
    <div
      className={`p-6 text-gray-dark bg-slate-light rounded-2xl flex flex-col h-[350px] md:h-full md:flex-row gap-2 md:gap-8 w-full md:min-w-[600px] md:w-[600px] ${className}`}
      style={{ animationDelay: appearDelay }}
    >
      <div className="flex flex-col justify-between">
        <div>
          <h2 className={isLoading ? "skeleton-loading w-24 h-[42px]" : ""}>
            {title}
          </h2>
          <p
            className={
              isLoading ? "skeleton-loading mt-4 w-[10rem] h-[24px]" : ""
            }
          >
            {updatedAt
              ? `Updated ${formatDistanceToNow(updatedAt, { addSuffix: true })}`
              : ""}
          </p>
        </div>
        <div className="flex items-center gap-1 mb-3.5">
          {logsCount && <Icon icon="mdi:alert-circle-outline" />}
          <span
            className={
              isLoading ? "skeleton-loading w-[10rem] h-[16px]" : "text-xs"
            }
          >
            {logsCount ? `${logsCount} new logs since update` : ""}
          </span>
        </div>
      </div>
      <div className="h-48 flex-1 bg-white rounded-xl p-4 flex flex-col gap-4 justify-between">
        <p className={isLoading ? "skeleton-loading w-[10rem] h-[24px]" : ""}>
          {dataName}
        </p>
        {dataRender()}
        {dataUpdatedAt && (
          <p className="text-xs">
            {format(new Date(dataUpdatedAt), "MMM d, HH:mm:ss")}
          </p>
        )}
      </div>
    </div>
  );
}

export default Card;
