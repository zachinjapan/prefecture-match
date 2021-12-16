import "./App.css";
import React, { useEffect, useState } from "react";
import Card from "./Components/Card/Card";

// outside of function so
const cardImages = [
  { src: "/images/aomori-1.jpeg", matched: false },
  { src: "/images/fukushima-1.jpeg", matched: false },
  { src: "/images/hokkaido-1.jpeg", matched: false },
  { src: "/images/iwate-1.jpeg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);

  const shuffleCards = () => {
    // double the cards
    const shuffledCards = [...cardImages, ...cardImages]
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
    if (choice1 && choice2) {
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
            handleChoice={handleChoice}
            // three situations when you want to see the front img
            flipped={card === choice1 || card === choice2 || card.matched}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
