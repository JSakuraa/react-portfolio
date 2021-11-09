import React, { useState, useEffect } from "react";
import { SocialIcon } from "react-social-icons";
const words = ["Developer", "Designer", "Entreprenuer", "Video Game Enthusiast"];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  // typeWriter
  useEffect(() => {
    if (index === words.length) return;
    if (
      subIndex === words[index].length + 1 &&
      index !== words.length - 1 &&
      !reverse
    ) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => prev + 1);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, parseInt(Math.random() * 350)));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  // blinker
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  return (
    <main className="bg-primary">
      <section className="felx relative justify-center min-h-screen pt-12 lg:pt-64 px-8">
        <h1 className="text-7xl py-3 text-white font-bold cursive leading-none lg:leading-snug lg:text-9xl">Justin Nappi</h1>
        <h1 className="text-5xl py-3 text-orange cursive leading-none lg:leading-snug lg:text-7xl">{`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}</h1>
        <div>
            <SocialIcon url="https://www.instagram.com/justinnaps8/" className="mr-4" target="_blank" fgColor="#F9FAFB" stylel={{ height: 35, width: 35 }}/>
            <SocialIcon url="https://www.linkedin.com/in/justin-t-nappi/" className="mr-4" target="_blank" fgColor="#F9FAFB" stylel={{ height: 35, width: 35 }}/>
            <SocialIcon url="https://www.youtube.com/c/jsakuraa" className="mr-4" target="_blank" fgColor="#F9FAFB" stylel={{ height: 35, width: 35 }}/>
            <SocialIcon url="https://github.com/JSakuraa" className="mr-4" target="_blank" fgColor="#F9FAFB" stylel={{ height: 35, width: 35 }}/>
        </div>
      </section>
    </main>
  );
}
