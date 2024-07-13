export type DataType = "barChart" | "calendar" | "stats";

export type Card = {
  id: number;
  title: string;
  category: string;
  updatedAt: number;
  logsCount: number;
  dataName: string;
  dataType: DataType;
  dataUpdatedAt?: number;
};

export type Application = {
  id: number;
  category: "data" | "security" | "store" | "tools" | "settings";
  title: string;
  description: string;
  icon?: string;
  shortcut: string[];
};
