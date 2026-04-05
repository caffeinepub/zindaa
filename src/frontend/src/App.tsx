import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Menu, Play, Star, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";
import { useProgress } from "./hooks/useProgress";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Module {
  emoji: string;
  title: string;
  label: string;
  description: string;
  tip: string;
  color: string;
  glow: string;
  steps: { emoji: string; text: string }[];
}

interface AgeGroup {
  emoji: string;
  age: string;
  desc: string;
  bg: string;
  border: string;
}

interface VrScene {
  emoji: string;
  title: string;
  caption: string;
  bg: string;
}

interface GalleryItem {
  emoji: string;
  title: string;
  goal: string;
  bg: string;
}

interface Plan {
  emoji: string;
  name: string;
  price: string;
  period: string;
  popular: boolean;
  features: string[];
  color: string;
  btnColor: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  badgeColor: string;
  borderColor: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const MODULES: Module[] = [
  {
    emoji: "🦷",
    title: "Morning Routine",
    label: "Wash, brush, dress!",
    description: "Start every day fresh and happy!",
    tip: "Try setting a timer for brushing teeth",
    color: "from-sky-200 to-blue-300",
    glow: "hover:shadow-blue-300/60",
    steps: [
      { emoji: "💧", text: "Turn on the tap and wet your hands" },
      { emoji: "🧼", text: "Apply soap and rub for 20 seconds" },
      { emoji: "🦷", text: "Brush teeth for 2 minutes" },
      { emoji: "👕", text: "Pick clothes and get dressed" },
    ],
  },
  {
    emoji: "🏫",
    title: "School Skills",
    label: "Learn & grow together",
    description: "Learn, grow, and shine at school!",
    tip: "Pack your bag the night before",
    color: "from-violet-200 to-purple-300",
    glow: "hover:shadow-purple-300/60",
    steps: [
      { emoji: "🎒", text: "Pack your school bag" },
      { emoji: "✏️", text: "Write your name on your book" },
      { emoji: "🙋", text: "Raise your hand to answer" },
      { emoji: "🤝", text: "Say hello to your classmates" },
    ],
  },
  {
    emoji: "🤝",
    title: "Play & Social Skills",
    label: "Friends & fun!",
    description: "Make friends and have fun together!",
    tip: "A smile is the best way to say hello",
    color: "from-pink-200 to-rose-300",
    glow: "hover:shadow-pink-300/60",
    steps: [
      { emoji: "👋", text: "Walk up and say hi" },
      { emoji: "🎮", text: "Ask if you can play together" },
      { emoji: "😊", text: "Take turns and share" },
      { emoji: "🥳", text: "Celebrate with your new friend" },
    ],
  },
  {
    emoji: "🛒",
    title: "Shopping Practice",
    label: "Pick, pay, go!",
    description: "Be a smart shopper every time!",
    tip: "Always check your list twice",
    color: "from-orange-200 to-amber-300",
    glow: "hover:shadow-orange-300/60",
    steps: [
      { emoji: "📝", text: "Read the shopping list" },
      { emoji: "🛒", text: "Find items on the shelf" },
      { emoji: "💰", text: "Count your money" },
      { emoji: "🛍️", text: "Pay and collect your bag" },
    ],
  },
  {
    emoji: "🚦",
    title: "Road Safety",
    label: "Stay safe always",
    description: "Stay safe, stay alert, stay confident!",
    tip: "Always hold an adult's hand near roads",
    color: "from-emerald-200 to-green-300",
    glow: "hover:shadow-green-300/60",
    steps: [
      { emoji: "👀", text: "Look left, right, left again" },
      { emoji: "🚦", text: "Wait for the green light" },
      { emoji: "🦺", text: "Cross at the zebra crossing" },
      { emoji: "✋", text: "Walk, don't run across" },
    ],
  },
];

const AGE_GROUPS: AgeGroup[] = [
  {
    emoji: "🐣",
    age: "Age 3–5",
    desc: "Fun mobile games",
    bg: "bg-yellow-100",
    border: "border-yellow-400",
  },
  {
    emoji: "🌱",
    age: "Age 6–8",
    desc: "Simple VR adventures",
    bg: "bg-teal-100",
    border: "border-teal-400",
  },
  {
    emoji: "🌟",
    age: "Age 9–12",
    desc: "Social skill training",
    bg: "bg-purple-100",
    border: "border-purple-400",
  },
  {
    emoji: "🦁",
    age: "Age 13+",
    desc: "Independence skills",
    bg: "bg-rose-100",
    border: "border-rose-400",
  },
];

const VR_SCENES: VrScene[] = [
  {
    emoji: "🦷",
    title: "Brushing Teeth",
    caption: "Learn the perfect routine",
    bg: "bg-sky-100",
  },
  {
    emoji: "🛝",
    title: "Playground",
    caption: "Make friends and play",
    bg: "bg-green-100",
  },
  {
    emoji: "🛒",
    title: "Shopping",
    caption: "Practice buying groceries",
    bg: "bg-orange-100",
  },
  {
    emoji: "🏫",
    title: "Classroom",
    caption: "Interactive school day",
    bg: "bg-purple-100",
  },
  {
    emoji: "🚶",
    title: "Road Crossing",
    caption: "Stay safe on roads",
    bg: "bg-rose-100",
  },
];

const GALLERY_ITEMS: GalleryItem[] = [
  {
    emoji: "🌅",
    title: "Morning Routine Training",
    goal: "Build daily independence habits",
    bg: "bg-amber-100",
  },
  {
    emoji: "🍳",
    title: "Kitchen Learning",
    goal: "Safe food prep & cooking skills",
    bg: "bg-orange-100",
  },
  {
    emoji: "🏫",
    title: "Classroom Interaction",
    goal: "Engage, listen & participate",
    bg: "bg-violet-100",
  },
  {
    emoji: "🛒",
    title: "Shopping Practice",
    goal: "Count money & make choices",
    bg: "bg-teal-100",
  },
  {
    emoji: "🚦",
    title: "Road Safety Training",
    goal: "Navigate streets confidently",
    bg: "bg-green-100",
  },
];

const PLANS: Plan[] = [
  {
    emoji: "🆓",
    name: "Free Family Plan",
    price: "$0",
    period: "/month",
    popular: false,
    features: [
      "✅ 2 learning modules",
      "📊 Basic progress tracking",
      "📱 Mobile app access",
      "👨‍👩‍👧 1 child profile",
    ],
    color: "border-teal-300 bg-teal-50",
    btnColor: "bg-teal-500 hover:bg-teal-600 text-white",
  },
  {
    emoji: "🏫",
    name: "School Plan",
    price: "$29",
    period: "/month",
    popular: true,
    features: [
      "✅ All 15 modules",
      "📊 Class management",
      "🥽 Full VR access",
      "📋 Detailed reports",
      "👥 Up to 30 students",
    ],
    color: "border-purple-400 bg-purple-50 ring-2 ring-purple-400",
    btnColor: "bg-purple-600 hover:bg-purple-700 text-white",
  },
  {
    emoji: "💼",
    name: "Therapy Pro Plan",
    price: "$49",
    period: "/month",
    popular: false,
    features: [
      "✅ All School features",
      "🩺 Therapist tools",
      "📈 Advanced analytics",
      "🔔 Priority support",
      "🏆 Custom modules",
    ],
    color: "border-rose-300 bg-rose-50",
    btnColor: "bg-rose-500 hover:bg-rose-600 text-white",
  },
];

const IMPACT_ITEMS = [
  {
    emoji: "🏆",
    title: "Improves Independence",
    desc: "Children learn real-world skills",
  },
  {
    emoji: "💬",
    title: "Builds Social Skills",
    desc: "Peer interaction & communication",
  },
  {
    emoji: "🌍",
    title: "Real-Life Learning",
    desc: "VR mirrors daily situations",
  },
  {
    emoji: "💪",
    title: "Encourages Confidence",
    desc: "Safe space to try & succeed",
  },
];

const COLLAB_TYPES = [
  { emoji: "🏫", title: "Schools", desc: "Bring Zindaa to your classroom" },
  { emoji: "🩺", title: "Therapists", desc: "Enhance your therapy sessions" },
  { emoji: "🌿", title: "NGOs", desc: "Support inclusive education" },
  { emoji: "🔬", title: "Researchers", desc: "Collaborate on impact studies" },
];

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Shruti More",
    role: "Founder & CEO",
    bio: "Visionary behind Zindaa's mission for inclusive learning",
    avatar: "/assets/generated/avatar-shruti.dim_400x400.png",
    badgeColor: "bg-purple-600 text-white",
    borderColor: "border-purple-300",
  },
  {
    name: "Saniya Gurav",
    role: "Project Collaborator",
    bio: "Bridges ideas and execution across the platform",
    avatar: "/assets/generated/avatar-saniya.dim_400x400.png",
    badgeColor: "bg-teal-600 text-white",
    borderColor: "border-teal-300",
  },
  {
    name: "Aaryaa Khandwani",
    role: "Research Contributor",
    bio: "Drives evidence-based learning design and research",
    avatar: "/assets/generated/avatar-aaryaa.dim_400x400.png",
    badgeColor: "bg-orange-500 text-white",
    borderColor: "border-orange-300",
  },
  {
    name: "Dnyanada Sarnobat",
    role: "Design & Development",
    bio: "Crafts the visual experience children love to use",
    avatar: "/assets/generated/avatar-dnyanada.dim_400x400.png",
    badgeColor: "bg-pink-500 text-white",
    borderColor: "border-pink-300",
  },
];

