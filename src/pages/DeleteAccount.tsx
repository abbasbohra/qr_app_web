export default function DeleteAccount() {
  return (
    <div className="container">
      <h1>Delete Your Account</h1>
      <p>You can delete your TapCard account in two ways:</p>

      <div className="card" style={{ margin: "24px 0" }}>
        <h3>Option 1 — In the app (fastest)</h3>
        <ol>
          <li>Open TapCard</li>
          <li>
            Go to the <strong>Profile</strong> tab
          </li>
          <li>
            Tap <strong>Delete Account</strong>
          </li>
          <li>Confirm — your account and all data are removed immediately</li>
        </ol>
      </div>

      <div className="card" style={{ margin: "24px 0" }}>
        <h3>Option 2 — Request by email</h3>
        <p>
          If you cannot access the app, email us from the address linked to your
          account:
        </p>
        <p>
          <a href="mailto:support@tapcard.app?subject=Delete%20my%20TapCard%20account">
            support@tapcard.app
          </a>
        </p>
        <p className="muted">
          Include your registered email and phone number. We process deletion
          requests within 7 days.
        </p>
      </div>

      <h2>What gets deleted</h2>
      <ul>
        <li>Your account (name, email, phone, password)</li>
        <li>All your QR codes and their content</li>
        <li>Your credit balance</li>
        <li>Your push notification token</li>
        <li>Notification history</li>
      </ul>

      <h2>What is retained</h2>
      <p>
        Anonymized analytics and support ticket history may be retained for up
        to 90 days for legal/audit purposes, then deleted.
      </p>
    </div>
  );
}
