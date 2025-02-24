// Path: src/components/about/AboutContent.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { BookDiscoveryButton } from "@/components/features/booking/BookDiscoveryButton";
import { Linkedin } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const values = [
  {
    icon: "🎯",
    title: "Data-Driven Excellence",
    description:
      "We believe in making decisions backed by robust data and analytics",
  },
  {
    icon: "🤝",
    title: "Collaborative Innovation",
    description: "Working together to create transformative solutions",
  },
  {
    icon: "💡",
    title: "Strategic Vision",
    description: "Looking ahead to shape the future of AI and data",
  },
];

type LeadershipProfileProps = {
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  linkedInUrl: string;
  ctaText: string;
  ctaLink: string;
  isImageLeft: boolean;
  extraLink?: { text: string; url: string };
};

function LeadershipProfile({
  name,
  title,
  bio,
  imageUrl,
  linkedInUrl,
  ctaText,
  ctaLink,
  isImageLeft,
  extraLink,
}: LeadershipProfileProps) {
  const profileContent = (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="aspect-square rounded-lg overflow-hidden relative mb-6"
      >
        <CldImage
          width={400}
          height={400}
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
          priority
          format="webp"
          quality={100}
        />
      </motion.div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
      <p className="text-primary-600 font-medium mb-4">{title}</p>
      <div className="space-y-3">
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
        >
          <Linkedin size={20} />
          <span>Connect on LinkedIn</span>
        </a>
        {extraLink && (
          <a
            href={extraLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-primary-600 hover:text-primary-700 transition-colors"
          >
            {extraLink.text}
          </a>
        )}
      </div>
    </>
  );

  const bioContent = (
    <div className="prose prose-lg">
      <p className="text-gray-600 leading-relaxed">{bio}</p>
      <div className="mt-6">
        <Link href={ctaLink}>
          <Button variant="outline" className="mt-4">
            {ctaText}
          </Button>
        </Link>
      </div>
    </div>
  );

  return (
    <motion.div
      variants={fadeIn}
      className="grid md:grid-cols-12 gap-8 items-start"
    >
      {isImageLeft ? (
        <>
          <div className="md:col-span-4">{profileContent}</div>
          <div className="md:col-span-8">{bioContent}</div>
        </>
      ) : (
        <>
          <div className="md:col-span-8">{bioContent}</div>
          <div className="md:col-span-4">{profileContent}</div>
        </>
      )}
    </motion.div>
  );
}

const leadershipData = [
  {
    name: "Whit Walters",
    title: "CEO, Co-Founder & Chief Data Officer",
    bio: "Whit Walters leads Neural Nexus Strategies, empowering organizations to win in the age of AI. He translates complex data challenges into strategic opportunities, building the robust data foundations essential for successful AI adoption. A recognized leader in cloud computing and data strategy, Whit's insights have been shared at industry events like Google Next. He brings extensive experience in organizational transformation and a deep understanding of the challenges businesses face. He helps companies develop data-driven strategies and provides executive-level guidance on data governance, architecture, and team building.",
    imageUrl: "Full_Res-33_Master_lpbddp",
    linkedInUrl: "https://www.linkedin.com/in/whitwalters/",
    ctaText: "Learn more about our Fractional CDO services",
    ctaLink: "/services/fractional-cdo",
    isImageLeft: true,
  },
  {
    name: "Jay Swartz",
    title: "Chief Data Scientist & Co-Founder",
    bio: "Jay Swartz is a pioneer in applied AI and machine learning, driving innovation at Neural Nexus Strategies. He brings deep technical expertise and a practical approach to implementing AI solutions, helping businesses unlock the power of artificial intelligence. His expertise spans natural language processing, predictive modeling, and computer vision, enabling him to develop cutting-edge AI solutions across diverse industries. Jay has extensive experience helping businesses successfully implement AI and machine learning solutions, from initial strategy to deployment and ongoing optimization. A prolific inventor with multiple AI patents, Jay is also passionate about exploring the future of AI and AGI on AGIish.com.",
    imageUrl: "JaySwartz2017_bqznnf",
    linkedInUrl: "https://www.linkedin.com/in/jaywswartz/",
    ctaText: "Learn more about our AI services",
    ctaLink: "/services",
    isImageLeft: false,
    extraLink: {
      text: "Visit Jay's AGIish.com",
      url: "https://agiish.com/",
    },
  },
];

export default function AboutContent() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="pt-24 pb-16 bg-gradient-to-b from-primary-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Transforming Organizations Through Data Leadership
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl text-gray-600 mb-8">
              Neural Nexus Strategies combines deep expertise in data science,
              AI, and executive leadership to help organizations thrive in the
              data-driven economy.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-24 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
            {/* Mission */}
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <div className="prose prose-lg">
                <p className="text-gray-600">
                  To empower organizations with the expertise and strategy
                  needed to harness the transformative power of AI and data,
                  ensuring they thrive in an increasingly data-driven world.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Vision
              </h2>
              <div className="prose prose-lg">
                <p className="text-gray-600">
                  To be the trusted partner that bridges the gap between
                  technological innovation and business success, creating a
                  future where every organization can confidently leverage AI
                  and data to achieve their goals.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Leadership Team Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-24 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-gray-900 mb-16 max-w-5xl mx-auto"
          >
            Our Leadership Team
          </motion.h2>
          <div className="max-w-5xl mx-auto space-y-24">
            {leadershipData.map((profile) => (
              <LeadershipProfile key={profile.name} {...profile} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={fadeIn}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Our Values
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -10 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{value.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="py-16 bg-primary-600"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Organization?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how our team can help you achieve your data and AI
            goals.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <BookDiscoveryButton
              size="lg"
              className="bg-white text-primary-600 hover:bg-primary-50"
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
