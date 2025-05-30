import React, { useState, useEffect } from "react";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion"; // Importing framer-motion for animations

const words = ["Developer", "Designer", "Video Game Enthusiast", "Entrepreneur"];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  // typeWriter effect
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

  // Blinking effect for the cursor
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  return (
    <main className="bg-primary">
      <section className="flex flex-col text-left justify-center min-h-screen pt-8 px-8">
        {/* Title Animation */}
        <motion.h1
          className="text-7xl py-3 text-charcoal font-bold cursive leading-none lg:leading-snug lg:text-9xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Justin Nappi
        </motion.h1>

        {/* Typewriter Effect with Animation */}
        <motion.h1
          className="text-5xl py-3 text-orange cursive leading-none lg:leading-snug lg:text-7xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
        </motion.h1>

        {/* Social Icons with Animation */}
        <motion.div
          className="flex justify-start mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <SocialIcon
            url="https://www.instagram.com/justinnaps8/"
            className="mr-4"
            target="_blank"
            fgColor="#F9FAFB"
            style={{ height: 35, width: 35 }}
          />
          <SocialIcon
            url="https://www.linkedin.com/in/justin-t-nappi/"
            className="mr-4"
            target="_blank"
            fgColor="#F9FAFB"
            style={{ height: 35, width: 35 }}
          />
          <SocialIcon
            url="https://www.youtube.com/@justinnappi-dev"
            className="mr-4"
            target="_blank"
            fgColor="#F9FAFB"
            style={{ height: 35, width: 35 }}
          />
          <SocialIcon
            url="https://github.com/JSakuraa"
            className="mr-4"
            target="_blank"
            fgColor="#F9FAFB"
            style={{ height: 35, width: 35 }}
          />
        </motion.div>
      </section>
    </main>
  );
}
