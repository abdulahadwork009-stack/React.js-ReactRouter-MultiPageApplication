import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const HERO_PRODUCTS_URL =
  "https://dummyjson.com/products/category/smartphones?limit=3&select=title,price,thumbnail";

// Where each of the three product tiles sits on the yellow panel.
const tileLayouts = [
  "left-[5%] top-[5%] -rotate-6",
  "right-[5%] top-[30%] rotate-3",
  "left-[14%] bottom-[5%] -rotate-2",
];

const highlights = [
  {
    title: "Browse the catalogue",
    text: "Search 100 live products and narrow them down by category.",
    to: "/products",
    linkLabel: "Go to products",
  },
  {
    title: "Open any product",
    text: "Every product has its own page, built from the ID in the URL.",
    to: "/products/1",
    linkLabel: "See product 1",
  },
  {
    title: "Manage your account",
    text: "Your profile and settings sit side by side inside the dashboard.",
    to: "/dashboard",
    linkLabel: "Open dashboard",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const [heroProducts, setHeroProducts] = useState([]);
  const [sentBy, setSentBy] = useState(null);

  // The Contact page navigates here with { state: { sentBy: "Name" } }.
  // We read it once, show the banner, then clear the state so a refresh doesn't show it again.
  useEffect(() => {
    if (location.state?.sentBy) {
      setSentBy(location.state.sentBy);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

  // The product photos are decorative, so a failed request is ignored on purpose.
  useEffect(() => {
    const controller = new AbortController();

    fetch(HERO_PRODUCTS_URL, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => setHeroProducts(data.products))
      .catch(() => {});

    return () => controller.abort();
  }, []);

  // Show three empty tiles until the photos arrive.
  const tiles = heroProducts.length > 0 ? heroProducts.slice(0, 3) : [null, null, null];

  return (
    <div>
      {sentBy && (
        <div role="status" className="border-b border-leaf/20 bg-leaf/10">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 text-sm font-medium sm:px-6">
            <p>Thanks, {sentBy}. Your message was sent and we'll reply by email.</p>
            <button
              type="button"
              onClick={() => setSentBy(null)}
              className="rounded-full px-3 py-1 font-semibold hover:bg-leaf/10"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
        <div>
          <h1 className="font-display font-extrabold leading-[0.95] tracking-tight">
            <span className="block text-6xl sm:text-7xl lg:text-8xl">Bazaar</span>
            <span className="mt-3 block text-3xl text-plum-700 sm:text-4xl">
              Product Dashboard
            </span>
          </h1>

          <p className="mt-8 max-w-md text-lg leading-relaxed text-plum-700">
            Browse a live catalogue, open any product, send us a message and manage your
            account. Every page opens instantly, with no browser reload.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="rounded-full bg-plum-900 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-plum-700"
            >
              View Products
            </button>
            <Link
              to="/dashboard"
              className="rounded-full border border-plum-300 px-7 py-3.5 text-base font-semibold transition-colors hover:bg-plum-100"
            >
              Open dashboard
            </Link>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-md rounded-[2.5rem] bg-marigold">
          {tiles.map((product, index) => (
            <div
              key={product?.id ?? index}
              className={`absolute w-[54%] rounded-2xl bg-white p-3 shadow-xl shadow-plum-900/20 ${tileLayouts[index]}`}
            >
              <div className="aspect-square rounded-xl bg-plum-50">
                {product && (
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="size-full object-contain p-2"
                  />
                )}
              </div>
              <div className="mt-3 flex min-h-5 items-baseline justify-between gap-2">
                <p className="truncate text-sm font-semibold">{product?.title}</p>
                <p className="font-display text-sm font-bold">
                  {product ? `$${product.price.toFixed(2)}` : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 border-t border-plum-300 pt-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-plum-100">
          {highlights.map((item) => (
            <div key={item.to} className="md:px-8 md:first:pl-0 md:last:pr-0">
              <h2 className="font-display text-xl font-bold">{item.title}</h2>
              <p className="mt-2 leading-relaxed text-plum-700">{item.text}</p>
              <Link
                to={item.to}
                className="mt-4 inline-block text-sm font-semibold underline decoration-marigold decoration-2 underline-offset-4 hover:decoration-plum-900"
              >
                {item.linkLabel}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}