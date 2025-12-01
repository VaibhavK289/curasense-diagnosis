"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  FileUp,
  PenLine,
  Shield,
  Zap,
  Brain,
  ChevronRight,
  Clock,
  BarChart3,
  Pill,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/file-upload";
import { ReportViewer } from "@/components/report-viewer";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { diagnosePDF, diagnoseText } from "@/lib/api";
import { generateThreadId } from "@/lib/utils";
import { springPresets } from "@/styles/tokens/animations";

// Feature highlights data
const analysisFeatures = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced NLP models extract key medical information",
  },
  {
    icon: Pill,
    title: "Drug Interactions",
    description: "Automatic detection of potential medication conflicts",
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description: "Comprehensive breakdown of diagnoses and treatments",
  },
];

export default function PrescriptionPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"upload" | "manual">("upload");
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");

  const { addReport } = useAppStore();

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setError(null);
    setAnalysisComplete(false);
    setReport(null);
  }, []);

  const handleFileRemove = useCallback(() => {
    setSelectedFile(null);
    setUploadStatus("idle");
    setError(null);
    setAnalysisComplete(false);
    setReport(null);
  }, []);

  const analyzePDF = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setUploadStatus("uploading");
    setError(null);

    try {
      toast.loading("Analyzing your prescription...", { id: "analyze" });
      
      const response = await diagnosePDF(selectedFile);

      if (response.status === "success" && response.report) {
        setReport(response.report);
        setUploadStatus("success");
        setAnalysisComplete(true);
        
        const newReport = {
          id: generateThreadId(),
          type: "pdf" as const,
          title: selectedFile.name,
          content: response.report,
          timestamp: new Date(),
        };
        addReport(newReport);
        
        toast.success("Analysis complete!", { id: "analyze" });
      } else {
        throw new Error(response.error || "Analysis failed");
      }
    } catch (err) {
      setUploadStatus("error");
      setError(err instanceof Error ? err.message : "Analysis failed");
      toast.error("Analysis failed. Please try again.", { id: "analyze" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeText = async () => {
    if (!textInput.trim()) {
      toast.error("Please enter some text to analyze");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      toast.loading("Analyzing your input...", { id: "analyze-text" });
      
      const response = await diagnoseText(textInput);

      if (response.status === "success" && response.report) {
        setReport(response.report);
        setAnalysisComplete(true);
        
        const newReport = {
          id: generateThreadId(),
          type: "pdf" as const,
          title: "Manual Entry Analysis",
          content: response.report,
          timestamp: new Date(),
        };
        addReport(newReport);
        
        toast.success("Analysis complete!", { id: "analyze-text" });
      } else {
        throw new Error(response.error || "Analysis failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
      toast.error("Analysis failed. Please try again.", { id: "analyze-text" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[hsl(var(--brand-primary)/0.03)] via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[hsl(var(--brand-secondary)/0.03)] via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="space-y-8"
      >
        {/* Breadcrumb & Header */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              href="/diagnosis"
              className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--brand-primary))] transition-colors group mb-6"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Diagnosis Hub</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, ...springPresets.smooth }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              {/* Animated Icon */}
              <motion.div 
                className="relative flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={springPresets.snappy}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--color-diagnosis))] to-[hsl(var(--brand-secondary))] rounded-2xl blur-xl opacity-40" />
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(var(--color-diagnosis))] to-[hsl(var(--brand-secondary))] flex items-center justify-center shadow-lg">
                  <FileText className="h-8 w-8 text-white" />
                </div>
              </motion.div>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] tracking-tight">
                  Prescription Analysis
                </h1>
                <p className="text-[hsl(var(--muted-foreground))] mt-1 text-lg">
                  AI-powered medical document analysis in seconds
                </p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-4 text-sm text-[hsl(var(--muted-foreground))]">
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-[hsl(var(--color-success))]" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="hidden md:block w-px h-4 bg-[hsl(var(--border))]" />
              <div className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-[hsl(var(--color-warning))]" />
                <span>Instant Results</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - Input Section (3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ...springPresets.smooth }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Custom Tab Switcher */}
            <div className="bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] p-1.5 shadow-sm">
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setActiveTab("upload")}
                  className={cn(
                    "relative flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl font-medium text-sm transition-all duration-200",
                    activeTab === "upload"
                      ? "text-[hsl(var(--foreground))]"
                      : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted)/0.5)]"
                  )}
                >
                  {activeTab === "upload" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--color-diagnosis)/0.15)] to-[hsl(var(--brand-secondary)/0.1)] rounded-xl border border-[hsl(var(--color-diagnosis)/0.3)]"
                      transition={springPresets.snappy}
                    />
                  )}
                  <FileUp className={cn("h-4 w-4 relative z-10", activeTab === "upload" && "text-[hsl(var(--color-diagnosis))]")} />
                  <span className="relative z-10">Upload Document</span>
                </button>
                <button
                  onClick={() => setActiveTab("manual")}
                  className={cn(
                    "relative flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl font-medium text-sm transition-all duration-200",
                    activeTab === "manual"
                      ? "text-[hsl(var(--foreground))]"
                      : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted)/0.5)]"
                  )}
                >
                  {activeTab === "manual" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--brand-secondary)/0.15)] to-[hsl(var(--color-diagnosis)/0.1)] rounded-xl border border-[hsl(var(--brand-secondary)/0.3)]"
                      transition={springPresets.snappy}
                    />
                  )}
                  <PenLine className={cn("h-4 w-4 relative z-10", activeTab === "manual" && "text-[hsl(var(--brand-secondary))]")} />
                  <span className="relative z-10">Manual Entry</span>
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === "upload" ? (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Upload Card */}
                  <div className="bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] overflow-hidden shadow-sm">
                    <div className="p-6 pb-4 border-b border-[hsl(var(--border))]">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                            Upload Medical Document
                          </h2>
                          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">
                            Drag & drop or click to browse your files
                          </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted)/0.5)] px-3 py-1.5 rounded-full">
                          <Clock className="h-3 w-3" />
                          <span>~30 sec analysis</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <FileUpload
                        accept={{ "application/pdf": [".pdf"] }}
                        onFileSelect={handleFileSelect}
                        onFileRemove={handleFileRemove}
                        selectedFile={selectedFile}
                        isUploading={isAnalyzing}
                        uploadStatus={uploadStatus}
                        title="Drop your PDF here"
                        description="Prescriptions, lab reports, medical records • Max 10MB"
                        icon={<FileText className="h-8 w-8" />}
                      />

                      {/* Error Message */}
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4"
                          >
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-[hsl(var(--color-error)/0.1)] border border-[hsl(var(--color-error)/0.2)]">
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(var(--color-error)/0.2)] flex items-center justify-center">
                                <AlertCircle className="h-4 w-4 text-[hsl(var(--color-error))]" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-[hsl(var(--color-error))]">Analysis Failed</p>
                                <p className="text-xs text-[hsl(var(--color-error)/0.8)]">{error}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Analyze Button */}
                      <motion.div className="mt-6" whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={analyzePDF}
                          disabled={!selectedFile || isAnalyzing}
                          size="lg"
                          className="w-full h-14 text-base font-semibold rounded-xl bg-gradient-to-r from-[hsl(var(--color-diagnosis))] to-[hsl(var(--brand-secondary))] hover:opacity-90 shadow-lg shadow-[hsl(var(--color-diagnosis)/0.25)] transition-all duration-200 disabled:opacity-50 disabled:shadow-none"
                        >
                          {isAnalyzing ? (
                            <div className="flex items-center gap-3">
                              <Loader2 className="h-5 w-5 animate-spin" />
                              <span>Analyzing Document...</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <Sparkles className="h-5 w-5" />
                              <span>Start AI Analysis</span>
                              <ChevronRight className="h-4 w-4" />
                            </div>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="manual"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Manual Entry Card */}
                  <div className="bg-[hsl(var(--card))] rounded-2xl border border-[hsl(var(--border))] overflow-hidden shadow-sm">
                    <div className="p-6 pb-4 border-b border-[hsl(var(--border))]">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                            Enter Medical Information
                          </h2>
                          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">
                            Type or paste prescription details for analysis
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <Textarea
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Enter prescription details, medications, dosages, symptoms, or any medical information...

Example:
• Paracetamol 500mg - Twice daily after meals for 5 days
• Amoxicillin 250mg - Three times daily for 7 days
• Patient complaints: Fever, headache, body pain"
                        className="min-h-[220px] text-base resize-none rounded-xl border-[hsl(var(--border))] focus:border-[hsl(var(--brand-secondary))] focus:ring-2 focus:ring-[hsl(var(--brand-secondary)/0.2)] transition-all"
                      />

                      {/* Character count */}
                      <div className="flex justify-end mt-2">
                        <span className="text-xs text-[hsl(var(--muted-foreground))]">
                          {textInput.length} characters
                        </span>
                      </div>

                      {/* Error Message */}
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4"
                          >
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-[hsl(var(--color-error)/0.1)] border border-[hsl(var(--color-error)/0.2)]">
                              <AlertCircle className="h-5 w-5 text-[hsl(var(--color-error))]" />
                              <p className="text-sm text-[hsl(var(--color-error))]">{error}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Analyze Button */}
                      <motion.div className="mt-6" whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={analyzeText}
                          disabled={!textInput.trim() || isAnalyzing}
                          size="lg"
                          className="w-full h-14 text-base font-semibold rounded-xl bg-gradient-to-r from-[hsl(var(--brand-secondary))] to-[hsl(var(--color-diagnosis))] hover:opacity-90 shadow-lg shadow-[hsl(var(--brand-secondary)/0.25)] transition-all duration-200 disabled:opacity-50 disabled:shadow-none"
                        >
                          {isAnalyzing ? (
                            <div className="flex items-center gap-3">
                              <Loader2 className="h-5 w-5 animate-spin" />
                              <span>Analyzing Text...</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <Sparkles className="h-5 w-5" />
                              <span>Analyze with AI</span>
                              <ChevronRight className="h-4 w-4" />
                            </div>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Feature Highlights */}
            <div className="grid sm:grid-cols-3 gap-4">
              {analysisFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, ...springPresets.smooth }}
                  className="group p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] hover:border-[hsl(var(--brand-primary)/0.3)] hover:shadow-md transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(var(--brand-primary)/0.1)] to-[hsl(var(--brand-secondary)/0.1)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-5 w-5 text-[hsl(var(--brand-primary))]" />
                  </div>
                  <h3 className="font-medium text-sm text-[hsl(var(--foreground))] mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Results Section (2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, ...springPresets.smooth }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              {analysisComplete && report ? (
                <motion.div
                  key="report"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <ReportViewer
                    content={report}
                    title="Analysis Report"
                    type="pdf"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="sticky top-8"
                >
                  <div className="h-[600px] rounded-2xl border-2 border-dashed border-[hsl(var(--border))] bg-gradient-to-b from-[hsl(var(--card))] to-[hsl(var(--muted)/0.3)] flex flex-col items-center justify-center text-center p-8">
                    {/* Animated illustration */}
                    <div className="relative mb-8">
                      <motion.div
                        animate={{ 
                          scale: [1, 1.05, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 w-28 h-28 rounded-full bg-gradient-to-r from-[hsl(var(--color-diagnosis)/0.2)] to-[hsl(var(--brand-secondary)/0.2)] blur-2xl"
                      />
                      <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-[hsl(var(--muted))] to-[hsl(var(--muted)/0.5)] border border-[hsl(var(--border))] flex items-center justify-center">
                        <Stethoscope className="h-10 w-10 text-[hsl(var(--muted-foreground)/0.5)]" />
                      </div>
                      {/* Floating elements */}
                      <motion.div
                        animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-lg bg-[hsl(var(--color-diagnosis)/0.15)] border border-[hsl(var(--color-diagnosis)/0.3)] flex items-center justify-center"
                      >
                        <FileText className="h-4 w-4 text-[hsl(var(--color-diagnosis))]" />
                      </motion.div>
                      <motion.div
                        animate={{ y: [0, -6, 0], rotate: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        className="absolute -bottom-1 -left-3 w-7 h-7 rounded-lg bg-[hsl(var(--brand-secondary)/0.15)] border border-[hsl(var(--brand-secondary)/0.3)] flex items-center justify-center"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--brand-secondary))]" />
                      </motion.div>
                    </div>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-2">
                      Ready to Analyze
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] max-w-xs leading-relaxed mb-6">
                      Upload a prescription or enter medical information to receive a comprehensive AI analysis
                    </p>

                    {/* Quick tips */}
                    <div className="w-full max-w-sm space-y-3">
                      <p className="text-xs font-medium text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-3">
                        What you&apos;ll get
                      </p>
                      {[
                        "Medication breakdown & dosage info",
                        "Potential drug interactions",
                        "Dietary recommendations",
                        "Follow-up questions answered by AI",
                      ].map((tip, i) => (
                        <div key={i} className="flex items-center gap-3 text-left">
                          <div className="w-5 h-5 rounded-full bg-[hsl(var(--color-success)/0.15)] flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="h-3 w-3 text-[hsl(var(--color-success))]" />
                          </div>
                          <span className="text-sm text-[hsl(var(--muted-foreground))]">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
