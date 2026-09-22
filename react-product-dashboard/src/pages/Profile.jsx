const profile = {
  name: "Ali Raza",
  role: "Store manager",
  email: "ali.raza@example.com",
  store: "Bazaar Main Branch",
  memberSince: "March 2025",
};

const details = [
  { label: "Email", value: profile.email },
  { label: "Role", value: profile.role },
  { label: "Store", value: profile.store },
  { label: "Member since", value: profile.memberSince },
];

export default function Profile() {
  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div>
      <h2 className="font-display text-2xl font-bold">Profile</h2>

      <div className="mt-6 rounded-3xl bg-white p-6 ring-1 ring-plum-100 sm:p-8">
        <div className="flex items-center gap-4">
          <div
            aria-hidden="true"
            className="grid size-16 place-items-center rounded-full bg-marigold font-display text-2xl font-extrabold"
          >
            {initials}
          </div>
          <div>
            <p className="font-display text-2xl font-bold">{profile.name}</p>
            <p className="text-plum-700">{profile.role}</p>
          </div>
        </div>

        <dl className="mt-8 grid gap-x-8 gap-y-6 border-t border-plum-100 pt-6 sm:grid-cols-2">
          {details.map((detail) => (
            <div key={detail.label}>
              <dt className="text-sm font-semibold text-plum-700">{detail.label}</dt>
              <dd className="mt-1 break-words font-medium">{detail.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}