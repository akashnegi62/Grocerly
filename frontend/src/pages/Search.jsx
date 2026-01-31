/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import bag from "../assets/Images/bag.webp";

export default function Search() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [loading, setLoading] = useState(true);
  const productRef = useRef(null);

  // FETCH ALL PRODUCTS ONCE
  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:3000/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // FILTER WHEN QUERY CHANGES
  useEffect(() => {
    if (!query) {
      setFiltered(products);
    } else {
      const q = query.toLowerCase();
      setFiltered(products.filter((p) => p.name.toLowerCase().includes(q)));
    }
  }, [query, products]);

  return (
    <>
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="relative overflow-hidden rounded-3xl bg-teal-800 text-white grid grid-cols-1 md:grid-cols-2 items-center p-8">
          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Search products
            </h2>
            <p className="mt-4 text-sm text-teal-100 max-w-md">
              Fresh groceries, daily essentials & more delivered to your
              doorstep with up to 20% off grocery.
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

      {/* Products */}
      <section ref={productRef} className="max-w-7xl mx-auto px-4 py-10">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
