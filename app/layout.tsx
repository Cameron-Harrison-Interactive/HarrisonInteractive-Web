/* --- START OF FILE app/layout.tsx --- */

import "./globals.css";

export const metadata = {
  title: "Harrison Interactive | Matrix",
  description: "Unrivaled Innovation | AAA Neural Development",
};

/**
 * =========================================================================
 * HARRISON INTERACTIVE | ROOT HTML LAYOUT
 * =========================================================================
 * This is the foundational HTML shell for the entire Next.js application.
 * All routing, dashboards, and gateways inject into the {children} prop.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#010409] text-[#E6EDF3] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

/* --- END OF FILE app/layout.tsx --- */