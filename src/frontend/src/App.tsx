import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Globe,
  Heart,
  Menu,
  School,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type PageKey = "home" | "morning" | "school" | "play" | "shopping" | "road";

const MODULES: Array<{
  key: PageKey;
  emoji: string;
  title: string;
  desc: string;
  color: string;
  btn: string;
  gradientFrom: string;
  gradientTo: string;
  glowColor: string;
}> = [
  {
    key: "morning",
    emoji: "🌅",
    title: "Morning Routine",
    desc: "Wake up, brush teeth, get dressed!",
    color: "bg-amber-100",
    btn: "bg-amber-400 hover:bg-amber-500",
    gradientFrom: "oklch(0.92 0.16 88)",
    gradientTo: "oklch(0.82 0.18 60)",
    glowColor: "rgba(251, 191, 36, 0.4)",
  },
  {
    key: "school",
    emoji: "📚",
    title: "School Skills",
    desc: "Reading, writing & classroom fun!",
    color: "bg-sky-100",
    btn: "bg-sky-400 hover:bg-sky-500",
    gradientFrom: "oklch(0.88 0.14 230)",
    gradientTo: "oklch(0.72 0.18 250)",
    glowColor: "rgba(56, 189, 248, 0.4)",
  },
  {
    key: "play",
    emoji: "🎮",
    title: "Play & Social",
    desc: "Making friends & playing together!",
    color: "bg-purple-100",
    btn: "bg-purple-400 hover:bg-purple-500",
    gradientFrom: "oklch(0.88 0.12 290)",
    gradientTo: "oklch(0.7 0.22 300)",
    glowColor: "rgba(192, 132, 252, 0.4)",
  },
  {
    key: "shopping",
    emoji: "🛒",
    title: "Shopping Practice",
    desc: "Pick items, count coins & pay!",
    color: "bg-green-100",
    btn: "bg-green-400 hover:bg-green-500",
    gradientFrom: "oklch(0.9 0.14 155)",
    gradientTo: "oklch(0.72 0.2 145)",
    glowColor: "rgba(74, 222, 128, 0.4)",
  },
  {
    key: "road",
    emoji: "🚦",
    title: "Road Safety",
    desc: "Cross safely & know the signals!",
    color: "bg-red-100",
    btn: "bg-red-400 hover:bg-red-500",
    gradientFrom: "oklch(0.88 0.12 25)",
    gradientTo: "oklch(0.7 0.22 20)",
    glowColor: "rgba(248, 113, 113, 0.4)",
  },
];

const ACTIVITY_DATA: Record<
  Exclude<PageKey, "home">,
  {
    steps: Array<{ emoji: string; title: string; desc: string }>;
    badges: Array<{ emoji: string; label: string; color: string }>;
  }
