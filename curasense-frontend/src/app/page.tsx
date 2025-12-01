"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Stethoscope,
  FileText,
  ScanLine,
  Pill,
  ArrowRight,
  Shield,
  Zap,
  Brain,
  Heart,
  Activity,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  GradientText,
  FloatingOrb,
  SpotlightCard,
  PulsingDot,
  TiltCard,
  StaggerContainer,
  StaggerItem,
  AnimatedContainer,
  OrganicBlob,
  DNAPattern,
  HeartbeatDivider,
} from "@/components/ui/aceternity";
import { springPresets, animationVariants } from "@/styles/tokens/animations";

// Feature cards with semantic category colors
const features = [
  {
    icon: FileText,
    title: "Prescription Analysis",
    description:
      "Upload any medical prescription or blood test report PDF for instant AI-powered analysis and insights.",
    href: "/diagnosis/prescription",
    bgColor: "bg-[hsl(var(--color-diagnosis))]",
    shadowColor: "shadow-[hsl(var(--color-diagnosis)/0.3)]",
    hoverShadow: "hover:shadow-[hsl(var(--color-diagnosis)/0.2)]",
    textColor: "text-[hsl(var(--color-diagnosis))]",
  },
  {
    icon: ScanLine,
    title: "X-Ray & CT Analysis",
    description:
      "Advanced vision AI to analyze X-rays, CT scans, and MRI images with detailed diagnostic reports.",
    href: "/diagnosis/xray",
    bgColor: "bg-[hsl(var(--color-imaging))]",
    shadowColor: "shadow-[hsl(var(--color-imaging)/0.3)]",
    hoverShadow: "hover:shadow-[hsl(var(--color-imaging)/0.2)]",
    textColor: "text-[hsl(var(--color-imaging))]",
  },
  {
    icon: Pill,
    title: "Medicine Comparison",
    description:
      "Compare medications, check interactions, and find alternatives with comprehensive drug information.",
    href: "/medicine",
    bgColor: "bg-[hsl(var(--color-medicine))]",
    shadowColor: "shadow-[hsl(var(--color-medicine)/0.3)]",
    hoverShadow: "hover:shadow-[hsl(var(--color-medicine)/0.2)]",
    textColor: "text-[hsl(var(--color-medicine))]",
  },
];

// Stats with varied icon colors
const stats = [
  { label: "Reports Analysed", value: "10", icon: FileText, color: "text-[hsl(var(--color-diagnosis))]" },
  { label: "Accuracy Rate", value: "98.5%", icon: Shield, color: "text-[hsl(var(--color-success))]" },
  { label: "Response Time", value: "<30s", icon: Zap, color: "text-[hsl(var(--color-warning))]" },
  { label: "AI Models", value: "3", icon: Brain, color: "text-[hsl(var(--brand-secondary))]" },
];

