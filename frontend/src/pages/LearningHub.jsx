import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Search,
  ExternalLink,
  PlayCircle,
  FileText,
  Award,
  Code,
  Layers,
  Zap,
  StickyNote,
  Save,
  X,
} from "lucide-react";

// Learning Roadmap Data
const LEARNING_ROADMAP = [
  {
    id: "html-basics",
    category: "Prerequisites",
    title: "HTML Fundamentals",
    description: "Learn the building blocks of web pages",
    topics: [
      "HTML Structure & Syntax",
      "Semantic HTML Elements",
      "Forms & Input Types",
      "Accessibility Basics",
    ],
  },
  {
    id: "css-basics",
    category: "Prerequisites",
    title: "CSS Fundamentals",
    description: "Style your web pages beautifully",
    topics: [
      "CSS Selectors & Specificity",
      "Box Model & Layout",
      "Flexbox & Grid",
      "Responsive Design",
      "Animations & Transitions",
    ],
  },
  {
    id: "js-basics",
    category: "Prerequisites",
    title: "JavaScript Essentials",
    description: "Master the language of the web",
    topics: [
      "Variables & Data Types",
      "Functions & Scope",
      "Arrays & Objects",
      "DOM Manipulation",
      "ES6+ Features",
      "Async/Await & Promises",
    ],
  },
  {
    id: "react-basics",
    category: "React Core",
    title: "React Fundamentals",
    description: "Start your React journey",
    topics: [
      "JSX Syntax",
      "Components & Props",
      "State Management",
      "Event Handling",
      "Conditional Rendering",
      "Lists & Keys",
    ],
  },
  {
    id: "react-hooks",
    category: "React Core",
    title: "React Hooks",
    description: "Master modern React patterns",
    topics: [
      "useState Hook",
      "useEffect Hook",
      "useContext Hook",
      "useRef Hook",
      "useMemo & useCallback",
      "Custom Hooks",
    ],
  },
  {
    id: "react-routing",
    category: "React Ecosystem",
    title: "React Router",
    description: "Build multi-page applications",
    topics: [
      "Routes & Navigation",
      "Dynamic Routes",
      "Nested Routes",
      "Protected Routes",
      "Route Parameters",
    ],
  },
  {
    id: "state-management",
    category: "React Ecosystem",
    title: "State Management",
    description: "Handle complex application state",
    topics: [
      "Context API",
      "Redux Basics",
      "Redux Toolkit",
      "Zustand",
      "Recoil",
    ],
  },
  {
    id: "react-advanced",
    category: "Advanced React",
    title: "Advanced Patterns",
    description: "Level up your React skills",
    topics: [
      "Higher-Order Components",
      "Render Props",
      "Code Splitting",
      "Lazy Loading",
      "Error Boundaries",
      "Performance Optimization",
    ],
  },
  {
    id: "testing",
    category: "Testing",
    title: "Testing React Apps",
    description: "Write reliable, maintainable tests",
    topics: [
      "Jest Basics",
      "React Testing Library",
      "Unit Testing",
      "Integration Testing",
      "E2E Testing with Cypress",
    ],
  },
  {
    id: "next-steps",
    category: "Beyond React",
    title: "Next.js & Beyond",
    description: "Full-stack React development",
    topics: [
      "Next.js Basics",
      "Server-Side Rendering",
      "API Routes",
      "Static Site Generation",
      "TypeScript with React",
    ],
  },
];

// Resources Data
const RESOURCES = {
  documentation: [
    { title: "React Official Docs", url: "https://react.dev", icon: FileText },
    {
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org",
      icon: BookOpen,
    },
    { title: "JavaScript.info", url: "https://javascript.info", icon: Code },
  ],
  videos: [
    {
      title: "Traversy Media React Crash Course",
      url: "https://youtube.com/@TraversyMedia",
      icon: PlayCircle,
    },
    {
      title: "Academind React Complete Guide",
      url: "https://youtube.com/@academind",
      icon: PlayCircle,
    },
    {
      title: "Web Dev Simplified",
      url: "https://youtube.com/@WebDevSimplified",
      icon: PlayCircle,
    },
  ],
  courses: [
    {
      title: "freeCodeCamp React",
      url: "https://www.freecodecamp.org",
      icon: Award,
    },
    {
      title: "Scrimba Learn React",
      url: "https://scrimba.com/learn/learnreact",
      icon: Award,
    },
    {
      title: "React Official Tutorial",
      url: "https://react.dev/learn",
      icon: Award,
    },
  ],
};