> = {
  morning: {
    steps: [
      {
        emoji: "⏰",
        title: "Wake Up!",
        desc: "Stretch your arms, open your eyes, and say Good Morning to start your amazing day!",
      },
      {
        emoji: "🚿",
        title: "Wash Your Face",
        desc: "Splash cool water on your face, grab your towel, and feel fresh and clean!",
      },
      {
        emoji: "🪥",
        title: "Brush Teeth",
        desc: "Squeeze the toothpaste, brush in circles for 2 minutes, and show off your shiny smile!",
      },
      {
        emoji: "👕",
        title: "Get Dressed",
        desc: "Pick your favourite outfit, put on your socks and shoes, and you're ready to shine!",
      },
      {
        emoji: "🥣",
        title: "Eat Breakfast",
        desc: "Sit at the table, enjoy your yummy breakfast, and get all the energy you need!",
      },
    ],
    badges: [
      {
        emoji: "⭐",
        label: "Star Learner",
        color: "bg-amber-100 text-amber-800",
      },
      {
        emoji: "💪",
        label: "Strong Skills",
        color: "bg-orange-100 text-orange-800",
      },
      {
        emoji: "🏆",
        label: "Morning Champion",
        color: "bg-yellow-100 text-yellow-800",
      },
    ],
  },
  school: {
    steps: [
      {
        emoji: "🎒",
        title: "Pack Your Bag",
        desc: "Check your list — books, pencils, lunchbox — everything goes in your backpack!",
      },
      {
        emoji: "👋",
        title: "Greet Your Teacher",
        desc: "Walk in with a big smile, say Good Morning, and find your seat happily!",
      },
      {
        emoji: "🪑",
        title: "Sit and Listen",
        desc: "Sit up straight, eyes on the teacher, and soak up all the amazing things you'll learn!",
      },
      {
        emoji: "📖",
        title: "Read Together",
        desc: "Follow along with your finger, sound out the words, and discover the story inside!",
      },
      {
        emoji: "🖐️",
        title: "Show Your Work",
        desc: "Hold up your paper proudly — you did it! Let everyone see how brilliant you are!",
      },
    ],
    badges: [
      { emoji: "📚", label: "Bookworm", color: "bg-sky-100 text-sky-800" },
      { emoji: "✏️", label: "Super Writer", color: "bg-blue-100 text-blue-800" },
      {
        emoji: "🏆",
        label: "Class Star",
        color: "bg-indigo-100 text-indigo-800",
      },
    ],
  },
  play: {
    steps: [
      {
        emoji: "😊",
        title: "Say Hello!",
        desc: "Walk up with a friendly wave, introduce yourself, and make someone's day brighter!",
      },
      {
        emoji: "🔄",
        title: "Take Turns",
        desc: "Wait for your turn, watch your friend play, then jump in when it's your time to shine!",
      },
      {
        emoji: "🧸",
        title: "Share Your Toys",
        desc: "Offer your favourite toy to a friend — sharing makes playing twice as fun!",
      },
      {
        emoji: "🎲",
        title: "Play a Game Together",
        desc: "Pick a game, explain the rules, and enjoy the laughter — win or lose, you're a winner!",
      },
      {
        emoji: "👋",
        title: "Say Goodbye",
        desc: 'Wave goodbye with a big smile and say "See you tomorrow!" — friendships last forever!',
      },
    ],
    badges: [
      {
        emoji: "🤝",
        label: "Best Friend",
        color: "bg-purple-100 text-purple-800",
      },
      { emoji: "😄", label: "Joy Maker", color: "bg-pink-100 text-pink-800" },
      {
        emoji: "🏆",
        label: "Social Star",
        color: "bg-violet-100 text-violet-800",
      },
    ],
  },
  shopping: {
    steps: [
      {
        emoji: "📝",
        title: "Make a List",
        desc: "Write down or draw the things you need — milk, bread, apples — your shopping adventure starts here!",
      },
      {
        emoji: "🔍",
        title: "Find the Items",
        desc: "Walk through the aisles, look at the labels, and find each item on your list one by one!",
      },
      {
        emoji: "🛒",
        title: "Put in Basket",
        desc: "Carefully place each item in your basket — gently for the eggs, stacked for the cans!",
      },
      {
        emoji: "💰",
        title: "Count Your Money",
        desc: "Take out your coins and notes, count carefully, and make sure you have enough to pay!",
      },
      {
        emoji: "🧾",
        title: "Pay at Counter",
        desc: "Walk to the cashier, say hello, hand over your money, and wait for your change!",
      },
    ],
    badges: [
      {
        emoji: "🛍️",
        label: "Smart Shopper",
        color: "bg-green-100 text-green-800",
      },
      {
        emoji: "💰",
        label: "Money Master",
        color: "bg-emerald-100 text-emerald-800",
      },
      {
        emoji: "🏆",
        label: "Independent Star",
        color: "bg-teal-100 text-teal-800",
      },
    ],
  },
  road: {
    steps: [
      {
        emoji: "👀",
        title: "Look Left & Right",
        desc: "Stop at the kerb, look left, look right, look left again — make sure the road is clear!",
      },
      {
        emoji: "🟢",
        title: "Wait for Green",
        desc: "Stand at the crossing, watch for the green man signal, and wait patiently until it's safe!",
      },
      {
        emoji: "🦓",
        title: "Use the Crosswalk",
        desc: "Walk straight across on the zebra stripes — always use the crossing, never jaywalk!",
      },
      {
        emoji: "🚗",
        title: "Watch for Cars",
        desc: "Even when crossing, keep watching for cars — some drivers might not stop in time!",
      },
      {
        emoji: "🚶",
        title: "Walk Safely",
        desc: "Walk at a steady pace, stay on the footpath, and arrive safely at your destination!",
      },
    ],
    badges: [
      { emoji: "🛡️", label: "Safety Hero", color: "bg-red-100 text-red-800" },
      {
        emoji: "🌟",
        label: "Street Smart",
        color: "bg-orange-100 text-orange-800",
      },
      {
        emoji: "🏆",
        label: "Road Champion",
        color: "bg-rose-100 text-rose-800",
      },
    ],
  },
};

const AGE_GROUPS = [
  {
    emoji: "👶",
    label: "Ages 4–7",
    sub: "Mobile Games",
    color: "bg-yellow-400",
    desc: "Simple tap-and-learn games designed for tiny fingers. Colorful animations guide every step with sounds and celebrations!",
    features: [
      "🎵 Audio instructions",
      "🌈 Color matching",
      "👏 Celebration rewards",
      "📱 Touch-optimized",
    ],
  },
  {
    emoji: "🧒",
    label: "Ages 8–12",
    sub: "Interactive Apps",
    color: "bg-green-400",
    desc: "Story-based interactive adventures with choices and challenges that build real-world skills step by step.",
    features: [
      "📖 Story adventures",
      "🧩 Skill puzzles",
      "🏅 Achievement badges",
      "📊 Progress tracking",
    ],
  },
  {
    emoji: "🧑",
    label: "Ages 13+",
    sub: "VR Experiences",
    color: "bg-purple-400",
    desc: "Immersive virtual reality environments that simulate real-life scenarios for safe, confident practice.",
    features: [
      "🥽 VR headset support",
      "🏪 Real-world simulations",
      "🗣️ Social scenarios",
      "📈 Therapist reports",
    ],
  },
];

