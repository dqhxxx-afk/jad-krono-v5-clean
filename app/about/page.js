"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-shell subpage-direct about-direct">
        <section className="about-statement">
          <p>
            Based in Singapore, we buy, sell and source modern and collectible watches.
          </p>
          <p>Viewings are by appointment.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
