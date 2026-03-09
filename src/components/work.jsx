export default function Prices() {
  return (
    <main className="bg-primary">
      <section className="felx relative justify-center min-h-screen pt-8 px-8">
        <h1 className="text-orange text-3xl font-bold mb-4">
          Pricing Information
        </h1>
        <ul className="text-white list-disc pl-5 space-y-2 mb-8">
          <li>Redesign - $100</li>
          <li>Static HTML and CSS - $500</li>
          <li>Static HTML and CSS with contact form - $600</li>
          <li>Next.JS website - $1300</li>
          <li>Next.JS website with blog - $1500</li>
          <li>Next.JS website with SEO - $1500</li>
          <li>Next.JS website with blog & SEO - $1650</li>
        </ul>

        <p className="mb-4 text-white">
          <strong className="text-orange">What is SEO?</strong> SEO (Search
          Engine Optimization) is the practice of increasing the quantity and
          quality of traffic to your website through organic search engine
          results. It involves making certain changes to your website design and
          content that make your site more attractive to a search engine. The
          goal is for the search engine to display your website as a top result
          on the search engine results page.
        </p>

        <p className="text-white">
          <strong className="text-orange">
            The benefits of Next.js over static HTML and CSS:
          </strong>{" "}
          Next.js offers several advantages over traditional static HTML and
          CSS, including automatic server-side rendering and code splitting,
          which help your site load faster. Additionally, Next.js has built-in
          SEO optimizations and is designed to work with React, allowing you to
          build dynamic, interactive web applications more efficiently. The
          framework also supports static site generation (SSG) and server-side
          rendering (SSR), making it a versatile choice for developing
          high-performance websites.
        </p>
      </section>
    </main>
  );
}
