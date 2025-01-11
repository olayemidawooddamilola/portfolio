"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaFolderOpen, FaHandshake, FaArrowRight } from "react-icons/fa";

export default function Home() {
  // Animation Variants for different sections
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const fadeInLeftVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const fadeInRightVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const scaleUpVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1.2 } },
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isInView, setIsInView] = useState({
    home: false,
    about: false,
    portfolio: false,
    footer: false,
    skills: false, // Add this line for the skills section
  });
  
  const [hasAnimated, setHasAnimated] = useState<{
    home: boolean;
    about: boolean;
    portfolio: boolean;
    footer: boolean;
    skills: boolean; // Add this line for the skills section
  }>({
    home: false,
    about: false,
    portfolio: false,
    footer: false,
    skills: false, // Add this line for the skills section
  });
  

  const sectionsRef = useRef<{
    home: HTMLElement | null;
    about: HTMLElement | null;
    portfolio: HTMLElement | null;
    footer: HTMLElement | null;
    skills: HTMLElement | null;  // Add skills here
  }>({
    home: null,
    about: null,
    portfolio: null,
    footer: null,
    skills: null,  // Initialize skills here
  });
  
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated[entry.target.id as keyof typeof hasAnimated]) {
        const section = entry.target.id;
        setIsInView((prevState) => ({ ...prevState, [section]: true }));
        setHasAnimated((prevState) => ({ ...prevState, [section]: true }));
      }
    });
  }, [hasAnimated]);
  

  useEffect(() => {
    const options = {
      threshold: 0.5, // Trigger when 50% of the section is visible
    };
    const observer = new IntersectionObserver(handleIntersection, options);
  
    const sectionRefs = Object.values(sectionsRef.current);
    sectionRefs.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });
  
    return () => {
      sectionRefs.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [hasAnimated, handleIntersection]);
  

  const skillImages = [
    "/react.png",
    "/reactnative.png",
    "/php.png",
    "/python.png",
    "/bootstrap.png",
    "/laravel.png",
    "/javascript.png",
    "/mysql.png",
    "/next.png",
    "/powerbi.png",
    "/css.png",
    "/excel.png",
    "/html.png",
    "/nodejs.png",
  ];

  const projects = [
    {
      title: "Subsidized E-commerce Platform",
      description:
        "Developed a responsive platform where the government sells goods at subsidized prices to citizens. Integrated payment gateway for seamless transactions.",
      image: "/subsidized-ecommerce.png",
    },
    {
      title: "School Management Finance System",
      description:
        "Developed a comprehensive system for managing school finances, including budgeting, fee tracking, and financial reporting.",
      image: "/school-finance.png",
    },
    {
      title: "Analytics Dashboard for Decision Making",
      description:
        "Developed an interactive analytics dashboard to help software companies make data-driven decisions, using Power BI for visualization and insights.",
      image: "/analytics-dashboard.png",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#1e1e2f] to-[#121212] text-white font-['Poppins']">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-[#1e1e2f] z-50 p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-[#ff5722]">Olayemi</span> <span className="text-[#4caf50]">Dawood</span> <span className="text-[#2196f3]">Damilola</span>
          </Link>
          <div className="sm:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="hidden sm:flex space-x-6">
            <Link href="#home" className="hover:text-[#ff5722]">Home</Link>
            <Link href="#about" className="hover:text-[#4caf50]">About</Link>
            <Link href="#portfolio" className="hover:text-[#2196f3]">Portfolio</Link>
            <Link href="#footer" className="hover:text-[#ff5722]">Contact</Link>
          </div>
        </div>
        {isOpen && (
          <div className="sm:hidden bg-[#121212] p-4">
            <Link href="#home" className="block text-white hover:text-[#ff5722]">Home</Link>
            <Link href="#about" className="block text-white hover:text-[#4caf50]">About</Link>
            <Link href="#portfolio" className="block text-white hover:text-[#2196f3]">Portfolio</Link>
            <Link href="#footer" className="block text-white hover:text-[#ff5722]">Contact</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header
        id="home"
        ref={(el) => { sectionsRef.current.home = el; }}
        className="text-center flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1e1e2f] to-[#121212]"
      >
        <motion.div variants={scaleUpVariants} initial="hidden" animate={isInView.home ? "visible" : "hidden"}>
          <Image
            src="/logo.jpg"
            alt="Olayemi Dawood Damilola"
            width={150}
            height={150}
            className="rounded-full border-4 border-[#ff5722] shadow-lg"
          />
        </motion.div>
        <motion.h2 variants={fadeInLeftVariants} initial="hidden" animate={isInView.home ? "visible" : "hidden"} className="text-5xl font-extrabold mt-6">
          Hi, I'm Olayemi Dawood Damilola
        </motion.h2>
        <motion.p variants={fadeInLeftVariants} initial="hidden" animate={isInView.home ? "visible" : "hidden"} className="text-lg max-w-xl mt-4">
          A passionate Full-Stack Developer & Data Analyst.
        </motion.p>
        <motion.div className="flex space-x-4 mt-6" variants={fadeInUpVariants} initial="hidden" animate={isInView.home ? "visible" : "hidden"}>
          <Link
            href="#portfolio"
            className="flex items-center bg-[#ff5722] px-6 py-3 rounded-lg text-white hover:bg-[#ff784e]"
          >
            <FaFolderOpen className="mr-2" /> View My Work
          </Link>
          <Link
            href="#footer"
            className="flex items-center border-2 border-[#4caf50] px-6 py-3 rounded-lg text-[#4caf50] hover:bg-[#4caf50] hover:text-white"
          >
            <FaHandshake className="mr-2" /> Hire Me
          </Link>
        </motion.div>
      </header>

      {/* About Section */}
      <section
        id="about"
        ref={(el: HTMLElement | null) => { if (el) sectionsRef.current.about = el; }}
        className="py-16 bg-[transparent] text-center"
      >

        <motion.h2 variants={fadeInUpVariants} initial="hidden" animate={isInView.about ? "visible" : "hidden"} className="text-3xl font-semibold mb-6">
          About Me
        </motion.h2>
        <motion.p variants={fadeInUpVariants} initial="hidden" animate={isInView.about ? "visible" : "hidden"} className="text-lg max-w-4xl mx-auto mb-6">
          I specialize in building responsive web applications, crafting seamless user experiences, and creating scalable backend systems. With expertise in full-stack development, I build efficient server-side applications, integrate APIs, and ensure robust database management. I also develop Android applications with modern frameworks, delivering intuitive and user-friendly mobile solutions. Additionally, I extract meaningful insights from data to drive business success, leveraging tools like Power BI and advanced analytics to create data-driven strategies.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <motion.div
            variants={fadeInLeftVariants}
            initial="hidden"
            animate={isInView.about ? "visible" : "hidden"}
            className="bg-[#1e1e2f] p-6 rounded-lg shadow-md hover:border-[#4caf50]"
          >
           <h3 className="text-xl font-semibold mb-2">Frontend Development</h3>
            <p>Creating user-friendly and visually appealing interfaces.</p>
          </motion.div>
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate={isInView.about ? "visible" : "hidden"}
            className="bg-[#1e1e2f] p-6 rounded-lg shadow-md hover:border-[#4caf50]"
          >
            <h3 className="text-xl font-semibold mb-2">Backend Development</h3>
            <p>Building secure and scalable server-side applications.</p>
          </motion.div>
          <motion.div
            variants={fadeInRightVariants}
            initial="hidden"
            animate={isInView.about ? "visible" : "hidden"}
            className="bg-[#1e1e2f] p-6 rounded-lg shadow-md hover:border-[#4caf50]"
          >
            <h3 className="text-xl font-semibold mb-2">Data Analysis</h3>
            <p>Transforming raw data into actionable insights.</p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        ref={(el: HTMLElement | null) => { sectionsRef.current.skills = el; }}
        className="py-16 bg-[#121212] text-center"
      >
        <motion.h2
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView.skills ? "visible" : "hidden"}
          className="text-3xl font-semibold mb-6 text-white"
        >
          My Skills
        </motion.h2>
        <motion.p
          variants={fadeInUpVariants}
          initial="hidden"
          animate={isInView.skills ? "visible" : "hidden"}
          className="text-lg max-w-4xl mx-auto mb-6 text-gray-400"
        >
          As a full-stack developer and data analyst, I have a wide range of technical skills that help me build robust, scalable applications and extract valuable insights from data. Below are the key technologies I work with.
        </motion.p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {skillImages.map((src, index) => (
            <motion.div
              key={index}
              variants={fadeInUpVariants}
              initial="hidden"
              animate={isInView.skills ? "visible" : "hidden"}
              className="bg-[#1e1e2f] p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              {/* Adjusted image size */}
              <Image src={src} alt={`Skill ${index}`} width={80} height={80} className="mx-auto" />
            </motion.div>
          ))}
        </div>
      </section>

      <section
        id="portfolio"
        ref={(el) => { sectionsRef.current.portfolio = el; }}
        className="py-16 bg-transparent text-center"
      >
        <h2 className="text-3xl font-semibold mb-6 text-white">
          My Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-[#1e1e2f] p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={200}
                className="rounded-md"
              />
              <h3 className="text-xl font-semibold mt-4">{project.title}</h3>
              <p className="mt-2">{project.description}</p>
              {/* View Button with React Icon */}
              <div className="flex justify-center mt-4">
                <Link
                  href="#"
                  className="flex items-center bg-[#ff5722] text-white py-2 px-6 rounded-full hover:bg-[#ff784e] transition-all duration-300"
                >
                  <FaArrowRight className="mr-2" />
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Footer Section */}
      <footer
        id="footer"
        ref={(el: HTMLElement | null) => { sectionsRef.current.footer = el; }}
        className="py-16 bg-[#1e1e2f] text-center text-white"
      >
        <motion.div
          className="max-w-md mx-auto"
          variants={fadeInUpVariants}  // Replace rotate animation with fade-in
          initial="hidden"
          animate={isInView.footer ? "visible" : "hidden"}
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-400 mb-6">Feel free to reach out to me through any of the channels below. I'd love to connect with you!</p>
          <div className="flex justify-center space-x-6">
            <Link href="mailto:dawoodolayemi099@gmail.com" className="text-3xl text-[#ff5722] hover:text-[#ff784e]">
              <FaEnvelope />
            </Link>
            <Link href="https://github.com/EminentD" className="text-3xl text-[#ff5722] hover:text-[#ff784e]">
              <FaGithub />
            </Link>
            <Link href="https://www.linkedin.com/in/olayemi-dawood-damilola-9a9050244/" className="text-3xl text-[#ff5722] hover:text-[#ff784e]">
              <FaLinkedin />
            </Link>
          </div>
        </motion.div>
      </footer>

    </div>
  );
}
