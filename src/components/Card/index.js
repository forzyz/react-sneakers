import React from "react";
import styles from "./Card.module.scss";
import AppContext from "../../context";

function Card({
  id,
  imageUrl,
  title,
  price,
  onClickFavorite,
  onClickPlus,
}) {
  const { isItemAdded, isItemFavorited } = React.useContext(AppContext);

  const handleClickPlus = () => {
    onClickPlus({ id, imageUrl, title, price });
  };

  const handleClickFavorite = () => {
    onClickFavorite({ id, imageUrl, title, price });
  };

  return (
    <div className={styles.card}>
      {
        <>
          <div className={styles.favorite} onClick={handleClickFavorite}>
            <img
              src={isItemFavorited(id) ? "/img/liked.svg" : "/img/unliked.svg"}
              alt="unliked"
            />
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
              src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
              alt="Plus"
            />
          </div>
        </>
      }
    </div>
  );
}

export default Card;
