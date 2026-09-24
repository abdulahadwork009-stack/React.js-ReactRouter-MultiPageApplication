import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";

const PRODUCTS_URL =
  "https://dummyjson.com/products?limit=100&select=title,price,category,thumbnail";

const gridClasses = "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
const fieldClasses =
  "rounded-xl border border-plum-300 bg-white px-4 py-3 text-sm placeholder:text-plum-700/60";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [reloadCount, setReloadCount] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await fetch(PRODUCTS_URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        if (error.name === "AbortError") return;
        setErrorMessage("We couldn't load the products. Check your connection and try again.");
      }

      setIsLoading(false);
    }

    loadProducts();

    return () => controller.abort();
  }, [reloadCount]);

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort(),
    [products]
  );

  const visibleProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  let content;

  if (errorMessage) {
    content = (
      <div
        role="alert"
        className="mt-8 rounded-3xl bg-white px-6 py-16 text-center ring-1 ring-plum-100"
      >
        <h2 className="font-display text-2xl font-bold">Products didn't load</h2>
        <p className="mx-auto mt-2 max-w-md text-plum-700">{errorMessage}</p>
        <button
          type="button"
          onClick={() => setReloadCount((count) => count + 1)}
          className="mt-6 rounded-full bg-plum-900 px-6 py-3 text-sm font-semibold text-white hover:bg-plum-700"
        >
          Try again
        </button>
      </div>
    );
  } else if (isLoading) {
    content = (
      <div className={gridClasses}>
        {Array.from({ length: 8 }, (_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  } else if (visibleProducts.length === 0) {
    content = (
      <div className="mt-8 rounded-3xl bg-white px-6 py-16 text-center ring-1 ring-plum-100">
        <h2 className="font-display text-2xl font-bold">No products match</h2>
        <p className="mx-auto mt-2 max-w-md text-plum-700">
          Try a different word, or clear the filters to see the full catalogue.
        </p>
        <button
          type="button"
          onClick={clearFilters}
          className="mt-6 rounded-full bg-plum-900 px-6 py-3 text-sm font-semibold text-white hover:bg-plum-700"
        >
          Clear filters
        </button>
      </div>
    );
  } else {
    content = (
      <div className={gridClasses}>
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Products
        </h1>
        <p className="text-plum-700" aria-live="polite">
          {isLoading || errorMessage
            ? "\u00a0"
            : `Showing ${visibleProducts.length} of ${products.length} products`}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <input
            id="product-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search products by name"
            className={`w-full ${fieldClasses}`}
          />
        </div>

        <div className="sm:w-64">
          <label htmlFor="category-filter" className="sr-only">
            Filter by category
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className={`w-full capitalize ${fieldClasses}`}
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.replace(/-/g, " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {content}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-2xl bg-white ring-1 ring-plum-100 motion-safe:animate-pulse"
    >
      <div className="aspect-square bg-plum-100" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-20 rounded-full bg-plum-100" />
        <div className="h-4 w-3/4 rounded bg-plum-100" />
        <div className="h-7 w-1/3 rounded bg-plum-100" />
        <div className="h-10 w-full rounded-full bg-plum-100" />
      </div>
    </div>
  );
}