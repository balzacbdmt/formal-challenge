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

type Category = "data" | "security" | "store" | "tools" | "settings";

export type Application = {
  id: number;
  category: Category;
  title: string;
  description: string;
  icon?: string;
  shortcut: string[];
};

export type Command = {
  id: number;
  category: Category;
  title: string;
  description: string;
  icon?: string;
  tags: string[];
}
