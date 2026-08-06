"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { site } from "../../data/site";

const steps = [
  {
    number: "01",
    title: "Watch details",
    copy: "Brand, model, reference, date on the card or papers, and condition."
  },
  {
    number: "02",
    title: "Box, papers and photos",
    copy: "Include the box, papers, accessories and recent photos, where available."
  },
  {
    number: "03",
    title: "Review",
    copy: "We review the details and get back to you."
  }
];

export default function SellPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-shell subpage-direct sell-direct">
        <section className="valuation-intro">
          <h1>Request a valuation.</h1>
          <p>Send us the watch details and recent photos.</p>
          <a
            className="btn gold"
            href={`${site.whatsapp}?text=Hello%20JAD%20KRONO%2C%20I%20would%20like%20to%20sell%20a%20watch.%0A%0ABrand%3A%0AModel%20%2F%20Reference%3A%0ACard%20%2F%20Papers%20Date%3A%0ACondition%3A%0ABox%20%26%20Papers%3A%0AExpected%20Price%3A`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </section>

        <section className="sell-steps">
          {steps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h2>{step.title}</h2>
              <p>{step.copy}</p>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
