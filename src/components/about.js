import BlockContent from "@sanity/block-content-to-react";
import ImageUrlBuilder from "@sanity/image-url";
import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import { motion } from "framer-motion"; // Importing framer-motion

const builder = ImageUrlBuilder(sanityClient);
function urlFor(source) {
    return builder.image(source);
}

export default function About() {
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "author"]{
            name,
            bio,
            "authorImage": image.asset->url,
            resume
        }`
            )
            .then((data) => setAuthor(data[0]))
            .catch(console.error);
    }, []);

    if (!author) return <div>Loading...</div>;

    return (
        <main className="relative bg-primary min-h-screen flex items-center justify-center py-12">
            <div className="container mx-auto px-6 lg:px-20">
                <motion.section
                    className="bg-dark rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center lg:items-start p-8 lg:p-12"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Image */}
                    <motion.img
                        src={urlFor(author.authorImage).url()}
                        alt={author.name}
                        className="rounded-full w-32 h-32 lg:w-64 lg:h-64 object-cover mb-6 lg:mb-0 lg:mr-12"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    />

                    <div className="flex-1 text-center lg:text-left">
                        <motion.h1
                            className="cursive text-4xl lg:text-6xl text-charcoal-darkest mb-6"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            Hey! I'm <span className="text-orange">{author.name}</span>
                        </motion.h1>

                        <motion.div
                            className="prose prose-lg text-charcoal mx-auto lg:mx-0 mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            <BlockContent
                                blocks={author.bio}
                                projectId="dbnnjc3i"
                                dataset="production"
                            />
                        </motion.div>

                        <motion.a
                            href="https://drive.google.com/file/d/1eJJCePkKDM-uS4xBgLLmrxejR6_QHIRX/view?usp=sharing"
                            rel="noopener noreferrer"
                            target="_blank"
                            className="inline-block text-orange border border-orange px-6 py-3 rounded-full hover:bg-orange hover:text-white transition-all text-lg font-semibold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            View My Resume →
                        </motion.a>
                    </div>
                </motion.section>
            </div>
        </main>
    );
}
