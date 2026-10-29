import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { getContacts, getPageContent } from "@/shared/api/content";
import { routing } from "@/i18n/routing";
import AntProviders from "@/providers/AntProvider";
import QueryProviders from "@/providers/query";
import "./globals.css";
import { Header } from "@/shared/ui";
// Server-only (fetches contacts), so it is not part of the shared/ui barrel used by client components
import { Footer } from "@/shared/ui/Footer";
import { Suspense } from "react";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

export function generateStaticParams() {
  return routing.locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getPageContent("common", await getLocale());

  return {
    title: seo.title,
    description: seo.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentLang = await lang();

  if (!hasLocale(routing.locales, currentLang)) {
    notFound();
  }

  const [messages, contacts] = await Promise.all([getMessages(), getContacts(currentLang)]);

  return (
    <html
      lang={currentLang}
      className={`${roboto.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={messages}>
          <Suspense fallback={null}>
            <AntProviders>
              <QueryProviders>
                <Header socials={{ instagram: contacts.instagram, tiktok: contacts.tiktok }} />

                {children}
                <Footer />
              </QueryProviders>
            </AntProviders>
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
