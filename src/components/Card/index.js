import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";

function Card({
  id,
  imageUrl,
  title,
  price,
  onClickFavorite,
  onClickPlus,
  favorited = false,
  isAdded = false,
  isLoading = false,
}) {
  const [isChecked, setIsChecked] = React.useState(isAdded);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const handleClickPlus = () => {
    onClickPlus({ id, imageUrl, title, price });
    setIsChecked(!isChecked);
  };

  const handleClickFavorite = () => {
    onClickFavorite({ id, imageUrl, title, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {isLoading ? (
        <ContentLoader 
        speed={2}
        width={210}
        height={293}
        viewBox="0 0 210 293"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        
      >
        <rect x="0" y="6" rx="10" ry="10" width="150" height="112" /> 
        <rect x="0" y="139" rx="3" ry="3" width="150" height="15" /> 
        <rect x="0" y="203" rx="8" ry="8" width="80" height="25" /> 
        <rect x="118" y="198" rx="8" ry="8" width="32" height="32" /> 
        <rect x="0" y="165" rx="3" ry="3" width="93" height="15" />
      </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite} onClick={handleClickFavorite}>
            <img
              src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}
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
              src={isChecked ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
              alt="Plus"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