// How it works steps with sequential colors
const howItWorksSteps = [
  {
    step: "01",
    title: "Upload Your Document",
    desc: "Simply drag and drop your prescription, report, or medical image",
    icon: FileText,
    color: "from-[hsl(var(--color-info))] to-[hsl(201_96%_45%)]",
  },
  {
    step: "02",
    title: "AI Analysis",
    desc: "Our advanced AI models process and analyze your medical data",
    icon: Brain,
    color: "from-[hsl(var(--brand-secondary))] to-[hsl(262_83%_65%)]",
  },
  {
    step: "03",
    title: "Get Insights",
    desc: "Receive detailed reports, recommendations, and answers to your questions",
    icon: Activity,
    color: "from-[hsl(var(--color-success))] to-[hsl(142_76%_50%)]",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Elements - Organic shapes mixed with orbs */}
      <FloatingOrb 
        className="w-80 h-80 -top-40 -left-40" 
        delay={0} 
        color="brand-primary"
      />
      <OrganicBlob 
        className="absolute -top-20 right-0 w-[500px] h-[500px] opacity-30"
        color="brand-secondary"
      />
      <FloatingOrb 
        className="w-48 h-48 bottom-1/4 -right-24" 
        delay={3} 
        color="brand-secondary"
      />

      <div className="relative z-10 space-y-24">
        {/* Hero Section with varied entrance animations */}
        <section className="text-center pt-8">
          {/* Status Badge - scale in with bounce */}
          <motion.div 
            variants={animationVariants.scaleIn}
            initial="initial"
            animate="animate"
            transition={springPresets.bouncy}
            className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--color-success)/0.3)] bg-[hsl(var(--color-success)/0.1)] px-4 py-2 text-sm font-medium text-[hsl(var(--color-success))] mb-8"
          >
            <PulsingDot color="success" />
            <span>AI-Powered Healthcare Assistant</span>
          </motion.div>

          {/* Main Headline - blur in effect */}
          <motion.h1 
            variants={animationVariants.blurIn}
            initial="initial"
            animate="animate"
            transition={{ ...springPresets.smooth, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-[hsl(var(--foreground))]"
          >
            Your Health, Powered by{" "}
            <GradientText variant="brand" className="block mt-2">
              Intelligent AI
            </GradientText>
          </motion.h1>

          {/* Subtitle - fade up */}
          <motion.p 
            variants={animationVariants.fadeUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            CuraSense combines cutting-edge AI with medical expertise to provide
            instant analysis of prescriptions, medical images, and drug
            comparisons.
          </motion.p>

          {/* CTA Buttons - slide in from left/right */}
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div
              variants={animationVariants.slideInLeft}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3, ...springPresets.snappy }}
            >
              <Link href="/diagnosis">
                <Button size="lg" variant="default" className="gap-2 text-base px-8 shape-sharp">
                  <Stethoscope className="h-5 w-5" />
                  Start Diagnosis
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              variants={animationVariants.slideInRight}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.35, ...springPresets.snappy }}
            >
              <Link href="/medicine">
                <Button size="lg" variant="outline" className="gap-2 text-base px-8 shape-capsule">
                  <Pill className="h-5 w-5" />
                  Compare Medicines
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Decorative DNA Pattern divider */}
        <DNAPattern className="mx-auto max-w-md" />

        {/* Stats Section with varied stagger animations */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StaggerItem key={stat.label}>
              <motion.div
                whileHover={{ y: -4, transition: springPresets.snappy }}
                whileTap={{ scale: 0.98 }}
              >
                <SpotlightCard className="text-center p-6 md:p-8 shape-asymmetric">
                  <stat.icon className={`h-8 w-8 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[hsl(var(--muted-foreground))]">
                    {stat.label}
                  </div>
                </SpotlightCard>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Heartbeat divider */}
        <HeartbeatDivider className="my-8" color="success" />

        {/* Main Features with varied shapes */}
        <section>
          <AnimatedContainer variant="scaleIn" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-4">
              Powerful Healthcare Tools
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] text-lg max-w-xl mx-auto">
              Three specialized AI models working together for comprehensive healthcare support
            </p>
          </AnimatedContainer>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.12,
                  ...springPresets.smooth
                }}
              >
                <Link href={feature.href}>
                  <TiltCard 
                    className={`h-full cursor-pointer ${index === 1 ? 'shape-soft' : index === 2 ? 'shape-asymmetric-alt' : ''}`}
                  >
                    <div className="h-full flex flex-col p-6 md:p-8">
                      {/* Icon with category color and varied shape */}
                      <div
                        className={`w-14 h-14 ${index === 0 ? 'rounded-xl' : index === 1 ? 'rounded-2xl' : 'shape-squircle'} ${feature.bgColor} flex items-center justify-center mb-6 shadow-lg ${feature.shadowColor}`}
                      >
                        <feature.icon className="h-7 w-7 text-white" />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-[hsl(var(--muted-foreground))] mb-6 flex-grow leading-relaxed">
                        {feature.description}
                      </p>
                      
                      {/* CTA with category color */}
                      <motion.div 
                        className={`flex items-center gap-2 ${feature.textColor} font-medium`}
                        whileHover={{ x: 4 }}
                        transition={springPresets.snappy}
                      >
                        Get Started
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </div>
                  </TiltCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works with varied step colors */}
        <AnimatedContainer variant="fadeLeft">
          <Card className="overflow-hidden border-0 shadow-xl shape-asymmetric">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Steps */}
              <div className="p-8 md:p-12 lg:p-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--foreground))] mb-8">
                  How CuraSense Works
                </h2>
                <div className="space-y-8">
                  {howItWorksSteps.map((item, index) => (
                    <motion.div 
                      key={item.step} 
                      className="flex gap-5"
                      initial={{ opacity: 0, x: -30, scale: 0.95 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ 
                        delay: index * 0.15, 
                        ...springPresets.smooth 
                      }}
                      viewport={{ once: true }}
                    >
                      <div className="flex-shrink-0">
                        <motion.div 
                          className={`w-12 h-12 ${index === 0 ? 'rounded-lg' : index === 1 ? 'rounded-xl' : 'rounded-2xl'} bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold shadow-lg`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={springPresets.bouncy}
                        >
                          {item.step}
                        </motion.div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[hsl(var(--foreground))] text-lg mb-1">
                          {item.title}
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Health CTA Panel - using brand gradient */}
              <div className="bg-gradient-to-br from-[hsl(var(--brand-primary))] via-[hsl(var(--brand-primary))] to-[hsl(var(--brand-secondary))] p-8 md:p-12 lg:p-16 flex items-center justify-center relative overflow-hidden">
                {/* Decorative organic blob */}
                <div className="absolute inset-0 opacity-10">
                  <OrganicBlob className="absolute -top-20 -right-20 w-[400px] h-[400px]" color="white" />
                </div>
                
                <div className="text-center text-white relative z-10">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <Heart className="h-20 w-20 mx-auto mb-6 drop-shadow-lg" />
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Health Matters</h3>
                  <p className="text-white/90 max-w-sm mx-auto leading-relaxed">
                    CuraSense is designed to assist and inform, not replace professional medical advice.
                    Always consult with healthcare professionals.
                  </p>
                  <motion.div 
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 shape-pill bg-white/10 px-4 py-2"
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    HIPAA Compliant Design
                  </motion.div>
                </div>
              </div>
            </div>
          </Card>
        </AnimatedContainer>

        {/* Trust Banner with semantic colors */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center pb-8"
        >
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-6 uppercase tracking-wider font-medium">
            Trusted by healthcare professionals worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {[
              { Icon: Clock, label: "Fast" },
              { Icon: Shield, label: "Secure" },
              { Icon: Brain, label: "Smart" },
              { Icon: Activity, label: "Accurate" },
              { Icon: Heart, label: "Caring" },
            ].map(({ Icon, label }, i) => (
              <motion.div 
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -3, scale: 1.1 }}
                className="flex flex-col items-center gap-2 text-[hsl(var(--muted-foreground)/0.6)] hover:text-[hsl(var(--muted-foreground))] transition-colors cursor-default"
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs font-medium">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
