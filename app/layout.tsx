import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Calculateur de tarif pour développeurs freelance | Estimez votre taux horaire",
  description: "Utilisez notre calculateur pour estimer votre taux horaire en tant que développeur freelance. Basé sur votre expérience, la complexité du projet et vos objectifs de revenus.",
  keywords: "calculateur tarif, développeur freelance, taux horaire, estimation revenus, freelance développement",
  openGraph: {
    title: "Calculateur de tarif pour développeurs freelance",
    description: "Estimez votre taux horaire et vos revenus potentiels en tant que développeur freelance",
    url: "https://freelancer.leyvei.fr",
    siteName: "Calculateur Freelance",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Calculateur de tarif pour développeurs freelance",
              "description": "Estimez votre taux horaire et vos revenus potentiels en tant que développeur freelance",
              "url": "https://freelancer.leyvei.fr",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR"
              }
            }
          `}
        </script>
      </head>
      <body>{children}</body>
    </html>
  );
}