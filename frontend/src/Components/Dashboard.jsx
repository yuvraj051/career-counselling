import React, { useState, useEffect } from "react";
import {
  Bell,
  Book,
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
  MessageSquare,
  Search,
  Settings,
  User,
  BarChart2,
  Calendar,
  Target,
  FileText,
  ArrowRight,
  BrainCircuit,
  Building,
  MapPin,
  Sparkles,
  X,
  Moon,
  Sun,
} from "lucide-react";

// --- Mock Data ---
const userData = {
  name: "Alex Doe",
  avatarUrl: "https://placehold.co/100x100/E2E8F0/4A5568?text=AD",
};

const stats = [
  {
    id: 1,
    label: "Assessments Taken",
    value: "4",
    icon: FileText,
    color: "bg-blue-500",
  },
  {
    id: 2,
    label: "Career Paths Explored",
    value: "8",
    icon: Briefcase,
    color: "bg-green-500",
  },
  {
    id: 3,
    label: "Goals Set",
    value: "3",
    icon: Target,
    color: "bg-yellow-500",
  },
  {
    id: 4,
    label: "Upcoming Sessions",
    value: "2",
    icon: Calendar,
    color: "bg-indigo-500",
  },
];

const jobRecommendations = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Innovate Inc.",
    location: "Remote",
    match: 92,
    icon: "https://placehold.co/40x40/7F9CF5/FFFFFF?text=I",
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "Creative Solutions",
    location: "New York, NY",
    match: 88,
    icon: "https://placehold.co/40x40/F6AD55/FFFFFF?text=C",
  },
  {
    id: 3,
    title: "Product Manager",
    company: "TechForward",
    location: "San Francisco, CA",
    match: 85,
    icon: "https://placehold.co/40x40/68D391/FFFFFF?text=T",
  },
];

const userSkills = {
  labels: [
    "Problem Solving",
    "Communication",
    "Leadership",
    "Creativity",
    "Technical",
  ],
  data: [85, 90, 70, 80, 75],
};

// --- Reusable Components ---

const StatCard = ({ item }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center space-x-4">
    <div className={`p-3 rounded-full ${item.color}`}>
      <item.icon className="text-white" size={24} />
    </div>
    <div>
      <p className="text-3xl font-bold text-gray-800 dark:text-white">
        {item.value}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
    </div>
  </div>
);

const JobCard = ({ job }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg flex items-center space-x-4 hover:shadow-xl hover:border-indigo-500 border-2 border-transparent transition-all duration-300">
    <img src={job.icon} alt={job.company} className="w-12 h-12 rounded-lg" />
    <div className="flex-grow">
      <p className="font-bold text-gray-800 dark:text-white">{job.title}</p>
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-2">
        <Building size={14} />
        <span>{job.company}</span>
        <MapPin size={14} />
        <span>{job.location}</span>
      </div>
    </div>
    <div className="flex flex-col items-center">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
          job.match > 90
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {job.match}%
      </div>
      <p className="text-xs text-gray-500 mt-1">Match</p>
    </div>
  </div>
);

// --- Main Components ---

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const navItems = [
    { name: "Dashboard", icon: Home },
    { name: "My Profile", icon: User },
    { name: "Assessments", icon: FileText },
    { name: "Career Paths", icon: Briefcase },
    { name: "Jobs", icon: Building },
    { name: "Appointments", icon: Calendar },
    { name: "Resources", icon: Book },
    { name: "Messages", icon: MessageSquare },
  ];
  return (
    <aside
      className={`fixed inset-y-0 left-0 bg-white dark:bg-gray-900 shadow-2xl z-50 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-64`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Briefcase className="text-indigo-500" size={28} />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            CareerUp
          </h1>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="md:hidden p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ChevronLeft size={20} />
        </button>
      </div>
      <nav className="p-4 flex flex-col h-full">
        <ul className="space-y-2 flex-grow">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href="#"
                className={`flex items-center space-x-3 p-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 ${
                  item.name === "Dashboard"
                    ? "bg-indigo-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-300 font-semibold"
                    : ""
                }`}
              >
                <item.icon size={20} /> <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <a
            href="#"
            className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
          >
            <Settings size={20} /> <span>Settings</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
          >
            <LogOut size={20} /> <span>Logout</span>
          </a>
        </div>
      </nav>
    </aside>
  );
};

