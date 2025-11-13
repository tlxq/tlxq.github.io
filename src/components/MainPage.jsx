import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  Globe,
  Linkedin,
  Mail,
  Phone,
  Moon,
  Sun,
  ExternalLink,
  Code,
  Database,
  Terminal,
  Smartphone,
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MainPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [typewriterText, setTypewriterText] = useState('');
  const fullText = 'Developer';

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypewriterText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'light' : 'dark'
    );
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const slideLeft = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };
  const slideRight = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };
  const stagger = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Skill data with progress percentages
  const skills = [
    { name: 'React', level: 85, icon: Code },
    { name: 'JavaScript', level: 90, icon: Terminal },
    { name: 'TypeScript', level: 75, icon: Code },
    { name: 'HTML/CSS', level: 95, icon: Code },
    { name: 'Tailwind CSS', level: 80, icon: Code },
    { name: 'Linux', level: 70, icon: Terminal },
  ];

  // Featured projects
  /*   const projects = [
    {
      title: 'Tic Tac Toe Game',
      description:
        'Interactive React-based tic-tac-toe game with modern UI and game state management.',
      tech: ['React', 'JavaScript', 'CSS'],
      link: 'https://github.com/boras-frontend-react/tictactoe',
      image: '/api/placeholder/300/200', // Placeholder image
    },
    {
      title: 'Dotfiles Configuration',
      description:
        'Personal Linux configuration files for Arch Linux with Hyprland window manager.',
      tech: ['Linux', 'Hyprland', 'Shell'],
      link: 'https://github.com/tombenrex/tombenrex-dotfiles',
      image: '/api/placeholder/300/200', // Placeholder image
    },
  ]; */

  return (
    <motion.main
      initial="hidden"
      animate="show"
      className={`min-h-screen flex justify-center transition-colors duration-300 ${
        darkMode
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}
    >
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-[0.36fr,1fr] gap-8 p-6 md:p-10">
        {/* Dark/Light Mode Toggle */}
        <motion.button
          onClick={toggleDarkMode}
          className={`fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-lg border transition-all duration-300 hover:scale-110 ${
            darkMode
              ? 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              : 'bg-black/10 border-black/20 text-black hover:bg-black/20'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>

        {/* Sidebar with Glassmorphism */}
        <motion.aside
          variants={slideLeft}
          className={`rounded-2xl overflow-hidden md:self-start backdrop-blur-lg border transition-all duration-300 ${
            darkMode
              ? 'bg-white/5 border-white/10'
              : 'bg-white/80 border-white/20 shadow-2xl'
          }`}
          style={{
            backdropFilter: 'blur(20px)',
            background: darkMode
              ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
          }}
        >
          {/* Gradient top bar */}
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

          <div className="px-7 py-8 flex flex-col items-center text-center">
            {/* Name */}
            <motion.h1
              variants={fadeUp}
              className={`text-3xl font-bold tracking-wide mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Tom{' '}
              <span className="font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Larsson
              </span>
            </motion.h1>

            {/* Animated Typewriter Headline */}
            <motion.div
              variants={fadeUp}
              className={`text-lg font-medium mb-6 h-8 flex items-center ${
                darkMode ? 'text-blue-300' : 'text-blue-600'
              }`}
            >
              {typewriterText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1"
              >
                |
              </motion.span>
            </motion.div>

            {/* Profile Photo */}
            <motion.div
              variants={fadeUp}
              className="w-40 h-40 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-500 to-purple-500 mb-7 shadow-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img
                src="/profile.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Profile Description */}
            <motion.section variants={fadeUp} className="w-full mb-6 text-left">
              <h2
                className={`font-semibold text-lg mb-3 ${
                  darkMode
                    ? 'text-white border-b border-white/20'
                    : 'text-gray-900 border-b border-gray-300'
                } pb-1`}
              >
                About
              </h2>
              <p
                className={`text-sm leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Passionate developer with a focus on creating intuitive,
                user-friendly interfaces using modern technologies. Strong
                problem-solving skills and experience in technical support
                environments. And a big fan of Linux and open-source!
              </p>
            </motion.section>

            {/* Animated Social Links */}
            <motion.section variants={fadeUp} className="w-full mb-6">
              <h2
                className={`font-semibold text-lg mb-3 ${
                  darkMode
                    ? 'text-white border-b border-white/20'
                    : 'text-gray-900 border-b border-gray-300'
                } pb-1`}
              >
                Connect
              </h2>
              <motion.div variants={stagger} className="space-y-3">
                {[
                  {
                    icon: Mail,
                    label: 'Email',
                    href: 'mailto:tlxq@proton.me',
                    text: 'tlxq@proton.me',
                  },
                  {
                    icon: Github,
                    label: 'GitHub',
                    href: 'https://github.com/tlxq',
                    text: 'tlxq',
                  },
                  {
                    icon: Linkedin,
                    label: 'LinkedIn',
                    href: 'https://linkedin.com/in/tlxq',
                    text: 'Tom Larsson',
                  },
                  {
                    icon: Globe,
                    label: 'Website',
                    href: 'https://tlxq.dev',
                    text: 'tlxq.dev',
                  },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 group ${
                      darkMode
                        ? 'hover:bg-white/10 text-gray-300 hover:text-white'
                        : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
                    }`}
                    variants={fadeUp}
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <social.icon
                      size={18}
                      className="group-hover:scale-110 transition-transform duration-200"
                    />
                    <span className="text-sm font-medium">{social.text}</span>
                    <ExternalLink
                      size={14}
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                  </motion.a>
                ))}
              </motion.div>
            </motion.section>

            {/* Contact Info */}
            <motion.section variants={fadeUp} className="w-full">
              <div
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <Phone size={18} />
                <span className="text-sm font-medium">072 212 13 01</span>
              </div>
            </motion.section>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex flex-col gap-10">
          {/* Tech Stack with Animated Skills */}
          <motion.section variants={slideRight}>
            <h2
              className={`text-2xl font-bold pb-1 mb-6 ${
                darkMode
                  ? 'text-white border-b-2 border-blue-400'
                  : 'text-gray-900 border-b-2 border-blue-600'
              }`}
            >
              Tech Stack
            </h2>
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  variants={fadeUp}
                  className={`p-4 rounded-lg backdrop-blur-sm border ${
                    darkMode
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/70 border-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <skill.icon
                      size={20}
                      className={`${
                        darkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {skill.name}
                    </span>
                  </div>
                  <div
                    className={`w-full rounded-full h-2 ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}
                  >
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: skillIndex * 0.1 }}
                    />
                  </div>
                  <span
                    className={`text-sm mt-1 block ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {skill.level}%
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Featured Projects */}
          {/*           <motion.section variants={slideRight}>
            <h2
              className={`text-2xl font-bold pb-1 mb-6 ${
                darkMode
                  ? 'text-white border-b-2 border-blue-400'
                  : 'text-gray-900 border-b-2 border-blue-600'
              }`}
            >
              Featured Projects
            </h2>
            <motion.div
              variants={stagger}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {projects.map((project) => (
                <motion.div
                  key={project.title}
                  variants={fadeUp}
                  className={`rounded-lg overflow-hidden backdrop-blur-sm border transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/5 border-white/10 hover:bg-white/10'
                      : 'bg-white/70 border-gray-200 hover:bg-white/90'
                  }`}
                  whileHover={{ y: -5 }}
                >
                  <div
                    className={`h-32 ${
                      darkMode
                        ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50'
                        : 'bg-gradient-to-br from-blue-100 to-purple-100'
                    } flex items-center justify-center`}
                  >
                    <Code
                      size={48}
                      className={`${
                        darkMode ? 'text-blue-300' : 'text-blue-600'
                      }`}
                    />
                  </div>
                  <div className="p-4">
                    <h3
                      className={`font-semibold text-lg mb-2 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`text-sm mb-3 leading-relaxed ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            darkMode
                              ? 'bg-blue-900/50 text-blue-300'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                        darkMode
                          ? 'text-blue-400 hover:text-blue-300'
                          : 'text-blue-600 hover:text-blue-800'
                      }`}
                      whileHover={{ x: 5 }}
                    >
                      View Project <ExternalLink size={14} />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section> */}

          {/* Developer Experience */}
          <motion.section variants={slideRight}>
            <h2
              className={`text-2xl font-bold pb-1 mb-6 ${
                darkMode
                  ? 'text-white border-b-2 border-blue-400'
                  : 'text-gray-900 border-b-2 border-blue-600'
              }`}
            >
              Experience from past
            </h2>
            <div className="space-y-6">
              {[
                {
                  role: 'Operator',
                  place: 'Idemia, Strängnäs',
                  period: '2022–2024',
                  desc: 'Supervised automated systems, diagnosed and resolved technical issues, and managed data processing workflows in a production environment.',
                },
                {
                  role: 'Technical Support',
                  place: 'OKQ8, Multiple Locations',
                  period: '2021–2024',
                  desc: 'Provided customer service and handled technical problems in fast-paced retail environments, developing strong problem-solving and communication skills.',
                },
              ].map((job, i) => (
                <motion.div
                  key={job.role + i}
                  variants={fadeUp}
                  className={`p-6 rounded-lg backdrop-blur-sm border ${
                    darkMode
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/70 border-gray-200'
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 mb-2">
                    <h3
                      className={`font-semibold text-lg ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {job.role} —{' '}
                      <span className="italic text-base">{job.place}</span>
                    </h3>
                    <span
                      className={`font-semibold ${
                        darkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}
                    >
                      {job.period}
                    </span>
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {job.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Education */}
          <motion.section variants={slideRight}>
            <h2
              className={`text-2xl font-bold pb-1 mb-6 ${
                darkMode
                  ? 'text-white border-b-2 border-blue-400'
                  : 'text-gray-900 border-b-2 border-blue-600'
              }`}
            >
              Education
            </h2>
            <motion.div
              variants={fadeUp}
              className={`p-6 rounded-lg backdrop-blur-sm border ${
                darkMode
                  ? 'bg-white/5 border-white/10'
                  : 'bg-white/70 border-gray-200'
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 mb-2">
                <h3
                  className={`font-semibold text-lg ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Frontend Developer React —{' '}
                  <span className="italic text-base">
                    Yrkeshögskolan i Borås
                  </span>
                </h3>
                <div className="text-right">
                  <div
                    className={`font-bold ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  >
                    2025–2026
                  </div>
                  <div
                    className={`text-xs italic ${
                      darkMode ? 'text-blue-300' : 'text-blue-500'
                    }`}
                  >
                    Current Education
                  </div>
                </div>
              </div>
              <p
                className={`text-sm mb-4 leading-relaxed ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Two-year higher vocational program in modern web development
                with focus on React ecosystem.
              </p>
              <div>
                <div
                  className={`text-sm font-semibold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Completed Courses:
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'JavaScript Fundamentals ✓',
                    'Advanced JavaScript ✓',
                    'React Framework ✓',
                  ].map((course) => (
                    <span
                      key={course}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        darkMode
                          ? 'bg-green-900/50 text-green-300'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.section>
        </div>
      </div>
    </motion.main>
  );
}
