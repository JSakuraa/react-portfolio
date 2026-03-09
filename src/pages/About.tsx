import { PortableText } from '@portabletext/react'
import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { sanityClient, urlFor } from '../lib/sanity'
import { PageLoading, SEO, PersonStructuredData } from '../components'
import type { Author, Technology, TechnologyCategory } from '../types/sanity'

function TechnologyIcon({ svgIcon, name }: { svgIcon?: string; name: string }) {
  if (!svgIcon) {
    return (
      <div className="w-10 h-10 bg-charcoal rounded-lg flex items-center justify-center text-orange font-bold text-sm">
        {name.charAt(0)}
      </div>
    )
  }

  return (
    <div
      className="w-10 h-10 flex items-center justify-center [&>svg]:w-8 [&>svg]:h-8"
      dangerouslySetInnerHTML={{ __html: svgIcon }}
    />
  )
}

function TechnologiesSection({ technologies }: { technologies: Technology[] }) {
  const groupedTechnologies = useMemo(() => {
    const groups: Record<TechnologyCategory, Technology[]> = {
      Languages: [],
      Frontend: [],
      Backend: [],
      Database: [],
      Frameworks: [],
      Mobile: [],
      DevOps: [],
      Tools: [],
      Other: [],
    }

    technologies.forEach((tech) => {
      if (groups[tech.category]) {
        groups[tech.category].push(tech)
      } else {
        groups.Other.push(tech)
      }
    })

    return Object.entries(groups).filter(([, techs]) => techs.length > 0) as [
      TechnologyCategory,
      Technology[],
    ][]
  }, [technologies])

  return (
    <motion.section
      className="mt-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      <h2 className="text-3xl cursive text-orange mb-8 text-center">Technologies I Work With</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groupedTechnologies.map(([category, techs]) => (
          <motion.div
            key={category}
            className="bg-dark rounded-xl p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-charcoal-darkest mb-4 border-b border-charcoal pb-2">
              {category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {techs.map((tech) => (
                <div
                  key={tech._key}
                  className="flex items-center gap-2 bg-beige-darkest rounded-lg px-3 py-2 hover:bg-beige transition-colors group"
                  title={tech.name}
                >
                  <TechnologyIcon svgIcon={tech.svgIcon} name={tech.name} />
                  <span className="text-charcoal text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default function About() {
  const [author, setAuthor] = useState<Author | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<Author[]>(
        `*[_type == "author"]{
          name,
          tagline,
          bio,
          "authorImage": image.asset->url,
          resume,
          technologies[]{
            _key,
            name,
            category,
            svgIcon
          }
        }`
      )
      .then((data) => setAuthor(data[0] ?? null))
      .catch(console.error)
  }, [])

  if (!author) return <PageLoading />

  return (
    <>
      <SEO
        title="About Me"
        description={author.tagline ?? `Learn more about ${author.name} - Developer, Designer, and Entrepreneur.`}
        url="/about"
        type="profile"
        image={author.authorImage}
      />
      <PersonStructuredData
        name={author.name}
        description={author.tagline ?? 'Developer, Designer, and Entrepreneur'}
        image={author.authorImage}
        url="/about"
        sameAs={[
          'https://www.instagram.com/justinnaps8/',
          'https://www.linkedin.com/in/justin-t-nappi/',
          'https://www.youtube.com/@justinnappi-dev',
          'https://github.com/JSakuraa',
        ]}
      />
      <main className="relative bg-primary min-h-screen py-12">
        <div className="container mx-auto px-6 lg:px-20">
          <motion.section
            className="bg-dark rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center lg:items-start p-8 lg:p-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {author.authorImage && (
              <motion.img
                src={urlFor(author.authorImage).url()}
                alt={author.name}
                className="rounded-full w-32 h-32 lg:w-64 lg:h-64 object-cover mb-6 lg:mb-0 lg:mr-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              />
            )}

            <div className="flex-1 text-center lg:text-left">
              <motion.h1
                className="cursive text-4xl lg:text-6xl text-charcoal-darkest mb-2"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Hey! I&apos;m <span className="text-orange">{author.name}</span>
              </motion.h1>

              {author.tagline && (
                <motion.p
                  className="text-xl text-charcoal mb-6 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                >
                  {author.tagline}
                </motion.p>
              )}

              <motion.div
                className="prose prose-lg text-charcoal mx-auto lg:mx-0 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {author.bio && <PortableText value={author.bio} />}
              </motion.div>

              {author.resume && (
                <motion.a
                  href={author.resume}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="inline-block text-orange border border-orange px-6 py-3 rounded-full hover:bg-orange hover:text-white transition-all text-lg font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  View My Resume &rarr;
                </motion.a>
              )}
            </div>
          </motion.section>

          {author.technologies && author.technologies.length > 0 && (
            <TechnologiesSection technologies={author.technologies} />
          )}
        </div>
      </main>
    </>
  )
}
