import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductDetails() {
  // useParams() reads the :id part of /products/:id
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "not-found" | "error"
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      setStatus("loading");
      setActiveImageIndex(0);

      try {
        const response = await fetch(
          `https://dummyjson.com/products/${encodeURIComponent(id)}`,
          { signal: controller.signal }
        );

        if (response.status === 404) {
          setStatus("not-found");
          return;
        }
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setProduct(data);
        setStatus("success");
      } catch (error) {
        if (error.name !== "AbortError") setStatus("error");
      }
    }

    loadProduct();

    return () => controller.abort();
  }, [id, reloadCount]);

  let content;

  if (status === "loading") {
    content = <DetailsSkeleton />;
  } else if (status === "not-found") {
    content = (
      <StatusMessage
        title="Product not found"
        message={`There is no product with the ID "${id}". Go back to the list and pick another one.`}
      />
    );
  } else if (status === "error") {
    content = (
      <StatusMessage
        title="This product didn't load"
        message="Check your connection and try again."
        actionLabel="Try again"
        onAction={() => setReloadCount((count) => count + 1)}
      />
    );
  } else if (product) {
    const gallery = product.images?.length ? product.images : [product.thumbnail];
    const mainImage = gallery[activeImageIndex] ?? gallery[0];
    const isInStock = product.stock > 0;

    const facts = [
      { label: "Shipping", value: product.shippingInformation },
      { label: "Warranty", value: product.warrantyInformation },
      { label: "Returns", value: product.returnPolicy },
    ].filter((fact) => fact.value);

    content = (
      <>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="aspect-square overflow-hidden rounded-3xl bg-plum-100/60">
              <img
                src={mainImage}
                alt={product.title}
                className="size-full object-contain p-6"
              />
            </div>

            {gallery.length > 1 && (
              <ul className="mt-4 flex gap-3 overflow-x-auto p-1">
                {gallery.map((imageUrl, index) => (
                  <li key={imageUrl}>
                    <button
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      aria-label={`Show image ${index + 1} of ${gallery.length}`}
                      aria-current={index === activeImageIndex}
                      className={`size-20 shrink-0 overflow-hidden rounded-xl bg-plum-100/60 ring-2 transition-colors ${
                        index === activeImageIndex
                          ? "ring-plum-900"
                          : "ring-transparent hover:ring-plum-300"
                      }`}
                    >
                      <img
                        src={imageUrl}
                        alt=""
                        className="size-full object-contain p-1.5"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-marigold px-3 py-1 text-sm font-semibold capitalize">
                {product.category.replace(/-/g, " ")}
              </span>
              {product.brand && (
                <span className="text-sm font-medium text-plum-700">by {product.brand}</span>
              )}
            </div>

            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              {product.title}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <StarRating rating={product.rating} size="size-5" />
              <span className="text-sm font-semibold">{product.rating.toFixed(1)}</span>
              {product.reviews && (
                <span className="text-sm text-plum-700">
                  ({product.reviews.length} reviews)
                </span>
              )}
            </div>

            <p className="mt-6 font-display text-4xl font-bold">
              ${product.price.toFixed(2)}
            </p>
            <p
              className={`mt-2 text-sm font-semibold ${isInStock ? "text-leaf" : "text-chili"}`}
            >
              {isInStock ? `In stock (${product.stock} left)` : "Out of stock"}
            </p>

            <p className="mt-6 max-w-prose leading-relaxed text-plum-700">
              {product.description}
            </p>

            {facts.length > 0 && (
              <dl className="mt-8 divide-y divide-plum-100 border-y border-plum-100 text-sm">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex justify-between gap-6 py-3">
                    <dt className="font-semibold">{fact.label}</dt>
                    <dd className="text-right text-plum-700">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>

        {product.reviews?.length > 0 && (
          <section className="mt-16 max-w-3xl">
            <h2 className="font-display text-2xl font-bold">What customers say</h2>
            <ul className="mt-4 divide-y divide-plum-100 border-y border-plum-100">
              {product.reviews.map((review) => (
                <li
                  key={`${review.reviewerEmail}-${review.date}`}
                  className="py-5"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <p className="font-semibold">{review.reviewerName}</p>
                    <StarRating rating={review.rating} />
                    <p className="text-sm text-plum-700">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <p className="mt-2 text-plum-700">{review.comment}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <button
        type="button"
        onClick={() => navigate("/products")}
        className="inline-flex items-center gap-2 rounded-full border border-plum-300 bg-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-plum-100"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 5l-7 7 7 7" />
        </svg>
        Back to Products
      </button>

      <div className="mt-8">{content}</div>
    </div>
  );
}

function StatusMessage({ title, message, actionLabel, onAction }) {
  return (
    <div
      role="status"
      className="rounded-3xl bg-white px-6 py-16 text-center ring-1 ring-plum-100"
    >
      <h1 className="font-display text-3xl font-bold">{title}</h1>
      <p className="mx-auto mt-3 max-w-md text-plum-700">{message}</p>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 rounded-full bg-plum-900 px-6 py-3 text-sm font-semibold text-white hover:bg-plum-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

function DetailsSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid gap-10 motion-safe:animate-pulse lg:grid-cols-2 lg:gap-14"
    >
      <div className="aspect-square rounded-3xl bg-plum-100" />
      <div className="space-y-4">
        <div className="h-7 w-32 rounded-full bg-plum-100" />
        <div className="h-12 w-4/5 rounded-xl bg-plum-100" />
        <div className="h-5 w-40 rounded bg-plum-100" />
        <div className="h-10 w-32 rounded bg-plum-100" />
        <div className="h-24 w-full rounded-xl bg-plum-100" />
      </div>
    </div>
  );
}

function StarRating({ rating = 0, size = "size-4" }) {
  const roundedRating = Math.round(rating);

  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`Rated ${rating.toFixed(1)} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 20 20"
          className={`${size} ${star <= roundedRating ? "fill-marigold" : "fill-plum-300"}`}
          aria-hidden="true"
        >
          <path d="M10 1.5l2.62 5.31 5.86.85-4.24 4.13 1 5.84L10 14.88l-5.24 2.75 1-5.84L1.52 7.66l5.86-.85L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}