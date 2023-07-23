import React from "react";
import axios from "axios";
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCardOpened] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("https://64bc29517b33a35a444716cb.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://64bc29517b33a35a444716cb.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
  }, []);

  const onAddToCard = (obj) => {
    axios.post("https://64bc29517b33a35a444716cb.mockapi.io/cart", obj);
    if (!cartItems.find((item) => item.title === obj.title)) {
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onRemoveItem = (id) => {
    // axios.delete(`https://64bc29517b33a35a444716cb.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
    
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onClose={() => setCardOpened(false)} onRemove={onRemoveItem} />
      )}
      <Header onClickCart={() => setCardOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between">
          <h1>
            {searchValue ? `Search by: "${searchValue}"` : "All sneakers"}
          </h1>
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

        <div className="d-flex flex-wrap">
          {items
            .filter((item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item, index) => (
              <Card
                key={index}
                imageUrl={item.imageUrl}
                title={item.title}
                price={item.price}
                onClickFavorite={() => {
                  console.log("Added to favorites");
                }}
                onClickPlus={(obj) => onAddToCard(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
