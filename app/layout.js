import "./globals.css";

export const viewport = {
  themeColor: "#050505",
  colorScheme: "dark"
};

export const metadata = {
  metadataBase: new URL("https://www.jadkrono.com"),
  title: {
    default: "JAD KRONO | Modern & Collectible Timepieces | Singapore",
    template: "%s | JAD KRONO"
  },
  description:
    "Modern and collectible watches in Singapore. Viewings by appointment.",
  keywords: [
    "JAD KRONO",
    "watch dealer Singapore",
    "modern watches Singapore",
    "collectible watches Singapore",
    "Rolex Singapore",
    "Patek Philippe Singapore"
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "JAD KRONO | Modern & Collectible Timepieces",
    description: "Modern and collectible watches in Singapore. Viewings by appointment.",
    type: "website",
    url: "https://www.jadkrono.com",
    siteName: "JAD KRONO",
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: "JAD KRONO" }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "JAD KRONO | Modern & Collectible Timepieces",
    description: "Modern and collectible watches in Singapore. Viewings by appointment.",
    images: ["/og-image.jpg"]
  }
};

export default function RootLayout({ children }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "JAD KRONO",
    url: "https://www.jadkrono.com",
    image: "https://www.jadkrono.com/og-image.jpg",
    telephone: "+65 8699 6868",
    email: "contact@jadkrono.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Singapore",
      addressCountry: "SG"
    },
    hasMap: "https://maps.app.goo.gl/CGgdPNjevd54Gdrm9?g_st=ic",
    sameAs: [
      "https://instagram.com/jadkrono",
      "https://www.facebook.com/share/1BjRy9MPKg/?mibextid=wwXIfr"
    ]
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {children}
      </body>
    </html>
  );
}
