import { Icon } from "@iconify/react";
import { format, formatDistanceToNow } from "date-fns";

interface Props {
  title?: string;
  updatedAt?: number;
  logsCount?: number;
  dataName?: string;
  // TODO data prop
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
  dataUpdatedAt,
  isLoading,
  className,
  appearDelay,
}: Props) {
  return (
    <div
      className={`p-6 text-gray-400 bg-slate-100 rounded-2xl flex flex-col md:flex-row gap-2 md:gap-8 w-full md:min-w-[600px] md:w-[600px] ${className}`}
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
            {logsCount ? `${logsCount} New Logs since update` : ""}
          </span>
        </div>
      </div>
      <div className="h-48 flex-1 bg-white rounded-xl p-4 flex flex-col justify-between">
        <p className={isLoading ? "skeleton-loading w-[10rem] h-[24px]" : ""}>
          {dataName}
        </p>
        <p>TODO Graph or stats</p>
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
