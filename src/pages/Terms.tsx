export default function Terms() {
  return (
    <div className="container">
      <h1>Terms of Service</h1>
      <p className="muted">
        Last updated:{" "}
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <p>
        By using TapCard, you agree to these terms. If you do not agree, do not
        use the app.
      </p>

      <h2>1. Eligibility</h2>
      <p>
        You must be at least 13 years old to use TapCard. If you are under 18,
        you must have parental consent.
      </p>

      <h2>2. Your Account</h2>
      <ul>
        <li>You are responsible for keeping your password secure.</li>
        <li>You must provide accurate information when registering.</li>
        <li>One account per person unless we authorize otherwise.</li>
        <li>We may suspend or delete accounts that violate these terms.</li>
      </ul>

      <h2>3. Credits and Rewarded Ads</h2>
      <ul>
        <li>New users receive 100 free credits on registration.</li>
        <li>Each rewarded video ad you fully watch earns 1 credit.</li>
        <li>Each QR code generation costs 1 credit.</li>
        <li>Credits have no monetary value and are not refundable.</li>
        <li>Any attempt to manipulate ads may result in account suspension.</li>
      </ul>

      <h2>4. Acceptable Use</h2>
      <p>You agree NOT to use TapCard to:</p>
      <ul>
        <li>Upload illegal, harmful, threatening, or abusive content.</li>
        <li>Share another person's private information without consent.</li>
        <li>Impersonate any person or organization.</li>
        <li>Distribute malware, phishing links, or scams.</li>
        <li>Violate any applicable law or regulation.</li>
        <li>Reverse-engineer or attempt to extract source code.</li>
      </ul>

      <h2>5. QR Code Content</h2>
      <p>
        You are solely responsible for the content you encode into QR codes.
        TapCard does not review QR content. Public QR codes can be viewed by
        anyone who scans them.
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        The TapCard app, logo, and website are owned by us. You retain ownership
        of the content you create (your QR data).
      </p>

      <h2>7. Third-Party Services</h2>
      <p>
        TapCard uses Google AdMob, Firebase, Supabase, and Netlify. Their terms
        and privacy policies also apply.
      </p>

      <h2>8. Disclaimers</h2>
      <p>
        TapCard is provided "as is" without warranty of any kind. We do not
        guarantee uninterrupted service or error-free operation.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, TapCard and its team are not
        liable for indirect, incidental, or consequential damages arising from
        your use of the app.
      </p>

      <h2>10. Termination</h2>
      <p>
        You can delete your account anytime. We may terminate your access if you
        violate these terms.
      </p>

      <h2>11. Changes to Terms</h2>
      <p>
        We may update these terms. Continued use means you accept the updated
        terms.
      </p>

      <h2>12. Governing Law</h2>
      <p>These terms are governed by the laws of India.</p>

      <h2>13. Contact</h2>
      <p>
        Questions? Email{" "}
        <a href="mailto:support@tapcard.app">support@tapcard.app</a>.
      </p>
    </div>
  );
}
