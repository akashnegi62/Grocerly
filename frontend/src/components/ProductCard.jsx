import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { cartItems, addToCart, updateQty, decreaseQty } = useCart();

  // find product in cart
  const cartItem = cartItems.find((item) => item._id === product._id);

  const qty = cartItem?.qty || 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm px-4 pt-6 pb-4 flex flex-col items-center">
      {/* IMAGE */}
      <div
        className="h-28 w-full bg-gray-100 rounded-xl mb-4 overflow-hidden cursor-pointer"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          navigate(`/product/${product._id}`);
        }}
      >
        <img
          className="h-full w-full object-cover"
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* NAME */}
      <p className="text-sm font-semibold text-center">{product.name}</p>

      {/* WEIGHT */}
      <p className="font-semibold text-gray-400 mt-2">{product.weight}</p>

      {/* PRICE */}
      <p className="text-3xl font-bold text-teal-900 mt-4">₹{product.price}</p>

      {/* BUTTON */}

      {qty === 0 ? (
        /* ADD BUTTON */

        <button
          onClick={() => addToCart(product)}
          className="mt-5 w-full bg-teal-50 text-teal-900 py-3 rounded-xl text-xl font-bold cursor-pointer"
        >
          +
        </button>
      ) : (
        /* COUNTER BUTTON */

        <div className="mt-5 w-full bg-teal-50 text-teal-900 px-4 py-3 rounded-xl text-lg font-bold flex items-center justify-between">
          <button
            className="cursor-pointer px-2"
            onClick={() => decreaseQty(product._id)}
          >
            -
          </button>

          <span>{qty}</span>

          <button
            onClick={() => updateQty(product._id, qty + 1)}
            className="cursor-pointer px-2"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
