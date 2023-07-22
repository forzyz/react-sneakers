import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

const arr = [
  { imageUrl: "/img/sneakers/1.jpg", title: "Nike Blazer Mid Suede", price: 100 },
  { imageUrl: "/img/sneakers/2.jpg", title: "Nike Air Max 270", price: 120 },
  { imageUrl: "/img/sneakers/3.jpg", title: "Nike Blazer Mid Suede", price: 105 },
  { imageUrl: "/img/sneakers/4.jpg", title: "Puma X Aka Boku Future Rider", price: 110 },
];

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>All sneakers</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Search..." />
          </div>
        </div>

        <div className="d-flex">
          {
            arr.map((obj) => (
              <Card imageUrl={obj.imageUrl} title={obj.title} price={obj.price} onClick={() => { console.log(obj); }} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
