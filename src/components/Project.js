import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client";

export default function Project() {
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
            tags
        }`
            )
            .then((data) => setProjectData(data))
            .catch(console.error);
    }, []);

    return (
        <main className="bg-primary min-h-screen p-12">
            <section className="container mx-auto">
                <h1 className="text-5xl text-orange flex justify-center cursive mb-4">
                    My Projects
                </h1>
                <h2 className="text-lg text-charcoal flex justify-center mb-12">
                    Below you can find all of my work
                </h2>
                <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-12">
                    {projectData &&
                        projectData.map((project) => (
                            <article className="relative rounded-lg border border-beige-darkest shadow-md bg-dark p-10 transition-transform hover:scale-105 duration-300">
                                <Link to={`/project/${project.slug.current}`} key={project.slug.current}>
                                    <h3 className="text-3xl font-bold text-charcoal-darkest mb-2 hover:text-orange transition-colors">
                                        {project.title}
                                    </h3>
                                </Link>
                                <div className="text-sm text-charcoal-light uppercase tracking-wide mb-4 space-x-4">
                                    <span>{new Date(project.date).toLocaleDateString()}</span>
                                    <span>• {project.place}</span>
                                    <span>• {project.projectType}</span>
                                </div>
                                <p className="text-charcoal text-base leading-relaxed mb-6">
                                    {project.description}
                                </p>
                                <div className="flex space-x-6">
                                    <a
                                        href={project.link}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        className="text-orange hover:underline font-semibold text-lg"
                                    >
                                        Visit Site →
                                    </a>
                                    <Link
                                        to={`/project/${project.slug.current}`}
                                        className="text-orange hover:underline font-semibold text-lg"
                                    >
                                        Learn More →
                                    </Link>
                                </div>
                            </article>
                        ))}
                </section>
            </section>
        </main>

    );
}
