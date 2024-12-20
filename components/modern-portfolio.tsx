"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaReact,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaJs
} from "react-icons/fa";
import { Menu, X } from "lucide-react";
import { IconType } from "react-icons";

type Section = "about" | "experience" | "skills" | "projects" | "contact";
const sections: Section[] = [
  "about",
  "experience",
  "skills",
  "projects",
  "contact",
];

// ... (previous imports and component definitions remain unchanged)

const ColorfulBackground = () => (
  <div className="fixed inset-0 z-[-1]">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop
            offset="0%"
            style={{ stopColor: "#ff9a9e", stopOpacity: 0.2 }}
          />
          <stop
            offset="50%"
            style={{ stopColor: "#fad0c4", stopOpacity: 0.2 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#ffecd2", stopOpacity: 0.2 }}
          />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad1)" />
    </svg>
  </div>
);
interface Project {
  title: string;
  description: string;
  skills: Array<{ name: string; icon: IconType }>;
  liveDemo: string;
  github: string;
}

const ProjectCard = ({ project }: { project: Project }) => (
  <motion.div
    className="bg-white rounded-lg shadow-lg p-6 flex flex-col h-full"
    whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
  >
    <h3 className="text-2xl font-bold mb-2 text-indigo-700">{project.title}</h3>
    <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {project.skills.map((skill, index) => (
        <SkillBadge key={index} skill={skill.name} icon={skill.icon} />
      ))}
    </div>
    <div className="flex justify-between mt-auto">
      <motion.a
        href={project.liveDemo}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-600 hover:text-indigo-800 font-semibold"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Live Demo
      </motion.a>
      <motion.a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-gray-800 flex items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaGithub className="mr-1" /> GitHub
      </motion.a>
    </div>
  </motion.div>
);

interface SkillBadgeProps {
  skill: string;
  icon: IconType;
}
const SkillBadge = ({ skill, icon: Icon }: SkillBadgeProps) => (
  <motion.div
    className="bg-white text-gray-800 rounded-full px-4 py-2 flex items-center shadow-md"
    whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.2)" }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="mr-2 text-indigo-600" />
    {skill}
  </motion.div>
);

