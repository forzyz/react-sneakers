import React from "react";
import Card from "../components/Card";
import cardStyles from "../components/Card/Card.module.scss";
import ContentLoader from "react-content-loader";

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCard,
  isLoading,
}) {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return isLoading
      ? [...Array(12)].map((_, index) => (
          <div key={index} className={cardStyles.card}>
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
          </div>
        ))
      : filteredItems.map((item) => (
          <Card
            key={item.id}
            onClickFavorite={(obj) => onAddToFavorite(obj)}
            onClickPlus={(obj) => onAddToCard(obj)}
            {...item}
          />
        ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between">
        <h1>{searchValue ? `Search by: "${searchValue}"` : "All sneakers"}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="Clear"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
