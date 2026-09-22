import { Outlet } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";

// Parent route: it draws the shared layout, and <Outlet /> shows the
// matching child route (Profile or Settings) inside it.
export default function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
        Dashboard
      </h1>
      <p className="mt-3 text-lg text-plum-700">Manage your account and preferences.</p>

      <div className="mt-10 grid gap-8 md:grid-cols-[13rem_1fr]">
        <DashboardNav />
        <section>
          <Outlet />
        </section>
      </div>
    </div>
  );
}