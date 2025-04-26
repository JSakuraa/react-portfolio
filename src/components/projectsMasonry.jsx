import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client";

export default function ProjectsMasonry() {
    const [projectData, setProjectData] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(
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
            .then((data) => setProjectData(data))
            .catch(console.error);
    }, []);

    return (
        <main className="bg-primary min-h-screen p-12">
            <section className="container mx-auto">
                <h1 className="text-5xl text-orange flex justify-center cursive mb-16">
                    My Projects
                </h1>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectData &&
                        projectData.map((project, index) => (
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
                                        <Link to={`/project/${project.slug.current}`}>
                                            {project.title}
                                        </Link>
                                    </h3>
                                    <p className="text-charcoal text-sm mb-4">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <a
                                            href={project.link}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                            className="text-orange font-semibold hover:underline text-base"
                                        >
                                            Visit →
                                        </a>
                                        <Link
                                            to={`/project/${project.slug.current}`}
                                            className="text-orange font-semibold hover:underline text-base"
                                        >
                                            Learn More →
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                </section>
            </section>
        </main>
    );
}
