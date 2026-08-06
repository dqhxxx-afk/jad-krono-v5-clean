"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-shell subpage-direct legal-page">
        <section className="legal-title">
          <h1>Privacy Policy</h1>
        </section>

        <section className="legal-copy">
          <h2>Information we collect</h2>
          <p>
            We may collect your name, contact details and watch information when
            you send an enquiry or arrange a transaction.
          </p>

          <h2>How we use information</h2>
          <p>
            We use the information to respond to enquiries, arrange appointments,
            discuss transactions and provide requested services.
          </p>

          <h2>Sharing</h2>
          <p>
            We do not sell personal information. Information may be shared where
            required by law or where needed to complete an agreed transaction.
          </p>

          <h2>Cookies</h2>
          <p>
            The website may use essential cookies required for basic functionality.
          </p>

          <h2>Your information</h2>
          <p>
            You may contact JAD KRONO through the Contact page to request access
            to, or correction of, personal information held about you.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
