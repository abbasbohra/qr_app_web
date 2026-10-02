import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://tapcardss-api.netlify.app";

type Payload = {
  type: string;
  title: string;
  data: Record<string, any>;
};

// ══════════════════════════════════════════════════════
//  THEMES
// ══════════════════════════════════════════════════════
type Theme = {
  bg: string;
  color: string;
  gradient: string;
  accent: string;
  emoji: string;
};

const THEMES: Record<string, Theme> = {
  personal: {
    bg: "#dbeafe",
    color: "#2563eb",
    gradient: "linear-gradient(135deg,#3b82f6,#0d9488)",
    accent: "linear-gradient(90deg,#3b82f6,#0d9488)",
    emoji: "👤",
  },
  business: {
    bg: "#ccfbf1",
    color: "#0d9488",
    gradient: "linear-gradient(135deg,#14b8a6,#0d9488)",
    accent: "linear-gradient(90deg,#14b8a6,#0d9488)",
    emoji: "💼",
  },
  hotel_menu: {
    bg: "#ffedd5",
    color: "#c2410c",
    gradient: "linear-gradient(135deg,#fb923c,#c2410c)",
    accent: "linear-gradient(90deg,#fb923c,#c2410c)",
    emoji: "🍽️",
  },
  local_shop: {
    bg: "#dcfce7",
    color: "#16a34a",
    gradient: "linear-gradient(135deg,#22c55e,#15803d)",
    accent: "linear-gradient(90deg,#22c55e,#15803d)",
    emoji: "🛒",
  },
  family_tree: {
    bg: "#ede9fe",
    color: "#7c3aed",
    gradient: "linear-gradient(135deg,#a78bfa,#7c3aed)",
    accent: "linear-gradient(90deg,#a78bfa,#7c3aed)",
    emoji: "🌳",
  },
  event: {
    bg: "#fce7f3",
    color: "#db2777",
    gradient: "linear-gradient(135deg,#ec4899,#be185d)",
    accent: "linear-gradient(90deg,#ec4899,#be185d)",
    emoji: "🎉",
  },
  wifi: {
    bg: "#cffafe",
    color: "#0891b2",
    gradient: "linear-gradient(135deg,#06b6d4,#0e7490)",
    accent: "linear-gradient(90deg,#06b6d4,#0e7490)",
    emoji: "📶",
  },
  custom: {
    bg: "#e2e8f0",
    color: "#475569",
    gradient: "linear-gradient(135deg,#64748b,#334155)",
    accent: "linear-gradient(90deg,#64748b,#334155)",
    emoji: "✏️",
  },
  restaurant: {
    bg: "#fee2e2",
    color: "#dc2626",
    gradient: "linear-gradient(135deg,#ef4444,#dc2626)",
    accent: "linear-gradient(90deg,#ef4444,#dc2626)",
    emoji: "🍕",
  },
  pet_id: {
    bg: "#ffedd5",
    color: "#ea580c",
    gradient: "linear-gradient(135deg,#fb923c,#ea580c)",
    accent: "linear-gradient(90deg,#fb923c,#ea580c)",
    emoji: "🐾",
  },
  vehicle: {
    bg: "#cffafe",
    color: "#0891b2",
    gradient: "linear-gradient(135deg,#06b6d4,#0891b2)",
    accent: "linear-gradient(90deg,#06b6d4,#0891b2)",
    emoji: "🚗",
  },
  medical: {
    bg: "#fee2e2",
    color: "#dc2626",
    gradient: "linear-gradient(135deg,#ef4444,#991b1b)",
    accent: "linear-gradient(90deg,#ef4444,#991b1b)",
    emoji: "🩺",
  },
  social: {
    bg: "#ede9fe",
    color: "#7c3aed",
    gradient: "linear-gradient(135deg,#a78bfa,#7c3aed)",
    accent: "linear-gradient(90deg,#a78bfa,#7c3aed)",
    emoji: "🔗",
  },
  product: {
    bg: "#ccfbf1",
    color: "#0d9488",
    gradient: "linear-gradient(135deg,#14b8a6,#0d9488)",
    accent: "linear-gradient(90deg,#14b8a6,#0d9488)",
    emoji: "📦",
  },
  resume: {
    bg: "#dbeafe",
    color: "#1e40af",
    gradient: "linear-gradient(135deg,#3b82f6,#1e40af)",
    accent: "linear-gradient(90deg,#3b82f6,#1e40af)",
    emoji: "📄",
  },
  appointment: {
    bg: "#fed7aa",
    color: "#7c2d12",
    gradient: "linear-gradient(135deg,#f97316,#7c2d12)",
    accent: "linear-gradient(90deg,#f97316,#7c2d12)",
    emoji: "📅",
  },
  upi_payment: {
    bg: "#dbeafe",
    color: "#2563eb",
    gradient: "linear-gradient(135deg,#3b82f6,#1e40af)",
    accent: "linear-gradient(90deg,#3b82f6,#1e40af)",
    emoji: "💳",
  },
};

