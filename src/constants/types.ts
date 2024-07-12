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
