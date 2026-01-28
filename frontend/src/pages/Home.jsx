import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import CategoryBar from "../components/CategoryBar";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    fetch(`http://localhost:3000/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <CategoryBar />

      <section className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
        <h2 className="text-2xl font-bold mb-6">You might need</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {loading
            ? Array(10)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow p-3 space-y-3"
                  >
                    <Skeleton height={160} borderRadius={12} />
                    <Skeleton height={14} />
                    <Skeleton width="60%" height={14} />
                    <Skeleton height={36} borderRadius={8} />
                  </div>
                ))
            : products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      </section>
    </>
  );
}
