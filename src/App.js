import "./App.css";
import React, { useEffect, useState } from "react";
import Card from "./Components/Card/Card";
import { useWindowSize } from "@react-hook/window-size";
import Confetti from "react-confetti";
import song from "../src/audio/correct.m4a";

// outside of function so
const cardImages = [
  { src: "/images/aomori-1.webp", matched: false, alt: "aomori" },
  { src: "/images/aichi-1.webp", matched: false, alt: "aichi" },
  { src: "/images/akita-1.webp", matched: false, alt: "akita" },
  { src: "/images/aomori-1.webp", matched: false, alt: "aomori" },
  { src: "/images/chiba-1.webp", matched: false, alt: "chiba" },
  { src: "/images/Ehime-1.webp", matched: false, alt: "ehime" },
  { src: "/images/fukui-1.webp", matched: false, alt: "fukui" },
  { src: "/images/fukuoka-1.webp", matched: false, alt: "fukuoka" },
  { src: "/images/fukushima-1.webp", matched: false, alt: "fukushima" },
  { src: "/images/gifu-1.webp", matched: false, alt: "gifu" },
  { src: "/images/gunma-1.webp", matched: false, alt: "gunma" },
  { src: "/images/hiroshima-1.webp", matched: false, alt: "hiroshima" },
  { src: "/images/hokkaido-1.webp", matched: false, alt: "hokkaido" },
  { src: "/images/hyogo-1.webp", matched: false, alt: "hyogo" },
  { src: "/images/ibaraki-1.webp", matched: false, alt: "ibaraki" },
  { src: "/images/ishikawa-1.webp", matched: false, alt: "ishikawa" },
  { src: "/images/iwate-1.webp", matched: false, alt: "iwate" },
  { src: "/images/kagawa-1.webp", matched: false, alt: "kagawa" },
  { src: "/images/kagoshima-1.webp", matched: false, alt: "kagoshima" },
  { src: "/images/kanagawa-1.webp", matched: false, alt: "kanagawa" },
  { src: "/images/kochi-1.webp", matched: false, alt: "kochi" },
  { src: "/images/kumamoto-1.webp", matched: false, alt: "kumamoto" },
  { src: "/images/kyoto-1.webp", matched: false, alt: "kyoto" },
  { src: "/images/miyagi-1.webp", matched: false, alt: "miyagi" },
  { src: "/images/mie-1.webp", matched: false, alt: "mie" },
  { src: "/images/miyazaki-1.webp", matched: false, alt: "miyazaki" },
  { src: "/images/nagano-1.webp", matched: false, alt: "nagano" },
  { src: "/images/nagasaki-1.webp", matched: false, alt: "nagasaki" },
  { src: "/images/nara-1.webp", matched: false, alt: "nara" },
  { src: "/images/niigata-1.webp", matched: false, alt: "niigata" },
  { src: "/images/oita-1.webp", matched: false, alt: "oita" },
  { src: "/images/okayama-1.webp", matched: false, alt: "okayama" },
  { src: "/images/okinawa-1.webp", matched: false, alt: "okinawa" },
  { src: "/images/osaka-1.webp", matched: false, alt: "osaka" },
  { src: "/images/saga-1.webp", matched: false, alt: "saga" },
  { src: "/images/saitama-1.webp", matched: false, alt: "saitama" },
  { src: "/images/shiga-1.webp", matched: false, alt: "shiga" },
  { src: "/images/shimane-1.webp", matched: false, alt: "shimane" },
  { src: "/images/shizuoka-1.webp", matched: false, alt: "shizuoka" },
  { src: "/images/tochigi-1.webp", matched: false, alt: "tochigi" },
  { src: "/images/tokushima-1.webp", matched: false, alt: "tokushima" },
  { src: "/images/tokyo-1.webp", matched: false, alt: "tokyo" },
  { src: "/images/tottori-1.webp", matched: false, alt: "tottori" },
  { src: "/images/toyama-1.webp", matched: false, alt: "toyama" },
  { src: "/images/wakayama-1.webp", matched: false, alt: "wakayama" },
  { src: "/images/yamagata-1.webp", matched: false, alt: "yamagata" },
  { src: "/images/yamaguchi-1.webp", matched: false, alt: "yamaguchi" },
  { src: "/images/yamanashi-1.webp", matched: false, alt: "yamanashi" },
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
      .slice(0, 2);
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
              playPause();
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
        setTimeout(resetTurn, 1000);
      }
    }
  }, [choice1, choice2]);

  const checkConfeti = () => {
    console.log(matchedCount);
    if (matchedCount === cards.length * 2 && started) {
      console.log("confetti");
      console.log(cards.length);
      console.log(matchedCount);
      playPause();
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
  let audio = new Audio(song);

  // Set initial state of song
  const [isPlaying, setIsPlaying] = useState(false);

  // Main function to handle both play and pause operations
  const playPause = () => {
    if (isPlaying) {
      // Pause the song if it is playing
      audio.pause();
    } else {
      // Play the song if it is paused
      audio.play();
    }

    // Change the state of song
    setIsPlaying(!isPlaying);
  };

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
