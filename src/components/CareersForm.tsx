"use client";

import { useState, type FormEvent } from "react";
import { CONTACT } from "@/lib/site-data";

type Status = "idle" | "submitting" | "success" | "error";

// Falls back to the general contact key if a dedicated careers key isn't set, so this works
// out of the box with the same Web3Forms account — see .env.example.
const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_CAREERS_ACCESS_KEY ??
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function CareersForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fileName, setFileName] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const role = String(data.get("role") ?? "");
    const message = String(data.get("message") ?? "");

    if (!WEB3FORMS_KEY) {
      const subject = encodeURIComponent(`Careers application from ${name || "a candidate"}`);
      const body = encodeURIComponent(
        `${message}\n\n—\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "—"}\nRole of interest: ${role || "—"}\n\n(Please attach your resume to this email before sending — it couldn't be attached automatically.)`,
      );
      window.location.href = `mailto:${CONTACT.primaryEmail}?subject=${subject}&body=${body}`;
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      data.set("access_key", WEB3FORMS_KEY);
      data.set("subject", `Careers application from ${name || "a candidate"}`);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        form.reset();
        setFileName(null);
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
        <p className="font-semibold">Thank you for your interest.</p>
        <p className="mt-1 text-sm text-primary-800">
          {WEB3FORMS_KEY
            ? "Your application has been sent — we'll be in touch if there's a fit."
            : "Your email app should have opened with your details pre-filled — attach your resume and send it from there to reach us."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      action="https://api.web3forms.com/submit"
      method="POST"
      encType="multipart/form-data"
      className="space-y-5"
    >
      <input type="hidden" name="access_key" value={WEB3FORMS_KEY ?? ""} />

      <div>
        <label htmlFor="c-name" className="block text-sm font-medium text-neutral-800">
          Name
        </label>
        <input
          id="c-name"
          name="name"
          type="text"
          required
          className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-neutral-900 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
        />
      </div>
      <div>
        <label htmlFor="c-email" className="block text-sm font-medium text-neutral-800">
          Email
        </label>
        <input
          id="c-email"
          name="email"
          type="email"
          required
          className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-neutral-900 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
        />
      </div>
      <div>
        <label htmlFor="c-phone" className="block text-sm font-medium text-neutral-800">
          Phone <span className="text-neutral-400">(optional)</span>
        </label>
        <input
          id="c-phone"
          name="phone"
          type="tel"
          className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-neutral-900 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
        />
      </div>
      <div>
        <label htmlFor="c-role" className="block text-sm font-medium text-neutral-800">
          Area you'd like to join <span className="text-neutral-400">(optional)</span>
        </label>
        <input
          id="c-role"
          name="role"
          type="text"
          placeholder="e.g. Field operations, Media & communication, Data & analytics"
          className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-neutral-900 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
        />
      </div>
      <div>
        <label htmlFor="c-message" className="block text-sm font-medium text-neutral-800">
          Tell us about yourself
        </label>
        <textarea
          id="c-message"
          name="message"
          required
          rows={5}
          className="mt-1.5 w-full rounded-md border border-neutral-300 px-3.5 py-2.5 text-neutral-900 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
        />
      </div>
      <div>
        <label htmlFor="c-resume" className="block text-sm font-medium text-neutral-800">
          Resume <span className="text-neutral-400">(optional, PDF preferred)</span>
        </label>
        <input
          id="c-resume"
          name="attachment"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          className="mt-1.5 block w-full text-sm text-neutral-600 file:mr-4 file:rounded-md file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
        />
        {fileName && <p className="mt-1 text-xs text-neutral-500">Selected: {fileName}</p>}
      </div>

      {status === "error" && (
        <p className="text-sm text-accent-700">
          Something went wrong sending your application. Please try again, or email{" "}
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
        {status === "submitting" ? "Sending…" : "Submit application"}
      </button>
    </form>
  );
}
