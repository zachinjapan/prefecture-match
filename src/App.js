import "./App.css";
import React, { useEffect, useState } from "react";
import Card from "./Components/Card/Card";

// outside of function so
const cardImages = [
  { src: "/images/aomori-1.jpeg", matched: false, alt: "aomori" },
  { src: "/images/aichi-1.jpeg", matched: false, alt: "aichi" },
  { src: "/images/akita-1.jpeg", matched: false, alt: "akita" },
  { src: "/images/aomori-1.jpeg", matched: false, alt: "aomori" },
  { src: "/images/chiba-1.jpeg", matched: false, alt: "chiba" },
  { src: "/images/Ehime-1.jpeg", matched: false, alt: "ehime" },
  { src: "/images/fukui-1.jpeg", matched: false, alt: "fukui" },
  { src: "/images/fukuoka-1.jpeg", matched: false, alt: "fukuoka" },
  { src: "/images/fukushima-1.jpeg", matched: false, alt: "fukushima" },
  { src: "/images/gifu-1.jpeg", matched: false, alt: "gifu" },
  { src: "/images/gunma-1.jpeg", matched: false, alt: "gunma" },
  //  stoped here
  { src: "/images/hiroshima-1.jpeg", matched: false, alt: "hiroshima" },
  { src: "/images/hokkaido-1.jpeg", matched: false, alt: "hokkaido" },
  { src: "/images/hirosima-1.jpeg", matched: false, alt: "hirosima" },
  { src: "/images/hyogo-1.jpeg", matched: false, alt: "hyogo" },
  { src: "/images/ibaraki-1.jpeg", matched: false, alt: "ibaraki" },
  { src: "/images/ishikawa-1.jpeg", matched: false, alt: "ishikawa" },
  { src: "/images/iwate-1.jpeg", matched: false, alt: "iwate" },
  { src: "/images/kagawa-1.jpeg", matched: false, alt: "kagawa" },
  { src: "/images/kagoshima-1.jpeg", matched: false, alt: "kagoshima" },
  { src: "/images/kanagawa-1.jpeg", matched: false, alt: "kanagawa" },
  { src: "/images/kochi-1.jpeg", matched: false, alt: "kochi" },
  { src: "/images/kumamoto-1.jpeg", matched: false, alt: "kumamoto" },
  { src: "/images/kyoto-1.jpeg", matched: false, alt: "kyoto" },
  { src: "/images/miyagi-1.jpeg", matched: false, alt: "miyagi" },
  { src: "/images/mie-1.jpeg", matched: false, alt: "mie" },
  { src: "/images/miyazaki-1.jpeg", matched: false, alt: "miyazaki" },
  { src: "/images/nagano-1.jpeg", matched: false, alt: "nagano" },
  { src: "/images/nagasaki-1.jpeg", matched: false, alt: "nagasaki" },
  { src: "/images/nara-1.jpeg", matched: false, alt: "nara" },
  { src: "/images/niigata-1.jpeg", matched: false, alt: "niigata" },
  { src: "/images/oita-1.jpeg", matched: false, alt: "oita" },
  { src: "/images/okayama-1.jpeg", matched: false, alt: "okayama" },
  { src: "/images/okinawa-1.jpeg", matched: false, alt: "okinawa" },
  { src: "/images/osaka-1.jpeg", matched: false, alt: "osaka" },
  { src: "/images/saga-1.jpeg", matched: false, alt: "saga" },
  { src: "/images/saitama-1.jpeg", matched: false, alt: "saitama" },
  { src: "/images/shiga-1.jpeg", matched: false, alt: "shiga" },
  { src: "/images/shimane-1.jpeg", matched: false, alt: "shimane" },
  { src: "/images/shizuoka-1.jpeg", matched: false, alt: "shizuoka" },
  { src: "/images/tochigi-1.jpeg", matched: false, alt: "tochigi" },
  { src: "/images/tokushima-1.jpeg", matched: false, alt: "tokushima" },
  { src: "/images/tokyo-1.jpeg", matched: false, alt: "tokyo" },
  { src: "/images/tottori-1.jpeg", matched: false, alt: "tottori" },
  { src: "/images/toyama-1.jpeg", matched: false, alt: "toyama" },
  { src: "/images/wakayama-1.jpeg", matched: false, alt: "wakayama" },
  { src: "/images/yamagata-1.jpeg", matched: false, alt: "yamagata" },
  { src: "/images/yamaguchi-1.jpeg", matched: false, alt: "yamaguchi" },
  { src: "/images/yamanashi-1.jpeg", matched: false, alt: "yamanashi" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    //get 5 random cards from the array
    const tenRandomCards = cardImages
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    // double the cards
    const shuffledCards = [...tenRandomCards, ...tenRandomCards]
      // less then 0 = same order for the two items, positive = different order
      .sort(() => Math.random() - 0.5)
      // random id for each object
      .map((card) => ({ ...card, id: Math.random() }));
    // set the state
    setCards(shuffledCards);
    console.log(shuffledCards);
  };

  // passed down to EACH card through props
  const handleChoice = (card) => {
    console.log(card);
    choice1 ? setChoice2(card) : setChoice1(card);
  };

  // fires when the component mounts and whenver the dependencies change (choice1, choice2)
  useEffect(() => {
    // disable the cards till the checks are made
    if (choice1 && choice2) {
      setDisabled(true);
      if (choice1.src === choice2.src) {
        // remap all of the cards with the choice1 and choice2 as matched
        setCards((prevCards) => {
          return prevCards.map((card) => {
            //check for each card
            if (card.src === choice1.src) {
              // if it one of the cards we return it with the matched property set to true
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        setTimeout(resetTurn, 1000);
      }
    }
  }, [choice1, choice2]);

  console.log(cards);

  const resetTurn = () => {
    setChoice1(null);
    setChoice2(null);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Prefecture Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="board">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            alt={card.alt}
            handleChoice={handleChoice}
            // three situations when you want to see the front img
            flipped={card === choice1 || card === choice2 || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
