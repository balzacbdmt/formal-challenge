import { useEffect, useState } from "react";
import Card from "./Card/Card";
import { getCards } from "../../constants/main";
import { Card as CardType } from "../../constants/types";

function Home() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCards().then((cards: CardType[]) => {
      setCards(cards);
      setIsLoading(false);
    });
    // Here, we can add a catch for any errors due to fetching data
  }, []);

  function cardsMap(category: string) {
    return (
      <div className="px-12 flex flex-col md:flex-row gap-4 overflow-x-auto no-scrollbar">
        {isLoading ? (
          <Card isLoading={true} />
        ) : (
          cards
            .filter((c) => c.category === category)
            .map((c, index) => (
              <Card
                isLoading={false}
                key={c.id}
                title={c.title}
                updatedAt={c.updatedAt}
                logsCount={c.logsCount}
                dataName={c.dataName}
                dataUpdatedAt={c.dataUpdatedAt}
                className={`opacity-0 animate-fade-in`}
                appearDelay={`${index * 200}ms`}
              />
            ))
        )}
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
