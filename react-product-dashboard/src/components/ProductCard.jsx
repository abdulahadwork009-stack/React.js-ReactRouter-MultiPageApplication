import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { id, title, price, category, thumbnail } = product;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-plum-100 transition-colors hover:ring-plum-300">
      <div className="aspect-square bg-plum-100/60">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="size-full object-contain p-4"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="w-fit rounded-full bg-plum-100 px-2.5 py-1 text-xs font-semibold capitalize text-plum-700">
          {category.replace(/-/g, " ")}
        </span>

        <h2 className="mt-3 line-clamp-2 min-h-[2.75rem] font-semibold leading-snug">
          {title}
        </h2>

        <p className="mt-2 font-display text-2xl font-bold">${price.toFixed(2)}</p>

        <button
          type="button"
          onClick={() => navigate(`/products/${id}`)}
          className="mt-4 rounded-full bg-plum-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-plum-700"
        >
          View Details
        </button>
      </div>
    </article>
  );
}