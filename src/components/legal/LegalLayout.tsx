import { PropsWithChildren } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LegalLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="page-with-header-gap container mx-auto max-w-4xl px-4 pb-16">
        {/* Evita que el H1 quede bajo el header fijo */}
        <div className="scroll-mt-24" />
        {children}
      </main>
      <Footer />
    </div>
  );
}