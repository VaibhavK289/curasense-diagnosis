# 🏥 CuraSense - AI-Powered Medical Diagnosis System

![Next.js](https://img.shields.io/badge/Next.js-16.0-black.svg)
![React](https://img.shields.io/badge/React-19.2-61DAFB.svg)
![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

An advanced AI-powered medical diagnosis system leveraging multi-agent workflows, RAG, and vision analysis for comprehensive clinical decision support. Features a modern **Next.js 16** frontend with beautiful animations and a professional healthcare UI.

##  What's New

- 🎨 **Brand New Next.js 16 Frontend** - Complete redesign with React 19 and TypeScript
- 🌊 **Framer Motion Animations** - Smooth, professional animations throughout
- 🎯 **Modern UI/UX** - Radix UI components with Tailwind CSS 4
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🌙 **Dark/Light Mode** - Theme switching with next-themes
- 📊 **Report History** - Track and manage all your past diagnoses
- 💬 **AI Chat Assistant** - Interactive chat for follow-up questions
- 🔄 **State Management** - Zustand for efficient client-state management

##  Features

- **🤖 Multi-Agent AI Workflows** - Orchestrated diagnosis using CrewAI and LangGraph
- **📄 Prescription Analysis** - Upload and analyze medical prescriptions and blood test reports
- **👁️ X-Ray & CT Analysis** - Vision AI for analyzing X-rays, CT scans, and MRI images
- **💊 Medicine Comparison** - Compare medications, check interactions, find alternatives
- **🔍 RAG System** - Semantic search with ChromaDB vector database
- **⚡ Real-time Streaming** - Live diagnosis updates with Server-Sent Events
- **🔐 Secure** - Session-based data isolation (15-min TTL)

##  Prerequisites

- **Node.js** 18+ (for Next.js frontend)
- **Python** 3.10+
- **Conda** (Miniconda/Anaconda)
- **API Keys**: [Gemini](https://makersuite.google.com/app/apikey) | [Groq](https://console.groq.com/) | [Tavily](https://tavily.com/)

##  Project Structure

```
curasense-diagnosis/
├── curasense-frontend/            # 🆕 Next.js 16 Frontend
│   ├── src/
│   │   ├── app/                   # App Router pages
│   │   │   ├── diagnosis/         # Diagnosis pages
│   │   │   │   ├── prescription/  # Prescription analysis
│   │   │   │   └── xray/          # X-ray analysis
│   │   │   ├── medicine/          # Medicine comparison
│   │   │   ├── history/           # Report history
│   │   │   ├── settings/          # User settings
│   │   │   └── help/              # Help & documentation
│   │   ├── components/            # React components
│   │   │   ├── ui/                # Shadcn/UI components
│   │   │   ├── layout/            # Header, Sidebar
│   │   │   ├── motion/            # Animation components
│   │   │   └── backgrounds/       # Background effects
│   │   ├── lib/                   # Utilities & API client
│   │   └── styles/                # Design tokens
│   ├── package.json
│   └── tailwind.config.ts
│
├── curasense-ml/                  # Python ML Frontend (Legacy)
│   ├── frontend/                  # HTML/CSS/JS dashboard
│   ├── src/
│   │   ├── crew/
│   │   │   └── agents_and_taks.py # CrewAI agents
│   │   ├── hugging_face_ner.py    # NER extraction
│   │   └── output_pydantic.py     # Data models
│   ├── app.py                     # FastAPI server
│   ├── flow.py                    # Workflow orchestration
│   └── requirements.txt
│
├── ml-fastapi/                    # Backend API
│   ├── config/
│   │   ├── main_graph.py          # Main diagnosis workflow
│   │   ├── rag.py                 # RAG system
│   │   ├── vision_graph.py        # Vision analysis
│   │   ├── medical_summarizer_graph.py
│   │   ├── vectordb.py            # ChromaDB management
│   │   └── validate_api.py        # API validation
│   ├── cron/
│   │   ├── jobs.py                # Scheduled tasks
│   │   └── storage.py             # Session storage
│   ├── main.py                    # Backend server
│   └── requirements.txt
│
├── .gitignore
├── README.md
└── start_servers.bat
```

##  Installation

### 1. Clone Repository
```bash
git clone https://github.com/VaibhavK289/curasense-diagnosis.git
cd curasense-diagnosis
```

### 2. Setup Next.js Frontend (New)

```bash
cd curasense-frontend
npm install
```

### 3. Setup Python Backend

**ML Service:**
```bash
conda create -n curasense_env python=3.10 -y
conda activate curasense_env
cd curasense-ml
pip install -r requirements.txt
```

**FastAPI Backend:**
```bash
conda create -n curasense_vision_env python=3.10 -y
conda activate curasense_vision_env
cd ml-fastapi
pip install -r requirements.txt
```

### 4. Configure API Keys

Create `.env` files:

**`curasense-frontend/.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8001
NEXT_PUBLIC_ML_API_URL=http://localhost:8000
```

**`curasense-ml/.env`:**
```env
GOOGLE_API_KEY="your_gemini_api_key"
GROQ_API_KEY="your_groq_api_key"
TAVILY_API_KEY="your_tavily_api_key"
CREWAI_TRACING_ENABLED=true
```

**`ml-fastapi/.env`:**
```env
GOOGLE_API_KEY="your_gemini_api_key"
GROQ_API_KEY="your_groq_api_key"
TAVILY_API_KEY="your_tavily_api_key"
HUGGINGFACE_TOKEN="your_hf_token"
```

##  Running the Application

### Option 1: Run All Services

**Terminal 1 - Next.js Frontend:**
```bash
cd curasense-frontend
npm run dev
```

**Terminal 2 - ML Backend:**
```bash
cd curasense-ml
conda activate curasense_env
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

**Terminal 3 - FastAPI Backend:**
```bash
cd ml-fastapi
conda activate curasense_vision_env
uvicorn main:app --host 0.0.0.0 --port 8001 --reload
```

### Option 2: Use Batch Script (Windows)
```bash
start_servers.bat
```

### Access Points

| Service | URL |
|---------|-----|
| 🌐 Next.js Frontend | http://localhost:3000 |
| 📊 Legacy Dashboard | http://localhost:8000 |
| 🔧 API Documentation | http://localhost:8001/docs |

##  Frontend Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI library |
| **TypeScript 5** | Type safety |
| **Tailwind CSS 4** | Styling |
| **Framer Motion** | Animations |
| **Radix UI** | Accessible components |
| **Zustand** | State management |
| **Lucide Icons** | Icon library |

##  Screenshots

### Home Page
- Modern hero section with animated gradient text
- Feature cards with tilt effects
- Statistics with spotlight animations

### Diagnosis Pages
- Drag & drop file upload
- Real-time streaming analysis
- Interactive report viewer
- AI chat for follow-up questions

### History Page
- Filter by report type
- Search functionality
- Sort by date
- Delete individual or all reports

---

##  License

MIT License - See [LICENSE](LICENSE) file

---

<div align="center">

**Made with ❤️ by CuraSense Team**

[⭐ Star this repo](https://github.com/VaibhavK289/curasense-diagnosis) | [🐛 Report Bug](https://github.com/VaibhavK289/curasense-diagnosis/issues) | [💡 Request Feature](https://github.com/VaibhavK289/curasense-diagnosis/issues)

</div>
