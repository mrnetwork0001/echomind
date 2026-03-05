import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Brain,
  Lock,
  MessageSquare,
  Cpu,
  Globe,
  Database,
  Zap,
  KeyRound,
  HardDrive,
  Monitor,
  Briefcase,
} from "lucide-react";
import echomindLogo from "@/assets/echomind-logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const processSteps = [
  { icon: MessageSquare, label: "User Message", desc: "Input" },
  { icon: Cpu, label: "Secure Hardware", desc: "TEE Protection" },
  { icon: Globe, label: "OpenGradient Network", desc: "Verifiable Inference" },
  { icon: Database, label: "MemSync Vault", desc: "Memory Retrieval" },
  { icon: Zap, label: "Personalized Response", desc: "Output" },
];

const features = [
  {
    icon: KeyRound,
    title: "Secure Authentication",
    description: "End-to-end encrypted sessions with Supabase Auth ensuring only you access your memories.",
  },
  {
    icon: HardDrive,
    title: "Decentralized Storage",
    description: "Memories stored across OpenGradient's decentralized network — no single point of failure.",
  },
  {
    icon: Monitor,
    title: "Modern Interface",
    description: "A sleek, responsive chat UI designed for seamless interaction across all devices.",
  },
];

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-2 text-xs font-medium text-secondary-foreground transition-colors hover:bg-surface-hover"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </button>
          <div className="flex items-center gap-2">
            <img src={echomindLogo} alt="EchoMind" className="h-8 w-8 rounded-lg object-contain" />
            <span className="text-sm font-bold tracking-tight">EchoMind</span>
          </div>
          <button
            onClick={() => navigate("/auth")}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            Try It
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center justify-center pt-16 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-primary/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}
          {/* Glowing rings */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full border border-primary/10"
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full border border-primary/5"
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            EchoMind: Your <span className="text-primary glow-text">Verifiable</span> AI Memory Assistant
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Bridging the gap between high-performance intelligence and long-term decentralized memory.
          </motion.p>
        </div>
      </section>

      {/* Core Technology */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center text-3xl font-bold sm:text-4xl mb-12"
          >
            Core <span className="text-primary">Technology</span>
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Verifiable AI Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="rounded-2xl border border-border bg-card/30 backdrop-blur-md p-8 transition-colors hover:border-primary/30"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Verifiable AI</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Every response from EchoMind is processed through the OpenGradient network, ensuring
                cryptographically proven and secure inference. You can trust that every answer is
                authentic, tamper-proof, and verifiable on-chain.
              </p>
              <div className="mt-4 rounded-lg bg-primary/5 border border-primary/10 px-4 py-3">
                <p className="text-xs font-mono text-primary">✓ Cryptographically proven responses</p>
              </div>
            </motion.div>

            {/* Persistent Memory Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              className="rounded-2xl border border-border bg-card/30 backdrop-blur-md p-8 transition-colors hover:border-primary/30"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Persistent Memory</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Powered by MemSync, EchoMind stores personal facts, preferences, and context with
                perfect recall over months and years. Your AI builds a genuine understanding of you
                that grows richer over time.
              </p>
              <div className="mt-4 rounded-lg bg-primary/5 border border-primary/10 px-4 py-3">
                <p className="text-xs font-mono text-primary">∞ Long-term memory retention</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Diagram */}
      <section className="border-y border-border bg-card/30 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center text-3xl font-bold sm:text-4xl mb-16"
          >
            The Data <span className="text-primary">Journey</span>
          </motion.h2>

          {/* Desktop horizontal flow */}
          <div className="hidden sm:flex items-start justify-between gap-2">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="flex flex-1 flex-col items-center text-center relative"
              >
                <div className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-background glow-ring">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <h4 className="text-sm font-semibold">{step.label}</h4>
                <p className="mt-1 text-xs text-muted-foreground font-mono">{step.desc}</p>
                {i < processSteps.length - 1 && (
                  <div className="absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] flex items-center justify-center">
                    <div className="h-px w-full bg-gradient-to-r from-primary/40 to-primary/10" />
                    <ArrowRight className="h-3 w-3 text-primary/50 shrink-0 -ml-1" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile vertical flow */}
          <div className="flex sm:hidden flex-col gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="flex items-center gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-background glow-ring">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{step.label}</h4>
                  <p className="text-xs text-muted-foreground font-mono">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center text-3xl font-bold sm:text-4xl mb-12"
          >
            Key <span className="text-primary">Features</span>
          </motion.h2>

          <div className="grid gap-4 sm:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/30 hover:bg-secondary/30"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Use Case */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="mt-12 rounded-2xl border border-primary/20 bg-card/50 p-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Use Case: Portfolio Memory</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Imagine telling EchoMind about a token purchase you made a year ago. Months later, you
                  ask: <span className="italic text-foreground">"What was that token I bought last March?"</span> —
                  and it recalls the exact asset, price, and your reasoning at the time. That's the power
                  of persistent, verifiable memory.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="border-t border-border bg-card/30 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 glow-ring">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Privacy & <span className="text-primary">Security</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              EchoMind runs within <span className="font-semibold text-foreground">Trusted Execution Environments (TEEs)</span> —
              isolated hardware enclaves that ensure even the VPS host cannot see your private data.
              Your memories and conversations are encrypted end-to-end, processed in secure hardware,
              and verified on the OpenGradient network.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {["TEE Protected", "End-to-End Encrypted", "Zero-Knowledge", "On-Chain Verified"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-mono text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <button
              onClick={() => navigate("/auth")}
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 active:scale-95 glow-ring"
            >
              Back to Chat
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="font-mono">Built by </span>
            <a
              href="https://x.com/encrypt_wizard"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono font-semibold text-primary hover:underline"
            >
              MrNetwork
            </a>
          </div>
          <span className="text-[11px] text-muted-foreground font-mono">© 2026</span>
        </div>
      </footer>
    </div>
  );
};

export default HowItWorks;
