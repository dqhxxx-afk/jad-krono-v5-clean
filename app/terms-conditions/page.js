"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-shell subpage-direct legal-page">
        <section className="legal-title">
          <h1>Terms &amp; Conditions</h1>
        </section>

        <section className="legal-copy">
          <h2>Availability &amp; pricing</h2>
          <p>
            Watches are subject to prior sale, reservation or withdrawal.
            Availability and pricing may change without notice.
          </p>

          <h2>Product information</h2>
          <p>
            Product descriptions and photographs are provided as accurately as
            possible. Please request any additional information before purchase.
          </p>

          <h2>Viewings &amp; transactions</h2>
          <p>
            Viewings are by appointment. Payment, collection and delivery
            arrangements are confirmed before completion.
          </p>

          <h2>Independent dealer</h2>
          <p>
            JAD KRONO is an independent watch dealer and is not affiliated with
            or endorsed by any watch manufacturer. Brand names and trademarks
            are used for identification only.
          </p>

          <h2>Governing law</h2>
          <p>These terms are governed by the laws of Singapore.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
