"use client";

import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { About } from '@/components/landing/about';

import { Testimonials } from '@/components/landing/testimonials';
import { Faq } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';
import dynamic from 'next/dynamic';


const SpaceBackground = dynamic(
  () => import('@/components/space-background').then(mod => mod.SpaceBackground),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="cosmic-home flex flex-col min-h-screen -mt-4">
      <SpaceBackground />
      <Header />
      <main className="flex-grow -mt-4">
        <Hero />
        <About />

        <Testimonials />

        <Faq />
      </main>
      <Footer />
    </div>
  );
}



