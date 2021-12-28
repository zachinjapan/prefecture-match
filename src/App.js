import "./App.css";
import React, { useEffect, useState } from "react";
import Card from "./Components/Card/Card";
import { useWindowSize } from "@react-hook/window-size";
import Confetti from "react-confetti";
import correctSound from "../src/audio/correct.m4a";
import errorSound from "../src/audio/error.m4a";

// outside of function so
const cardImages = [
  { src: "/images/aomori.jpg", matched: false, alt: "aomori" },
  { src: "/images/aichi.jpg", matched: false, alt: "aichi" },
  { src: "/images/akita.jpg", matched: false, alt: "akita" },
  { src: "/images/aomori.jpg", matched: false, alt: "aomori" },
  { src: "/images/chiba.jpg", matched: false, alt: "chiba" },
  { src: "/images/Ehime.jpg", matched: false, alt: "ehime" },
  { src: "/images/fukui.jpg", matched: false, alt: "fukui" },
  { src: "/images/fukuoka.jpg", matched: false, alt: "fukuoka" },
  { src: "/images/fukushima.jpg", matched: false, alt: "fukushima" },
  { src: "/images/gifu.jpg", matched: false, alt: "gifu" },
  { src: "/images/gunma.jpg", matched: false, alt: "gunma" },
  { src: "/images/hiroshima.jpg", matched: false, alt: "hiroshima" },
  { src: "/images/hokkaido.jpg", matched: false, alt: "hokkaido" },
  { src: "/images/hyogo.jpg", matched: false, alt: "hyogo" },
  { src: "/images/ibaraki.jpg", matched: false, alt: "ibaraki" },
  { src: "/images/ishikawa.jpg", matched: false, alt: "ishikawa" },
  { src: "/images/iwate.jpg", matched: false, alt: "iwate" },
  { src: "/images/kagawa.jpg", matched: false, alt: "kagawa" },
  { src: "/images/kagoshima.jpg", matched: false, alt: "kagoshima" },
  { src: "/images/kanagawa.jpg", matched: false, alt: "kanagawa" },
  { src: "/images/kochi.jpg", matched: false, alt: "kochi" },
  { src: "/images/kumamoto.jpg", matched: false, alt: "kumamoto" },
  { src: "/images/kyoto.jpg", matched: false, alt: "kyoto" },
  { src: "/images/miyagi.jpg", matched: false, alt: "miyagi" },
  { src: "/images/mie.jpg", matched: false, alt: "mie" },
  { src: "/images/miyazaki.jpg", matched: false, alt: "miyazaki" },
  { src: "/images/nagano.jpg", matched: false, alt: "nagano" },
  { src: "/images/nagasaki.jpg", matched: false, alt: "nagasaki" },
  { src: "/images/nara.jpg", matched: false, alt: "nara" },
  { src: "/images/niigata.jpg", matched: false, alt: "niigata" },
  { src: "/images/oita.jpg", matched: false, alt: "oita" },
  { src: "/images/okayama.jpg", matched: false, alt: "okayama" },
  { src: "/images/okinawa.jpg", matched: false, alt: "okinawa" },
  { src: "/images/osaka.jpg", matched: false, alt: "osaka" },
  { src: "/images/saga.jpg", matched: false, alt: "saga" },
  { src: "/images/saitama.jpg", matched: false, alt: "saitama" },
  { src: "/images/shiga.jpg", matched: false, alt: "shiga" },
  { src: "/images/shimane.jpg", matched: false, alt: "shimane" },
  { src: "/images/shizuoka.jpg", matched: false, alt: "shizuoka" },
  { src: "/images/tochigi.jpg", matched: false, alt: "tochigi" },
  { src: "/images/tokushima.jpg", matched: false, alt: "tokushima" },
  { src: "/images/tokyo.jpg", matched: false, alt: "tokyo" },
  { src: "/images/tottori.jpg", matched: false, alt: "tottori" },
  { src: "/images/toyama.jpg", matched: false, alt: "toyama" },
  { src: "/images/wakayama.jpg", matched: false, alt: "wakayama" },
  { src: "/images/yamagata.jpg", matched: false, alt: "yamagata" },
  { src: "/images/yamaguchi.jpg", matched: false, alt: "yamaguchi" },
  { src: "/images/yamanashi.jpg", matched: false, alt: "yamanashi" },
];

function App() {
  const { width, height } = useWindowSize();
  const [cards, setCards] = useState([]);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [runConfetti, setRunConfetti] = useState(false);
  let [matchedCount, setMatchedCount] = useState(0);
  let [started, setStarted] = useState(false);

  const shuffleCards = () => {
    setStarted(false);
    setRunConfetti(false);
    setMatchedCount(0);
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
    checkConfeti();
    // disable the cards till the checks are made
    if (choice1 && choice2) {
      if (!started) {
        setStarted(true);
      }
      setDisabled(true);
      if (choice1.src === choice2.src) {
        // remap all of the cards with the choice1 and choice2 as matched
        setCards((prevCards) => {
          return prevCards.map((card) => {
            //check for each card
            if (card.src === choice1.src) {
              correct.play();
              // if it one of the cards we return it with the matched property set to true
              setMatchedCount((matchedCount += 1));
              console.log(matchedCount);
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        setTimeout(() => {
          error.play();
          resetTurn();
        }, 1500);
      }
    }
  }, [choice1, choice2]);

  const checkConfeti = () => {
    console.log(matchedCount);
    if (matchedCount === cards.length * 2 && started) {
      console.log("confetti");
      console.log(cards.length);
      console.log(matchedCount);
      // correct.play();
      setRunConfetti(true);
    }
  };

  console.log(cards);

  const resetTurn = () => {
    setChoice1(null);
    setChoice2(null);
    setDisabled(false);
  };

  // audio

  // Get audio file in a variable
  let correct = new Audio(correctSound);
  let error = new Audio(errorSound);

  return (
    <>
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
      {runConfetti ? (
        <Confetti
          width={width}
          height={height}
          run={runConfetti}
          colors={["#f44336", "#FFFFFF"]}
          numberOfPieces={250}
        />
      ) : null}
    </>
  );
}

export default App;
