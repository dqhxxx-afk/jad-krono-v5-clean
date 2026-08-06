"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import WatchCard from "../../components/WatchCard";
import { useWatches } from "../../components/useWatches";
import { getWatchCategory, getWatchId, brandLabel } from "../../lib/watchUtils";
import { site } from "../../data/site";

const brands = [
  "all",
  "rolex",
  "patek",
  "hublot",
  "franck-muller",
  "tudor",
  "mb-and-f"
];

function normalizeSearch(value = "") {
  return String(value).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function byCardDateDesc(first, second) {
  return String(second.cardDate || "").localeCompare(String(first.cardDate || ""));
}

export default function CollectionPage() {
  const { watches, loading } = useWatches();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const readBrand = () => {
      const brand = new URLSearchParams(window.location.search).get("brand") || "all";
      setFilter(brands.includes(brand) ? brand : "all");
    };

    readBrand();
    window.addEventListener("popstate", readBrand);
    return () => window.removeEventListener("popstate", readBrand);
  }, []);

  function selectBrand(brand) {
    setFilter(brand);
    setQuery("");
    window.history.pushState(null, "", brand === "all" ? "/collection" : `/collection?brand=${brand}`);
  }

  function updateSearch(value) {
    setQuery(value);

    if (value.trim()) {
      setFilter("all");
      window.history.replaceState(null, "", "/collection");
    }
  }

  const normalizedQuery = normalizeSearch(query);

  const shown = useMemo(() => {
    return [...watches]
      .sort(byCardDateDesc)
      .filter((watch) => filter === "all" || getWatchCategory(watch) === filter)
      .filter((watch) => {
        if (!normalizedQuery) return true;
        const searchable = [
          watch.brand,
          watch.model,
          watch.reference,
          watch.description,
          watch.condition,
          watch.year
        ].filter(Boolean).join(" ");
        return normalizeSearch(searchable).includes(normalizedQuery);
      });
  }, [watches, filter, normalizedQuery]);

  const hasSearch = Boolean(query.trim());
  const filteredBrand = filter !== "all" ? brandLabel(filter) : "";
  const sourcingSubject = filteredBrand ? " a " + filteredBrand : " a watch";
  const sourcingText = encodeURIComponent(
    "Hello JAD KRONO, I would like help sourcing" + sourcingSubject + "."
  );

  return (
    <>
      <Header />
      <main id="main-content" className="page-shell subpage-direct collection-page">
        <section className="collection-body">
          <div className="collection-tools">
            <label className="search-field">
              <span>Search</span>
              <div className="search-input-wrap">
                <input
                  type="search"
                  inputMode="search"
                  enterKeyHint="search"
                  value={query}
                  onChange={(event) => updateSearch(event.target.value)}
                  placeholder="Search by brand, model or reference"
                  autoComplete="off"
                  aria-label="Search by brand, model or reference"
                />
                {hasSearch ? (
                  <button type="button" className="search-clear" onClick={() => setQuery("")} aria-label="Clear search">
                    Clear
                  </button>
                ) : null}
              </div>
            </label>

            <nav className="brand-filter" aria-label="Filter by brand">
              {brands.map((brand) => (
                <button
                  type="button"
                  key={brand}
                  onClick={() => selectBrand(brand)}
                  className={filter === brand ? "active" : ""}
                >
                  {brandLabel(brand)}
                </button>
              ))}
            </nav>
          </div>

          {!loading && shown.length ? (
            <p className="collection-result-count" aria-live="polite">
              {shown.length} {shown.length === 1 ? "watch" : "watches"}
            </p>
          ) : null}

          <div className="watch-grid">
            {shown.map((watch) => <WatchCard key={getWatchId(watch)} product={watch} />)}
          </div>

          {!shown.length && !loading ? (
            <div className="empty-state">
              {hasSearch ? (
                <>
                  <h2>No matching watches found.</h2>
                  <p>Try another brand, model or reference.</p>
                  <button className="btn outline" type="button" onClick={() => setQuery("")}>Clear Search</button>
                </>
              ) : filteredBrand ? (
                <>
                  <h2>No {filteredBrand} watches are currently listed.</h2>
                  <p>Contact us if you would like us to source one.</p>
                  <a className="btn gold" href={`${site.whatsapp}?text=${sourcingText}`} target="_blank" rel="noreferrer">Request Sourcing</a>
                </>
              ) : (
                <>
                  <h2>No watches are currently listed.</h2>
                  <p>Contact us to confirm availability.</p>
                  <a className="btn gold" href={site.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
                </>
              )}
            </div>
          ) : null}
        </section>
      </main>
      <Footer />
    </>
  );
}
