"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { site } from "../../data/site";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-shell subpage-direct contact-direct">
        <section className="contact-cards contact-cards-direct">
          <article className="contact-card enquiry">
            <p className="eyebrow">Enquiry</p>
            <h2>Send us the details.</h2>
            <p>
              For a listed watch, include the model or reference. For sourcing,
              add the preferred year, condition and budget.
            </p>
            <div className="button-row">
              <a
                className="btn gold"
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </article>

          <article className="contact-card">
            <p className="eyebrow">Visit</p>
            <h2>Singapore</h2>
            <p>Viewings are by appointment.</p>
            <a
              className="text-link"
              href={site.googleMaps}
              target="_blank"
              rel="noreferrer"
            >
              Google Maps
            </a>
          </article>

          <article className="contact-card">
            <p className="eyebrow">Follow</p>
            <h2>Instagram &amp; Facebook</h2>
            <p>New listings and occasional updates.</p>
            <div className="inline-links">
              <a href={site.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href={site.facebook} target="_blank" rel="noreferrer">
                Facebook
              </a>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
