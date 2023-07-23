import React from "react";
import styles from "./Card.module.scss";

function Card({imageUrl, title, price, onClickFavorite, onClickPlus }) {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleClickPlus = () => {
    onClickPlus({ imageUrl, title, price });
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img src="/img/heart-unliked.svg" alt="unliked" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5 style={{ height: "30px", verticalAlign: "top" }}>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Price:</span>
          <b>${price}</b>
        </div>
        <img
          className={styles.plus}
          onClick={handleClickPlus}
          src={isChecked ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
          alt="Plus"
        />
      </div>
    </div>
  );
}

export default Card;
