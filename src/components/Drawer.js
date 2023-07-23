function Drawer({ items = [], onClose, onRemove }) {
  return (
    <div className="overlay">
      <div className="drawer d-flex flex-column">
        <h2 className="d-flex justify-between mb-30">
          Cart
          <img
            className="cu-p"
            src="/img/btn-remove.svg"
            alt="Close"
            onClick={onClose}
          />
        </h2>

        {items.length > 0 ? (
          <div>
            <div className="items">
              {items.map((obj) => (
                <div className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20 item-title">
                    <p className="mb-5">{obj.title}</p>
                    <b>${obj.price}</b>
                  </div>
                  <img
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                    onClick={() => onRemove(obj.id)}
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Total:</span>
                  <div></div>
                  <b>$205</b>
                </li>
                <li>
                  <span>Tax 5%:</span>
                  <div></div>
                  <b>$20</b>
                </li>
              </ul>
              <button className="greenButton">
                Checkout <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img
              className="mb-20"
              width={120}
              height={120}
              src="/img/empty-cart.jpg"
              alt="Empty cart"
            />
            <h2>Cart is empty</h2>
            <p className="opacity-6">
              Add at least one pair of sneakers to place an order.
            </p>
            <button className="greenButton">
              <img src="/img/arrow.svg" alt="Arrow" />
              Come Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;
