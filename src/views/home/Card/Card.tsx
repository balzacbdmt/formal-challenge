import { Icon } from "@iconify/react";
import { format, formatDistanceToNow } from "date-fns";

interface Props {
  title: string;
  updatedAt: number;
  logsCount: number;
  dataName: string;
  // TODO data prop
  dataUpdatedAt?: number;
}

function Card({ title, updatedAt, logsCount, dataName, dataUpdatedAt }: Props) {
  return (
    <div className="p-6 text-gray-400 bg-slate-100 rounded-2xl flex gap-8 min-w-[600px] w-[600px]">
      <div className="flex flex-col justify-between">
        <div>
          <h2>{title}</h2>
          <p>Updated {formatDistanceToNow(updatedAt, { addSuffix: true })}</p>
        </div>
        {logsCount > 0 && (
          <div className="flex items-center gap-1 mb-3.5">
            <Icon icon="mdi:alert-circle-outline" />
            <span className="text-xs">{logsCount} New Logs since update</span>
          </div>
        )}
      </div>
      <div className="h-48 w-96 bg-white rounded-xl p-4 flex flex-col justify-between">
        <p>{dataName}</p>
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
