"use client";

import { useState, type FormEvent } from "react";
import { CONTACT } from "@/lib/site-data";

type Status = "idle" | "submitting" | "success" | "error";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const message = String(data.get("message") ?? "");

    if (!WEB3FORMS_KEY) {
      // Zero third-party dependency fallback: hand off to the visitor's own mail client.
      const subject = encodeURIComponent(`Website enquiry from ${name || "website visitor"}`);
      const body = encodeURIComponent(
        `${message}\n\n—\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "—"}`,
      );
      window.location.href = `mailto:${CONTACT.primaryEmail}?subject=${subject}&body=${body}`;
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Website enquiry from ${name || "website visitor"}`,
          from_name: name,
          name,
          email,
          phone,
          message,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-primary-200 bg-primary-50 p-6 text-primary-900">
        <p className="font-semibold">Thank you — your message is on its way.</p>
        <p className="mt-1 text-sm text-primary-800">
          {WEB3FORMS_KEY
            ? "We'll get back to you shortly."
            : "Your email app should have opened with your message pre-filled — send it from there to reach us."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-800">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-neutral-900 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-800">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-neutral-900 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-neutral-800">
          Phone <span className="text-neutral-400">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-neutral-900 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-800">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-neutral-900 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-accent-700">
          Something went wrong sending your message. Please try again, or email{" "}
          <a href={`mailto:${CONTACT.primaryEmail}`} className="underline">
            {CONTACT.primaryEmail}
          </a>{" "}
          directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-md bg-primary-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-900 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
