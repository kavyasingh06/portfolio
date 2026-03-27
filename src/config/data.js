// const data = {
//   name: "Kavya Singh",
//   roles: ["Software Engineer", "AI/ML Developer"],
//   bio: "Final-year Computer Science student specializing in AI & Machine Learning. I build intelligent systems using FastAPI, NLP, and full-stack technologies. Passionate about solving real-world problems using AI.",
//   email: "kavyasingh0060@gmail.com",
//   phone: "+91-7668628140",
//   location: "Boston, MA",
//   linkedin: "https://www.linkedin.com/in/Kavya Singhsakhare/",
//   github: "https://github.com/Kavya Singh-Sakhare07",
//   resume: "/resume.pdf",

//   stats: [
//     { val: "3.5+", label: "Years Building Software", icon: "🔥" },
//     { val: "50K+", label: "Daily Txns Processed", icon: "⚡" },
//     { val: "6", label: "Certifications", icon: "🏆" },
//     { val: "40%", label: "API Throughput Gain", icon: "🚀" },
//   ],

//   stack: [
//     { name: ".NET", cat: "Backend" },
//     { name: "C#", cat: "Backend" },
//     { name: "Java", cat: "Backend" },
//     { name: "Python", cat: "Backend" },
//     { name: "Node.js", cat: "Backend" },
//     { name: "React", cat: "Frontend" },
//     { name: "Angular", cat: "Frontend" },
//     { name: "TypeScript", cat: "Frontend" },
//     { name: "JavaScript", cat: "Frontend" },
//     { name: "Tailwind", cat: "Frontend" },
//     { name: "HTML/CSS", cat: "Frontend" },
//     { name: "SQL Server", cat: "Data" },
//     { name: "MySQL", cat: "Data" },
//     { name: "PostgreSQL", cat: "Data" },
//     { name: "MongoDB", cat: "Data" },
//     { name: "AWS", cat: "Cloud" },
//     { name: "Azure", cat: "Cloud" },
//     { name: "Docker", cat: "Cloud" },
//     { name: "Kubernetes", cat: "Cloud" },
//     { name: "Git", cat: "Tools" },
//     { name: "Postman", cat: "Tools" },
//     { name: "VS Code", cat: "Tools" },
//     { name: "IntelliJ", cat: "Tools" },
//   ],

//   experience: [
//     {
//       role: "Software Engineer",
//       company: "Aurionpro Payments (AuroPay)",
//       location: "Mumbai, India",
//       period: "Dec 2021 to Aug 2025",
//       current: false,
//       desc: "Worked on the core payments platform powering real-time transactions for major Indian banks.",
//       points: [
//         "Built and scaled payment microservices in .NET Core + SQL + AWS that handled millions of daily transactions. Got API throughput up by 40%.",
//         "Designed a reconciliation system with a tri-party rule engine. Processed 50K+ transactions a day, replaced 60-80% of manual settlement work.",
//         "Built Team Access, a role-based access control system with AES-256 encryption so users only saw what they were supposed to.",
//         "Shipped BNPL and fraud detection features. Adoption went up 20%, caught 15% more bad actors.",
//         "Helped pass PCI DSS and SAR compliance audits, worked closely with product and compliance on securing 100K+ monthly cardholder transactions.",
//       ],
//     },
//     {
//       role: "Fitness Consultant",
//       company: "Marino Recreation Center, Northeastern",
//       location: "Boston, MA",
//       period: "Sep 2025 to Present",
//       current: true,
//       desc: "Because building software is only half the fun.",
//       points: [
//         "Coach 50+ daily visitors on form and technique. Supervise the gym floor, keep things running smooth.",
//       ],
//     },
//   ],

//   education: [
//     {
//       degree: "MS in Information Systems",
//       school: "Northeastern University",
//       location: "Boston, MA",
//       period: "Sep 2025 to Aug 2027",
//       note: "Coursework: Application Engineering, Database Design, Data Warehousing & BI, Data Science Engineering",
//     },
//     {
//       degree: "BE in Electronics Engineering",
//       school: "University of Mumbai",
//       location: "Mumbai, India",
//       period: "Graduated Jun 2021",
//       note: "Thesis: ML-based classification of neurological disorders using EEG signals, DWT feature extraction, and ANN classifiers. Hit 80% accuracy.",
//     },
//   ],

