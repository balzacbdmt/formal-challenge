import { Card, Application } from "./types";

export const cards: Card[] = [
  {
    id: 1,
    title: "Logs",
    category: "recent",
    updatedAt: 1720616586000,
    logsCount: 12,
    dataName: "Logs / Time",
    dataType: "barChart",
    dataUpdatedAt: 1720616586000,
  },
  {
    id: 2,
    title: "Access",
    category: "saved",
    updatedAt: 1720616586000,
    logsCount: 4,
    dataName: "Access over 90 days",
    dataType: "calendar",
  },
  {
    id: 3,
    title: "Observability",
    category: "saved",
    updatedAt: 1720616586000,
    logsCount: 24,
    dataName: "Queries in database",
    dataType: "stats",
    dataUpdatedAt: 1720616586000,
  },
  {
    id: 4,
    title: "Sidecars",
    category: "saved",
    updatedAt: 1720616586000,
    logsCount: 32,
    dataName: "Queries in database",
    dataType: "stats",
    dataUpdatedAt: 1720616586000,
  },
  {
    id: 5,
    title: "Logs",
    category: "saved",
    updatedAt: 1720616586000,
    logsCount: 12,
    dataName: "Logs / Time",
    dataType: "barChart",
    dataUpdatedAt: 1720616586000,
  },
];

export const applications: Application[] = [
  {
    id: 1,
    category: "data",
    title: "Catalog",
    description: "Description of application",
    icon: "ion:folder-outline",
    shortcut: ["opt", "c"],
  },
  {
    id: 2,
    category: "data",
    title: "Observability",
    description: "Description of application",
    icon: "fluent:eye-32-regular",
    shortcut: ["opt", "o"],
  },
  {
    id: 3,
    category: "data",
    title: "Lineage",
    description: "Description of application",
    icon: "ph:tree-structure",
    shortcut: ["opt", "l"],
  },
  {
    id: 4,
    category: "data",
    title: "ETL",
    description: "Description of application",
    icon: "bi:shuffle",
    shortcut: ["opt", "e"],
  },
  {
    id: 5,
    category: "security",
    title: "Access",
    description: "Description of application",
    icon: "streamline:user-check-validate",
    shortcut: ["opt", "a"],
  },
  {
    id: 6,
    category: "security",
    title: "Logs",
    description: "Description of application",
    icon: "ion:warning-outline",
    shortcut: ["opt", "g"],
  },
  {
    id: 7,
    category: "security",
    title: "Discovery",
    description: "Description of application",
    icon: "tabler:compass",
    shortcut: ["opt", "d"],
  },
  {
    id: 8,
    category: "security",
    title: "Policies",
    description: "Description of application",
    icon: "bx:file",
    shortcut: ["opt", "p"],
  },
  {
    id: 9,
    category: "security",
    title: "Compliance",
    description: "Description of application",
    icon: "grommet-icons:compliance",
    shortcut: ["opt", "q"],
  },
  {
    id: 10,
    category: "store",
    title: "AWS",
    description: "Description of application",
    icon: "cib:amazon-aws",
    shortcut: ["opt", "shift", "a"],
  },
  {
    id: 11,
    category: "store",
    title: "Datadog",
    description: "Description of application",
    icon: "simple-icons:datadog",
    shortcut: ["opt", "shift", "d"],
  },
  {
    id: 12,
    category: "store",
    title: "Splunk",
    description: "Description of application",
    icon: "simple-icons:splunk",
    shortcut: ["opt", "shift", "s"],
  },
  {
    id: 13,
    category: "store",
    title: "S3",
    description: "Description of application",
    icon: "simple-icons:amazons3",
    shortcut: ["opt", "shift", "3"],
  },
  {
    id: 14,
    category: "store",
    title: "Github",
    description: "Description of application",
    icon: "mdi:github",
    shortcut: ["opt", "shift", "g"],
  },
  {
    id: 15,
    category: "store",
    title: "datahub",
    description: "Description of application",
    shortcut: ["opt", "shift", "h"],
  },
  {
    id: 16,
    category: "store",
    title: "Manage Store apps",
    description: "Description of application",
    icon: "",
    shortcut: ["opt", "shift", "m"],
  },
  {
    id: 17,
    category: "tools",
    title: "API Keys",
    description: "Description of application",
    icon: "fe:key",
    shortcut: ["opt", "k"],
  },
  {
    id: 18,
    category: "tools",
    title: "Sigma",
    description: "Description of application",
    icon: "mdi:sigma",
    shortcut: ["opt", "s"],
  },
  {
    id: 19,
    category: "tools",
    title: "Workflow",
    description: "Description of application",
    icon: "ph:tree-structure-light",
    shortcut: ["opt", "w"],
  },
  {
    id: 20,
    category: "settings",
    title: "Settings A",
    description: "Description of application",
    icon: "material-symbols:settings",
    shortcut: ["opt", "s", "a"],
  },
  {
    id: 21,
    category: "settings",
    title: "Settings B",
    description: "Description of application",
    icon: "material-symbols:settings",
    shortcut: ["opt", "s", "b"],
  },
  {
    id: 22,
    category: "settings",
    title: "Settings C",
    description: "Description of application",
    icon: "material-symbols:settings",
    shortcut: ["opt", "s", "c"],
  },
  {
    id: 23,
    category: "settings",
    title: "Settings D",
    description: "Description of application",
    icon: "material-symbols:settings",
    shortcut: ["opt", "s", "d"],
  },
];

export const suggestions: string[] = [
  "How many times user X has made Y ?",
  "How many times has user group X has made Y query ?",
  "How many times user X has made Y from Z ?",
  "How many times has user group X has made Y query from Z ?",
]