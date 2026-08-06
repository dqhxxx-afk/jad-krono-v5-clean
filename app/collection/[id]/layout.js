import watches from "../../../data/watches.json";
import { getWatchId, sameWatchText } from "../../../lib/watchUtils";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const watch = watches.find((item) => getWatchId(item) === id);

  if (!watch) {
    return {
      title: "Watch Details",
      description: "Watch details and sourcing enquiries from JAD KRONO.",
      robots: { index: false, follow: true }
    };
  }

  const showReference = watch.reference && !sameWatchText(watch.model, watch.reference);
  const title = showReference
    ? `${watch.brand} ${watch.model} ${watch.reference}`
    : `${watch.brand} ${watch.model}`;
  const description = `${watch.condition}, dated ${watch.year}. Price on request.`;

  return {
    title,
    description,
    alternates: { canonical: `/collection/${getWatchId(watch)}` },
    openGraph: {
      title: `${title} | JAD KRONO`,
      description,
      images: watch.image ? [watch.image] : ["/og-image.jpg"]
    }
  };
}

export default function Layout({ children }) {
  return children;
}
