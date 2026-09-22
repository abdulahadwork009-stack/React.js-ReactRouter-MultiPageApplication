import { useState } from "react";

const settingOptions = [
  {
    key: "orderEmails",
    label: "Order emails",
    description: "Get an email when an order changes status.",
  },
  {
    key: "priceAlerts",
    label: "Price alerts",
    description: "Hear about it when a product you viewed drops in price.",
  },
  {
    key: "weeklySummary",
    label: "Weekly summary",
    description: "Receive a short summary of new products every Monday.",
  },
];

export default function Settings() {
  const [settings, setSettings] = useState({
    orderEmails: true,
    priceAlerts: false,
    weeklySummary: true,
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleToggle = (key) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
    setIsSaved(false);
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold">Settings</h2>

      <div className="mt-6 rounded-3xl bg-white px-6 py-2 ring-1 ring-plum-100 sm:px-8">
        <ul className="divide-y divide-plum-100">
          {settingOptions.map((option) => (
            <li key={option.key}>
              <Toggle
                label={option.label}
                description={option.description}
                checked={settings[option.key]}
                onChange={() => handleToggle(option.key)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => setIsSaved(true)}
          className="rounded-full bg-plum-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-plum-700"
        >
          Save changes
        </button>
        <p role="status" className="text-sm font-semibold text-leaf">
          {isSaved ? "Settings saved." : ""}
        </p>
      </div>
    </div>
  );
}

function Toggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-6 py-5">
      <div>
        <p className="font-semibold">{label}</p>
        <p className="mt-0.5 text-sm text-plum-700">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          checked ? "bg-plum-900" : "bg-plum-300"
        }`}
      >
        <span
          className={`absolute left-1 top-1 size-5 rounded-full transition-transform ${
            checked ? "translate-x-5 bg-white" : "bg-plum-900"
          }`}
        />
      </button>
    </div>
  );
}