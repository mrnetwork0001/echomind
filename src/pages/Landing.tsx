import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Brain, Zap, Shield, MessageSquare, ArrowRight, Sparkles, Database, RefreshCw } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: Brain,
    title: "Persistent Memory",
    description: "Your AI remembers preferences, past conversations, and context across every session.",
  },
  {
    icon: Zap,
    title: "Instant Recall",
    description: "Lightning-fast retrieval of stored memories powered by OpenGradient's MemSync engine.",
  },
  {
    icon: Shield,
    title: "Privacy-First",
    description: "Your data stays yours. End-to-end encryption with full user control over stored memories.",
  },
  {
    icon: RefreshCw,
    title: "Adaptive Learning",
    description: "The assistant evolves with you, refining its understanding with every interaction.",
  },
];

const stats = [
  { value: "10x", label: "Faster context recall" },
  { value: "99.9%", label: "Memory accuracy" },
  { value: "50ms", label: "Average latency" },
  { value: "∞", label: "Memory capacity" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
              <Brain className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-bold tracking-tight">MemSync</span>
          </div>
          <button
            onClick={() => navigate("/chat")}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Try the Assistant
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center pt-16">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <Sparkles className="h-3 w-3 text-primary" />
            Powered by OpenGradient
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          >
            An AI that{" "}
            <span className="text-primary glow-text">remembers</span>
            <br />
            who you are
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            A smart assistant designed to truly understand you over time, this AI goes beyond one-off
            conversations by remembering your preferences, habits, and past interactions. Powered by{" "}
            <span className="font-semibold text-foreground">MemSync</span>; OpenGradient's unified AI
            memory product, it seamlessly integrates long-term memory into every interaction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <button
              onClick={() => navigate("/chat")}
              className="group flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 active:scale-95 glow-ring"
            >
              Start Chatting
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="https://docs.opengradient.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-6 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-surface-hover"
            >
              <Database className="h-4 w-4" />
              View Docs
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card/50">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex flex-col items-center gap-1 px-6 py-10"
            >
              <span className="text-3xl font-bold text-primary glow-text">{stat.value}</span>
              <span className="text-xs text-muted-foreground font-mono">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold sm:text-4xl">
              Memory, <span className="text-primary">reimagined</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              MemSync gives your AI the ability to form genuine understanding — not just pattern matching.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/30 hover:bg-secondary/30"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to experience <span className="text-primary">personalized AI</span>?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Try our demo assistant and see how MemSync-powered memory transforms the conversation.
            </p>
            <button
              onClick={() => navigate("/chat")}
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 active:scale-95 glow-ring"
            >
              Launch AI Assistant
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Brain className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono">MemSync by OpenGradient</span>
          </div>
          <span className="text-[11px] text-muted-foreground font-mono">© 2026</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
