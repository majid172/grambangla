import type { Metadata } from "next";
import "./globals.css";
import FacebookPixel from "@/components/FacebookPixel";

export const metadata: Metadata = {
  title: "গ্রামবাংলা | খাঁটি খাবার, বাংলার স্বাদ - GramBangla Organic Food",
  description: "গ্রামবাংলা (GramBangla) - খাঁটি সরিষার তেল, ঘি, সুন্দরবনের মধু এবং শতভাগ বিশুদ্ধ দেশীয় খাবার সরাসরি আপনার ঘরে। Premium Organic & Traditional Bangladeshi Food.",
  keywords: ["গ্রামবাংলা", "GramBangla", "সরিষার তেল", "খাঁটি ঘি", "সুন্দরবনের মধু", "দেশি চাল", "অর্গানিক ফুড", "Bangladeshi organic food", "Pure Mustard Oil", "Desi Ghee"],
  openGraph: {
    title: "গ্রামবাংলা | খাঁটি খাবার, বাংলার স্বাদ",
    description: "প্রকৃতির বিশুদ্ধতা, আপনার পরিবারের জন্য। ১০০% খাঁটি ও ঐতিহ্যবাহী দেশীয় খাবার।",
    type: "website",
    locale: "bn_BD",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </head>
      <body 
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-[#FAF8F0] text-[#252B25] antialiased selection:bg-[#E5B83F]/30 selection:text-[#244C32]"
      >
        <FacebookPixel />
        {children}
      </body>
    </html>
  );
}
