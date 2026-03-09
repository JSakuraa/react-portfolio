import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import imageUrlBuilder from "@sanity/image-url";
import getYouTubeID from "get-youtube-id";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          src={urlFor(value).url()}
          alt={value.alt || ""}
          className="rounded-lg my-4"
        />
      );
    },
    youtube: ({ value }) => {
      const id = getYouTubeID(value.url);
      if (!id) return null;
      return (
        <div className="aspect-video my-4">
          <iframe
            title="YouTube Video"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    },
  },
};

export default function SingleProject() {
  const [singleProject, setSingleProject] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == $slug][0]{
          title,
          _id,
          slug,
          place,
          link,
          projectType,
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
      .then(setSingleProject)
      .catch(console.error);
  }, [slug]);

  if (!singleProject) return <div className="text-charcoal text-center p-12">Loading...</div>;

  return (
    <main className="bg-primary min-h-screen p-8">
      <motion.article
        className="max-w-5xl mx-auto rounded-lg shadow-lg overflow-hidden bg-light"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <header className="relative w-full">
          <img
            src={singleProject.mainImage.asset.url}
            alt={singleProject.title}
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
            <h1 className="text-3xl sm:text-5xl font-bold text-charcoal mb-2">
              {singleProject.title}
            </h1>
            <p className="text-lg text-orange mb-1">{singleProject.place}</p>
            <p className="text-lg text-orange">{singleProject.projectType}</p>
          </motion.div>

          <div className="mb-6">
            <motion.a
              href={singleProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange text-white font-semibold px-6 py-3 rounded hover:bg-orange-dark transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Visit Project →
            </motion.a>
          </div>

          <div className="prose prose-lg max-w-none text-charcoal">
            <PortableText
              value={singleProject.body}
              components={portableTextComponents}
            />
          </div>
        </div>
      </motion.article>
    </main>
  );
}
