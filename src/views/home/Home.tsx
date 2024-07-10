import { useEffect, useState } from "react";
import Card from "./Card/Card";
import { getCards } from "../../constants/main";
import { Card as CardType } from "../../constants/types";

function Home() {
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    getCards().then((cards: CardType[]) => {
      setCards(cards);
    });
  }, []);

  function cardsMap(category: string) {
    return (
      <div className="px-12 flex gap-4 overflow-x-auto no-scrollbar">
        {cards
          .filter((c) => c.category === category)
          .map((c) => (
            <Card
              key={c.id}
              title={c.title}
              updatedAt={c.updatedAt}
              logsCount={c.logsCount}
              dataName={c.dataName}
              dataUpdatedAt={c.dataUpdatedAt}
            />
          ))}
      </div>
    );
  }

  return (
    <div className="py-16">
      <h1 className="pl-12 font-medium mb-2">Recent</h1>
      {cardsMap("recent")}
      <h1 className="pl-12 font-medium mt-8 mb-2">Saved</h1>
      {cardsMap("saved")}
    </div>
  );
}

export default Home;
