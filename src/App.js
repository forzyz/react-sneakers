import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
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
    axios
      .get("https://64be546a5ee688b6250c34f2.mockapi.io/favorites")
      .then((res) => {
        setFavorites(res.data);
      });
  }, []);

  const onAddToCard = (obj) => {
    if (!cartItems.find((item) => item.id === obj.id)) {
      axios.post("https://64bc29517b33a35a444716cb.mockapi.io/cart", obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://64bc29517b33a35a444716cb.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    const { data } = await axios.get(
      "https://64be546a5ee688b6250c34f2.mockapi.io/favorites"
    );
    try {
      if (
        favorites.find((item) => item.id === obj.id) &&
        data.find((item) => item.id === obj.id)
      ) {
        axios.delete(
          `https://64be546a5ee688b6250c34f2.mockapi.io/favorites/${obj.id}`
        );
      } else if (!favorites.find((item) => item.id === obj.id)) {
        const { data } = await axios.post(
          "https://64be546a5ee688b6250c34f2.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      } else {
        axios.post(
          "https://64be546a5ee688b6250c34f2.mockapi.io/favorites",
          obj
        );
      }
    } catch (err) {
      alert("Failed to add to favorites");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCardOpened(false)}
          onRemove={onRemoveItem}
        />
      )}

      <Header onClickCart={() => setCardOpened(true)} />

      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCard={onAddToCard}
            />
          }
        />
        <Route
          path="/favorites"
          exact
          element={
            <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
