"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Animation variants
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

// Values data
const values = [
    {
        icon: "🎯",
        title: "Excellence",
        description:
            "We strive for excellence in every engagement, delivering measurable value and tangible results to our clients.",
    },
    {
        icon: "🤝",
        title: "Partnership",
        description:
            "We work as true partners with our clients, ensuring long-term success through deep collaboration and shared goals.",
    },
    {
        icon: "💡",
        title: "Innovation",
        description:
            "We stay at the forefront of data and AI technologies to bring cutting-edge solutions to our clients.",
    },
    {
        icon: "🔒",
        title: "Trust",
        description:
            "We build lasting relationships based on transparency, integrity, and consistent delivery of value.",
    },
    {
        icon: "📊",
        title: "Data-Driven",
        description:
            "We practice what we preach, making decisions based on data and measurable outcomes.",
    },
    {
        icon: "🚀",
        title: "Impact",
        description:
            "We focus on transformative solutions that create lasting positive change for our clients.",
    },
];

export default function AboutPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section with fade in animation */}
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
                        <motion.p
                            variants={fadeIn}
                            className="text-xl text-gray-600 mb-8"
                        >
                            Neural Nexus Strategies combines deep expertise in
                            data science, AI, and executive leadership to help
                            organizations thrive in the data-driven economy.
                        </motion.p>
                    </div>
                </div>
            </motion.section>

            {/* Mission Section with stagger effect */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="py-16"
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="grid gap-8">
                            <motion.div variants={fadeIn}>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    Our Mission
                                </h2>
                                <p className="text-gray-600">
                                    We empower organizations to leverage data
                                    and AI for strategic advantage, ensuring
                                    they not only survive but thrive in an
                                    increasingly data-driven world.
                                </p>
                            </motion.div>
                            <motion.div variants={fadeIn}>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    Our Vision
                                </h2>
                                <p className="text-gray-600">
                                    To be the trusted partner for organizations
                                    seeking to transform their operations
                                    through data leadership.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Leadership Team Section with scale animation */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="py-16 bg-gray-50"
            >
                <div className="container mx-auto px-4">
                    <motion.h2
                        variants={fadeIn}
                        className="text-3xl font-bold text-center text-gray-900 mb-12"
                    >
                        Our Leadership Team
                    </motion.h2>
                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {/* Whit Walters */}
                        <motion.div
                            variants={scaleIn}
                            className="flex flex-col items-center text-center"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="w-48 h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full mb-6 flex items-center justify-center"
                            >
                                <span className="text-6xl">WW</span>
                            </motion.div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Whit Walters
                            </h3>
                            <p className="text-primary-600 font-medium mb-4">
                                CEO, Co-Founder & Chief Data Officer
                            </p>
                            <p className="text-gray-600 mb-4">
                                With extensive experience in data strategy and
                                organizational transformation, Whit leads Neural
                                Nexus Strategies' mission to help organizations
                                leverage data for strategic advantage.
                            </p>
                        </motion.div>

                        {/* Jay Swartz */}
                        <motion.div
                            variants={scaleIn}
                            className="flex flex-col items-center text-center"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="w-48 h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full mb-6 flex items-center justify-center"
                            >
                                <span className="text-6xl">JS</span>
                            </motion.div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Jay Swartz
                            </h3>
                            <p className="text-primary-600 font-medium mb-4">
                                Chief Data Scientist & Co-Founder
                            </p>
                            <p className="text-gray-600 mb-4">
                                A pioneer in applied AI and machine learning,
                                Jay brings deep technical expertise and
                                practical experience in implementing AI
                                solutions across industries.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Values Section with stagger effect */}
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
                                    <span className="text-2xl">
                                        {value.icon}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* CTA Section with fade in */}
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
                        Let's discuss how our team can help you achieve your
                        data and AI goals.
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            size="lg"
                            className="bg-white text-primary-600 hover:bg-primary-50"
                            asChild
                        >
                            <Link href="/book-call">
                                Schedule a Consultation
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
}
