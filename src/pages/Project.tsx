import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { motion } from 'framer-motion'
import { sanityClient } from '../lib/sanity'
import { portableTextComponents } from '../lib/portableText'
import { PageLoading, SEO, ProjectStructuredData } from '../components'
import type { SingleProjectData } from '../types/sanity'

export default function Project() {
  const [project, setProject] = useState<SingleProjectData | null>(null)
  const { slug } = useParams<{ slug: string }>()

  useEffect(() => {
    sanityClient
      .fetch<SingleProjectData>(
        `*[slug.current == $slug][0]{
          title,
          _id,
          slug,
          place,
          link,
          projectType,
          description,
          date,
          mainImage {
            asset->{
              _id,
              url
            }
          },
          body
        }`,
        { slug }
      )
      .then(setProject)
      .catch(console.error)
  }, [slug])

  if (!project) return <PageLoading />

  return (
    <>
      <SEO
        title={project.title}
        description={`${project.title} - ${project.projectType ?? 'Project'} by Justin Nappi`}
        url={`/project/${project.slug.current}`}
        image={project.mainImage.asset.url}
      />
      <ProjectStructuredData
        title={project.title}
        description={`${project.projectType ?? 'Project'} by Justin Nappi`}
        image={project.mainImage.asset.url}
        url={`/project/${project.slug.current}`}
      />
      <main className="bg-primary min-h-screen p-8">
        <motion.article
          className="max-w-5xl mx-auto rounded-lg shadow-lg overflow-hidden bg-light"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <header className="relative w-full">
            <img
              src={project.mainImage.asset.url}
              alt={project.title}
              className="w-full h-80 sm:h-96 object-cover"
            />
          </header>

          <div className="p-6 md:p-12">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-5xl font-bold text-charcoal mb-2">{project.title}</h1>
              {project.place && <p className="text-lg text-orange mb-1">{project.place}</p>}
              {project.projectType && <p className="text-lg text-orange">{project.projectType}</p>}
            </motion.div>

            {project.link && (
              <div className="mb-6">
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-orange text-white font-semibold px-6 py-3 rounded hover:bg-orange-dark transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Visit Project &rarr;
                </motion.a>
              </div>
            )}

            <div className="prose prose-lg max-w-none text-charcoal">
              {project.body && (
                <PortableText value={project.body} components={portableTextComponents} />
              )}
            </div>
          </div>
        </motion.article>
      </main>
    </>
  )
}