export default function LearningHub() {
  const [progress, setProgress] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedTopics, setExpandedTopics] = useState({});
  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("react-learning-progress");
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }

    const savedNotes = localStorage.getItem("react-learning-notes");
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (Object.keys(progress).length > 0) {
      localStorage.setItem("react-learning-progress", JSON.stringify(progress));
    }
  }, [progress]);

  const updateProgress = (topicId, status) => {
    setProgress((prev) => ({ ...prev, [topicId]: status }));
  };

  const toggleTopic = (topicId) => {
    setExpandedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const saveNotes = () => {
    localStorage.setItem("react-learning-notes", notes);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  // Filter roadmap items
  const categories = [
    "All",
    ...new Set(LEARNING_ROADMAP.map((item) => item.category)),
  ];
  const filteredRoadmap = LEARNING_ROADMAP.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topics.some((topic) =>
        topic.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  // Calculate overall progress
  const totalTopics = LEARNING_ROADMAP.length;
  const completedTopics = Object.values(progress).filter(
    (status) => status === "completed"
  ).length;
  const inProgressTopics = Object.values(progress).filter(
    (status) => status === "in-progress"
  ).length;
  const progressPercentage =
    Math.round((completedTopics / totalTopics) * 100) || 0;

  const getStatusIcon = (status) => {
    if (status === "completed")
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    if (status === "in-progress")
      return <Clock className="w-5 h-5 text-yellow-500" />;
    return <Circle className="w-5 h-5 text-gray-400" />;
  };

  const getStatusColor = (status) => {
    if (status === "completed")
      return "bg-green-500/10 text-green-500 border-green-500/20";
    if (status === "in-progress")
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    return "bg-gray-500/10 text-gray-400 border-gray-500/20";
  };

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="container-max">
        {/* Simple Header - Top Left */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">React Learning Roadmap</h1>
          <p className="text-secondary">
            Track your progress and master React step by step
          </p>
        </div>

        {/* Stats Grid + Notes Button */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <div className="surface border-theme rounded-xl p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xl font-bold">{totalTopics}</p>
                <p className="text-xs text-secondary">Total</p>
              </div>
            </div>
          </div>
          <div className="surface border-theme rounded-xl p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-xl font-bold">{completedTopics}</p>
                <p className="text-xs text-secondary">Completed</p>
              </div>
            </div>
          </div>
          <div className="surface border-theme rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-xl font-bold">{inProgressTopics}</p>
                <p className="text-xs text-secondary">In Progress</p>
              </div>
            </div>
          </div>
          <div className="surface border-theme rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-accent" />
              <div>
                <p className="text-xl font-bold">{progressPercentage}%</p>
                <p className="text-xs text-secondary">Progress</p>
              </div>
            </div>
          </div>

          {/* Notes Button */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="surface border-theme rounded-xl p-4 hover:border-accent/50 transition-all flex items-center justify-center gap-2"
          >
            <StickyNote className="w-5 h-5 text-accent" />
            <span className="font-medium">Notes</span>
          </button>
        </div>

        {/* Notes Card */}
        <AnimatePresence>
          {showNotes && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="surface border-theme rounded-2xl p-6 mb-8 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <StickyNote className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-bold">My Learning Notes</h3>
                </div>
                <button
                  onClick={() => setShowNotes(false)}
                  className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your learning notes here... (automatically saved)"
                className="w-full h-48 p-4 surface border-theme rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-accent/50 mb-4"
              />

              <div className="flex items-center justify-between">
                <p className="text-sm text-secondary">
                  {notesSaved ? (
                    <span className="text-green-500 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Notes saved!
                    </span>
                  ) : (
                    "Your notes are saved automatically"
                  )}
                </p>
                <button
                  onClick={saveNotes}
                  className="btn-gradient px-6 py-2 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="surface border-theme rounded-xl p-4 mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Overall Progress</p>
            <p className="text-xs text-secondary">
              {completedTopics} / {totalTopics}
            </p>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-accent to-neon-purple rounded-full"
            />
          </div>
        </div>

        {/* Search & Filter */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
            <input
              type="text"
              placeholder="Search topics, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 surface border-theme rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  selectedCategory === category
                    ? "bg-accent text-dark-bg border-accent"
                    : "surface border-theme hover:border-accent/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Learning Roadmap */}
        <div className="grid gap-6 mb-12">
          <AnimatePresence mode="popLayout">
            {filteredRoadmap.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="surface border-theme rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent">
                          {item.category}
                        </span>
                        {getStatusIcon(progress[item.id])}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-secondary">{item.description}</p>
                    </div>
                  </div>

                  {/* Status Buttons */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button
                      onClick={() => updateProgress(item.id, "in-progress")}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${getStatusColor(
                        progress[item.id] === "in-progress" ? "in-progress" : ""
                      )}`}
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => updateProgress(item.id, "completed")}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${getStatusColor(
                        progress[item.id] === "completed" ? "completed" : ""
                      )}`}
                    >
                      Completed
                    </button>
                    <button
                      onClick={() => updateProgress(item.id, null)}
                      className="px-4 py-2 rounded-lg border text-sm font-medium surface border-theme hover:border-accent/50 transition-all"
                    >
                      Reset
                    </button>
                  </div>

                  {/* Topics Toggle */}
                  <button
                    onClick={() => toggleTopic(item.id)}
                    className="text-accent hover:underline text-sm font-medium flex items-center gap-2"
                  >
                    <Layers className="w-4 h-4" />
                    {expandedTopics[item.id] ? "Hide" : "Show"} Topics (
                    {item.topics.length})
                  </button>

                  {/* Topics List */}
                  <AnimatePresence>
                    {expandedTopics[item.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-4 space-y-2"
                      >
                        {item.topics.map((topic, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-3 rounded-lg surface border-theme"
                          >
                            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                            <span className="text-sm">{topic}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Resources Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Curated Resources</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Documentation */}
            <div className="surface border-theme rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-accent/10">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold">Documentation</h3>
              </div>
              <div className="space-y-3">
                {RESOURCES.documentation.map((resource, i) => (
                  <a
                    key={i}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/5 transition-colors group"
                  >
                    <span className="text-sm font-medium group-hover:text-accent transition-colors">
                      {resource.title}
                    </span>
                    <ExternalLink className="w-4 h-4 text-secondary group-hover:text-accent transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Video Playlists */}
            <div className="surface border-theme rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-red-500/10">
                  <PlayCircle className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold">Video Playlists</h3>
              </div>
              <div className="space-y-3">
                {RESOURCES.videos.map((resource, i) => (
                  <a
                    key={i}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-red-500/5 transition-colors group"
                  >
                    <span className="text-sm font-medium group-hover:text-red-500 transition-colors">
                      {resource.title}
                    </span>
                    <ExternalLink className="w-4 h-4 text-secondary group-hover:text-red-500 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Online Courses */}
            <div className="surface border-theme rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-purple-500/10">
                  <Award className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold">Online Courses</h3>
              </div>
              <div className="space-y-3">
                {RESOURCES.courses.map((resource, i) => (
                  <a
                    key={i}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-500/5 transition-colors group"
                  >
                    <span className="text-sm font-medium group-hover:text-purple-500 transition-colors">
                      {resource.title}
                    </span>
                    <ExternalLink className="w-4 h-4 text-secondary group-hover:text-purple-500 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
