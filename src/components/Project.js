import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../client";

export default function Project() {
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project"]{
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
        <h1 className="text-5xl text-orange flex justify-center cursive">
          My Projects
        </h1>
        <h2 className="text-lg text-white flex justify-center mb-12">
          Below you can find all of my work
        </h2>
        <section className="grid md:grid-cols-2 gap-8">
          {projectData &&
            projectData.map((project, index) => (
              <article className="relative rounded-lg shadow-xl bg-dark p-16">
                <Link
                  to={"/project/" + project.slug.current}
                  key={project.slug.current}
                >
                  <h3 className="text-white text-3xl font-bold mb-2 hover:text-orange">
                    {project.title}
                  </h3>
                </Link>
                <div className="text-white text-xs space-x-4">
                  <span>
                    <strong className="font-bold">Finished on</strong>:{" "}
                    {new Date(project.date).toLocaleDateString()}
                  </span>
                  <span>
                    <strong className="font-bold">Company</strong>:{" "}
                    {project.place}
                  </span>
                  <span>
                    <strong className="font-bold">Type</strong>:{" "}
                    {project.projectType}
                  </span>
                  <p className="my-6 text-lg text-white leading-relaxed">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    rel="noopener noreffer"
                    target="_blank"
                    className="text-orange text-bold hover:underline text-xl"
                  >
                    Project Site{" "}
                    <span role="img" aria-label="right-pointer">
                      👉
                    </span>
                  </a>
                  <br/>
                  <Link
                    to={"/project/" + project.slug.current}
                    key={project.slug.current}
                  >
                    <span className="text-orange text-bold hover:underline text-xl">
                      Learn More
                    </span>
                  </Link>
                </div>
              </article>
            ))}
        </section>
      </section>
    </main>
  );
}