export function ModernPortfolioComponent() {
  const [activeSection, setActiveSection] = useState("about");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const controls = useAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const sectionRefs: { [key in Section]: React.RefObject<HTMLDivElement> } = {
    about: useRef(null),
    experience: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  const isInView = useInView(sectionRefs.about);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const handleScroll = (section: Section) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the form data to a server
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // ... (projects array remains unchanged)
  const projects = [
    {
      title: "Ed-tech Startup Website",
      description:
        " Developed a MERN-based full-stack website for an Ed-tech startup, reducing page load time by 30% and improving user retention by 10%",
      skills: [
        { name: "React", icon: FaReact },
        { name: "Node.js", icon: FaNodeJs },
        { name: "TensorFlow", icon: FaPython },
        { name: "MongoDB", icon: FaDatabase },
      ],
      liveDemo: "https://interneex.com/",
      github: "https://github.com/shauryajatin/interneex_frontend.git",
    },
    {
      title: "Full Stack Website ",
      description:
        " Backend: Node.js, Express, MongoDB. Features: login, protected routes, contact, appointment booking, career page with file upload (Multer). Nodemailer for email. Frontend: HTML, CSS, EJS, React.js, Bootstrap, Figma.",
      skills: [
        { name: "Python", icon: FaPython },
        { name: "Node.js", icon: FaNodeJs },
        { name: "MongoDB", icon: FaDatabase },
      ],
      liveDemo: "https://pestcontrolinitialdemo.onrender.com/",
      github: "https://github.com/shankarjatin/contact_manager_backend.git",
    },
    {
      title: "Fitness Tracker Application",
      description:
        "Built a fitness tracking app, allowing users to track workout progress and manage fitness goals, resulting in a 15% increase in app usage.",
      skills: [
        { name: "Solidity", icon: FaDatabase },
        { name: "React", icon: FaReact },
        { name: "Node.js", icon: FaNodeJs },
        { name: "Ethereum", icon: FaDatabase },
      ],
      liveDemo: "https://fitness-tracker-client-three.vercel.app/",
      github: "https://github.com/shankarjatin/fitness_tracker.git",
    },
    {
      title: " Contact Management System",
      description:
        " Developed a secure backend system for contact management, allowing users to register, save contacts, and protect personal  data with secure routes and JWT authentication",
      skills: [
        { name: "Python", icon: FaPython },
        { name: "Javascript", icon: FaJs },
        { name: "MongoDB", icon: FaDatabase },
      ],
      liveDemo: "https://documenter.getpostman.com/view/24164134/2sA358eksV",
      github: "https://github.com/shankarjatin/contact_manager_backend.git",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 relative mx-30">
      <ColorfulBackground />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-md">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.h1
              className="text-3xl font-bold text-indigo-700"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Jatin Shankar Srivastava
            </motion.h1>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-indigo-600 focus:outline-none focus:text-indigo-600"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            <div className="hidden md:flex space-x-6">
              {sections.map((section) => (
                <motion.button
                  key={section}
                  onClick={() => handleScroll(section)}
                  className={`capitalize ${
                    activeSection === section
                      ? "text-indigo-600"
                      : "text-gray-600"
                  } hover:text-indigo-800 transition-colors text-lg`}
                >
                  {section}
                </motion.button>
              ))}
            </div>
          </div>
        </nav>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white"
            >
              <div className="container mx-auto px-6 py-4">
                {(Object.keys(sectionRefs) as Section[]).map((section) => (
                  <motion.button
                    key={section}
                    onClick={() => handleScroll(section)}
                    className={`block w-full text-left py-2 capitalize ${
                      activeSection === section
                        ? "text-indigo-600"
                        : "text-gray-600"
                    } hover:text-indigo-800 transition-colors text-lg`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {section}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* About Section */}
        <motion.section
          ref={sectionRefs.about}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-indigo-800">
            About Me
          </h2>
          <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg p-8">
            <motion.img
              src="https://i.ibb.co/GVWGQr3/resized-image.jpg" // Use a 1:1 aspect ratio placeholder
              alt="Profile Picture"
              className="rounded-full w-48 h-48 object-cover mb-6 md:mb-0 md:mr-8 border-4 border-indigo-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />

            <div>
              <p className="mb-4 text-lg text-gray-700 leading-relaxed">
                I’m a skilled web developer with expertise in the MERN stack,
                DevOps practices, and crafting seamless, scalable applications.
                I focus on delivering efficient, secure, and user-friendly
                solutions, combining clean code with modern design principles.
                With a deep understanding of API integrations, cloud deployment,
                and performance optimization, I ensure systems are reliable and
                adaptable to evolving needs. My approach emphasizes
                collaboration, attention to detail, and staying updated with the
                latest technologies, making me a valuable asset for building
                impactful and future-ready applications. Let’s collaborate to
                turn ideas into exceptional digital experiences!
              </p>
              <motion.h3
                className="text-2xl font-semibold mb-2 text-indigo-600"
                animate={{
                  color: ["#4F46E5", "#7C3AED", "#EC4899", "#4F46E5"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Full-Stack Developer | AI Enthusiast | Blockchain Explorer
              </motion.h3>
            </div>
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          ref={sectionRefs.experience}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-indigo-800">
            Experience
          </h2>
          <div className="space-y-8">
            {[
               {
                company: "Auriv Learning",
                src:"https://i.ibb.co/R2NYzBX/luca-bravo-XJXWbf-So2f0-unsplash.jpg",
                role: "Full-stack Developer Intern",
                period: "Nov 2024 - Present",
                description:
                  "Developed and maintained web applications using React.js, Node.js, and MongoDB, ensuring high performance and user engagement. Implemented RESTful APIs and integrated third-party services to enhance functionality and user experience. Collaborated with cross-functional teams to deliver projects on time and within budget.",
              },
              {
                company: "Modgenics Technology Solutions",
                src:"https://i.ibb.co/wpjZYHq/christopher-gower-m-HRf-Lhg-ABo-unsplash.jpg",
                role: " Software Developer Intern",
                period: "June 2024 – Sept 2024",
                description:
                  "Redesigned and optimized web solutions using Node.js, React.js, and AWS, enhancing performance, reliability, and user engagement. Successfully implemented project management tools and third-party API integrations to improve team collaboration and checkout processes.",
              },
              {
                company: "Freelance",
                src:"https://i.ibb.co/bsGqKZr/book.png",
                role: "Full-stack Developer",
                period: "2023 - Present",
                description:
                  "Created a customized pest control website for a Lucknow-based client, providing seamless online booking and detailed service information Demonstrated problem-solving skills and client-centric development approach.",
              },
            ].map((job, index) => (
              <motion.div
                key={index}
                className="flex flex-col md:flex-row items-start bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <img
                  src={job.src}
                  alt={job.company}
                  className="w-20 h-20 mb-4 md:mb-0 md:mr-6 rounded-full border-2 border-indigo-300"
                />
                <div>
                  <h3 className="text-2xl font-semibold text-indigo-700">
                    {job.role}
                  </h3>
                  <p className="text-xl text-gray-600 mb-2">{job.company}</p>
                  <p className="text-md text-indigo-500 mb-2">{job.period}</p>
                  <p className="text-gray-700 leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          ref={sectionRefs.skills}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-indigo-800">
            Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "JavaScript", icon: FaJs },
              { name: "Python", icon: FaPython },
              { name: "Node.js", icon: FaNodeJs },
              { name: "React", icon: FaReact },
              { name: "MongoDB", icon: FaDatabase },
              { name: "GraphQL", icon: FaDatabase },
              { name: "TensorFlow", icon: FaPython },
              { name: "Solidity", icon: FaDatabase },
            ].map((skill, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <skill.icon className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          ref={sectionRefs.projects}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-indigo-800">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          ref={sectionRefs.contact}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-indigo-800">
            Contact Me
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </form>
          </div>
          <div className="mt-8 text-center">
            <motion.a
              href="mailto:your.email@example.com"
              className="text-indigo-600 hover:text-indigo-800 text-xl font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              your.email@example.com
            </motion.a>
          </div>
          <div className="mt-12 flex justify-center space-x-8">
            <motion.a
              href="mailto:your.email@example.com"
              className="text-indigo-600 hover:text-indigo-800"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaEnvelope className="w-10 h-10" />
            </motion.a>
            <motion.a
              href="tel:+1234567890"
              className="text-indigo-600 hover:text-indigo-800"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaPhone className="w-10 h-10" />
            </motion.a>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-lg">
            &copy; {new Date().getFullYear()} Jatin Shankar Srivastava. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {[FaGithub, FaLinkedin, FaTwitter].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="hover:text-indigo-300"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-8 h-8" />
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
