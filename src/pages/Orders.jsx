import React from "react";
import Card from "../components/Card";
import axios from "axios";
import AppContext from "../context";
import { Loader } from "../components/Loader";

function Orders() {
  const { onAddToFavorite, onAddToCard } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://64be546a5ee688b6250c34f2.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (err) {
        alert("Error occured when get orders");
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between">
        <h1>My orders</h1>
      </div>

      <div className="d-flex flex-wrap">
        {isLoading
          ? [...Array(12)].map((_, index) => <Loader key={index} />)
          : orders.map((item, index) => (
              <Card
                key={item.id}
                {...item}
              />
            ))}
      </div>
    </div>
  );
}

export default Orders;
