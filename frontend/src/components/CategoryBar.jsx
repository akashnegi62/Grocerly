import { useRef } from "react";
import { Link } from "react-router-dom";
import bag from "../assets/Images/bag.webp";

import All from "../assets/Images/all.webp";
import Fruits from "../assets/Images/fruits.png";
import Dairy from "../assets/Images/dairy.png";
import Packaged from "../assets/Images/package.png";
import IceCream from "../assets/Images/ice.png";
import Rice from "../assets/Images/rice.png";

const categories = [
  {
    name: "All Products",
    img: All,
  },
  {
    name: "Fruits & Vegetables",
    img: Fruits,
  },
  {
    name: "Dairy, Bread & Eggs",
    img: Dairy,
  },
  {
    name: "Atta, Rice, Oil & Dals",
    img: Rice,
  },
  {
    name: "Packaged Food",
    img: Packaged,
  },
  {
    name: "Ice Creams & More",
    img: IceCream,
  },
];

export default function CategoryBar() {
  const productRef = useRef(null);
  return (
    <section className="bg-gray-50">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="relative overflow-hidden rounded-3xl bg-teal-800 text-white grid grid-cols-1 md:grid-cols-2 items-center p-8">
          <div>
            <h2 className="text-4xl font-bold leading-tight">
              We bring the store
              <br />
              to your door
            </h2>
            <p className="mt-4 text-sm text-teal-100 max-w-md">
              Get organic produce and sustainably sourced groceries delivery at
              up to 20% off grocery.
            </p>
            <button
              onClick={() =>
                productRef.current.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-6 bg-lime-300 text-black font-semibold px-6 py-3 rounded-xl cursor-pointer"
            >
              Shop now
            </button>
          </div>
          <div className="image_container hidden md:flex justify-end">
            <img className="h-full w-full object-contain" src={bag} alt="" />
          </div>
        </div>
      </section>

      <div
        ref={productRef}
        className="max-w-7xl mx-auto flex gap-8 overflow-x-auto px-4 py-4 text-sm font-medium"
      >
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/category/${encodeURIComponent(cat.name)}`}
            className="flex flex-col items-center min-w-24 cursor-pointer"
          >
            <div className="w-30 h-30 rounded-2xl bg-gray-100 mb-2 overflow-hidden">
              <img className="object-cover" src={cat.img} alt="" />
            </div>
            <span className="text-center text-gray-700 leading-tight">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