const Header = ({ setSidebarOpen, theme, toggleTheme }) => (
  <header className="bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-lg sticky top-0 z-30 p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
    <div className="flex items-center space-x-4">
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <ChevronRight size={20} />
      </button>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white hidden sm:block">
        Dashboard
      </h1>
    </div>
    <div className="flex items-center space-x-4">
      <div className="relative hidden md:block">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search..."
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        {theme === "light" ? (
          <Moon size={20} className="text-gray-600" />
        ) : (
          <Sun size={20} className="text-yellow-400" />
        )}
      </button>
      <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 relative">
        <Bell size={20} className="text-gray-600 dark:text-gray-300" />
        <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
      </button>
      <div className="flex items-center space-x-2">
        <img
          src={userData.avatarUrl}
          alt={userData.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="hidden lg:block">
          <p className="font-semibold text-gray-800 dark:text-white">
            {userData.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Premium User
          </p>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <ChevronDown size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  </header>
);

// --- AI & Modal Components ---

const AIModal = ({ isOpen, onClose, title, content, isLoading }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-95 hover:scale-100">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="text-lg font-bold flex items-center">
            <Sparkles className="text-indigo-500 mr-2" size={20} /> {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Your journey to a fulfilling career starts now. Let's explore your potential."
  );
  const [isLoadingWelcome, setIsLoadingWelcome] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // --- Theme Toggler ---
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // --- Gemini API Call Function with Exponential Backoff ---
  const callGeminiAPI = async (prompt, retries = 3, delay = 1000) => {
    let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiKey = "AIzaSyAUnRicffsHnEi62DblQ1u9I7Gfn_vWzQo"; // Leave empty
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok)
        throw new Error(`API call failed with status: ${response.status}`);
      const result = await response.json();
      if (result.candidates && result.candidates[0]?.content?.parts[0]?.text) {
        return result.candidates[0].content.parts[0].text;
      }
      return "Sorry, I received an unexpected response from the AI.";
    } catch (error) {
      console.error(`Gemini API call error (retries left: ${retries}):`, error);
      if (retries > 0) {
        await new Promise((res) => setTimeout(res, delay));
        return callGeminiAPI(prompt, retries - 1, delay * 2);
      } else {
        return "An error occurred while contacting the AI. Please check the console.";
      }
    }
  };

  // --- Feature Handlers ---
  const generateWelcomeMessage = async () => {
    setIsLoadingWelcome(true);
    const prompt = `Generate a short, motivational welcome message (2-3 sentences) for a user named ${userData.name} on their career counseling dashboard. Mention their progress (they have completed some assessments) and suggest they explore job recommendations next.`;
    const message = await callGeminiAPI(prompt);
    setWelcomeMessage(message);
    setIsLoadingWelcome(false);
  };

  const generateCareerIdeas = async () => {
    setModalTitle("✨ AI Career Path Ideas");
    setModalContent("");
    setIsModalLoading(true);
    setIsModalOpen(true);
    const prompt = `Based on these skills: ${userSkills.labels.join(
      ", "
    )}, generate 3 diverse and interesting career path ideas. For each idea, provide a one-sentence description and list 2-3 key responsibilities. Format the response in HTML with each career path in a div with a bolded h4 title.`;
    const ideas = await callGeminiAPI(prompt);
    setModalContent(ideas);
    setIsModalLoading(false);
  };

  const generateInterviewQuestions = async () => {
    setModalTitle("✨ Mock Interview Practice");
    setModalContent("");
    setIsModalLoading(true);
    setIsModalOpen(true);
    const prompt = `Generate 5 common but important interview questions for a ${jobRecommendations[0].title} role. Include one behavioral question. Format the response as an HTML ordered list.`;
    const questions = await callGeminiAPI(prompt);
    setModalContent(questions);
    setIsModalLoading(false);
  };

  useEffect(() => {
    generateWelcomeMessage();
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900/95 text-gray-900 dark:text-gray-100 min-h-screen flex font-sans">
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Header
          setSidebarOpen={setSidebarOpen}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-3xl mb-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-2">
              Welcome back, {userData.name}!
            </h2>
            {isLoadingWelcome ? (
              <div className="h-6 bg-white/30 rounded-full w-3/4 animate-pulse"></div>
            ) : (
              <p className="max-w-2xl">{welcomeMessage}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((item) => (
              <StatCard key={item.id} item={item} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    Job Recommendations
                  </h3>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    View All
                  </a>
                </div>
                <div className="space-y-4">
                  {jobRecommendations.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      Prepare for Interviews
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      Get AI-generated questions for your top job match.
                    </p>
                  </div>
                  <button
                    onClick={generateInterviewQuestions}
                    className="mt-4 sm:mt-0 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-200 dark:hover:bg-indigo-900 transition-colors duration-300 flex items-center"
                  >
                    <Sparkles className="mr-2" size={18} /> ✨ Practice Now
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  My Career Path
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Feeling stuck? Let our AI suggest some new paths based on your
                  skills.
                </p>
                <button
                  onClick={generateCareerIdeas}
                  className="bg-indigo-600 text-white w-full flex items-center justify-center py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
                >
                  <Sparkles className="mr-2" size={18} /> ✨ Get AI Suggestions
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <AIModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        content={modalContent}
        isLoading={isModalLoading}
      />
    </div>
  );
}
