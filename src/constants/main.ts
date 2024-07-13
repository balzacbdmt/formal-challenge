import { applications, cards, commands, suggestions } from "./api";
import { Category } from "./types";

// Generate a random delay for fake fetch from 100 to 4100 ms
function randomDelay() {
  return new Promise((resolve) => {
    const randomDelay = Math.floor(Math.random() * 4000) + 100;
    setTimeout(() => {
      resolve(randomDelay);
    }, randomDelay);
  });
}

// Get cards from api
export async function getCards() {
  await randomDelay();
  return cards;
}

// Get suggestions from api
export async function getSuggestions() {
  await randomDelay();
  return suggestions;
}

// Get applications from api
export async function getApplications() {
  await randomDelay();
  return applications;
}

// Get commands from api
export async function getCommands() {
  await randomDelay();
  return commands;
}

export const categoriesIcons: Record<Category, string | undefined> = {
  all: undefined,
  data: "maki:cross",
  security: "majesticons:lock-line",
  store: "maki:cross",
  tools: "maki:cross",
  settings: "mage:settings",
};