//   projects: [
//     {
//       title: "HireSense-Interview & Resume Copilot",
//       sub: "Hospital Management System",
//       desc: "Full-stack hospital platform I built for my database course. 26-table normalized SQL Server backend, .NET Core APIs, React frontend. Handles patient registration, doctor scheduling, billing with insurance claims, pharmacy inventory. Deployed on Azure + Netlify.",
//       tech: [".NET Core", "React", "SQL Server", "Azure", "Tailwind"],
//       live: "https://medinexushealth.netlify.app",
//       github: "https://github.com/Kavya Singh-Sakhare07",
//       accent: 0,
//     },
//     {
//       title: "Cafe Vision",
//       sub: "Real-Time AI Analytics",
//       desc: "Hackathon project at MGEN 2025. Built a real-time vision pipeline using YOLOv8 and OpenCV that processes live camera feeds with sub-second inference. Tracks customer engagement and staff productivity. Judges recognized it for practical business impact.",
//       tech: ["Python", "YOLOv8", "OpenCV", "PyTorch"],
//       live: null,
//       github: "https://github.com/Kavya Singh-Sakhare07",
//       accent: 1,
//     },
//     {
//       title: "Neuro Classifier",
//       sub: "EEG Signal Processing (B.E. Thesis)",
//       desc: "My undergrad thesis. Built an EEG analysis system in MATLAB that detects epilepsy from brain signals. Used Savitzky-Golay filtering, Discrete Wavelet Transform for feature extraction, and ANN for classification.",
//       tech: ["MATLAB", "Machine Learning", "Signal Processing", "DWT"],
//       live: null,
//       github: null,
//       accent: 2,
//     },
//   ],

//   certifications: [
//     { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "Jan 2024", url: "https://aws.amazon.com/verification", code: "98Z8MJ1D5B1QQYCY", licenseId: "98Z8MJ1D5B1QQYCY", preview: "/certs/AWS Certified Cloud Practitioner.pdf" },
//     { name: "Enterprise Web Dev (.NET Core)", issuer: "Swabhav Techlabs", date: "Dec 2021", url: null, licenseId: null, preview: "/certs/Enterprise Web Dev (.NET Core).pdf" },
//     { name: "Introduction to Java", issuer: "Coursera / LearnQuest", date: "Jul 2021", url: "https://coursera.org/verify/EMFSF56S7J2E", licenseId: null, preview: "/certs/Introduction to Java.pdf" },
//     { name: "Programming for Everybody (Python)", issuer: "Coursera / U of Michigan", date: "Jun 2020", url: "https://coursera.org/verify/244ENWDYRM4F", licenseId: null, preview: "/certs/Programming for Everybody (Python).pdf" },
//     { name: "Python Data Structures", issuer: "Coursera / U of Michigan", date: "Jul 2020", url: "https://coursera.org/verify/C8FQUSNS4D9T", licenseId: null, preview: "/certs/Python Data Structures.pdf" },
//     { name: "Using Python to Access Web Data", issuer: "Coursera / U of Michigan", date: "Aug 2020", url: "https://coursera.org/verify/EQGHSCTACRW9", licenseId: null, preview: "/certs/Using Python to Access Web Data.pdf" },
//     { name: "Responsive Websites (HTML5 & CSS3)", issuer: "Udemy", date: "Aug 2020", url: "https://ude.my/UC-27ed60f3-990b-45db-ba28-e425badd7e25", licenseId: null, preview: "/certs/Responsive Websites (HTML5 & CSS3).pdf" },
//   ],
// };