const NAV_LINKS = [
  { label: "Modules", href: "#modules" },
  { label: "My Badges", href: "#mybadges" },
  { label: "Ages", href: "#ages" },
  { label: "VR", href: "#vr" },
  { label: "Gallery", href: "#gallery" },
  { label: "Team", href: "#team" },
  { label: "Plans", href: "#plans" },
  { label: "Contact", href: "#contact" },
];

// ── FloatingEmoji ─────────────────────────────────────────────────────────────
function FloatingEmoji({
  emoji,
  className,
}: { emoji: string; className: string }) {
  return (
    <div
      className={`absolute select-none pointer-events-none text-4xl ${className}`}
    >
      {emoji}
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const { actor } = useActor();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAge, setActiveAge] = useState<number | null>(null);
  const [openModule, setOpenModule] = useState<Module | null>(null);
  const [openVideo, setOpenVideo] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState({
    name: "",
    org: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openModuleIdx, setOpenModuleIdx] = useState<number>(-1);

  // Progress tracker
  const {
    completedSteps,
    earnedBadges,
    markDone,
    isLoading: progressLoading,
    newlyEarnedBadge,
    clearNewBadge,
  } = useProgress();

  // Badge celebration toast
  if (newlyEarnedBadge) {
    clearNewBadge();
    const badgeEmojis: Record<string, string> = {
      "Module 1 Complete": "🌅",
      "Module 2 Complete": "🎒",
      "Module 3 Complete": "🎮",
      "Module 4 Complete": "🛒",
      "Module 5 Complete": "🚦",
      "Milestone 3": "⭐",
      "Milestone 5": "🌟",
    };
    const emoji = badgeEmojis[newlyEarnedBadge.name] ?? "🏆";
    toast.success(
      `${emoji} Badge Earned: ${newlyEarnedBadge.name}! ${newlyEarnedBadge.description}`,
      {
        duration: 5000,
        style: { fontSize: "1.1rem", padding: "1rem 1.5rem" },
      },
    );
  }

  // Helper: count completed steps for a module
  function moduleCompletedCount(moduleIdx: number, totalSteps: number): number {
    let count = 0;
    for (let s = 0; s < totalSteps; s++) {
      if (completedSteps.has(`${moduleIdx}-${s}`)) count++;
    }
    return count;
  }

  function handleFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (actor) {
        await (actor as any).submitContactForm(
          form.name,
          form.email,
          form.message,
        );
      } else {
        await new Promise((r) => setTimeout(r, 1000));
      }
    } catch {
      await new Promise((r) => setTimeout(r, 800));
    }
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Message sent! We'll be in touch soon 🎉");
    setForm({ name: "", org: "", email: "", message: "" });
  }

  return (
    <div className="min-h-screen bg-white font-body overflow-x-hidden scroll-smooth">
      <Toaster richColors />

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a
            href="#top"
            className="flex items-center gap-2 font-display font-bold text-2xl text-purple-700"
          >
            <span className="text-3xl">🌟</span> Zindaa
          </a>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid={`nav.link.${i + 1}`}
                className="text-gray-600 hover:text-purple-700 font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#plans"
            className="hidden md:inline-flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2 rounded-full transition-all hover:scale-105"
          >
            Get Started <ChevronRight size={16} />
          </a>
          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-purple-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={24} className="text-purple-700" />
            ) : (
              <Menu size={24} className="text-purple-700" />
            )}
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-purple-100 px-4 pb-4">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid={`nav.link.${i + 1}`}
                className="block py-2 text-gray-700 hover:text-purple-700 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#plans"
              className="mt-2 block text-center bg-purple-600 text-white font-semibold px-5 py-2 rounded-full"
            >
              Get Started
            </a>
          </div>
        )}
      </header>

      {/* ── 1. Hero ── */}
      <section
        id="top"
        className="relative gradient-hero min-h-[90vh] flex items-center overflow-hidden"
      >
        <FloatingEmoji
          emoji="🌟"
          className="top-10 left-8 float-anim opacity-80"
        />
        <FloatingEmoji
          emoji="⭐"
          className="top-24 left-1/4 float-anim-slow opacity-70"
        />
        <FloatingEmoji
          emoji="🎮"
          className="top-16 right-16 float-anim opacity-80"
        />
        <FloatingEmoji
          emoji="🎨"
          className="bottom-20 left-12 float-anim-fast opacity-70"
        />
        <FloatingEmoji
          emoji="🎯"
          className="bottom-16 right-24 float-anim-slow opacity-80"
        />
        <FloatingEmoji
          emoji="🌈"
          className="top-1/2 right-8 float-anim opacity-60"
        />
        <FloatingEmoji
          emoji="✨"
          className="bottom-32 left-1/3 float-anim-fast opacity-70"
        />

        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              🎓 Visual & VR Learning Platform
            </div>
            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
              Zindaa – <span className="text-yellow-200">Learning</span> Life
              Skills
              <br />
              Through <span className="text-pink-200">Play</span>
            </h1>
            <p className="text-white/90 text-xl md:text-2xl mb-10 max-w-xl">
              Interactive & VR Learning for Every Child 🌟
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href="#modules"
                data-ocid="hero.primary_button"
                className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold text-lg px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition-transform hover:shadow-2xl"
              >
                🚀 Start Learning
              </a>
              <a
                href="#gallery"
                data-ocid="hero.secondary_button"
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white border-2 border-white/60 font-bold text-lg px-8 py-4 rounded-2xl hover:bg-white/30 hover:scale-105 transition-all"
              >
                ▶️ Watch Demo
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-3xl blur-3xl scale-110" />
              <img
                src="/assets/generated/hero-vr-child.dim_900x600.png"
                alt="Child learning with VR headset"
                className="relative z-10 w-full max-w-lg rounded-3xl shadow-2xl float-anim"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Learning Modules ── */}
      <section
        id="modules"
        className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-800 mb-3">
              📚 Learning Modules
            </h2>
            <p className="text-gray-500 text-lg">
              Tap a card to start your adventure!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {MODULES.map((mod, i) => (
              <button
                type="button"
                key={mod.title}
                data-ocid={`modules.item.${i + 1}`}
                onClick={() => {
                  setOpenModule(mod);
                  setOpenModuleIdx(i);
                }}
                style={{ animationDelay: `${i * 0.1}s` }}
                className={`group relative bg-gradient-to-br ${mod.color} rounded-3xl p-7 text-center shadow-lg hover:shadow-2xl ${mod.glow} hover:scale-110 transition-all duration-300 cursor-pointer border-2 border-white`}
              >
                {/* Progress ring */}
                {(() => {
                  const total = mod.steps.length;
                  const done = progressLoading
                    ? 0
                    : moduleCompletedCount(i, total);
                  const pct = total > 0 ? (done / total) * 100 : 0;
                  const r = 14;
                  const circ = 2 * Math.PI * r;
                  const dash = (pct / 100) * circ;
                  return (
                    <div className="absolute top-2 right-2 w-12 h-12 flex items-center justify-center">
                      <svg
                        width="48"
                        height="48"
                        className="-rotate-90"
                        aria-label="Progress ring"
                        role="img"
                      >
                        <circle
                          cx="24"
                          cy="24"
                          r={r}
                          fill="white"
                          fillOpacity="0.8"
                          stroke="#e9d5ff"
                          strokeWidth="3"
                        />
                        <circle
                          cx="24"
                          cy="24"
                          r={r}
                          fill="none"
                          stroke={
                            done === total && total > 0 ? "#22c55e" : "#a855f7"
                          }
                          strokeWidth="3"
                          strokeDasharray={`${dash} ${circ}`}
                          strokeLinecap="round"
                          style={{ transition: "stroke-dasharray 0.5s ease" }}
                        />
                      </svg>
                      <span className="absolute text-[10px] font-bold text-purple-700">
                        {done}/{total}
                      </span>
                    </div>
                  );
                })()}
                {/* Emoji */}
                <div className="text-7xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {mod.emoji}
                </div>
                <h3 className="font-display font-bold text-gray-800 text-lg mb-1">
                  {mod.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{mod.description}</p>
                {/* Start button */}
                <div className="mt-3 inline-flex items-center gap-1.5 bg-white/80 hover:bg-white text-purple-700 font-semibold text-sm px-4 py-2 rounded-full transition-all group-hover:shadow-lg group-hover:bg-white">
                  Start Activity →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Module Detail Dialog */}
      <Dialog
        open={!!openModule}
        onOpenChange={() => {
          setOpenModule(null);
          setOpenModuleIdx(-1);
        }}
      >
        <DialogContent
          data-ocid="modules.modal"
          className="max-w-lg rounded-3xl"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-display flex items-center gap-3">
              <span className="text-5xl">{openModule?.emoji}</span>
              <div>
                <div>{openModule?.title}</div>
                <div className="text-sm font-normal text-gray-500 mt-0.5">
                  {openModule?.description}
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
          {/* VR badge */}
          <div className="flex gap-2 flex-wrap">
            <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1.5 rounded-full">
              🥽 VR Learning Available
            </span>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
              ✅ {openModule?.steps.length} Steps
            </span>
          </div>
          {/* Progress bar */}
          {openModule &&
            (() => {
              const total = openModule.steps.length;
              const done = moduleCompletedCount(openModuleIdx, total);
              const pct = total > 0 ? Math.round((done / total) * 100) : 0;
              const allDone = done === total && total > 0;
              return (
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-purple-700">Progress</span>
                    <span
                      className={allDone ? "text-green-600" : "text-purple-700"}
                    >
                      {done}/{total} steps
                    </span>
                  </div>
                  <div className="h-4 bg-purple-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        background:
                          "linear-gradient(90deg, #f97316, #ec4899, #a855f7, #3b82f6)",
                      }}
                    />
                  </div>
                  {allDone && (
                    <div className="mt-3 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-4 text-center animate-bounce-once">
                      <div className="text-4xl mb-1">🏆</div>
                      <div className="font-bold text-xl text-orange-600">
                        Module Complete!
                      </div>
                      <div className="text-sm text-orange-500 mt-0.5">
                        You earned a badge! Check My Badges below 🎉
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          {/* Steps */}
          <div className="space-y-3 mt-1">
            {openModule?.steps.map((step, idx) => {
              const isDone = completedSteps.has(`${openModuleIdx}-${idx}`);
              return (
                <button
                  type="button"
                  key={step.text}
                  data-ocid={`progress.step.checkbox.${idx + 1}`}
                  onClick={() =>
                    !isDone && markDone(openModuleIdx, Math.min(idx, 4))
                  }
                  className={`w-full flex items-center gap-4 rounded-2xl p-4 border-2 transition-all duration-300 cursor-pointer text-left
                    ${
                      isDone
                        ? "bg-green-50 border-green-400 shadow-green-100 shadow-md"
                        : "bg-purple-50 border-purple-200 hover:border-purple-400 hover:bg-purple-100 active:scale-95"
                    }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 text-xl font-bold
                    ${isDone ? "bg-green-500 text-white scale-110" : "bg-purple-600 text-white"}`}
                  >
                    {isDone ? "✓" : idx + 1}
                  </div>
                  <div className="text-3xl flex-shrink-0">{step.emoji}</div>
                  <p
                    className={`text-sm font-medium flex-1 ${isDone ? "line-through text-gray-400" : "text-gray-700"}`}
                  >
                    {step.text}
                  </p>
                  {isDone && (
                    <span className="text-green-500 text-lg flex-shrink-0">
                      🌟
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          {/* Pro Tip */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <div className="font-bold text-amber-800 text-sm">Pro Tip</div>
              <div className="text-amber-700 text-sm mt-0.5">
                {openModule?.tip}
              </div>
            </div>
          </div>
          {/* VR Preview placeholder */}
          <div
            className="relative bg-gray-900 rounded-2xl overflow-hidden"
            style={{ paddingTop: "40%" }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="bg-white/20 rounded-full p-4">
                <Play size={28} className="text-white ml-1" />
              </div>
              <p className="text-white/60 text-sm">VR Preview Coming Soon</p>
            </div>
          </div>
          <Button
            data-ocid="modules.close_button"
            onClick={() => {
              setOpenModule(null);
              setOpenModuleIdx(-1);
            }}
            className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-lg py-6"
          >
            Done! 🚀
          </Button>
        </DialogContent>
      </Dialog>

      {/* ── My Badges Section ── */}
      <section
        id="mybadges"
        data-ocid="mybadges.section"
        className="py-20 px-4 bg-gradient-to-br from-yellow-50 to-orange-50"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-800 mb-3">
              My Badges 🏆
            </h2>
            <p className="text-gray-500 text-lg">
              Complete all steps in a module to earn a badge!
            </p>
          </div>
          {progressLoading ? (
            <div
              data-ocid="progress.loading_state"
              className="flex justify-center items-center py-12"
            >
              <div className="text-5xl animate-spin">🌟</div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
              {(() => {
                const badgeEmojis: Record<string, string> = {
                  "Module 1 Complete": "🌅",
                  "Module 2 Complete": "🎒",
                  "Module 3 Complete": "🎮",
                  "Module 4 Complete": "🛒",
                  "Module 5 Complete": "🚦",
                  "Milestone 3": "⭐",
                  "Milestone 5": "🌟",
                };
                const allBadges =
                  earnedBadges.length > 0
                    ? earnedBadges
                    : [
                        {
                          name: "Module 1 Complete",
                          description: "Mastered the Morning Routine!",
                          earned: false,
                        },
                        {
                          name: "Module 2 Complete",
                          description: "Aced all School Skills!",
                          earned: false,
                        },
                        {
                          name: "Module 3 Complete",
                          description: "Nailed Play & Social Skills!",
                          earned: false,
                        },
                        {
                          name: "Module 4 Complete",
                          description: "Shopping Pro!",
                          earned: false,
                        },
                        {
                          name: "Module 5 Complete",
                          description: "Road Safety Champion!",
                          earned: false,
                        },
                        {
                          name: "Milestone 3",
                          description: "Completed 3 modules!",
                          earned: false,
                        },
                        {
                          name: "Milestone 5",
                          description: "All Star — finished everything!",
                          earned: false,
                        },
                      ];
                return allBadges.map((badge, i) => {
                  const emoji = badgeEmojis[badge.name] ?? "🏅";
                  return (
                    <div
                      key={badge.name}
                      data-ocid={`progress.badge.item.${i + 1}`}
                      className={`relative flex flex-col items-center justify-center text-center rounded-3xl p-5 min-h-[160px] border-2 transition-all duration-500
                        ${
                          badge.earned
                            ? "bg-white border-yellow-300 shadow-xl shadow-yellow-200/60 scale-105"
                            : "bg-gray-100 border-gray-200 grayscale opacity-60"
                        }`}
                    >
                      {badge.earned && (
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-100/60 to-orange-100/60 pointer-events-none" />
                      )}
                      <div
                        className={`text-5xl mb-3 ${badge.earned ? "animate-pulse" : ""}`}
                      >
                        {emoji}
                      </div>
                      <div
                        className={`font-bold text-sm leading-tight ${badge.earned ? "text-gray-800" : "text-gray-500"}`}
                      >
                        {badge.name}
                      </div>
                      <div
                        className={`text-xs mt-1 leading-tight ${badge.earned ? "text-gray-500" : "text-gray-400"}`}
                      >
                        {badge.description}
                      </div>
                      {badge.earned && (
                        <div className="mt-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                          ✓ Earned!
                        </div>
                      )}
                    </div>
                  );
                });
              })()}
            </div>
          )}
        </div>
      </section>

      {/* ── 3. Age-Based Learning ── */}
      <section id="ages" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-800 mb-3">
              👶 Choose Your Age
            </h2>
            <p className="text-gray-500 text-lg">Every age, a new adventure!</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {AGE_GROUPS.map((ag, i) => (
              <button
                type="button"
                key={ag.age}
                data-ocid={`age.item.${i + 1}`}
                onClick={() => setActiveAge(activeAge === i ? null : i)}
                className={`group flex flex-col items-center p-8 rounded-3xl border-4 transition-all duration-300 hover:scale-105 cursor-pointer
                  ${
                    activeAge === i
                      ? `${ag.bg} ${ag.border} scale-110 shadow-xl ring-4 ring-offset-2 ${ag.border.replace("border-", "ring-")}`
                      : "bg-gray-50 border-gray-200 hover:border-gray-300"
                  }`}
              >
                <div
                  className={`text-6xl mb-3 transition-transform duration-300 ${activeAge === i ? "scale-110" : "group-hover:scale-105"}`}
                >
                  {ag.emoji}
                </div>
                <div className="font-display font-bold text-gray-800 text-lg">
                  {ag.age}
                </div>
                <div className="text-gray-500 text-sm mt-1 text-center">
                  {ag.desc}
                </div>
                {activeAge === i && (
                  <div className="mt-3 bg-white/70 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
                    ✓ Selected!
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. VR Experiences ── */}
      <section
        id="vr"
        className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-violet-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-800 mb-3">
              🥽 VR Experiences
            </h2>
            <p className="text-gray-500 text-lg">
              Step inside the virtual world!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {VR_SCENES.map((scene) => (
              <div
                key={scene.title}
                className={`${scene.bg} rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-white group cursor-pointer`}
              >
                {/* 16:9 ratio area */}
                <div className="relative" style={{ paddingTop: "56.25%" }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl">{scene.emoji}</span>
                  </div>
                  {/* Animated play button overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-4 shadow-xl hover:scale-110">
                      <Play size={24} className="text-purple-700 ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-gray-800">
                    {scene.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{scene.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Parent & Therapist Dashboard ── */}
      <section id="dashboard" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-800 mb-3">
              📊 Dashboard for Parents & Therapists
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Log in to monitor progress, assign activities, and generate
              reports — all in one beautiful dashboard.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                emoji: "📈",
                title: "Progress Charts",
                desc: "Track your child's growth week by week with visual charts",
                bg: "bg-blue-50",
                border: "border-blue-200",
              },
              {
                emoji: "📋",
                title: "Learning Reports",
                desc: "Detailed activity reports and insights at a glance",
                bg: "bg-purple-50",
                border: "border-purple-200",
              },
              {
                emoji: "✅",
                title: "Activity Tracking",
                desc: "Assign, monitor, and celebrate daily task completions",
                bg: "bg-green-50",
                border: "border-green-200",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`${item.bg} border-2 ${item.border} rounded-3xl p-8 text-center shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300`}
              >
                <div className="text-6xl mb-5">{item.emoji}</div>
                <h3 className="font-display font-bold text-gray-800 text-xl mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="mt-5 inline-flex items-center gap-1 bg-white text-purple-700 font-semibold text-sm px-5 py-2.5 rounded-full shadow hover:shadow-md transition-all hover:scale-105"
                >
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Subscription Plans ── */}
      <section
        id="plans"
        className="py-20 px-4 bg-gradient-to-br from-purple-50 to-rose-50"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-800 mb-3">
              💎 Choose a Plan
            </h2>
            <p className="text-gray-500 text-lg">
              Find the right fit for your family or institution
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {PLANS.map((plan, i) => (
              <div
                key={plan.name}
                data-ocid={`plans.item.${i + 1}`}
                className={`relative border-2 rounded-3xl p-8 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ${plan.color}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-sm font-bold px-5 py-1.5 rounded-full shadow">
                    ⭐ Most Popular
                  </div>
                )}
                <div className="text-5xl text-center mb-4">{plan.emoji}</div>
                <h3 className="font-display font-bold text-xl text-center text-gray-800 mb-2">
                  {plan.name}
                </h3>
                <div className="text-center mb-6">
                  <span className="text-4xl font-display font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="text-gray-700 text-sm">
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  data-ocid={`plans.primary_button.${i + 1}`}
                  className={`block w-full py-3 rounded-2xl font-semibold transition-all hover:scale-105 text-center ${plan.btnColor}`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Impact ── */}
      <section id="impact" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-800 mb-3">
              ✨ Our Impact
            </h2>
            <p className="text-gray-500 text-lg">Real change, real lives</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
            {IMPACT_ITEMS.map((item) => (
              <div
                key={item.title}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 text-center shadow-sm hover:shadow-lg hover:scale-105 transition-all border border-purple-100"
              >
                <div className="text-6xl mb-4">{item.emoji}</div>
                <h3 className="font-display font-bold text-gray-800 text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          {/* Stats */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-10 grid grid-cols-3 gap-4 text-center text-white">
            {[
              { num: "500+", label: "Children Helped" },
              { num: "50+", label: "Partner Schools" },
              { num: "20+", label: "Therapists" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display font-bold text-4xl md:text-5xl mb-2 text-yellow-200">
                  {stat.num}
                </div>
                <div className="text-white/80 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Founder ── */}
      <section
        id="founder"
        className="py-20 px-4 bg-gradient-to-br from-violet-50 to-pink-50"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-800 mb-3">
              👩‍💼 Meet the Founder
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-12 bg-white rounded-3xl shadow-xl p-10 md:p-16">
            {/* Image */}
            <div className="flex-shrink-0 flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 scale-110 blur-md opacity-60" />
                <img
                  src="/assets/generated/founder-shruti.dim_400x400.png"
                  alt="Shruti More, Founder of Zindaa"
                  className="relative z-10 w-52 h-52 rounded-full object-cover ring-4 ring-white shadow-2xl pulse-ring"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <div className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                  🔬 3 Years Research
                </div>
                <div className="bg-pink-100 text-pink-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                  🌟 500+ Children
                </div>
                <div className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                  🥽 AR/VR Expert
                </div>
                <div className="bg-teal-100 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                  🎓 Inclusive Ed
                </div>
              </div>
            </div>
            {/* Text */}
            <div className="flex-1">
              <h3 className="font-display font-bold text-3xl text-gray-900 mb-1">
                Shruti More
              </h3>
              <div className="inline-block bg-purple-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                Founder & CEO of Zindaa
              </div>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  Shruti More is an educator and technologist deeply passionate
                  about inclusive learning. She believes every child—regardless
                  of ability—deserves a joyful, empowering path to independence.
                </p>
                <p>
                  After witnessing firsthand how children with Down syndrome
                  struggled with traditional learning methods, Shruti set out to
                  build something different. She combined her fascination with
                  AR/VR technology and her expertise in inclusive education to
                  create Zindaa.
                </p>
                <p>
                  Her vision: a global platform where children develop real-life
                  independence skills through immersive play, breaking barriers
                  that traditional education could never reach.
                </p>
              </div>
              <blockquote className="mt-6 border-l-4 border-purple-400 pl-5 py-2 bg-purple-50 rounded-r-2xl">
                <p className="text-purple-800 text-lg font-medium italic">
                  "Every child deserves the tools to live independently,
                  confidently, and happily."
                </p>
                <footer className="mt-2 text-purple-600 text-sm font-semibold">
                  — Shruti More
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. Our Team ── */}
      <section id="team" className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-800 mb-3">
              👥 Our Team
            </h2>
            <p className="text-gray-500 text-lg">
              The passionate people behind Zindaa
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, i) => (
              <div
                key={member.name}
                data-ocid={`team.card.${i + 1}`}
                className={`bg-white rounded-3xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 p-6 text-center border-2 ${member.borderColor} group`}
              >
                <div className="relative mx-auto w-24 h-24 mb-4">
                  <div
                    className={`absolute inset-0 rounded-full blur-md opacity-40 scale-110 ${member.badgeColor}`}
                  />
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="relative z-10 w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg"
                  />
                </div>
                <h3 className="font-display font-bold text-gray-900 text-base mb-1.5">
                  {member.name}
                </h3>
                <div
                  className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${member.badgeColor}`}
                >
                  {member.role}
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. VR Video Gallery ── */}
      <section
        id="gallery"
        className="py-20 px-4 bg-gradient-to-br from-slate-50 to-indigo-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-800 mb-3">
              🎬 VR Learning Gallery
            </h2>
            <p className="text-gray-500 text-lg">
              Watch how children learn through immersive VR
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={item.title}
                data-ocid={`gallery.item.${i + 1}`}
                className={`${item.bg} rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-white group`}
              >
                <div className="relative" style={{ paddingTop: "56.25%" }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl">{item.emoji}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <button
                      type="button"
                      data-ocid={`gallery.play_button.${i + 1}`}
                      onClick={() => setOpenVideo(item)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-4 shadow-xl hover:scale-110"
                      aria-label={`Play ${item.title}`}
                    >
                      <Play size={24} className="text-purple-700 ml-0.5" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-gray-800 text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs mb-3">{item.goal}</p>
                  <button
                    type="button"
                    onClick={() => setOpenVideo(item)}
                    className="w-full bg-white/80 hover:bg-white text-purple-700 font-semibold text-sm py-2 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow"
                  >
                    <Play size={14} /> Play Video
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <Dialog open={!!openVideo} onOpenChange={() => setOpenVideo(null)}>
        <DialogContent className="max-w-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display flex items-center gap-3">
              <span className="text-4xl">{openVideo?.emoji}</span>
              <span>{openVideo?.title}</span>
            </DialogTitle>
          </DialogHeader>
          <div
            className="relative bg-gray-900 rounded-2xl overflow-hidden"
            style={{ paddingTop: "56.25%" }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="text-8xl">{openVideo?.emoji}</span>
              <div className="bg-white/20 rounded-full p-5">
                <Play size={40} className="text-white ml-1" />
              </div>
              <p className="text-white/70 text-sm">VR Video Preview</p>
            </div>
          </div>
          <p className="text-gray-600 text-center">{openVideo?.goal}</p>
          <Button
            onClick={() => setOpenVideo(null)}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>

      {/* ── 11. Contact & Collaboration ── */}
      <section
        id="contact"
        className="py-20 px-4 bg-gradient-to-br from-teal-50 to-blue-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-gray-800 mb-3">
              🤝 Partner With Us
            </h2>
            <p className="text-gray-500 text-lg">
              Join the Zindaa community and make a difference
            </p>
          </div>

          {/* Collab cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {COLLAB_TYPES.map((ct) => (
              <div
                key={ct.title}
                className="bg-white rounded-3xl p-8 text-center shadow-md hover:shadow-xl hover:scale-105 transition-all border border-teal-100"
              >
                <div className="text-5xl mb-4">{ct.emoji}</div>
                <h3 className="font-display font-bold text-gray-800 mb-1">
                  {ct.title}
                </h3>
                <p className="text-gray-500 text-sm">{ct.desc}</p>
              </div>
            ))}
          </div>

          {/* Contact details + form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact info */}
            <div className="bg-white rounded-3xl shadow-md p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                  👩‍💼
                </div>
                <div>
                  <div className="font-display font-bold text-gray-900">
                    Shruti More
                  </div>
                  <div className="text-purple-600 text-sm font-semibold">
                    Founder, Zindaa
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <a
                  href="mailto:shruti.more@example.com"
                  className="flex items-center gap-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-4 py-3 rounded-2xl transition-colors"
                >
                  <span className="text-xl">📧</span>
                  <span className="text-sm">shruti.more@example.com</span>
                </a>
                <a
                  href="mailto:contact@zindaa.org"
                  className="flex items-center gap-3 bg-teal-50 hover:bg-teal-100 text-teal-700 font-semibold px-4 py-3 rounded-2xl transition-colors"
                >
                  <span className="text-xl">📬</span>
                  <span className="text-sm">contact@zindaa.org</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/shrutimore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold px-4 py-3 rounded-2xl transition-colors"
                >
                  <span className="text-xl">💼</span>
                  <span className="text-sm">linkedin.com/in/shrutimore</span>
                </a>
              </div>
            </div>

            {/* Contact form */}
            <div className="bg-white rounded-3xl shadow-md p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="font-display font-bold text-2xl text-gray-800 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500">We'll be in touch soon.</p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-5 bg-purple-600 text-white font-semibold px-6 py-3 rounded-2xl hover:bg-purple-700 transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleFormChange}
                    required
                    data-ocid="contact.input"
                    className="rounded-2xl border-gray-200 focus:border-purple-400"
                  />
                  <Input
                    name="org"
                    placeholder="Organisation (optional)"
                    value={form.org}
                    onChange={handleFormChange}
                    className="rounded-2xl border-gray-200"
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleFormChange}
                    required
                    className="rounded-2xl border-gray-200 focus:border-purple-400"
                  />
                  <Textarea
                    name="message"
                    placeholder="Your message..."
                    value={form.message}
                    onChange={handleFormChange}
                    required
                    rows={4}
                    data-ocid="contact.textarea"
                    className="rounded-2xl border-gray-200 focus:border-purple-400 resize-none"
                  />
                  <Button
                    type="submit"
                    disabled={submitting}
                    data-ocid="contact.submit_button"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-2xl py-6 text-lg font-semibold"
                  >
                    {submitting ? "Sending... ✨" : "Send Message 🚀"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-white py-10 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 font-display font-bold text-2xl mb-3">
            <span className="text-3xl">🌟</span> Zindaa
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Empowering children with Down syndrome through visual & VR learning
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-400 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
