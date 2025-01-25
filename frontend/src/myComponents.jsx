import { useState } from "react";


function Button() {
  const colors = ["red", "green", "blue"];
  const [colorIndex, setColorIndex] = useState(0);
  const onClickButton = () => {
    setColorIndex((colorIndex + 1) % colors.length);
  };
  return (
    <>
      <button
        className="primaryBtn"
        onClick={onClickButton}
        style={{ backgroundColor: colors[colorIndex] }}
      >
        {" "}
        Appuiyer pour changer de couleur{" "}
      </button>
      <h1>La couleur Actuelle est : {colors[colorIndex]}</h1>
      <h2>
        La couleur prochaine est : {colors[(colorIndex + 1) % colors.length]}
      </h2>
    </>
  );
}

export {  Button };
