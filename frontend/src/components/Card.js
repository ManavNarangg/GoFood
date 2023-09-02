import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useCart } from "./ContextReducer";

const Card = (props) => {
  let options = props.options;
  let priceOptions = Object.keys(options);
  let dispatch = useDispatch();
  let data = useCart();
  const priceref = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const handleAddCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        //size here means half or full. Here what we're doing is that if we are updating the quantity of item, like 2 to 3 etc then update, but if we're changing size of item(half to full or vice versa) then add the item to cart.
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: price,
          qty: qty,
        });
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: price,
          qty: qty,
          size: size,
        });
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      img: props.foodItem.img,
      price: price,
      qty: qty,
      size: size,
    });
  };

  let price = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceref.current.value);
  }, []);

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "400px" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "140px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100">
            <select
              className="m-1 h-100 bg-success rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6].map((optionValue) => (
                <option key={optionValue} value={optionValue}>
                  {optionValue}
                </option>
              ))}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              ref={priceref}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5">₹{price}/-</div>
          </div>
          <hr></hr>
          <button
            className="btn btn-success justify-center ms-2"
            onClick={handleAddCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
