import { applications, cards, commands, suggestions } from "./api";

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
