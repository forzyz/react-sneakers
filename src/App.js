import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCardOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get(
        "https://64bc29517b33a35a444716cb.mockapi.io/cart"
      );
      const favoritesResponse = await axios.get(
        "https://64be546a5ee688b6250c34f2.mockapi.io/favorites"
      );
      const itemsResponse = await axios.get(
        "https://64bc29517b33a35a444716cb.mockapi.io/items"
      );

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCard = (obj) => {
    try {
      if (!cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.post("https://64bc29517b33a35a444716cb.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, obj]);
      } else {
        axios.delete(
          `https://64bc29517b33a35a444716cb.mockapi.io/cart/${obj.id}`
        );
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      }
    } catch (err) {
      alert("Failed to add card");
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

  const isItemAdded = (id) => {
    return cartItems.some((obj) => obj.id === id);
  };

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded }}>
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
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCard={onAddToCard}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/favorites"
            exact
            element={<Favorites onAddToFavorite={onAddToFavorite} />}
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
