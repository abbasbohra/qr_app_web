const FEATURES = [
  {
    icon: "🎬",
    title: "Watch & Earn Credits",
    desc: "Watch a short rewarded video to earn 1 credit. New users start with 100 free credits.",
  },
  {
    icon: "🔳",
    title: "16 QR Templates",
    desc: "Personal, business card, hotel menu, Wi-Fi, resume, pet ID, medical emergency, and more.",
  },
  {
    icon: "📤",
    title: "Share Anywhere",
    desc: "Send via WhatsApp, email, or save to your gallery with a single tap.",
  },
  {
    icon: "📇",
    title: "No App to Scan",
    desc: "Anyone with a phone camera can scan and view your profile in any browser.",
  },
  {
    icon: "🔒",
    title: "Your Data, Your Control",
    desc: "Your profile stays on your device unless you choose to share it.",
  },
  {
    icon: "🔔",
    title: "Push Notifications",
    desc: "Get notified the moment your QR codes are created, or when we have news.",
  },
];

const TEMPLATES = [
  { emoji: "👤", label: "Personal Info" },
  { emoji: "💼", label: "Business Card" },
  { emoji: "🍽️", label: "Hotel Menu" },
  { emoji: "🛒", label: "Local Shop" },
  { emoji: "🌳", label: "Family Tree" },
  { emoji: "🎉", label: "Event Invite" },
  { emoji: "📶", label: "Wi-Fi Access" },
  { emoji: "✏️", label: "Custom QR" },
  { emoji: "🍕", label: "Restaurant Order" },
  { emoji: "🐾", label: "Pet ID Card" },
  { emoji: "🚗", label: "Vehicle Info" },
  { emoji: "🩺", label: "Medical Emergency" },
  { emoji: "🔗", label: "Social Profile" },
  { emoji: "📦", label: "Product Info" },
  { emoji: "📄", label: "Resume" },
  { emoji: "📅", label: "Appointment" },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ──────────────────────────── */}
      <header className="hero">
        <div className="hero-inner">
          <div>
            <span className="badge">
              <span className="dot" />
              Now with 16 QR templates
            </span>
            <h1>
              Share your profile with
              <span className="gradient"> one scan</span>
            </h1>
            <p className="lead">
              Create QR codes with your contact details, business card, hotel
              menu, Wi-Fi password, and more. Anyone with a phone camera can
              scan — no app needed.
            </p>
            <div className="cta-row">
              <a href="#download" className="btn btn-primary">
                📱 Download TapCard
              </a>
              <a href="#features" className="btn btn-ghost">
                Explore features →
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="qr-card">
              <div className="qr-svg" />
              <div className="qr-name">Alex Morgan</div>
              <div className="qr-role">Product Designer</div>
            </div>
            <div className="pill pill-a">📇 Add to Contacts</div>
            <div className="pill pill-b">🔒 Your data stays private</div>
          </div>
        </div>
      </header>

      {/* ── FEATURES ──────────────────────── */}
      <section className="section features" id="features">
        <div className="section-inner">
          <div className="section-head">
            <span className="kicker">Features</span>
            <h2>Everything you need in one app</h2>
            <p>
              From a simple contact card to a full hotel menu — TapCard covers
              every use case with style.
            </p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div className="feature" key={f.title}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATES ─────────────────────── */}
      <section className="section" id="templates">
        <div className="section-inner">
          <div className="section-head">
            <span className="kicker">Templates</span>
            <h2>Pick a template, make it yours</h2>
            <p>
              Every template comes with its own fields, colors, and icon — ready
              to customize in seconds.
            </p>
          </div>
          <div className="template-grid">
            {TEMPLATES.map((t) => (
              <div className="template-chip" key={t.label}>
                <span className="emoji">{t.emoji}</span>
                {t.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEPS ─────────────────────────── */}
      <section className="section steps">
        <div className="section-inner">
          <div className="section-head">
            <span className="kicker">How it works</span>
            <h2>Three steps. Done in a minute.</h2>
          </div>
          <div className="steps-grid">
            <div className="step">
              <div className="num">1</div>
              <h3>Watch an Ad</h3>
              <p>Tap "Watch Ad" and get 1 credit after the video ends.</p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <h3>Create a QR</h3>
              <p>Pick a template, fill in your details, and generate.</p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <h3>Share &amp; Scan</h3>
              <p>Share your QR. Anyone can scan it to view your profile.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DOWNLOAD ──────────────────────── */}
      <section className="download" id="download">
        <div className="section-inner">
          <h2>Get TapCard</h2>
          <p>Available soon on Android. iOS coming next.</p>
          <a
            href="#"
            className="store-btn"
            onClick={(e) => e.preventDefault()}
            aria-disabled="true"
          >
            ▶ Google Play
            <span className="badge-sm">Coming soon</span>
          </a>
        </div>
      </section>
    </>
  );
}
