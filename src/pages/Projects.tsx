import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { sanityClient } from '../lib/sanity'
import { PageLoading, SEO } from '../components'
import type { ProjectListItem } from '../types/sanity'

export default function Projects() {
  const [projects, setProjects] = useState<ProjectListItem[] | null>(null)

  useEffect(() => {
    sanityClient
      .fetch<ProjectListItem[]>(
        `*[_type == "project"] | order(date desc){
          title,
          slug,
          date,
          place,
          description,
          projectType,
          link,
          tags,
          mainImage {
            asset -> {
              _id,
              url
            }
          }
        }`
      )
      .then((data) => setProjects(data))
      .catch(console.error)
  }, [])

  if (!projects) return <PageLoading />

  return (
    <>
      <SEO
        title="Projects"
        description="Explore my portfolio of projects including web development, design, and more."
        url="/project"
      />
      <main className="bg-primary min-h-screen p-12">
        <section className="container mx-auto">
          <h1 className="text-5xl text-orange flex justify-center cursive mb-16">My Projects</h1>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.slug.current}
                className="break-inside-avoid rounded-lg overflow-hidden bg-dark shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <img
                  src={project.mainImage.asset.url}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-charcoal-darkest mb-2 hover:text-orange transition-colors">
                    <Link to={`/project/${project.slug.current}`}>{project.title}</Link>
                  </h3>
                  <p className="text-charcoal text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-4">
                    {project.link && (
                      <a
                        href={project.link}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-orange font-semibold hover:underline text-base"
                      >
                        Visit &rarr;
                      </a>
                    )}
                    <Link
                      to={`/project/${project.slug.current}`}
                      className="text-orange font-semibold hover:underline text-base"
                    >
                      Learn More &rarr;
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </section>
        </section>
      </main>
    </>
  )
}
