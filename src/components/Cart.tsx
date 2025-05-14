import React from "react";
import { useCart } from "./CartContext";

const Cart: React.FC = () => {
  const { cart } = useCart();

  return (
    <div className="cart">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="mb-2">
              {item.title} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;