import { NavLink } from "react-router-dom";

const dashboardLinks = [
  { to: "/dashboard/profile", label: "Profile" },
  { to: "/dashboard/settings", label: "Settings" },
];

const getLinkClasses = ({ isActive }) =>
  `block whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
    isActive ? "bg-marigold text-plum-900" : "text-plum-700 hover:bg-plum-100"
  }`;

export default function DashboardNav() {
  return (
    <nav aria-label="Dashboard" className="md:sticky md:top-24 md:self-start">
      <ul className="flex gap-2 overflow-x-auto md:flex-col">
        {dashboardLinks.map((link) => (
          <li key={link.to}>
            <NavLink to={link.to} className={getLinkClasses}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}