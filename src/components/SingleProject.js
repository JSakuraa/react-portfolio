import ImageUrlBuilder from "@sanity/image-url";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client";
import BlockContent from "@sanity/block-content-to-react";

const builder = ImageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function SingleProject() {
  const [singleProject, setSingleProject] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
            title,
            _id,
            slug,
            place,
            link,
            projectType,
            mainImage{
                asset->{
                    _id,
                    url
                }
            },
            body,
        }`
      )
      .then((data) => setSingleProject(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!singleProject) return <div>Loading...</div>;

  return (
    <main className="bg-primary min-h-screen p-12">
      <article className="container shadow-lg mx-auto bg-orange rounded-lg">
        <header className="relative">
          <div className="absolute h-full w-full flex items-center justify-center p-8">
            <div className="bg-light bg-opacity-75 rounded p-12">
              <h1 className="cursive text-3xl lg:text-6xl mb-4 text-white">
                {singleProject.title}
              </h1>
              <p className="cursive flex items-center pl-2 text-xl text-orange">
                {singleProject.place}
              </p>
              <p className="cursive flex items-center pl-2 text-xl text-orange">
                {singleProject.projectType}
              </p>
            </div>
          </div>
          <img
            src={singleProject.mainImage.asset.url}
            alt={singleProject.title}
            className="w-full object-cover rounded-t"
            style={{ height: "400px" }}
          />
        </header>
        <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full">
          <a
            href={singleProject.link}
            rel="noopener noreffer"
            target="_blank"
            className="text-orange text-bold hover:underline text-xl"
          >
            Project Site{" "}
            <span role="img" aria-label="right-pointer">
              👉
            </span>
          </a>
          <BlockContent
            blocks={singleProject.body}
            projectId="dbnnjc3i"
            dataset="production"
          />
        </div>
      </article>
    </main>
  );
}
