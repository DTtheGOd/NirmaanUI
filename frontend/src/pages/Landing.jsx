import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Zap,
  Code,
  Palette,
  Download,
  Users,
  Heart,
  TrendingUp,
  CheckCircle2,
  Github,
  Linkedin,
  Twitter,
  ArrowRight,
  Sparkles,
  LayoutGrid,
  Lock,
  Rocket,
} from "lucide-react";
import ThemeToggle from "../components/ui/ThemeToggle";
import DotGrid from "../components/common/DotGrid";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Stats />
      <HowItWorks />
      <Features />
      <Team />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Theme Toggle - Fixed top-right */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Animated Dot Grid Background */}
      <div className="absolute inset-0">
        <DotGrid
          dotSize={8}
          gap={30}
          baseColor="#00FFC6"
          activeColor="#B300FF"
          proximity={150}
          shockRadius={200}
          shockStrength={4}
          resistance={750}
          returnDuration={1.2}
          className="opacity-20 dark:opacity-30"
        />
      </div>

      {/* Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-light-bg/80 via-light-surface/90 to-light-bg/80 dark:from-dark-bg/80 dark:via-dark-surface/90 dark:to-dark-bg/80"></div>

      {/* Two Column Layout */}
      <div className="relative z-10 container-max px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full surface border-theme mb-6 w-fit">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">
              Hackathon-Ready Component Library
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Build Faster with
            <br />
            <span className="bg-gradient-signature bg-clip-text text-transparent">
              Nirmaan UI
            </span>
          </h1>

          <p className="text-xl text-secondary mb-8 max-w-lg">
            Your personal vault of 20+ production-ready React components. Save,
            organize, and reuse beautiful UI elements across all your projects.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
            <Link to="/explore" className="btn-gradient px-8 py-4 text-lg">
              Explore Components
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 text-lg surface border-theme rounded-md hover:shadow-lg transition-all"
            >
              Get Started Free
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-6 text-sm text-secondary">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              Free forever
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              Open source
            </div>
          </div>
        </motion.div>

        {/* Right Side - 3D Model Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center relative"
        >
          <div className="relative w-full aspect-square max-w-lg">
            {/* Placeholder for Spline 3D or Screenshot */}
            <div className="w-full h-full surface border-theme rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-br from-accent/5 to-neon-purple/5 flex items-center justify-center">
              <div className="text-center p-8">
                <LayoutGrid className="w-32 h-32 mx-auto text-accent/30 mb-4" />
                <p className="text-secondary text-sm">
                  Hero visual placeholder - Add Spline 3D or screenshot here
                </p>
              </div>
            </div>

            {/* Floating Card - React + Tailwind */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 surface border-theme rounded-lg p-4 shadow-lg"
            >
              <Code className="w-8 h-8 text-accent mb-2" />
              <p className="text-sm font-medium">React + Tailwind</p>
            </motion.div>

            {/* Floating Card - Copy & Deploy */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -bottom-4 -right-4 surface border-theme rounded-lg p-4 shadow-lg"
            >
              <Zap className="w-8 h-8 text-neon-yellow mb-2" />
              <p className="text-sm font-medium">Copy & Deploy</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ==================== ABOUT SECTION ==================== */
function About() {
  return (
    <section className="py-24 relative">
      <div className="container-max px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Built for{" "}
            <span className="bg-gradient-signature bg-clip-text text-transparent">
              Developers
            </span>
            , by Developers
          </h2>
          <p className="text-lg text-secondary">
            Nirmaan UI is your go-to component marketplace designed specifically
            for hackathons, side projects, and rapid prototyping. No more
            reinventing the wheel—just copy, customize, and ship.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="surface border-theme rounded-2xl p-8"
          >
            <Rocket className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold mb-3">Why Nirmaan UI?</h3>
            <p className="text-secondary leading-relaxed">
              We've all been there—tight deadlines, limited time, and the same
              UI components built from scratch every single time. Nirmaan UI
              solves this by giving you a personal library of battle-tested
              components ready to go.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="surface border-theme rounded-2xl p-8"
          >
            <Users className="w-12 h-12 text-neon-purple mb-4" />
            <h3 className="text-2xl font-bold mb-3">Community-Powered</h3>
            <p className="text-secondary leading-relaxed">
              Save your favorite components privately or share them publicly
              with the community. Discover what other developers are building
              and reuse their components in your projects—all in one place.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ==================== STATS SECTION ==================== */
function Stats() {
  const stats = [
    { value: "20+", label: "Components", icon: LayoutGrid },
    { value: "500+", label: "Happy Developers", icon: Users },
    { value: "1K+", label: "Components Copied", icon: Download },
    { value: "100%", label: "Free Forever", icon: Heart },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-accent/5 to-neon-purple/5 dark:from-accent/10 dark:to-neon-purple/10">
      <div className="container-max px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-10 h-10 mx-auto mb-3 text-accent" />
              <div className="text-4xl md:text-5xl font-bold bg-gradient-signature bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-secondary font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== HOW IT WORKS ==================== */
function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Browse Components",
      description:
        "Explore our curated library of 20+ React components built with Tailwind and Framer Motion.",
      icon: LayoutGrid,
    },
    {
      step: "02",
      title: "Preview Live",
      description:
        "Test components in real-time with our interactive playground. Adjust props, themes, and see instant results.",
      icon: Sparkles,
    },
    {
      step: "03",
      title: "Copy or Save",
      description:
        "Copy code instantly or save to your personal collection for future projects. Export as styled or generic Tailwind.",
      icon: Download,
    },
    {
      step: "04",
      title: "Ship Faster",
      description:
        "Paste into your project and customize. Save hours of development time and focus on what matters.",
      icon: Rocket,
    },
  ];

  return (
    <section className="py-24">
      <div className="container-max px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How It{" "}
            <span className="bg-gradient-signature bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Get started in minutes. No complex setup, no dependencies to
            manage—just pure, copy-paste components.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="surface border-theme rounded-2xl p-6 h-full hover:shadow-xl transition-shadow">
                <div className="text-6xl font-bold text-accent/10 mb-4">
                  {step.step}
                </div>
                <step.icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-accent to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== FEATURES SECTION ==================== */
function Features() {
  const features = [
    {
      icon: Code,
      title: "Copy-Paste Ready",
      description:
        "Every component is production-ready. Just copy the code and paste it into your project.",
    },
    {
      icon: Palette,
      title: "Light & Dark Modes",
      description:
        "All components support both themes out of the box with our unified CSS variable system.",
    },
    {
      icon: Zap,
      title: "Live Preview",
      description:
        "Test components in real-time with interactive props playground and instant theme switching.",
    },
    {
      icon: Download,
      title: "Dual Export",
      description:
        "Export as Nirmaan-styled or generic Tailwind. One-click ZIP download with README included.",
    },
    {
      icon: Lock,
      title: "Private Collections",
      description:
        "Save your favorite components privately or share them publicly with the community.",
    },
    {
      icon: TrendingUp,
      title: "Community-Driven",
      description:
        "Discover trending components, see what's popular, and learn from other developers.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-light-bg via-light-surface to-light-bg dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg">
      <div className="container-max px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You{" "}
            <span className="bg-gradient-signature bg-clip-text text-transparent">
              Need
            </span>
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Powerful features designed to accelerate your development workflow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="surface border-theme rounded-2xl p-6 hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-signature flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== TEAM SECTION ==================== */
function Team() {
  const teamMembers = [
    {
      name: "Dhruv Tiwari",
      role: "Full Stack Developer",
      image: "/api/placeholder/200/200", // Replace with actual image
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Sanjivani Jamkar",
      role: "Full Stack Developer",
      image: "/api/placeholder/200/200", // Replace with actual image
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
    {
      name: "Saransh Mishra",
      role: "Full Stack Developer",
      image: "/api/placeholder/200/200", // Replace with actual image
      github: "#",
      linkedin: "#",
      twitter: "#",
    },
  ];

  return (
    <section className="py-24">
      <div className="container-max px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Meet the{" "}
            <span className="bg-gradient-signature bg-clip-text text-transparent">
              Team
            </span>
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Built with passion by developers who understand your workflow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="surface border-theme rounded-2xl p-6 text-center group hover:shadow-xl transition-all"
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-signature p-1">
                <div className="w-full h-full rounded-full bg-light-bg dark:bg-dark-bg flex items-center justify-center overflow-hidden">
                  {/* Replace with actual team photo */}
                  <div className="w-full h-full bg-gradient-to-br from-accent/20 to-neon-purple/20 flex items-center justify-center">
                    <Users className="w-16 h-16 text-accent/50" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-secondary mb-4">{member.role}</p>
              <div className="flex items-center justify-center gap-3">
                <a
                  href={member.github}
                  className="w-10 h-10 rounded-full surface border-theme flex items-center justify-center hover:bg-accent hover:text-white transition-all"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={member.linkedin}
                  className="w-10 h-10 rounded-full surface border-theme flex items-center justify-center hover:bg-accent hover:text-white transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={member.twitter}
                  className="w-10 h-10 rounded-full surface border-theme flex items-center justify-center hover:bg-accent hover:text-white transition-all"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==================== FOOTER ==================== */
function Footer() {
  return (
    <footer className="border-t border-light-border dark:border-dark-border">
      <div className="container-max px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-signature bg-clip-text text-transparent mb-3">
              Nirmaan UI
            </h3>
            <p className="text-secondary mb-4 max-w-sm">
              Your hackathon-ready component library. Build faster, ship
              smarter.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full surface border-theme flex items-center justify-center hover:bg-accent hover:text-white transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full surface border-theme flex items-center justify-center hover:bg-accent hover:text-white transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full surface border-theme flex items-center justify-center hover:bg-accent hover:text-white transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/explore"
                  className="text-secondary hover:text-accent transition-colors"
                >
                  Components
                </Link>
              </li>
              <li>
                <Link
                  to="/upload"
                  className="text-secondary hover:text-accent transition-colors"
                >
                  Upload
                </Link>
              </li>
              <li>
                <Link
                  to="/collection"
                  className="text-secondary hover:text-accent transition-colors"
                >
                  My Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-secondary hover:text-accent transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-secondary hover:text-accent transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-secondary hover:text-accent transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-light-border dark:border-dark-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-secondary text-sm">
            © 2025 Nirmaan UI. Built with ❤️ for developers.
          </p>
          <div className="flex items-center gap-6 text-sm text-secondary">
            <a href="#" className="hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
