const routeMap = [
  { path: "/", page: "Home", detail: "Route and useNavigate() for the View Products button" },
  { path: "/home", page: "Redirect", detail: "Navigate sends visitors to /" },
  { path: "/products", page: "Products", detail: "Product list from the API, with useNavigate() on every card" },
  { path: "/products/:id", page: "Product Details", detail: "Dynamic route, with useParams() reading the ID" },
  { path: "/about", page: "About", detail: "Route, with NavLink showing the active page in the menu" },
  { path: "/contact", page: "Contact", detail: "Controlled form, with useNavigate() after a successful submit" },
  { path: "/dashboard", page: "Dashboard", detail: "Parent route with an Outlet, redirecting to /dashboard/profile" },
  { path: "/dashboard/profile", page: "Profile", detail: "Nested route" },
  { path: "/dashboard/settings", page: "Settings", detail: "Nested route, with a NavLink menu" },
  { path: "*", page: "Not Found", detail: "Catch-all route for URLs that don't exist" },
];

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          About Bazaar
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-plum-700">
          Bazaar is a practice project that shows how React Router turns a single React
          page into a full multi-page app. Links change the address and the content, and
          the browser never reloads.
        </p>
        <p className="mt-4 leading-relaxed text-plum-700">
          Product data comes from the free DummyJSON API. Everything else, from the
          search box to the dashboard, is plain React with hooks.
        </p>
      </div>

      <h2 className="mt-14 font-display text-2xl font-bold">Where each routing idea lives</h2>

      <div className="mt-5 overflow-x-auto rounded-2xl bg-white ring-1 ring-plum-100">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <caption className="sr-only">
            Routes in Bazaar and the React Router feature each one demonstrates
          </caption>
          <thead className="border-b border-plum-100 bg-plum-100/50">
            <tr>
              <th scope="col" className="px-5 py-3 font-semibold">Path</th>
              <th scope="col" className="px-5 py-3 font-semibold">Page</th>
              <th scope="col" className="px-5 py-3 font-semibold">What it demonstrates</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-plum-100">
            {routeMap.map((route) => (
              <tr key={route.path}>
                <td className="px-5 py-3">
                  <code className="rounded bg-plum-100 px-1.5 py-0.5 text-[0.8125rem]">
                    {route.path}
                  </code>
                </td>
                <td className="px-5 py-3 font-semibold">{route.page}</td>
                <td className="px-5 py-3 text-plum-700">{route.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}