const VR_ACTIVITIES = [
  {
    emoji: "🏪",
    title: "Virtual Shopping",
    desc: "Practice navigating a store, choosing products, and handling money in a safe virtual environment.",
    color: "from-amber-500 to-orange-500",
  },
  {
    emoji: "🚌",
    title: "Bus Journey",
    desc: "Learn bus etiquette, reading route maps, and interacting with drivers and passengers confidently.",
    color: "from-sky-500 to-blue-600",
  },
  {
    emoji: "🍳",
    title: "Cooking Skills",
    desc: "Follow step-by-step recipe guides in a virtual kitchen to build independence and healthy habits.",
    color: "from-green-500 to-emerald-600",
  },
];

const STATS = [
  {
    emoji: "👨‍👩‍👧",
    value: "2,500+",
    label: "Families",
    color: "bg-amber-400",
  },
  { emoji: "🏫", value: "150+", label: "Schools", color: "bg-sky-400" },
  { emoji: "🌍", value: "12", label: "Countries", color: "bg-green-400" },
  { emoji: "⭐", value: "4.9/5", label: "Rating", color: "bg-purple-400" },
];

const PLANS = [
  {
    emoji: "🆓",
    name: "Free Family",
    price: "$0",
    period: "forever",
    color: "border-sky-300 bg-sky-50",
    btn: "bg-sky-400 hover:bg-sky-500 text-white",
    features: [
      "3 learning modules",
      "1 child profile",
      "Basic progress view",
      "Community support",
    ],
    badge: null,
    popular: false,
  },
  {
    emoji: "🏫",
    name: "School Plan",
    price: "$29",
    period: "/ month",
    color: "border-amber-400 bg-gradient-to-b from-amber-50 to-orange-50",
    btn: "bg-amber-400 hover:bg-amber-500 text-white",
    features: [
      "All 5 modules",
      "Up to 30 children",
      "Teacher dashboard",
      "Progress reports",
      "Priority support",
    ],
    badge: "Most Popular 🔥",
    popular: true,
  },
  {
    emoji: "🩺",
    name: "Therapy Pro",
    price: "$49",
    period: "/ month",
    color: "border-purple-300 bg-purple-50",
    btn: "bg-purple-400 hover:bg-purple-500 text-white",
    features: [
      "Everything in School",
      "VR module access",
      "Therapist tools",
      "Clinical reports",
      "Research data export",
    ],
    badge: null,
    popular: false,
  },
];

const PARTNERS = [
  {
    emoji: "🏫",
    title: "Schools",
    desc: "Integrate Zindaa into your inclusive education program.",
    color: "bg-sky-100 border-sky-200",
  },
  {
    emoji: "❤️",
    title: "NGOs",
    desc: "Partner with us to reach more children and families in need.",
    color: "bg-green-100 border-green-200",
  },
  {
    emoji: "🩺",
    title: "Therapists",
    desc: "Use our platform to support your therapy sessions.",
    color: "bg-purple-100 border-purple-200",
  },
  {
    emoji: "🔬",
    title: "Researchers",
    desc: "Collaborate on evidence-based learning research studies.",
    color: "bg-amber-100 border-amber-200",
  },
];