// ══════════════════════════════════════════════════════
//  HELPERS
// ══════════════════════════════════════════════════════
function initials(name: string) {
  if (!name) return "?";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function normalizeUrl(u?: string) {
  if (!u) return "";
  return u.startsWith("http") ? u : `https://${u}`;
}

function hasValue(v: any) {
  return v !== undefined && v !== null && v !== "" && v !== false;
}

// ══════════════════════════════════════════════════════
//  PRIMITIVES
// ══════════════════════════════════════════════════════
function Row({
  label,
  value,
  link,
}: {
  label: string;
  value?: any;
  link?: string;
}) {
  if (!hasValue(value)) return null;
  return (
    <div className="qv-row">
      <div className="qv-label">{label}</div>
      <div className="qv-value">
        {link ? <a href={link}>{String(value)}</a> : String(value)}
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  body,
  bg,
  color,
  border,
}: {
  icon: string;
  title: string;
  body?: any;
  bg: string;
  color: string;
  border: string;
}) {
  if (!hasValue(body)) return null;
  return (
    <div
      className="qv-section"
      style={{ background: bg, borderLeftColor: border }}
    >
      <div className="qv-section-title" style={{ color }}>
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      <div className="qv-section-body" style={{ color }}>
        {String(body)}
      </div>
    </div>
  );
}

function ActionButton({
  href,
  icon,
  label,
  variant = "primary",
  external = false,
}: {
  href?: string;
  icon: string;
  label: string;
  variant?: "primary" | "secondary" | "green" | "whatsapp" | "danger";
  external?: boolean;
}) {
  if (!href) return null;
  const cls = `qv-action ${variant === "primary" ? "" : variant}`.trim();
  return (
    <a
      className={cls}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="qv-action-icon">{icon}</span>
      <span>{label}</span>
    </a>
  );
}

function VCardLink({ p, name }: { p: Record<string, any>; name: string }) {
  const phone = p.phone || p.emergencyPhone || "";
  const email = p.email || "";
  const v = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${name}`,
    phone ? `TEL;TYPE=CELL:${phone}` : "",
    email ? `EMAIL:${email}` : "",
    p.company ? `ORG:${p.company}` : "",
    p.website ? `URL:${normalizeUrl(p.website)}` : "",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\n");
  const url = "data:text/vcard;charset=utf-8," + encodeURIComponent(v);
  return (
    <a
      className="qv-action secondary full"
      href={url}
      download={`${name.replace(/\s+/g, "_")}.vcf`}
    >
      <span className="qv-action-icon">💾</span>
      <span>Save to Contacts</span>
    </a>
  );
}

// ══════════════════════════════════════════════════════
//  RENDERERS
// ══════════════════════════════════════════════════════

function RenderPersonal({ p }: { p: Record<string, any> }) {
  const name = p.name || "Unknown";
  return (
    <>
      <div className="qv-actions">
        <ActionButton
          href={p.phone ? `tel:${p.phone}` : undefined}
          icon="📞"
          label="Call"
        />
        <ActionButton
          href={p.email ? `mailto:${p.email}` : undefined}
          icon="✉️"
          label="Email"
        />
        <VCardLink p={p} name={name} />
      </div>
      <div className="qv-info">
        <Row label="Phone" value={p.phone} link={`tel:${p.phone}`} />
        <Row label="Email" value={p.email} link={`mailto:${p.email}`} />
        <Row label="Website" value={p.website} link={normalizeUrl(p.website)} />
        <Row label="Company" value={p.company} />
        <Row label="Address" value={p.address} />
      </div>
      {hasValue(p.note) && <div className="qv-note">{p.note}</div>}
    </>
  );
}

function RenderBusiness({ p }: { p: Record<string, any> }) {
  const name = p.name || "Unknown";
  const wa = (p.whatsapp || "").replace(/[^\d]/g, "");
  return (
    <>
      <div className="qv-actions">
        <ActionButton
          href={p.phone ? `tel:${p.phone}` : undefined}
          icon="📞"
          label="Call"
        />
        <ActionButton
          href={p.email ? `mailto:${p.email}` : undefined}
          icon="✉️"
          label="Email"
        />
        <VCardLink p={p} name={name} />
      </div>
      <div className="qv-info">
        <Row label="Designation" value={p.designation} />
        <Row label="Company" value={p.company} />
        <Row label="Phone" value={p.phone} link={`tel:${p.phone}`} />
        <Row
          label="WhatsApp"
          value={p.whatsapp}
          link={wa ? `https://wa.me/${wa}` : undefined}
        />
        <Row label="Email" value={p.email} link={`mailto:${p.email}`} />
        <Row label="Website" value={p.website} link={normalizeUrl(p.website)} />
        <Row
          label="LinkedIn"
          value={p.linkedin}
          link={normalizeUrl(p.linkedin)}
        />
        <Row label="Address" value={p.address} />
      </div>
      {hasValue(p.note) && <div className="qv-note">{p.note}</div>}
    </>
  );
}

