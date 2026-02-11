import Skeleton from "react-loading-skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm px-4 pt-6 pb-4">
      {/* IMAGE */}
      <Skeleton height={112} borderRadius={12} />

      {/* TITLE */}
      <div className="mt-4">
        <Skeleton height={14} width="80%" />
      </div>

      {/* WEIGHT */}
      <div className="mt-2">
        <Skeleton height={12} width="50%" />
      </div>

      {/* PRICE */}
      <div className="mt-4">
        <Skeleton height={28} width="40%" />
      </div>

      {/* BUTTON */}
      <div className="mt-5">
        <Skeleton height={48} borderRadius={12} />
      </div>
    </div>
  );
}