// export default data;
const data = {
  name: "Kavya Singh",
  roles: ["AI/ML Engineer", "Software Developer", "GenAI Builder"],
  bio: "Final-year Computer Science Engineering student specializing in AI & Machine Learning. I build intelligent, scalable applications using FastAPI, NLP, computer vision, and modern full-stack technologies. Passionate about solving real-world problems with AI, machine learning, and agentic systems.",
  email: "kavyasingh0060@gmail.com",
  phone: "+91-7668628140",
  location: "Ghaziabad, Uttar Pradesh, India",
  linkedin: "https://www.linkedin.com/in/kavyasingh06/",
  github: "https://github.com/kavyasingh06",
  resume: "/resume.pdf",

  stats: [
    { val: "4+", label: "AI Projects Built", icon: "🤖" },
    { val: "92%", label: "Model Accuracy Achieved", icon: "📈" },
    { val: "95%", label: "Intent Accuracy", icon: "⚡" },
    { val: "<2s", label: "Retrieval Latency", icon: "🚀" },
  ],

  stack: [
    { name: "Python", cat: "Backend" },
    { name: "FastAPI", cat: "Backend" },
    { name: "SQLAlchemy", cat: "Backend" },
    { name: "Pydantic", cat: "Backend" },
    { name: "Java", cat: "Backend" },
    { name: "C++", cat: "Backend" },

    { name: "React", cat: "Frontend" },
    { name: "Next.js", cat: "Frontend" },
    { name: "JavaScript", cat: "Frontend" },
    { name: "TypeScript", cat: "Frontend" },
    { name: "Tailwind CSS", cat: "Frontend" },
    { name: "HTML/CSS", cat: "Frontend" },

    { name: "MySQL", cat: "Data" },
    { name: "PostgreSQL", cat: "Data" },
    { name: "Firebase", cat: "Data" },
    { name: "FAISS", cat: "Data" },

    { name: "Docker", cat: "Cloud" },
    { name: "Git", cat: "Tools" },
    { name: "GitHub", cat: "Tools" },
    { name: "VS Code", cat: "Tools" },
    { name: "Google Colab", cat: "Tools" },
    { name: "Postman", cat: "Tools" },

    { name: "TensorFlow", cat: "AI/ML" },
    { name: "PyTorch", cat: "AI/ML" },
    { name: "Scikit-learn", cat: "AI/ML" },
    { name: "OpenCV", cat: "AI/ML" },
    { name: "LangChain", cat: "AI/ML" },
    { name: "LangGraph", cat: "AI/ML" },
    { name: "Hugging Face", cat: "AI/ML" },
    { name: "NLP", cat: "AI/ML" },
    { name: "RAG", cat: "AI/ML" },
    { name: "LLMs", cat: "AI/ML" },
  ],

  experience: [
  {
    role: "AI/ML Intern",
    company: "Codec Technologies",
    location: "Remote",
    period: "June 2025 to August 2025",
    current: false,
    desc: "Worked on machine learning and computer vision applications, building end-to-end pipelines and improving model performance.",
    points: [
      "Developed 3+ machine learning and computer vision applications using Python, improving model accuracy by 15% and reducing manual processing time by 30%.",
      "Implemented end-to-end ML pipelines including data preprocessing, feature engineering, model training, and evaluation on 5,000+ data samples.",
      "Built deep learning models using OpenCV, TensorFlow, and modern AI techniques for real-world problem solving.",
      "Collaborated with cross-functional teams to integrate ML models into production workflows, improving automation efficiency by 25%."
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Tech & Minds",
    location: "Remote",
    period: "September 2025 to November 2025",
    current: false,
    desc: "Worked on full-stack web development and backend system optimization using modern JavaScript and APIs.",
    points: [
      "Developed 3+ full-stack web features using JavaScript and REST APIs, improving application performance by 30% and reducing response latency.",
      "Designed and integrated backend APIs for data processing and user workflows, efficiently handling 100+ user requests.",
      "Optimized database queries and application logic, reducing load time by 25% and improving overall system reliability."
    ],
  },
],

  education: [
    {
      degree: "B.Tech in Computer Science and Engineering (AI & ML)",
      school: "Ajay Kumar Garg Engineering College",
      location: "Ghaziabad, Uttar Pradesh",
      period: "Expected May 2026",
      note: "GPA: 8.5 | Focused on AI, Machine Learning, Deep Learning, NLP, and Software Development.",
    },
  ],

  projects: [
    {
      title: "HireSense AI",
      sub: "AI Resume & Interview Copilot",
      desc: "Built a full-stack AI platform for resume analysis, ATS scoring, missing skills detection, and mock interview preparation. Designed with FastAPI backend, modern frontend architecture, and recruiter-focused workflows.",
      tech: ["FastAPI", "Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "NLP"],
      live: "https://hire-sense-livid.vercel.app/",
      github: "https://github.com/kavyasingh06/HireSense",
      accent: 0,
    },
    {
      title: "Skin Cancer Detection",
      sub: "Deep Learning for Medical Imaging",
      desc: "Developed a CNN-based skin cancer detection system using ISIC dermoscopic image data. Achieved 92% accuracy on 5,000+ images with preprocessing, augmentation, and model fine-tuning for improved generalization.",
      tech: ["TensorFlow", "OpenCV", "Scikit-learn", "Python", "Streamlit"],
      github: "https://github.com/kavyasingh06/SkinCancer",
      accent: 1,
    },
    {
      title: "AutoStream Agent",
      sub: "Agentic Sales Workflow System",
      desc: "Built an agentic AI workflow using LangGraph, Groq, FAISS, and FastAPI. Designed a stateful system with conditional routing, persistent memory, and hybrid intent detection, achieving 95% intent accuracy and under 2-second retrieval latency.",
      tech: ["Python", "LangGraph", "LangChain", "FAISS", "FastAPI", "Groq"],
      github: "https://github.com/kavyasingh06/autostream-agent",
      accent: 2,
    },
    {
      title: "Text2UI Generator",
      sub: "AI-Powered UI Code Generator",
      desc: "Created a system that generates responsive UI components from text prompts using templating and transformer-based models. Supported React and Flutter-style outputs with faster prototyping workflows.",
      tech: ["Python", "Streamlit", "Jinja2", "Hugging Face", "React", "Flutter"],
      github: "https://github.com/kavyasingh06/text2ui",
      accent: 3,
    },
  ],

  certifications: [
    {
      name: "Machine Learning / AI Certifications",
      issuer: "Coursera / Online Learning Platforms",
      date: "Ongoing",
      url: null,
      licenseId: null,
      preview: null,
    },
  
  {
    name: "SQL (Basic) Certificate",
    issuer: "HackerRank",
    date: "2025",
    url: "https://www.hackerrank.com/certificates/594513841f90",
    licenseId: "594513841f90",
    preview: null,
  },

    {
      name: "Python and Development Certifications",
      issuer: "Online Learning Platforms",
      date: "Ongoing",
      url: null,
      licenseId: null,
      preview: null,
    },
  ],
};

export default data;