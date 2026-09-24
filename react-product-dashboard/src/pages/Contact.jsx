import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialFormData = { name: "", email: "", message: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(formData) {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Enter your name.";
  }

  if (!formData.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!emailPattern.test(formData.email.trim())) {
    errors.email = "Enter a valid email, like name@example.com.";
  }

  if (!formData.message.trim()) {
    errors.message = "Write a short message.";
  } else if (formData.message.trim().length < 10) {
    errors.message = "Add a little more detail (at least 10 characters).";
  }

  return errors;
}

const getInputClasses = (hasError) =>
  `mt-2 w-full rounded-xl border bg-white px-4 py-3 text-base placeholder:text-plum-700/50 ${
    hasError ? "border-chili" : "border-plum-300"
  }`;

export default function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const redirectTimer = useRef(null);

  useEffect(() => () => clearTimeout(redirectTimer.current), []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));

    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: "" }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSending(true);

    redirectTimer.current = setTimeout(() => {
      navigate("/", { state: { sentBy: formData.name.trim() } });
    }, 800);
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
      <div>
        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Contact us
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-plum-700">
          Have a question about a product or your account? Send us a message and we'll
          reply by email.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-3xl bg-white p-6 ring-1 ring-plum-100 sm:p-8"
      >
        <div>
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={getInputClasses(errors.name)}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-sm font-medium text-chili">
              {errors.name}
            </p>
          )}
        </div>

        <div className="mt-5">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={getInputClasses(errors.email)}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-sm font-medium text-chili">
              {errors.email}
            </p>
          )}
        </div>

        <div className="mt-5">
          <label htmlFor="message" className="font-semibold">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={getInputClasses(errors.message)}
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-sm font-medium text-chili">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSending}
          className="mt-6 w-full rounded-full bg-plum-900 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-plum-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSending ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
}