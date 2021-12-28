import "./Card.css";

const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <div className="front-div">
          <img className="front" src={card.src} alt={card.alt} />
        </div>
        <div className="back-div back">
          <img
            // className="back"
            src="/images/cover.jpg"
            onClick={handleClick}
            alt="card back"
            style={{
              height: "100%",
              width: "100%",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
