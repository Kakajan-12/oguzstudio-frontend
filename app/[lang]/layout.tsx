import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import AntProviders from "@/providers/AntProvider";
import QueryProviders from "@/providers/query";
import "./globals.css";
import { Footer, Header } from "@/shared/ui";
import { Suspense } from "react";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

export function generateStaticParams() {
  return routing.locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");

  return {
    title: t("title"),
    description: t("description"),
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

  const messages = await getMessages();

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
                <Header />

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