function RenderHotelMenu({ p }: { p: Record<string, any> }) {
  const items = Array.isArray(p.menuItems) ? p.menuItems : [];
  return (
    <>
      <div className="qv-info">
        <Row label="Phone" value={p.phone} link={`tel:${p.phone}`} />
        <Row
          label="WhatsApp"
          value={p.whatsapp}
          link={
            p.whatsapp
              ? `https://wa.me/${p.whatsapp.replace(/[^\d]/g, "")}`
              : undefined
          }
        />
        <Row label="Address" value={p.address} />
        <Row
          label="Order URL"
          value={p.orderUrl}
          link={normalizeUrl(p.orderUrl)}
        />
      </div>

      {items.length > 0 && (
        <div className="qv-menu-section">
          <div className="qv-menu-title">
            <span>📋</span>
            <span style={{ flex: 1 }}>Our Menu</span>
            <span className="qv-menu-count">
              {items.length} item{items.length > 1 ? "s" : ""}
            </span>
          </div>
          <div className="qv-menu-grid">
            {items.map((it: any, i: number) => (
              <div className="qv-menu-item" key={i}>
                <div className="qv-menu-image-wrap">
                  {it.image ? (
                    <img
                      className="qv-menu-image"
                      src={it.image}
                      alt={it.name || "Dish"}
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="qv-menu-placeholder">🍽️</div>
                  )}
                </div>
                <div className="qv-menu-body">
                  <div className="qv-menu-name">
                    {it.name || "Untitled dish"}
                  </div>
                  {it.price && <div className="qv-menu-price">{it.price}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasValue(p.note) && <div className="qv-note">{p.note}</div>}

      {p.phone && (
        <div className="qv-actions" style={{ marginTop: 16 }}>
          <ActionButton href={`tel:${p.phone}`} icon="📞" label="Call Hotel" />
        </div>
      )}
      {p.orderUrl && (
        <div className="qv-actions">
          <ActionButton
            href={normalizeUrl(p.orderUrl)}
            icon="🛵"
            label="Order Online"
            variant="green"
            external
          />
        </div>
      )}
    </>
  );
}

function RenderShop({ p }: { p: Record<string, any> }) {
  const wa = (p.whatsapp || "").replace(/[^\d]/g, "");
  return (
    <>
      <div className="qv-info">
        <Row label="Owner" value={p.owner} />
        <Row label="Phone" value={p.phone} link={`tel:${p.phone}`} />
        <Row
          label="WhatsApp"
          value={p.whatsapp}
          link={wa ? `https://wa.me/${wa}` : undefined}
        />
        <Row label="Address" value={p.address} />
        <Row label="Hours" value={p.hours} />
        <Row label="UPI ID" value={p.upiId} />
      </div>
      <Section
        icon="🛍️"
        title="Products"
        body={p.products}
        bg="#f0fdf4"
        color="#166534"
        border="#22c55e"
      />
      {hasValue(p.note) && <div className="qv-note">{p.note}</div>}
      {p.phone && (
        <div className="qv-actions" style={{ marginTop: 16 }}>
          <ActionButton href={`tel:${p.phone}`} icon="📞" label="Call Shop" />
        </div>
      )}
      {wa && (
        <div className="qv-actions">
          <ActionButton
            href={`https://wa.me/${wa}`}
            icon="💬"
            label="WhatsApp"
            variant="whatsapp"
            external
          />
        </div>
      )}
    </>
  );
}

function RenderFamily({ p }: { p: Record<string, any> }) {
  return (
    <>
      <div className="qv-info">
        <Row label="Contact" value={p.phone} link={`tel:${p.phone}`} />
        <Row label="Email" value={p.email} link={`mailto:${p.email}`} />
        <Row label="Address" value={p.address} />
        <Row label="Emergency" value={p.emergencyContact} />
      </div>
      <Section
        icon="👨‍👩‍👧"
        title="Members"
        body={p.members}
        bg="#f5f3ff"
        color="#5b21b6"
        border="#a78bfa"
      />
      {hasValue(p.note) && <div className="qv-note">{p.note}</div>}
    </>
  );
}

function RenderEvent({ p }: { p: Record<string, any> }) {
  const wa = (p.whatsapp || "").replace(/[^\d]/g, "");
  return (
    <>
      <div className="qv-info">
        <Row label="Date" value={p.date} />
        <Row label="Location" value={p.location} />
        <Row
          label="Maps"
          value={p.googleMapsUrl ? "Open in Maps" : ""}
          link={normalizeUrl(p.googleMapsUrl)}
        />
        <Row label="Host" value={p.host} />
        <Row label="RSVP" value={p.phone} link={`tel:${p.phone}`} />
        <Row
          label="WhatsApp"
          value={p.whatsapp}
          link={wa ? `https://wa.me/${wa}` : undefined}
        />
      </div>
      {hasValue(p.note) && <div className="qv-note">{p.note}</div>}
      <div className="qv-actions" style={{ marginTop: 16 }}>
        <ActionButton
          href={p.phone ? `tel:${p.phone}` : undefined}
          icon="📞"
          label="RSVP"
        />
      </div>
      <div className="qv-actions">
        <ActionButton
          href={p.googleMapsUrl ? normalizeUrl(p.googleMapsUrl) : undefined}
          icon="📍"
          label="Open Maps"
          variant="green"
          external
        />
      </div>
    </>
  );
}

function RenderWifi({ p }: { p: Record<string, any> }) {
  return (
    <>
      <div className="qv-wifi-card">
        <div className="qv-wifi-row">
          <div className="qv-wifi-label">Network</div>
          <div className="qv-wifi-value">{p.ssid || "—"}</div>
        </div>
        <div className="qv-wifi-row">
          <div className="qv-wifi-label">Password</div>
          <div className="qv-wifi-value">{p.password || "—"}</div>
        </div>
        {hasValue(p.encryption) && (
          <div className="qv-wifi-row">
            <div className="qv-wifi-label">Security</div>
            <div className="qv-wifi-value">{p.encryption}</div>
          </div>
        )}
      </div>
      {hasValue(p.note) && <div className="qv-note">{p.note}</div>}
    </>
  );
}

function RenderCustom({ p }: { p: Record<string, any> }) {
  return (
    <>
      {hasValue(p.body) && <div className="qv-note">{p.body}</div>}
      {hasValue(p.note) && <div className="qv-note">{p.note}</div>}
      <div className="qv-actions" style={{ marginTop: 16 }}>
        <ActionButton
          href={p.linkUrl ? normalizeUrl(p.linkUrl) : undefined}
          icon="🔗"
          label="Open Link"
          external
        />
      </div>
    </>
  );
}

function RenderRestaurant({ p }: { p: Record<string, any> }) {
  const wa = (p.whatsapp || "").replace(/[^\d]/g, "");
  return (
    <>
      <div className="qv-info">
        <Row label="Phone" value={p.phone} link={`tel:${p.phone}`} />
        <Row
          label="WhatsApp"
          value={p.whatsapp}
          link={wa ? `https://wa.me/${wa}` : undefined}
        />
        <Row
          label="Order URL"
          value={p.orderUrl}
          link={normalizeUrl(p.orderUrl)}
        />
        <Row label="Address" value={p.address} />
        <Row label="Hours" value={p.hours} />
      </div>
      {hasValue(p.note) && <div className="qv-note">{p.note}</div>}
      <div className="qv-actions" style={{ marginTop: 16 }}>
        <ActionButton
          href={p.phone ? `tel:${p.phone}` : undefined}
          icon="📞"
          label="Call to Order"
        />
      </div>
      <div className="qv-actions">
        <ActionButton
          href={wa ? `https://wa.me/${wa}` : undefined}
          icon="💬"
          label="WhatsApp Order"
          variant="whatsapp"
          external
        />
      </div>
      <div className="qv-actions">
        <ActionButton
          href={p.orderUrl ? normalizeUrl(p.orderUrl) : undefined}
          icon="🛵"
          label="Order Online"
          variant="green"
          external
        />
      </div>
    </>
  );
}

function RenderPetID({ p }: { p: Record<string, any> }) {
  const petName = p.petName || p.name || "Pet";
  return (
    <>
      {p.petPhotoUrl ? (
        <div className="qv-pet-hero">
          <img
            className="qv-pet-photo"
            src={p.petPhotoUrl}
            alt={petName}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="qv-pet-name">{petName}</div>
        </div>
      ) : (
        <div
          className="qv-hero-block"
          style={{ background: "#fff7ed", color: "#9a3412" }}
        >
          <div className="qv-hero-emoji">🐾</div>
          <div className="qv-hero-label">Pet</div>
          <div className="qv-hero-value">{petName}</div>
        </div>
      )}
      <div className="qv-info">
        <Row label="Species" value={p.species} />
        <Row label="Owner" value={p.ownerName} />
        <Row label="Phone" value={p.phone} link={`tel:${p.phone}`} />
        <Row label="Alt Phone" value={p.altPhone} link={`tel:${p.altPhone}`} />
        <Row label="Vet" value={p.vetPhone} link={`tel:${p.vetPhone}`} />
        <Row label="Address" value={p.address} />
      </div>
      <Section
        icon="🩺"
        title="Medical Info"
        body={p.note}
        bg="#fef2f2"
        color="#991b1b"
        border="#ef4444"
      />
      {p.phone && (
        <div className="qv-actions" style={{ marginTop: 16 }}>
          <ActionButton href={`tel:${p.phone}`} icon="📞" label="Call Owner" />
        </div>
      )}
      {p.altPhone && (
        <div className="qv-actions">
          <ActionButton
            href={`tel:${p.altPhone}`}
            icon="📞"
            label="Alt Phone"
            variant="secondary"
          />
        </div>
      )}
    </>
  );
}

function RenderVehicle({ p }: { p: Record<string, any> }) {
  return (
    <>
      {hasValue(p.vehicleNumber) && (
        <div className="qv-plate-wrap">
          <div className="qv-plate">{p.vehicleNumber}</div>
        </div>
      )}
      <div className="qv-info">
        <Row label="Owner" value={p.ownerName} />
        <Row label="Blood Group" value={p.bloodGroup} />
        <Row label="Phone" value={p.phone} link={`tel:${p.phone}`} />
        <Row label="Alt Phone" value={p.altPhone} link={`tel:${p.altPhone}`} />
        <Row label="Make & Model" value={p.model} />
      </div>
      <Section
        icon="🛡️"
        title="Insurance"
        body={p.insurance}
        bg="#ecfeff"
        color="#0e7490"
        border="#67e8f9"
      />
      {hasValue(p.note) && <div className="qv-note">{p.note}</div>}
      {p.phone && (
        <div className="qv-actions" style={{ marginTop: 16 }}>
          <ActionButton href={`tel:${p.phone}`} icon="📞" label="Call Owner" />
        </div>
      )}
    </>
  );
}

function RenderMedical({ p }: { p: Record<string, any> }) {
  return (
    <>
      {hasValue(p.bloodGroup) && (
        <div className="qv-blood-card">
          <div className="qv-blood-value">{p.bloodGroup}</div>
          <div className="qv-blood-label">Blood Group</div>
        </div>
      )}
      <div className="qv-info">
        <Row label="Name" value={p.name} />
        <Row label="Age" value={p.age} />
        <Row label="Address" value={p.address} />
      </div>
      <Section
        icon="⚠️"
        title="Allergies"
        body={p.allergies}
        bg="#fef2f2"
        color="#991b1b"
        border="#ef4444"
      />
      <Section
        icon="🩺"
        title="Conditions"
        body={p.conditions}
        bg="#fef2f2"
        color="#991b1b"
        border="#ef4444"
      />
      <Section
        icon="💊"
        title="Medications"
        body={p.medications}
        bg="#fef2f2"
        color="#991b1b"
        border="#ef4444"
      />
      <Section
        icon="📝"
        title="Notes"
        body={p.notes}
        bg="#fef2f2"
        color="#991b1b"
        border="#ef4444"
      />
      <div className="qv-info">
        <Row label="Emergency Contact" value={p.emergencyName} />
        <Row
          label="Emergency Phone"
          value={p.emergencyPhone}
          link={`tel:${p.emergencyPhone}`}
        />
        <Row
          label="Family Doctor"
          value={p.doctorPhone}
          link={`tel:${p.doctorPhone}`}
        />
      </div>
      {p.emergencyPhone && (
        <div className="qv-actions" style={{ marginTop: 16 }}>
          <ActionButton
            href={`tel:${p.emergencyPhone}`}
            icon="🚨"
            label="Call Emergency"
            variant="danger"
          />
        </div>
      )}
    </>
  );
}

function RenderSocial({ p }: { p: Record<string, any> }) {
  const wa = (p.whatsapp || "").replace(/[^\d]/g, "");
  const links = [
    p.instagram && {
      label: "Instagram",
      url: `https://instagram.com/${p.instagram.replace(/^@/, "")}`,
      emoji: "📷",
    },
    p.youtube && {
      label: "YouTube",
      url: `https://youtube.com/${p.youtube.startsWith("@") ? p.youtube : "@" + p.youtube}`,
      emoji: "▶️",
    },
    p.twitter && {
      label: "Twitter",
      url: `https://twitter.com/${p.twitter.replace(/^@/, "")}`,
      emoji: "🐦",
    },
    p.linkedin && {
      label: "LinkedIn",
      url: normalizeUrl(p.linkedin),
      emoji: "💼",
    },
    p.facebook && {
      label: "Facebook",
      url: `https://facebook.com/${p.facebook.replace(/^@/, "")}`,
      emoji: "📘",
    },
    p.website && {
      label: "Website",
      url: normalizeUrl(p.website),
      emoji: "🌐",
    },
    p.email && { label: "Email", url: `mailto:${p.email}`, emoji: "✉️" },
    p.phone && { label: "Call", url: `tel:${p.phone}`, emoji: "📞" },
    wa && { label: "WhatsApp", url: `https://wa.me/${wa}`, emoji: "💬" },
  ].filter(Boolean) as { label: string; url: string; emoji: string }[];

  return (
    <>
      {hasValue(p.bio) && <div className="qv-note">{p.bio}</div>}
      <div className="qv-actions" style={{ marginTop: 16 }}>
        {links.map((l) => (
          <ActionButton
            key={l.label}
            href={l.url}
            icon={l.emoji}
            label={l.label}
            variant="secondary"
            external={l.url.startsWith("http")}
          />
        ))}
      </div>
    </>
  );
}

function RenderProduct({ p }: { p: Record<string, any> }) {
  return (
    <>
      {p.productImageUrl && (
        <div className="qv-product-image-wrap">
          <img
            className="qv-product-image"
            src={p.productImageUrl}
            alt={p.productName || "Product"}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}
      <div className="qv-info">
        <Row label="Product" value={p.productName} />
        <Row label="Brand" value={p.brand} />
        <Row label="SKU" value={p.sku} />
        <Row label="Serial" value={p.serial} />
        <Row label="Price" value={p.price} />
        <Row label="Warranty" value={p.warranty} />
        <Row label="Purchased" value={p.purchaseDate} />
        <Row
          label="Seller Phone"
          value={p.sellerPhone}
          link={`tel:${p.sellerPhone}`}
        />
        <Row
          label="Support Phone"
          value={p.supportPhone}
          link={`tel:${p.supportPhone}`}
        />
        <Row
          label="Manual"
          value={p.manualUrl}
          link={normalizeUrl(p.manualUrl)}
        />
      </div>
      {hasValue(p.note) && <div className="qv-note">{p.note}</div>}
      <div className="qv-actions" style={{ marginTop: 16 }}>
        <ActionButton
          href={p.sellerPhone ? `tel:${p.sellerPhone}` : undefined}
          icon="📞"
          label="Call Seller"
        />
      </div>
      <div className="qv-actions">
        <ActionButton
          href={p.supportPhone ? `tel:${p.supportPhone}` : undefined}
          icon="🛠️"
          label="Call Support"
          variant="secondary"
        />
      </div>
      <div className="qv-actions">
        <ActionButton
          href={p.manualUrl ? normalizeUrl(p.manualUrl) : undefined}
          icon="📘"
          label="Open Manual"
          variant="green"
          external
        />
      </div>
    </>
  );
}

function RenderResume({ p }: { p: Record<string, any> }) {
  const wa = (p.whatsapp || "").replace(/[^\d]/g, "");
  return (
    <>
      {p.photoUrl && (
        <div className="qv-photo-wrap">
          <img
            className="qv-photo"
            src={p.photoUrl}
            alt={p.name || "Profile"}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}
      <div className="qv-info">
        <Row label="Title" value={p.title} />
        <Row label="Email" value={p.email} link={`mailto:${p.email}`} />
        <Row label="Phone" value={p.phone} link={`tel:${p.phone}`} />
        <Row
          label="WhatsApp"
          value={p.whatsapp}
          link={wa ? `https://wa.me/${wa}` : undefined}
        />
        <Row label="Location" value={p.location} />
        <Row
          label="LinkedIn"
          value={p.linkedin}
          link={normalizeUrl(p.linkedin)}
        />
        <Row
          label="Portfolio"
          value={p.portfolio}
          link={normalizeUrl(p.portfolio)}
        />
      </div>
      <Section
        icon="📋"
        title="Summary"
        body={p.summary}
        bg="#eff6ff"
        color="#1e40af"
        border="#93c5fd"
      />
      {hasValue(p.skills) && (
        <div
          className="qv-section"
          style={{ background: "#dbeafe", borderLeftColor: "#3b82f6" }}
        >
          <div className="qv-section-title" style={{ color: "#1e40af" }}>
            <span>💡</span>
            <span>Skills</span>
          </div>
          <div className="qv-chips">
            {String(p.skills)
              .split(",")
              .map((s: string) => s.trim())
              .filter(Boolean)
              .map((s: string, i: number) => (
                <span key={i} className="qv-chip">
                  {s}
                </span>
              ))}
          </div>
        </div>
      )}
      <Section
        icon="💼"
        title="Experience"
        body={p.experience}
        bg="#eff6ff"
        color="#1e40af"
        border="#93c5fd"
      />
      <Section
        icon="🎓"
        title="Education"
        body={p.education}
        bg="#eff6ff"
        color="#1e40af"
        border="#93c5fd"
      />
      <div className="qv-actions" style={{ marginTop: 16 }}>
        <ActionButton
          href={p.email ? `mailto:${p.email}` : undefined}
          icon="✉️"
          label="Email Me"
        />
      </div>
      <div className="qv-actions">
        <ActionButton
          href={wa ? `https://wa.me/${wa}` : undefined}
          icon="💬"
          label="WhatsApp"
          variant="whatsapp"
          external
        />
      </div>
    </>
  );
}

function RenderAppointment({ p }: { p: Record<string, any> }) {
  const wa = (p.whatsapp || "").replace(/[^\d]/g, "");
  return (
    <>
      <div className="qv-info">
        <Row label="Business" value={p.businessName} />
        <Row label="Service" value={p.serviceType} />
        <Row label="Phone" value={p.phone} link={`tel:${p.phone}`} />
        <Row
          label="WhatsApp"
          value={p.whatsapp}
          link={wa ? `https://wa.me/${wa}` : undefined}
        />
        <Row label="Email" value={p.email} link={`mailto:${p.email}`} />
        <Row label="Address" value={p.address} />
        <Row label="Hours" value={p.hours} />
        <Row
          label="Maps"
          value={p.googleMapsUrl ? "Open in Maps" : ""}
          link={normalizeUrl(p.googleMapsUrl)}
        />
        <Row
          label="Booking"
          value={p.bookingUrl}
          link={normalizeUrl(p.bookingUrl)}
        />
      </div>
      {hasValue(p.note) && <div className="qv-note">{p.note}</div>}
      <div className="qv-actions" style={{ marginTop: 16 }}>
        <ActionButton
          href={p.phone ? `tel:${p.phone}` : undefined}
          icon="📞"
          label="Call"
        />
      </div>
      <div className="qv-actions">
        <ActionButton
          href={wa ? `https://wa.me/${wa}` : undefined}
          icon="💬"
          label="WhatsApp"
          variant="whatsapp"
          external
        />
      </div>
      <div className="qv-actions">
        <ActionButton
          href={p.bookingUrl ? normalizeUrl(p.bookingUrl) : undefined}
          icon="📅"
          label="Book Online"
          variant="green"
          external
        />
      </div>
    </>
  );
}

function RenderUpi({ p }: { p: Record<string, any> }) {
  return (
    <>
      <div className="qv-upi-card">
        <div className="qv-upi-label">Pay to UPI ID</div>
        <div className="qv-upi-id">{p.upiId || "—"}</div>
        {p.amount && <div className="qv-upi-amount">₹{p.amount}</div>}
        {p.name && <div className="qv-upi-payee">to {p.name}</div>}
      </div>
      {hasValue(p.note) && <div className="qv-note">{p.note}</div>}
      <div className="qv-upi-hint">
        💳 Open any UPI app (GPay, PhonePe, Paytm) and scan this QR to pay
      </div>
    </>
  );
}

const RENDERERS: Record<
  string,
  React.ComponentType<{ p: Record<string, any> }>
> = {
  personal: RenderPersonal,
  business: RenderBusiness,
  hotel_menu: RenderHotelMenu,
  local_shop: RenderShop,
  family_tree: RenderFamily,
  event: RenderEvent,
  wifi: RenderWifi,
  custom: RenderCustom,
  restaurant: RenderRestaurant,
  pet_id: RenderPetID,
  vehicle: RenderVehicle,
  medical: RenderMedical,
  social: RenderSocial,
  product: RenderProduct,
  resume: RenderResume,
  appointment: RenderAppointment,
  upi_payment: RenderUpi,
};

// ══════════════════════════════════════════════════════
//  MAIN
// ══════════════════════════════════════════════════════

export default function QrViewer() {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const [payload, setPayload] = useState<Payload | null>(null);

  useEffect(() => {
    if (!id) {
      setState("error");
      return;
    }
    setState("loading");
    fetch(`${API_BASE}/u/${id}?format=json`)
      .then(async (r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then((data: Payload) => {
        setPayload(data);
        setState("ok");
      })
      .catch(() => setState("error"));
  }, [id]);

  if (state === "loading") {
    return (
      <div className="qv-wrap">
        <div className="qv-card qv-card-center">
          <div className="qv-spinner" />
          <div className="qv-loading-text">Loading profile…</div>
        </div>
      </div>
    );
  }

  if (state === "error" || !payload) {
    return (
      <div className="qv-wrap">
        <div className="qv-card qv-card-center">
          <div className="qv-error-emoji">🔍</div>
          <h2 className="qv-error-title">QR not found</h2>
          <p className="qv-error-sub">
            This QR code doesn't exist or was removed.
          </p>
        </div>
      </div>
    );
  }

  const t = THEMES[payload.type] || THEMES.personal;
  const p = payload.data || {};
  const displayName =
    p.name ||
    p.title ||
    p.productName ||
    p.petName ||
    p.businessName ||
    p.ssid ||
    p.ownerName ||
    p.owner ||
    "TapCard";
  const subtitle = p.company || p.designation || p.address || p.location || "";
  const Renderer = RENDERERS[payload.type] || RenderPersonal;

  // Avatar content logic
  let avatarContent: string;
  if (payload.type === "custom") avatarContent = "✏️";
  else if (payload.type === "upi_payment") avatarContent = "💳";
  else if (payload.type === "pet_id") avatarContent = "🐾";
  else if (payload.type === "wifi") avatarContent = "📶";
  else avatarContent = initials(displayName);

  return (
    <div className="qv-wrap">
      <div className="qv-card" style={{ ["--accent" as any]: t.accent }}>
        <div className="qv-card-accent" />

        <div className="qv-badge-wrap">
          <span
            className="qv-badge"
            style={{ background: t.bg, color: t.color }}
          >
            <span className="qv-badge-emoji">{t.emoji}</span>
            <span>{payload.title}</span>
          </span>
        </div>

        <div className="qv-avatar" style={{ background: t.gradient }}>
          {avatarContent}
        </div>

        <h1 className="qv-name">{displayName}</h1>
        {subtitle && <div className="qv-sub">{subtitle}</div>}

        <Renderer p={p} />

        <div className="qv-footer">
          <img
            src="/logo.png"
            alt="TapCard"
            className="qv-footer-logo"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <span>Powered by TapCard</span>
        </div>
      </div>
    </div>
  );
}
