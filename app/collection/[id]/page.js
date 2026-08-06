"use client";

import { useParams } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import WatchCard from "../../../components/WatchCard";
import { useWatches } from "../../../components/useWatches";
import { site } from "../../../data/site";
import { getWatchCategory, getWatchId, sameWatchText } from "../../../lib/watchUtils";

function byCardDateDesc(first, second) {
  return String(second.cardDate || "").localeCompare(String(first.cardDate || ""));
}

export default function WatchDetailPage() {
  const params = useParams();
  const routeId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { watches, loading } = useWatches();
  const product = watches.find((watch) => getWatchId(watch) === routeId);

  if (loading) {
    return (
      <>
        <Header />
        <main id="main-content" className="page-shell">
          <section className="page-hero">
            <p className="eyebrow">Collection</p>
            <h1>Loading watch…</h1>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <main id="main-content" className="page-shell">
          <section className="page-hero">
            <p className="eyebrow">Collection</p>
            <h1>This watch is not currently listed.</h1>
            <p>Contact us if you would like us to source one.</p>
            <a
              className="btn gold"
              href={`${site.whatsapp}?text=Hello%20JAD%20KRONO%2C%20I%20would%20like%20to%20request%20sourcing.`}
              target="_blank"
              rel="noreferrer"
            >
              Request Sourcing
            </a>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const gallery = product.gallery?.length
    ? product.gallery
    : product.image
      ? [product.image]
      : [];

  const productCategory = getWatchCategory(product);
  const related = watches
    .filter((watch) => getWatchId(watch) !== getWatchId(product))
    .sort((first, second) => {
      const firstSameBrand = getWatchCategory(first) === productCategory ? 1 : 0;
      const secondSameBrand = getWatchCategory(second) === productCategory ? 1 : 0;
      if (firstSameBrand !== secondSameBrand) return secondSameBrand - firstSameBrand;
      return byCardDateDesc(first, second);
    })
    .slice(0, 3);

  const message = encodeURIComponent(
    `Hello JAD KRONO, I would like to enquire about ${product.brand} ${product.model}, ref. ${product.reference}.`
  );
  const showReference = product.reference && !sameWatchText(product.model, product.reference);
  const productName = showReference
    ? `${product.brand} ${product.model}, ref. ${product.reference}`
    : `${product.brand} ${product.model}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    sku: product.reference,
    description: product.description || `${productName}. ${product.condition}, dated ${product.year}.`,
    brand: { "@type": "Brand", name: product.brand },
    url: `${site.domain}/collection/${getWatchId(product)}`
  };

  const details = [
    ["Reference", product.reference],
    ["Dated", product.year],
    ["Condition", product.condition],
    ["Box & papers", product.set],
    ["Case", product.specs?.case],
    ["Movement", product.specs?.movement],
    ["Material", product.specs?.material],
    ["Location", "Singapore"]
  ].filter(([, value]) => value);

  return (
    <>
      <Header />
      <main id="main-content" className="product-shell">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <section className="product-hero">
          <div className="product-gallery">
            <div className="main-watch-frame">
              {gallery[0] ? (
                <img
                  src={gallery[0]}
                  alt={`${product.brand} ${product.model}, ref. ${product.reference}`}
                />
              ) : (
                <div className="large-watch-placeholder">
                  <img src="/assets/jad-krono-mark.png" alt="" />
                </div>
              )}
            </div>

            {gallery.length > 1 ? (
              <div className="thumb-grid">
                {gallery.slice(1, 4).map((image, index) => (
                  <div className="thumb" key={image}>
                    <img
                      src={image}
                      alt={`${product.brand} ${product.model} detail ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="product-info">
            <p className="eyebrow">{product.brand}</p>
            <h1>{product.model}</h1>
            {showReference ? <h2>Ref. {product.reference}</h2> : null}
            {product.description ? <p>{product.description}</p> : null}

            <div className="product-status">
              <span>{product.status}</span>
              <strong>{product.price || "Price on request"}</strong>
            </div>

            <div className="detail-list">
              {details.map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>

            <div className="product-actions">
              <a
                className="btn gold"
                href={`${site.whatsapp}?text=${message}`}
                target="_blank"
                rel="noreferrer"
              >
                Enquire via WhatsApp
              </a>
              <a className="btn outline" href="/collection">Back to Collection</a>
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="section related-section">
            <div className="section-heading">
              <p className="eyebrow">Related</p>
              <h2>Other watches.</h2>
            </div>
            <div className="watch-grid">
              {related.map((watch) => (
                <WatchCard key={getWatchId(watch)} product={watch} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
