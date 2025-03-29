import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import NewsletterFeatures from '@/components/home/NewsletterFeatures';
import CallToAction from '@/components/home/CallToAction';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>GeoHog - Earth's Knowledge, Unearthed</title>
        <meta name="description" content="A TLDR-style newsletter for geoscientists that provides concise, curated summaries of the latest research, industry news, and developments in earth sciences." />
      </Head>

      <Hero />
      <NewsletterFeatures />
      <CallToAction />
    </Layout>
  );
}