function SectionHeading({
  children,
  sub,
  accentColor = "oklch(0.78 0.18 75)",
}: {
  children: React.ReactNode;
  sub?: string;
  accentColor?: string;
}) {
  return (
    <div className="text-center mb-12">
      <h2
        className="text-4xl md:text-5xl font-extrabold mb-3 inline-block relative"
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          color: "oklch(0.2 0.04 260)",
        }}
      >
        {children}
        <span
          className="absolute -bottom-2 left-0 right-0 h-1.5 rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          }}
        />
      </h2>
      {sub && (
        <p className="text-lg mt-4" style={{ color: "oklch(0.45 0.04 260)" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function ActivityPage({
  pageKey,
  onBack,
}: {
  pageKey: Exclude<PageKey, "home">;
  onBack: () => void;
}) {
  const mod = MODULES.find((m) => m.key === pageKey)!;
  const data = ACTIVITY_DATA[pageKey];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "oklch(0.99 0.005 90)" }}
    >
      {/* Banner */}
      <div
        className="relative overflow-hidden pt-24 pb-16 px-4"
        style={{
          background: `linear-gradient(135deg, ${mod.gradientFrom}, ${mod.gradientTo})`,
        }}
      >
        {/* Decorative circles */}
        <div className="absolute top-8 right-8 w-40 h-40 rounded-full bg-white/10 animate-float-slow" />
        <div className="absolute bottom-4 left-12 w-24 h-24 rounded-full bg-white/10 animate-float" />
        <div className="absolute top-16 left-1/3 w-16 h-16 rounded-full bg-white/15 animate-float-slow" />

        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-5 rounded-full text-sm transition-all mb-8 hover:scale-105"
            data-ocid="activity.cancel_button"
          >
            <ArrowLeft size={16} /> Back to Modules
          </button>

          <div className="text-8xl mb-4 animate-float">{mod.emoji}</div>
          <h1
            className="text-5xl md:text-6xl font-extrabold text-white mb-4"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
          >
            {mod.title}
          </h1>
          <p className="text-xl text-white/85 max-w-md mx-auto">{mod.desc}</p>
        </div>
      </div>

      {/* Steps */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h2
          className="text-3xl font-extrabold mb-8 text-center"
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            color: "oklch(0.2 0.04 260)",
          }}
        >
          Your Steps 👣
        </h2>

        <div className="space-y-5">
          {data.steps.map((step, i) => (
            <div
              key={step.title}
              className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex gap-5 items-start card-bounce"
              data-ocid={`activity.card.${i + 1}`}
              style={{
                borderLeft: `4px solid ${mod.gradientTo}`,
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${mod.gradientFrom}33, ${mod.gradientTo}33)`,
                }}
              >
                {step.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold text-white flex-shrink-0"
                    style={{ background: mod.gradientTo }}
                  >
                    {i + 1}
                  </span>
                  <h3
                    className="font-extrabold text-lg"
                    style={{
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      color: "oklch(0.2 0.04 260)",
                    }}
                  >
                    {step.title}
                  </h3>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.45 0.04 260)" }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="mt-12 text-center">
          <h3
            className="text-2xl font-extrabold mb-6"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              color: "oklch(0.2 0.04 260)",
            }}
          >
            Earn These Badges! 🏅
          </h3>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {data.badges.map((badge) => (
              <div
                key={badge.label}
                className={`${badge.color} rounded-2xl px-6 py-4 flex items-center gap-3 shadow-sm text-lg font-bold`}
              >
                <span className="text-3xl">{badge.emoji}</span>
                <span>{badge.label}</span>
              </div>
            ))}
          </div>

          <Button
            type="button"
            size="lg"
            className="rounded-full text-xl font-extrabold px-12 py-8 shadow-xl btn-wiggle"
            style={{
              background: `linear-gradient(135deg, ${mod.gradientFrom}, ${mod.gradientTo})`,
              color: "white",
              boxShadow: `0 8px 32px ${mod.glowColor}`,
            }}
            data-ocid="activity.primary_button"
          >
            Start Activity 🎮
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState(0);
  const [currentPage, setCurrentPage] = useState<PageKey>("home");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Message sent! We'll get back to you soon 🎉");
    setContactForm({ name: "", email: "", message: "" });
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  }

  function goToModule(key: PageKey) {
    setCurrentPage(key);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    setCurrentPage("home");
    setTimeout(() => scrollTo("modules"), 100);
  }

  if (currentPage !== "home") {
    return (
      <>
        <Toaster position="top-center" />
        {/* Sticky nav on activity pages */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <button
              type="button"
              onClick={goHome}
              className="flex items-center gap-2 font-bold text-2xl"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                color: "oklch(0.45 0.18 75)",
              }}
              data-ocid="nav.link"
            >
              <span className="text-3xl">🌟</span> Zindaa
            </button>
            <button
              type="button"
              onClick={goHome}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all hover:bg-amber-100"
              style={{ color: "oklch(0.35 0.05 260)" }}
              data-ocid="activity.cancel_button"
            >
              <ArrowLeft size={16} /> Back to Home
            </button>
          </div>
        </header>
        <ActivityPage
          pageKey={currentPage as Exclude<PageKey, "home">}
          onBack={goHome}
        />
      </>
    );
  }

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "oklch(0.99 0.005 90)" }}
    >
      <Toaster position="top-center" />

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 font-bold text-2xl"
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              color: "oklch(0.45 0.18 75)",
            }}
            data-ocid="nav.link"
          >
            <span className="text-3xl">🌟</span> Zindaa
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {["hero", "modules", "vr", "dashboard", "plans"].map((id, i) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:bg-amber-100"
                style={{ color: "oklch(0.35 0.05 260)" }}
                data-ocid={`nav.link.${i + 1}`}
              >
                {["Home", "Learn", "VR World", "Dashboard", "Plans"][i]}
              </button>
            ))}
          </nav>

          <Button
            type="button"
            onClick={() => scrollTo("plans")}
            className="hidden md:flex rounded-full font-bold text-sm px-6"
            style={{
              backgroundColor: "oklch(0.78 0.18 75)",
              color: "oklch(0.15 0.02 260)",
            }}
            data-ocid="nav.primary_button"
          >
            Get Started ✨
          </Button>

          <button
            type="button"
            onClick={() => setNavOpen(!navOpen)}
            className="md:hidden p-2 rounded-full"
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {navOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {navOpen && (
          <div className="md:hidden bg-white border-t border-amber-100 p-4 flex flex-col gap-2">
            {["hero", "modules", "vr", "dashboard", "plans", "contact"].map(
              (id, i) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollTo(id)}
                  className="text-left px-4 py-3 rounded-2xl font-semibold hover:bg-amber-50 transition-colors"
                  data-ocid={`nav.link.${i + 1}`}
                >
                  {
                    [
                      "🏠 Home",
                      "📚 Learn",
                      "🥽 VR World",
                      "📊 Dashboard",
                      "💳 Plans",
                      "✉️ Contact",
                    ][i]
                  }
                </button>
              ),
            )}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="pt-28 pb-20 px-4 relative overflow-hidden">
        {/* Gradient mesh background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 80% 20%, oklch(0.94 0.12 88 / 0.5) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 10% 80%, oklch(0.88 0.12 290 / 0.3) 0%, transparent 55%), radial-gradient(ellipse 60% 40% at 50% 50%, oklch(0.92 0.1 155 / 0.2) 0%, transparent 60%)",
          }}
        />
        {/* Floating blobs */}
        <div
          className="absolute top-10 right-10 w-72 h-72 rounded-full opacity-20 animate-float-slow"
          style={{ backgroundColor: "oklch(0.88 0.18 88)" }}
        />
        <div
          className="absolute bottom-10 left-10 w-56 h-56 rounded-full opacity-15 animate-float"
          style={{ backgroundColor: "oklch(0.72 0.18 290)" }}
        />
        <div
          className="absolute top-40 left-1/3 w-40 h-40 blob opacity-10"
          style={{ backgroundColor: "oklch(0.82 0.16 155)" }}
        />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <Badge
              className="mb-4 rounded-full px-4 py-1 text-sm font-bold"
              style={{
                backgroundColor: "oklch(0.88 0.18 88)",
                color: "oklch(0.25 0.05 75)",
                border: "none",
              }}
            >
              <Sparkles size={14} className="mr-1" /> Hybrid Learning Platform
            </Badge>
            <h1
              className="text-6xl md:text-7xl font-extrabold leading-tight mb-6"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                color: "oklch(0.2 0.04 260)",
              }}
            >
              Learn.
              <br />
              <span style={{ color: "oklch(0.65 0.2 75)" }}>Play.</span>
              <br />
              <span style={{ color: "oklch(0.6 0.18 290)" }}>Grow.</span> 🌱
            </h1>
            <p
              className="text-lg md:text-xl mb-8 leading-relaxed"
              style={{ color: "oklch(0.45 0.04 260)" }}
            >
              A joyful hybrid learning world — mobile games &amp; VR adventures
              — built for children with Down syndrome to master everyday life
              skills with confidence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                type="button"
                onClick={() => scrollTo("modules")}
                size="lg"
                className="rounded-full text-lg font-bold px-8 py-6 btn-wiggle shadow-xl"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.82 0.2 75), oklch(0.72 0.22 55))",
                  color: "white",
                  boxShadow: "0 8px 24px oklch(0.78 0.18 75 / 0.4)",
                }}
                data-ocid="hero.primary_button"
              >
                Start Learning 🎮
              </Button>
              <Button
                type="button"
                onClick={() => scrollTo("vr")}
                size="lg"
                variant="outline"
                className="rounded-full text-lg font-bold px-8 py-6 btn-wiggle"
                style={{
                  borderColor: "oklch(0.68 0.18 290)",
                  color: "oklch(0.5 0.18 290)",
                }}
                data-ocid="hero.secondary_button"
              >
                Explore VR 🥽
              </Button>
            </div>
          </div>

          {/* Illustration */}
          <div className="flex justify-center items-center">
            <div className="relative w-80 h-80">
              {/* Decorative floating rings */}
              <div
                className="absolute inset-0 rounded-full animate-spin-slow opacity-30"
                style={{
                  border: "3px dashed oklch(0.78 0.18 75)",
                  transform: "scale(1.2)",
                }}
              />
              <div
                className="absolute inset-0 rounded-full opacity-20"
                style={{
                  border: "2px dashed oklch(0.68 0.18 290)",
                  transform: "scale(1.45)",
                  animation: "spin-slow 20s linear infinite reverse",
                }}
              />
              {/* Main circle */}
              <div
                className="absolute inset-0 rounded-full animate-float"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.92 0.12 88), oklch(0.85 0.15 290))",
                }}
              />
              {/* Child emoji */}
              <div className="absolute inset-0 flex items-center justify-center text-[7rem] animate-float">
                🧒
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-3 animate-float text-3xl">
                🥽
              </div>
              <div className="absolute -bottom-2 -left-6 bg-white rounded-2xl shadow-lg p-3 animate-float-slow text-3xl">
                📱
              </div>
              <div className="absolute top-1/2 -right-10 bg-white rounded-2xl shadow-lg p-3 animate-float text-3xl">
                ⭐
              </div>
              <div className="absolute -top-6 left-1/4 bg-white rounded-2xl shadow-lg p-3 animate-float-slow text-2xl">
                🎯
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING MODULES */}
      <section
        id="modules"
        className="py-20 px-4"
        style={{ backgroundColor: "oklch(0.97 0.01 90)" }}
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            sub="Pick your journey — every skill matters!"
            accentColor="oklch(0.78 0.18 75)"
          >
            Learning Adventures 🗺️
          </SectionHeading>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {MODULES.map((mod, i) => (
              <div
                key={mod.title}
                className={`${mod.color} rounded-3xl p-6 text-center cursor-pointer border-2 border-transparent transition-all duration-300 hover:-translate-y-2`}
                style={
                  {
                    // subtle glow on hover via boxShadow — using inline for CSS variable trick
                  }
                }
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    `0 12px 40px ${mod.glowColor}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
                data-ocid={`module.card.${i + 1}`}
              >
                <div className="text-6xl mb-4">{mod.emoji}</div>
                <h3
                  className="font-extrabold text-lg mb-2"
                  style={{
                    color: "oklch(0.2 0.04 260)",
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}
                >
                  {mod.title}
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{ color: "oklch(0.4 0.04 260)" }}
                >
                  {mod.desc}
                </p>
                <button
                  type="button"
                  onClick={() => goToModule(mod.key)}
                  className={`${mod.btn} text-white font-bold py-2 px-6 rounded-full text-sm transition-transform hover:scale-105 active:scale-95`}
                  data-ocid={`module.button.${i + 1}`}
                >
                  Start ▶
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGE-BASED LEARNING */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            sub="Learning that grows with your child"
            accentColor="oklch(0.72 0.18 290)"
          >
            Made For Every Age 🎂
          </SectionHeading>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {AGE_GROUPS.map((ag, i) => (
              <button
                type="button"
                key={ag.label}
                onClick={() => setSelectedAge(i)}
                className={`${ag.color} px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-md hover:shadow-lg ${
                  selectedAge === i
                    ? "scale-110 ring-4 ring-offset-2 ring-current"
                    : "opacity-70 hover:opacity-100"
                }`}
                style={{ color: "oklch(0.15 0.02 260)" }}
                data-ocid={`age.tab.${i + 1}`}
              >
                <span className="text-3xl block mb-1">{ag.emoji}</span>
                <span>{ag.label}</span>
                <span className="block text-xs font-medium">{ag.sub}</span>
              </button>
            ))}
          </div>

          <div
            key={selectedAge}
            className="rounded-3xl p-8 text-center animate-pop-in"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.95 0.05 88), oklch(0.93 0.06 290))",
            }}
          >
            <div className="text-7xl mb-4">{AGE_GROUPS[selectedAge].emoji}</div>
            <h3
              className="text-2xl font-extrabold mb-3"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                color: "oklch(0.2 0.04 260)",
              }}
            >
              {AGE_GROUPS[selectedAge].label} — {AGE_GROUPS[selectedAge].sub}
            </h3>
            <p
              className="text-lg mb-6"
              style={{ color: "oklch(0.4 0.04 260)" }}
            >
              {AGE_GROUPS[selectedAge].desc}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {AGE_GROUPS[selectedAge].features.map((f) => (
                <span
                  key={f}
                  className="bg-white rounded-full px-4 py-2 font-semibold text-sm shadow-sm"
                  style={{ color: "oklch(0.3 0.05 260)" }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VR EXPERIENCE */}
      <section
        id="vr"
        className="py-20 px-4 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.16 0.08 270), oklch(0.12 0.1 290) 50%, oklch(0.1 0.06 260))",
        }}
      >
        {/* Starfield - CSS background dots */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 10% 15%, white 0%, transparent 100%), radial-gradient(1px 1px at 25% 40%, white 0%, transparent 100%), radial-gradient(2px 2px at 40% 10%, white 0%, transparent 100%), radial-gradient(1px 1px at 55% 60%, white 0%, transparent 100%), radial-gradient(2px 2px at 70% 25%, white 0%, transparent 100%), radial-gradient(1px 1px at 85% 75%, white 0%, transparent 100%), radial-gradient(1px 1px at 15% 80%, white 0%, transparent 100%), radial-gradient(2px 2px at 90% 45%, white 0%, transparent 100%), radial-gradient(1px 1px at 35% 90%, white 0%, transparent 100%), radial-gradient(1px 1px at 60% 5%, white 0%, transparent 100%), radial-gradient(30px 30px at 20% 30%, oklch(0.75 0.18 290 / 0.12) 0%, transparent 100%), radial-gradient(25px 25px at 75% 60%, oklch(0.72 0.16 230 / 0.12) 0%, transparent 100%), radial-gradient(20px 20px at 50% 85%, oklch(0.75 0.18 290 / 0.1) 0%, transparent 100%)",
            opacity: 0.8,
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 rounded-full px-4 py-1 text-sm font-bold bg-white/20 text-white border-white/30">
              🥽 Virtual Reality
            </Badge>
            <h2
              className="text-4xl md:text-5xl font-extrabold mb-4 text-white"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Step Into VR World ✨
            </h2>
            <p className="text-lg text-white/70">
              Safe, immersive practice for real-life confidence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {VR_ACTIVITIES.map((act, i) => (
              <div
                key={act.title}
                className={`bg-gradient-to-br ${act.color} rounded-3xl p-8 text-white card-bounce cursor-pointer relative overflow-hidden`}
                data-ocid={`vr.card.${i + 1}`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
                <div className="text-6xl mb-4 relative z-10">{act.emoji}</div>
                <h3
                  className="text-xl font-extrabold mb-3 relative z-10"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  {act.title}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed relative z-10">
                  {act.desc}
                </p>
                <button
                  type="button"
                  className="mt-5 bg-white/20 hover:bg-white/35 text-white font-bold py-2 px-5 rounded-full text-sm transition-all hover:scale-105 relative z-10"
                  data-ocid={`vr.button.${i + 1}`}
                >
                  Try Demo <ChevronRight size={14} className="inline" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section
        id="dashboard"
        className="py-20 px-4"
        style={{ backgroundColor: "oklch(0.97 0.01 90)" }}
      >
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            sub="Parents &amp; therapists can watch progress in real time"
            accentColor="oklch(0.78 0.18 75)"
          >
            Track Every Win 📊
          </SectionHeading>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-amber-100">
            {/* Badges row */}
            <div className="flex flex-wrap gap-4 mb-8 justify-center">
              {[
                { emoji: "🏆", label: "Top Learner", color: "bg-amber-100" },
                { emoji: "⭐", label: "5 Day Streak", color: "bg-yellow-100" },
                { emoji: "🎯", label: "Goal Achieved", color: "bg-green-100" },
                { emoji: "💪", label: "Daily Hero", color: "bg-blue-100" },
              ].map((badge, i) => (
                <div
                  key={badge.label}
                  className={`${badge.color} rounded-2xl px-5 py-3 flex items-center gap-2`}
                  data-ocid={`dashboard.card.${i + 1}`}
                >
                  <span className="text-2xl">{badge.emoji}</span>
                  <span
                    className="font-bold text-sm"
                    style={{ color: "oklch(0.3 0.04 260)" }}
                  >
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress bars */}
            <div className="space-y-5 mb-8">
              {[
                {
                  label: "🌅 Morning Routine",
                  progress: 85,
                  color: "bg-amber-400",
                },
                {
                  label: "📚 School Skills",
                  progress: 72,
                  color: "bg-sky-400",
                },
                {
                  label: "🛒 Shopping Practice",
                  progress: 60,
                  color: "bg-green-400",
                },
                { label: "🚦 Road Safety", progress: 45, color: "bg-red-400" },
              ].map((skill, i) => (
                <div key={skill.label} data-ocid={`dashboard.row.${i + 1}`}>
                  <div className="flex justify-between mb-1">
                    <span
                      className="font-semibold text-sm"
                      style={{ color: "oklch(0.3 0.04 260)" }}
                    >
                      {skill.label}
                    </span>
                    <span
                      className="font-bold text-sm"
                      style={{ color: "oklch(0.5 0.05 260)" }}
                    >
                      {skill.progress}%
                    </span>
                  </div>
                  <Progress
                    value={skill.progress}
                    className="h-4 rounded-full"
                  />
                </div>
              ))}
            </div>

            {/* Weekly chart */}
            <div className="mb-6">
              <h4
                className="font-bold mb-3"
                style={{ color: "oklch(0.3 0.04 260)" }}
              >
                📅 This Week
              </h4>
              <div className="flex items-end justify-between gap-2 h-24">
                {[
                  { d: "Mon", h: 60, idx: 1 },
                  { d: "Tue", h: 80, idx: 2 },
                  { d: "Wed", h: 45, idx: 3 },
                  { d: "Thu", h: 90, idx: 4 },
                  { d: "Fri", h: 70, idx: 5 },
                  { d: "Sat", h: 85, idx: 6 },
                  { d: "Sun", h: 55, idx: 7 },
                ].map(({ d, h, idx }) => (
                  <div
                    key={d}
                    className="flex-1 flex flex-col items-center gap-1"
                  >
                    <div
                      className="w-full rounded-t-xl transition-all hover:opacity-80"
                      style={{
                        height: `${h}%`,
                        backgroundColor: "oklch(0.78 0.18 75)",
                      }}
                      data-ocid={`dashboard.chart_point.${idx}`}
                    />
                    <span
                      className="text-xs"
                      style={{ color: "oklch(0.5 0.04 260)" }}
                    >
                      {d.charAt(0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              className="w-full rounded-full font-bold text-base py-6"
              style={{
                backgroundColor: "oklch(0.78 0.18 75)",
                color: "oklch(0.15 0.02 260)",
              }}
              data-ocid="dashboard.primary_button"
            >
              <Trophy size={18} className="mr-2" /> View Full Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            sub="Real children, real progress, real joy"
            accentColor="oklch(0.72 0.2 25)"
          >
            Our Impact 💫
          </SectionHeading>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`${stat.color} rounded-3xl p-6 text-center card-bounce shadow-md`}
                data-ocid={`impact.card.${i + 1}`}
              >
                <div className="text-5xl mb-2">{stat.emoji}</div>
                <div
                  className="text-3xl font-extrabold mb-1"
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    color: "oklch(0.15 0.02 260)",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: "oklch(0.25 0.04 260)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section
        id="plans"
        className="py-20 px-4"
        style={{ backgroundColor: "oklch(0.97 0.01 90)" }}
      >
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            sub="Choose the plan that fits your family or school"
            accentColor="oklch(0.78 0.18 75)"
          >
            Simple Pricing 💳
          </SectionHeading>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {PLANS.map((plan, i) => (
              <div
                key={plan.name}
                className={`${
                  plan.popular
                    ? "border-2 border-amber-400 rounded-3xl p-8 relative shadow-2xl scale-105 z-10"
                    : "border-2 rounded-3xl p-8 relative"
                } ${plan.color}`}
                data-ocid={`plan.card.${i + 1}`}
              >
                {plan.badge && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <span
                      className="text-sm font-extrabold px-5 py-2 rounded-full text-white shadow-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.72 0.22 55), oklch(0.65 0.2 35))",
                        boxShadow: "0 4px 16px oklch(0.72 0.22 55 / 0.5)",
                      }}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}
                <div className="text-4xl mb-3">{plan.emoji}</div>
                <h3
                  className="text-xl font-extrabold mb-2"
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    color: "oklch(0.2 0.04 260)",
                  }}
                >
                  {plan.name}
                </h3>
                <div className="text-center mb-6">
                  <span
                    className="text-4xl font-extrabold"
                    style={{ color: "oklch(0.3 0.05 260)" }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: "oklch(0.5 0.04 260)" }}
                  >
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "oklch(0.35 0.04 260)" }}
                    >
                      <CheckCircle2
                        size={16}
                        style={{ color: "oklch(0.6 0.15 145)" }}
                      />{" "}
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`${plan.btn} w-full rounded-full font-bold py-3 transition-all hover:scale-105 active:scale-95 shadow-md`}
                  data-ocid={`plan.button.${i + 1}`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            sub="Join our growing network of change-makers"
            accentColor="oklch(0.72 0.2 155)"
          >
            Let's Grow Together 🤝
          </SectionHeading>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PARTNERS.map((p, i) => (
              <div
                key={p.title}
                className={`${p.color} border rounded-3xl p-6 text-center card-bounce`}
                data-ocid={`partner.card.${i + 1}`}
              >
                <div className="text-5xl mb-3">{p.emoji}</div>
                <h3
                  className="font-extrabold text-lg mb-2"
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    color: "oklch(0.2 0.04 260)",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{ color: "oklch(0.4 0.04 260)" }}
                >
                  {p.desc}
                </p>
                <button
                  type="button"
                  className="bg-white hover:bg-gray-50 rounded-full px-4 py-2 font-bold text-sm shadow-sm transition-all hover:scale-105 border border-gray-200"
                  style={{ color: "oklch(0.3 0.05 260)" }}
                  data-ocid={`partner.button.${i + 1}`}
                >
                  Partner With Us →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section
        id="contact"
        className="py-20 px-4"
        style={{ backgroundColor: "oklch(0.97 0.01 90)" }}
      >
        <div className="max-w-2xl mx-auto">
          <SectionHeading
            sub="We'd love to hear from you"
            accentColor="oklch(0.72 0.18 290)"
          >
            Say Hello! ✉️
          </SectionHeading>

          {submitted ? (
            <div
              className="bg-green-100 rounded-3xl p-10 text-center animate-pop-in"
              data-ocid="contact.success_state"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3
                className="text-2xl font-extrabold mb-2"
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  color: "oklch(0.25 0.1 145)",
                }}
              >
                Message Sent!
              </h3>
              <p style={{ color: "oklch(0.4 0.08 145)" }}>
                We'll get back to you within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-full transition-all"
                data-ocid="contact.secondary_button"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow-lg p-8 space-y-5 border border-amber-100"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-bold mb-2 text-sm"
                  style={{ color: "oklch(0.3 0.04 260)" }}
                >
                  Your Name 😊
                </label>
                <Input
                  placeholder="Enter your name"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                  className="rounded-2xl h-12 text-base"
                  id="contact-name"
                  data-ocid="contact.input"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-bold mb-2 text-sm"
                  style={{ color: "oklch(0.3 0.04 260)" }}
                >
                  Email Address 📧
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                  className="rounded-2xl h-12 text-base"
                  id="contact-email"
                  data-ocid="contact.search_input"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-msg"
                  className="block font-bold mb-2 text-sm"
                  style={{ color: "oklch(0.3 0.04 260)" }}
                >
                  Message 💬
                </label>
                <Textarea
                  placeholder="Tell us about yourself or your organization..."
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm((p) => ({ ...p, message: e.target.value }))
                  }
                  required
                  rows={5}
                  className="rounded-2xl text-base"
                  id="contact-msg"
                  data-ocid="contact.textarea"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full font-bold text-base py-6"
                style={{
                  backgroundColor: "oklch(0.78 0.18 75)",
                  color: "oklch(0.15 0.02 260)",
                }}
                data-ocid="contact.submit_button"
              >
                Send Message 🚀
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-12 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.2 0.06 260), oklch(0.15 0.08 290))",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div>
              <div
                className="text-3xl font-extrabold text-white mb-2"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                🌟 Zindaa
              </div>
              <p className="text-white/60 text-sm max-w-xs">
                Empowering children with Down syndrome through joyful, hybrid
                learning experiences.
              </p>
            </div>
            <div className="flex gap-3">
              {[
                { emoji: "📘", label: "Facebook" },
                { emoji: "🐦", label: "Twitter" },
                { emoji: "📸", label: "Instagram" },
              ].map((s, i) => (
                <button
                  type="button"
                  key={s.label}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-lg transition-all hover:scale-110"
                  aria-label={s.label}
                  data-ocid={`footer.button.${i + 1}`}
                >
                  {s.emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Zindaa. Built with{" "}
              <Heart size={12} className="inline text-red-400" /> using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 transition-colors"
                data-ocid="footer.link"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-40">
        <button
          type="button"
          onClick={() => scrollTo("contact")}
          className="w-14 h-14 rounded-full shadow-xl text-white font-bold text-sm flex items-center justify-center transition-all hover:scale-110"
          style={{ backgroundColor: "oklch(0.65 0.2 75)" }}
          data-ocid="fab.primary_button"
          aria-label="Contact us"
        >
          ✉️
        </button>
      </div>
    </div>
  );
}
