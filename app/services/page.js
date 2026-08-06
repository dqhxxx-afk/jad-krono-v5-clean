"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { services } from "../../data/site";

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-shell subpage-direct services-direct">
        <section className="service-grid">
          {services.map((service) => (
            <article key={service.title}>
              <h2>{service.title}</h2>
              <p>{service.copy}</p>
            </article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
