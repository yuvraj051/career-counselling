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
  Zap,
  Globe,
} from "lucide-react";

// --- Static User Data (Yuvrajbhai's actual profile) ---
const YUVRAJ_DATA = {
  id: "68cc4d677101c1d419cc9b73",
  full_name: "YUVRAJBHAI VALA",
  email: "240160510056.cs@gujaratvidyapith.org",
  age: 21,
  gender: "Male",
  education_level: "postgraduate",
  career_interest: ["Software Development", "Financial Analysis"],
  preferred_language: "gujrati", // Keeping original data field
  location: "Amreli",
  profile_picture:
    "https://res.cloudinary.com/dwkedprp6/image/upload/v1758219621/fmmtiz6x…",
};
// --------------------------------------------------------

// 💡 UTILITY: Clean Gemini output by removing markdown backticks
const cleanGeminiJson = (jsonString) => {
  return jsonString.replace(/```(json|html|markdown)?\s*|```/g, "").trim();
};

// --- Reusable Components (StatCard, JobCard, Sidebar, Header, AIModal) ---

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

const Header = ({ setSidebarOpen, theme, toggleTheme, userData }) => (
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
          src={userData.avatarUrl} // Dynamic
          alt={userData.name} // Dynamic
          className="w-10 h-10 rounded-full"
        />
        <div className="hidden lg:block">
          <p className="font-semibold text-gray-800 dark:text-white">
            {userData.name} {/* Dynamic */}
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

// --- NEW COMPONENT: Personalized Career Guidance (3 Panels) ---
const PersonalizedCareerGuidance = ({
  userData,
  userSkills,
  jobRecommendations,
  callGeminiAPI,
}) => {
  const [analysisContent, setAnalysisContent] = useState(null);
  const [roadmapContent, setRoadmapContent] = useState(null);
  const [comparisonContent, setComparisonContent] = useState(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(true);

  const generateInsights = async () => {
    if (userSkills.labels.length === 0 || jobRecommendations.length === 0) {
      setIsLoadingInsights(false);
      return;
    }

    const topJob = jobRecommendations[0].title;
    const skillsString = userSkills.labels
      .map((label, index) => `${label} (${userSkills.data[index]}%)`)
      .join(", ");
    const userDetails = userData.details;

    setIsLoadingInsights(true);

    // 🚀 PROMPT 1: Career Path Summary & Analysis (Output in ENGLISH)
    const analysisPrompt = `You are a Senior Career Counselor. Analyze the user data provided:
Name: ${userDetails.full_name}, Age: ${userDetails.age}, Education: ${
      userDetails.education_level
    }, Location: ${
      userDetails.location
    }, Interests: ${userDetails.career_interest.join(", ")}.

Generate the analysis in **HTML format** and ensure all output content is strictly in **English language**.
Include:
1. An (h3) heading titled '🚀 Yuvrajbhai, Your Career Trajectory'
2. Analysis Point 1 (Postgraduate Advantage): Write a 3-line analysis of the significance of completing a postgraduate degree at age 21, and suggest suitable advanced/specialized roles.
3. Analysis Point 2 (Location-based Opportunities): Provide 2-3 lines of guidance on niche opportunities available in the ${
      userDetails.location
    } region for his fields of interest (e.g., Banking, Industrial, IT remote roles).`;

    // 🚀 PROMPT 2: Specialization and Certification Roadmap (Output in ENGLISH)
    const roadmapPrompt = `The user ${userDetails.full_name} (Age: ${
      userDetails.age
    }, Education: ${
      userDetails.education_level
    }) is primarily interested in ${topJob} and ${userDetails.career_interest.join(
      ", "
    )}.

Suggest 3 most Advanced Skills/Certifications necessary for a user at this level to achieve the ${topJob} role. Generate the output in **HTML format** and ensure all content is strictly in **English language**.
Include:
1. An (h4) heading titled '🎯 Postgraduate Specialization Plan'
2. An unordered list (<ul>) where each item includes:
    a. **Skill/Certification Name (in Bold):** e.g., 'AWS Certified Developer'.
    b. **Career Importance:** A 1-line explanation in English of why it's crucial.
    c. **Estimated Timeline:** How long it might take to learn/achieve (e.g., 3 months).`;

    // 🚀 PROMPT 3: Regional Comparison Table (Output in ENGLISH)
    const comparisonPrompt = `The user ${
      userDetails.full_name
    } lives in Amreli (Gujarat) and is a Post-graduate with interests in ${userDetails.career_interest.join(
      ", "
    )}.
        
Provide a 3-tier comparative analysis of career opportunities, comparing Amreli with two major Gujarat job hubs: Ahmedabad and Surat. Generate the output in **HTML format** and ensure all content is strictly in **English language**.
Include:
1. An (h4) heading titled '🏙️ Regional Career Opportunities Comparison'.
2. A single HTML Table with 3 columns: 'Location', 'Primary Industries', and 'Estimated Salary Range (for Postgraduate)'.
3. Fill the table with comparative data for Amreli, Ahmedabad, and Surat based on the user's profile.`;

    try {
      const [analysis, roadmap, comparison] = await Promise.all([
        callGeminiAPI(analysisPrompt),
        callGeminiAPI(roadmapPrompt),
        callGeminiAPI(comparisonPrompt),
      ]);

      setAnalysisContent(cleanGeminiJson(analysis));
      setRoadmapContent(cleanGeminiJson(roadmap));
      setComparisonContent(cleanGeminiJson(comparison));
    } catch (error) {
      console.error("Error generating career insights:", error);
      setAnalysisContent(
        "<p class='text-red-500'>Analysis loading failed. Please check the console.</p>"
      );
      setRoadmapContent("<p class='text-red-500'>Roadmap loading failed.</p>");
      setComparisonContent(
        "<p class='text-red-500'>Comparison loading failed.</p>"
      );
    } finally {
      setIsLoadingInsights(false);
    }
  };

  useEffect(() => {
    // Run insights generation only after core dashboard data is loaded
    if (userSkills.labels.length > 0 && jobRecommendations.length > 0) {
      generateInsights();
    }
  }, [userSkills, jobRecommendations]);

  if (isLoadingInsights) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-8 h-64 flex items-center justify-center">
        <Zap className="mr-3 h-6 w-6 text-indigo-500 animate-pulse" />
        <p className="text-lg text-gray-600 dark:text-gray-300 animate-pulse">
          Generating Personalized Career Analysis for Yuvrajbhai...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border-t-4 border-indigo-500">
        <h4 className="flex items-center text-xl font-bold mb-4 text-gray-800 dark:text-white">
          <Zap size={20} className="mr-2 text-indigo-500" /> Career Analysis
        </h4>
        <div
          dangerouslySetInnerHTML={{
            __html: analysisContent || "<p>Analysis not available.</p>",
          }}
        />
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border-t-4 border-purple-500">
        <h4 className="flex items-center text-xl font-bold mb-4 text-gray-800 dark:text-white">
          <Target size={20} className="mr-2 text-purple-500" /> Specialization
          Roadmap
        </h4>
        <div
          dangerouslySetInnerHTML={{
            __html: roadmapContent || "<p>Roadmap not available.</p>",
          }}
        />
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border-t-4 border-green-500">
        <h4 className="flex items-center text-xl font-bold mb-4 text-gray-800 dark:text-white">
          <Globe size={20} className="mr-2 text-green-500" /> Regional
          Comparison
        </h4>
        <div
          dangerouslySetInnerHTML={{
            __html: comparisonContent || "<p>Comparison not available.</p>",
          }}
        />
      </div>
    </div>
  );
};
// --- End of NEW COMPONENT ---

// --- Main App Component ---

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // 💡 FIXED: Static Yuvrajbhai Vala Data
  const [userData, setUserData] = useState({
    name: YUVRAJ_DATA.full_name,
    avatarUrl: YUVRAJ_DATA.profile_picture,
    details: YUVRAJ_DATA,
  });
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // States for AI-generated mock data
  const [stats, setStats] = useState([]);
  const [jobRecommendations, setJobRecommendations] = useState([]);
  const [userSkills, setUserSkills] = useState({ labels: [], data: [] });

  const [welcomeMessage, setWelcomeMessage] = useState(
    "Loading a fresh career perspective for you..."
  );
  const [isLoadingWelcome, setIsLoadingWelcome] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // --- Theme Toggler (No Change) ---
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

  // --- API Call Functions (Model ID FIXED) ---

  const callGeminiAPI = async (prompt, retries = 3, delay = 1000) => {
    let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiKey = "AIzaSyA8diOlxeXSEvWnVFchbIq6tyqN1O7fqq4";

    // FIXED: Model name 'gemini-2.5-flash'
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Gemini API Error Response:", errorBody);
        throw new Error(`API call failed with status: ${response.status}`);
      }

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
        return "An error occurred. Check the console for API issues.";
      }
    }
  };

  // 💡 Dashboard Data Fetching (Using Promise.all for concurrency)
  const fetchDashboardData = async () => {
    try {
      // 1. Stats Data Prompt
      const statsPrompt = `Generate the following dashboard statistics as a JSON array. The data is for a postgraduate student. DO NOT include any text before or after the JSON. The structure MUST be: [{"id": 1, "label": "Assessments Taken", "value": "7", "color": "bg-blue-500"}, ...]. Generate 4 items.`;

      // 2. Job Recommendations Prompt
      const jobsPrompt = `Generate a list of 2 high-matching job recommendations for a postgraduate user interested in 'Software Development' and 'Financial Analysis'. Return the result as a JSON array. DO NOT include any text before or after the JSON. The structure MUST be: [{"id": 1, "title": "Full Stack Developer", "company": "Tech Innovations", "location": "Remote", "match": 95, "icon": "https://placehold.co/40x40/7F9CF5/FFFFFF?text=T"}, ...].`;

      // 3. Skills Data Prompt (for Graph)
      const skillsPrompt = `Generate a set of 5 core skills and their proficiency scores (0-100) for a user who has good technical and soft skills and is a postgraduate. Return the result as a JSON object. DO NOT include any text before or after the JSON. The structure MUST be: {"labels": ["Coding", "Problem Solving", "Teamwork", "Analytics", "Communication"], "data": [90, 85, 92, 78, 88]}.`;

      const [statsJsonString, jobsJsonString, skillsJsonString] =
        await Promise.all([
          callGeminiAPI(statsPrompt),
          callGeminiAPI(jobsPrompt),
          callGeminiAPI(skillsPrompt),
        ]);

      // --- 1. Stats Processing ---
      const dynamicStats = JSON.parse(cleanGeminiJson(statsJsonString));
      const statsWithIcons = dynamicStats.map((stat) => {
        let iconComponent = FileText;
        if (
          stat.label.toLowerCase().includes("path") ||
          stat.label.toLowerCase().includes("career")
        )
          iconComponent = Briefcase;
        else if (
          stat.label.toLowerCase().includes("goal") ||
          stat.label.toLowerCase().includes("set")
        )
          iconComponent = Target;
        else if (
          stat.label.toLowerCase().includes("session") ||
          stat.label.toLowerCase().includes("upcoming")
        )
          iconComponent = Calendar;

        return { ...stat, icon: iconComponent, value: String(stat.value) };
      });
      setStats(statsWithIcons);

      // --- 2. Job Recommendations Processing ---
      const dynamicJobs = JSON.parse(cleanGeminiJson(jobsJsonString));
      setJobRecommendations(dynamicJobs);

      // --- 3. Skills Data Processing ---
      const dynamicSkills = JSON.parse(cleanGeminiJson(skillsJsonString));
      setUserSkills(dynamicSkills);
    } catch (error) {
      console.error("Failed to fetch all dashboard data from Gemini:", error);
      setStats([]);
      setJobRecommendations([]);
      setUserSkills({ labels: [], data: [] });
    }
  };

  // --- Feature Handlers (No Change in logic) ---
  const generateWelcomeMessage = async () => {
    setIsLoadingWelcome(true);
    // Instruction is English, Content will be English
    const prompt = `Generate a short, motivational welcome message (2-3 sentences) for a postgraduate user named ${userData.name} on their career counseling dashboard. Mention their high potential and suggest they view the personalized insights below.`;
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
    )} with scores: ${userSkills.data.join(
      ", "
    )}, generate 3 diverse and interesting career path ideas. For each idea, provide a one-sentence description and list 2-3 key responsibilities. Format the response in HTML with each career path in a div with a bolded h4 title.`;
    const ideas = await callGeminiAPI(prompt);
    setModalContent(cleanGeminiJson(ideas));
    setIsModalLoading(false);
  };

  const generateInterviewQuestions = async () => {
    setModalTitle("✨ Mock Interview Practice");
    setModalContent("");
    setIsModalLoading(true);
    setIsModalOpen(true);

    if (jobRecommendations.length === 0) {
      setModalContent(
        "No job recommendations available to generate questions."
      );
      setIsModalLoading(false);
      return;
    }

    const firstJobTitle = jobRecommendations[0].title;
    const prompt = `Generate 5 common but important interview questions for a ${firstJobTitle} role. Include one behavioral question. Format the response as an HTML ordered list.`;
    const questions = await callGeminiAPI(prompt);
    setModalContent(cleanGeminiJson(questions));
    setIsModalLoading(false);
  };

  // 💡 useEffect: Data loading logic
  useEffect(() => {
    const loadStaticUser = () => {
      setIsLoadingUser(false);
      fetchDashboardData();
    };
    loadStaticUser(); // Load static user data and start dashboard data fetch
  }, []);

  useEffect(() => {
    if (!isLoadingUser) {
      generateWelcomeMessage();
    }
  }, [userData.name, isLoadingUser]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900/95 text-gray-900 dark:text-gray-100 min-h-screen flex font-sans">
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Header
          setSidebarOpen={setSidebarOpen}
          theme={theme}
          toggleTheme={toggleTheme}
          userData={userData}
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

          {/* --- NEW PERSONALIZED GUIDANCE SECTION --- */}
          {userSkills.labels.length > 0 && jobRecommendations.length > 0 && (
            <PersonalizedCareerGuidance
              userData={userData}
              userSkills={userSkills}
              jobRecommendations={jobRecommendations}
              callGeminiAPI={callGeminiAPI}
            />
          )}
          {/* --- END NEW SECTION --- */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.length > 0
              ? stats.map((item) => <StatCard key={item.id} item={item} />)
              : [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg h-24 animate-pulse"
                  ></div>
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
                  {jobRecommendations.length > 0 ? (
                    jobRecommendations.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      Loading job recommendations...
                    </p>
                  )}
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
                    disabled={jobRecommendations.length === 0}
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
                {/* 💡 Skills Chart Placeholder */}
                <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm mb-4">
                  [Skills Chart Placeholder]
                </div>
                {/* --------------------------- */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Skills: {userSkills.labels.join(", ")}
                </p>
                <button
                  onClick={generateCareerIdeas}
                  className="bg-indigo-600 text-white w-full flex items-center justify-center py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
                  disabled={userSkills.labels.length === 0}
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
