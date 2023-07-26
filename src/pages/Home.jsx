import Card from "../components/Card";

function Home({
  items,
  cartItems,
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
    return (isLoading ? [...Array(10)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onClickFavorite={(obj) => onAddToFavorite(obj)}
        onClickPlus={(obj) => onAddToCard(obj)}
        isAdded={cartItems.some((obj) => obj.id === item.id)}
        isLoading={isLoading}
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
