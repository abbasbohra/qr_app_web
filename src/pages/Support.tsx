import { useState } from "react";
import { apiCall } from "../lib/api";

const FAQS = [
  {
    q: "How do I earn credits?",
    a: 'Open the app and tap "Watch Ad" on the Home screen. After watching a full rewarded video, 1 credit is added. New users get 100 free credits on registration.',
  },
  {
    q: "How do I create a QR code?",
    a: 'Tap the "Create" tab, pick a template, fill in the fields, and tap Generate. Each QR costs 1 credit.',
  },
  {
    q: "Can I edit a QR after creating it?",
    a: 'Yes. Go to "My QRs", tap any QR to open it, and tap Edit. Changes are saved without spending another credit.',
  },
  {
    q: "My credits disappeared after reinstalling.",
    a: "Credits are tied to your TapCard account. Log back in with the same email and password to restore them.",
  },
  {
    q: "An ad didn't give me a credit.",
    a: "You must watch the full video until the close button appears. Try again on a stable internet connection.",
  },
  {
    q: "Does the person scanning need to install TapCard?",
    a: "No. The QR opens a web page in any browser. They don't need to install anything.",
  },
  {
    q: "How do I delete my account?",
    a: "Go to Profile → Delete Account in the app, or use the Delete Account page. Deletion is permanent.",
  },
];

export default function Support() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "Bug report",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errMsg, setErrMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.message.trim().length < 5) {
      setStatus("error");
      setErrMsg("Message must be at least 5 characters.");
      return;
    }
    setStatus("sending");
    setErrMsg("");
    try {
      await apiCall("support", form);
      setStatus("success");
      setForm({ name: "", email: "", topic: "Bug report", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrMsg(err?.message || "Failed to send. Please email us directly.");
    }
  };

  return (
    <div className="container">
      <h1>Support</h1>
      <p className="muted">We usually reply within 48 hours.</p>

      <h2>Frequently Asked Questions</h2>
      {FAQS.map((f, i) => (
        <details key={i}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}

      <h2>Still need help?</h2>
      <form onSubmit={submit} className="card">
        <div className="field">
          <label>Your Name *</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            maxLength={100}
          />
        </div>
        <div className="field">
          <label>Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            maxLength={200}
          />
        </div>
        <div className="field">
          <label>Topic *</label>
          <select
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
          >
            <option>Bug report</option>
            <option>Feature request</option>
            <option>Ad / reward issue</option>
            <option>Account problem</option>
            <option>QR code issue</option>
            <option>Other</option>
          </select>
        </div>
        <div className="field">
          <label>Message *</label>
          <textarea
            rows={6}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            maxLength={2000}
            placeholder="Describe your issue. Include your app version and device if it's a bug."
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>
        {status === "success" && (
          <p className="status-success">
            ✅ Message sent! We will reply within 48 hours.
          </p>
        )}
        {status === "error" && <p className="status-error">❌ {errMsg}</p>}
      </form>
    </div>
  );
}
