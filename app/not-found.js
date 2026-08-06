import Header from "../components/Header";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-shell">
        <section className="page-hero">
          <p className="eyebrow">404</p>
          <h1>Page not found.</h1>
          <p>The page may have moved or may no longer be available.</p>
          <a className="btn gold" href="/">Return Home</a>
        </section>
      </main>
      <Footer />
    </>
  );
}
