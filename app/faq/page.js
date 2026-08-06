"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

const groups = [
  {
    title: "Buying",
    items: [
      ["Can I view a watch before purchasing?", "Yes. Viewings are by appointment in Singapore."],
      ["Can you source a specific watch?", "Yes. Send us the reference, preferred year, condition and budget."],
      ["How do I confirm availability?", "Send us a message on WhatsApp before arranging a viewing."],
      ["Do you ship internationally?", "International delivery may be arranged depending on the destination and insurance availability."]
    ]
  },
  {
    title: "Selling & Trading",
    items: [
      ["Do you buy watches?", "Yes. Send us the brand, model, reference, condition and details of any box and papers."],
      ["Can I trade my watch?", "Yes. Send us the details of the watch you would like to trade."],
      ["How is my watch assessed?", "We consider the model, condition, accompanying items and current demand."],
      ["What should I prepare?", "Include the watch, box, papers, accessories and recent photos, where available."]
    ]
  },
  {
    title: "Consignment",
    items: [
      ["Do you accept consignments?", "Yes. We accept selected watches after review."],
      ["How does consignment work?", "Terms are agreed before the watch is listed."],
      ["When do I get paid?", "Payment terms are confirmed before consignment begins."]
    ]
  },
  {
    title: "General",
    items: [
      ["Are the watches authentic?", "Each watch is reviewed before being offered for sale."],
      ["Do you arrange export?", "International export may be arranged for selected watches."],
      ["How do I enquire?", "Send us a message via WhatsApp, Instagram or Facebook."]
    ]
  }
];

export default function FAQPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-shell subpage-direct faq-direct">
        {groups.map((group) => (
          <section className="faq-group" key={group.title}>
            <h1>{group.title}</h1>
            <div className="faq-section">
              {group.items.map(([question, answer]) => (
                <article key={question}>
                  <h2>{question}</h2>
                  <p>{answer}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
