export default function PrivacyPolicy() {
  return (
    <div className="container">
      <h1>Privacy Policy</h1>
      <p className="muted">
        Last updated:{" "}
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <p>
        This Privacy Policy describes how <strong>TapCard</strong> ("we", "us",
        "our") collects, uses, and protects your information when you use our
        mobile application and website.
      </p>

      <h2>1. Information We Collect</h2>
      <h3>1.1 Information you provide</h3>
      <ul>
        <li>
          <strong>Account data:</strong> name, email address, phone number, and
          password (hashed).
        </li>
        <li>
          <strong>Profile data:</strong> the content you enter to create QR
          codes — e.g., business name, address, menu items, Wi-Fi credentials,
          medical info, pet details, etc.
        </li>
        <li>
          <strong>Support messages:</strong> if you contact us via the support
          form.
        </li>
      </ul>
      <h3>1.2 Information collected automatically</h3>
      <ul>
        <li>
          <strong>Device token (FCM):</strong> to deliver push notifications.
        </li>
        <li>
          <strong>App usage:</strong> credit balance, QR code count, timestamps.
        </li>
        <li>
          <strong>Advertising ID:</strong> collected by Google AdMob for ad
          serving.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To create and manage your account.</li>
        <li>To generate and store your QR codes.</li>
        <li>To award credits after you watch rewarded ads.</li>
        <li>To send push notifications.</li>
        <li>To respond to support requests.</li>
        <li>To detect fraud and abuse.</li>
      </ul>

      <h2>3. Advertising</h2>
      <p>
        We use <strong>Google AdMob</strong> to serve rewarded video ads. AdMob
        may collect your device's advertising identifier, IP address, and
        general location to serve relevant ads. You can opt out of personalized
        ads in your device settings.
      </p>
      <p>
        Learn more:{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener"
        >
          Google Ads Policy
        </a>
        .
      </p>

      <h2>4. QR Codes and Public Data</h2>
      <p>
        When you create a QR code, the data you entered is encoded into the QR
        code and <strong>is publicly viewable by anyone who scans it</strong>.
        Do not include information you are not comfortable sharing publicly.
      </p>

      <h2>5. Data Storage and Security</h2>
      <p>
        Account and QR data are stored on <strong>Supabase</strong> (Postgres)
        servers with encryption in transit and at rest. Passwords are hashed
        using industry-standard algorithms.
      </p>

      <h2>6. Data Sharing</h2>
      <p>We do not sell your personal data. We share data only with:</p>
      <ul>
        <li>
          <strong>Supabase</strong> — database and authentication.
        </li>
        <li>
          <strong>Google AdMob</strong> — advertising.
        </li>
        <li>
          <strong>Firebase Cloud Messaging</strong> — push notifications.
        </li>
        <li>
          <strong>Netlify</strong> — website and API hosting.
        </li>
        <li>
          <strong>Law enforcement</strong> — if legally required.
        </li>
      </ul>

      <h2>7. Your Rights</h2>
      <ul>
        <li>
          <strong>Access:</strong> view your data in the app.
        </li>
        <li>
          <strong>Edit:</strong> update your profile and QRs anytime.
        </li>
        <li>
          <strong>Delete:</strong> delete individual QRs, or delete your entire
          account from Profile → Delete Account.
        </li>
        <li>
          <strong>Opt out of ads personalization:</strong> in device settings.
        </li>
      </ul>

      <h2>8. Children's Privacy</h2>
      <p>
        TapCard is not intended for children under 13. We do not knowingly
        collect data from children.
      </p>

      <h2>9. International Users</h2>
      <p>
        Your data may be transferred to and processed on servers located outside
        your country.
      </p>

      <h2>10. Changes to This Policy</h2>
      <p>
        We may update this policy. The "Last updated" date at the top reflects
        the latest revision.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions? Email us at{" "}
        <a href="mailto:support@tapcard.app">support@tapcard.app</a> or use our{" "}
        <a href="/support">support form</a>.
      </p>
    </div>
  );
}
