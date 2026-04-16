"use client";

import { useState } from "react";
import { Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";

import { sendQuote } from "@/app/actions/sendQuote";

interface FormData {
  name: string;
  phone: string;
  make: string;
  model: string;
  rego: string;
  service: string;
  message: string;
}

const SERVICES = [
  "Oil / Filters",
  "Parts",
  "Brakes",
  "Other",
];

const empty: FormData = {
  name: "", phone: "", make: "", model: "",
  rego: "", service: "", message: "",
};

export default function QuoteForm() {
  const [form, setForm]           = useState<FormData>(empty);
  const [errors, setErrors]       = useState<Partial<FormData>>({});
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  function validate() {
    const e: Partial<FormData> = {};
    if (!form.name.trim())  e.name  = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.make.trim())  e.make  = "Required";
    if (!form.model.trim()) e.model = "Required";
    if (!form.rego.trim())  e.rego  = "Required";
    return e;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
    setServerError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    const result = await sendQuote(form);
    setLoading(false);

    if (result.ok) {
      setSubmitted(true);
    } else {
      setServerError(result.error ?? "Something went wrong. Please try again.");
    }
  }

/* ── Success state ── */
  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-8 sm:p-10 text-center flex flex-col items-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-extrabold text-[#0A0A0A] mb-2">Request sent!</h3>
        <p className="text-gray-500 text-sm mb-6 max-w-xs">
          We received your quote request and will get back to you as soon as possible.
        </p>
        <button
          onClick={() => { setForm(empty); setSubmitted(false); }}
          className="text-sm text-[#DC2626] font-semibold hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 sm:p-8 space-y-5"
    >
      <div>
        <h2 className="text-xl font-extrabold text-[#0A0A0A]">Request a Quote</h2>
        <p className="text-base text-gray-600 mt-1">
          Fill in your details and we&apos;ll get back to you shortly.
        </p>
      </div>

      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Name" required error={errors.name}>
          <input
            name="name" value={form.name} onChange={handleChange}
            placeholder="Your full name"
            className={input(!!errors.name)}
          />
        </Field>
        <Field label="Phone" required error={errors.phone}>
          <input
            name="phone" value={form.phone} onChange={handleChange}
            placeholder="04xx xxx xxx"
            className={input(!!errors.phone)}
          />
        </Field>
      </div>

      {/* Make + Model */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Make" required error={errors.make}>
          <input
            name="make" value={form.make} onChange={handleChange}
            placeholder="e.g. Toyota"
            className={input(!!errors.make)}
          />
        </Field>
        <Field label="Model" required error={errors.model}>
          <input
            name="model" value={form.model} onChange={handleChange}
            placeholder="e.g. HiLux"
            className={input(!!errors.model)}
          />
        </Field>
      </div>

      {/* Rego + Service */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Rego" required error={errors.rego}>
          <input
            name="rego" value={form.rego} onChange={handleChange}
            placeholder="e.g. ABC123"
            className={`${input(!!errors.rego)} uppercase`}
          />
        </Field>
        <Field label="Service needed" optional>
          <select
            name="service" value={form.service} onChange={handleChange}
            className={`${input(false)} text-gray-600`}
          >
            <option value="">Select a service...</option>
            {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
      </div>

      {/* Notes */}
      <Field label="Additional notes" optional>
        <textarea
          name="message" value={form.message} onChange={handleChange}
          rows={3}
          placeholder="Any extra details about your vehicle or service..."
          className={`${input(false)} resize-none`}
        />
      </Field>

      {/* Server error */}
      {serverError && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-[#DC2626]">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          {serverError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-[#DC2626] hover:bg-[#B91C1C] disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl transition-colors text-sm sm:text-base"
      >
        {loading
          ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
          : <><Send className="w-4 h-4" /> Send Quote Request</>
        }
      </button>

    </form>
  );
}

/* ── Helpers ── */
function Field({
  label, required, optional, error, children,
}: {
  label: string; required?: boolean; optional?: boolean;
  error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-[#0A0A0A]">
        {label}{" "}
        {required && <span className="text-[#DC2626]">*</span>}
        {optional && <span className="text-gray-400 font-normal">(optional)</span>}
      </label>
      {children}
      {error && <p className="text-xs text-[#DC2626]">{error}</p>}
    </div>
  );
}

function input(hasError: boolean) {
  return `w-full border rounded-lg px-4 py-2.5 text-sm placeholder:text-gray-300 focus:outline-none focus:border-[#DC2626] transition-colors ${
    hasError ? "border-[#DC2626] bg-red-50" : "border-gray-200"
  }`;
}
