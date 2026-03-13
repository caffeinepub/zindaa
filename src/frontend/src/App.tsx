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

// ── Types ─────────────────────────────────────────────────────────────────────
interface Module {
  emoji: string;
  title: string;
  label: string;
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

// ── Data ──────────────────────────────────────────────────────────────────────
const MODULES: Module[] = [
  {
    emoji: "🦷",
    title: "Morning Routine",
    label: "Wash, brush, dress!",
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

const NAV_LINKS = [
  { label: "Modules", href: "#modules" },
  { label: "Ages", href: "#ages" },
  { label: "VR", href: "#vr" },
  { label: "Gallery", href: "#gallery" },
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

  function handleFormChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Message sent! We'll be in touch soon 🎉");
    setForm({ name: "", org: "", email: "", message: "" });
  }

  return (
    <div className="min-h-screen bg-white font-body overflow-x-hidden">
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
          <nav className="hidden md:flex items-center gap-6">
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
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
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
        {/* Floating emojis */}
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
          {/* Text */}
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
          {/* Hero image */}
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
                onClick={() => setOpenModule(mod)}
                className={`group relative bg-gradient-to-br ${mod.color} rounded-3xl p-8 text-center shadow-lg hover:shadow-xl ${mod.glow} hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-white`}
              >
                <div className="text-6xl mb-4">{mod.emoji}</div>
                <h3 className="font-display font-bold text-gray-800 text-lg mb-1">
                  {mod.title}
                </h3>
                <p className="text-gray-600 text-sm">{mod.label}</p>
                <div className="mt-5 inline-flex items-center gap-1 bg-white/70 hover:bg-white text-purple-700 font-semibold text-sm px-4 py-2 rounded-full transition-all group-hover:shadow">
                  <Play size={14} /> Start
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Module Detail Dialog */}
      <Dialog open={!!openModule} onOpenChange={() => setOpenModule(null)}>
        <DialogContent
          data-ocid="modules.modal"
          className="max-w-lg rounded-3xl"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-display flex items-center gap-3">
              <span className="text-5xl">{openModule?.emoji}</span>
              <span>{openModule?.title}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {openModule?.steps.map((step) => (
              <div
                key={step.text}
                className="bg-purple-50 rounded-2xl p-4 text-center"
              >
                <div className="text-4xl mb-2">{step.emoji}</div>
                <p className="text-gray-700 text-sm font-medium">{step.text}</p>
              </div>
            ))}
          </div>
          <Button
            data-ocid="modules.close_button"
            onClick={() => setOpenModule(null)}
            className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-lg py-6"
          >
            Got it! 🎉
          </Button>
        </DialogContent>
      </Dialog>

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
                  ${activeAge === i ? `${ag.bg} ${ag.border} scale-105 shadow-xl` : "bg-gray-50 border-gray-200 hover:border-gray-300"}`}
              >
                <div
                  className={`text-6xl mb-3 transition-transform duration-300 ${activeAge === i ? "float-anim" : "group-hover:scale-110"}`}
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
                className={`${scene.bg} rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-white`}
              >
                {/* VR preview */}
                <div
                  className={`${scene.bg} h-44 flex items-center justify-center relative`}
                >
                  <span className="text-8xl">{scene.emoji}</span>
                  <div className="absolute inset-0 flex items-end justify-end p-3">
                    <div className="bg-white/80 rounded-full p-2 shadow">
                      <Play size={18} className="text-purple-700" />
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
                <button
                  type="button"
                  data-ocid={`plans.primary_button.${i + 1}`}
                  className={`w-full py-3 rounded-2xl font-semibold transition-all hover:scale-105 ${plan.btnColor}`}
                >
                  Get Started
                </button>
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
                <div className="font-display font-bold text-4xl md:text-5xl mb-1">
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
              <div className="flex gap-3 mt-4">
                <div className="bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-2 rounded-full text-center">
                  🔬 3 Years
                  <br />
                  Research
                </div>
                <div className="bg-pink-100 text-pink-700 text-sm font-semibold px-4 py-2 rounded-full text-center">
                  🌟 500+
                  <br />
                  Children
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
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Zindaa was born from Shruti's personal mission to transform how
                children with Down syndrome learn essential life skills.
                Combining visual learning, interactive activities, and immersive
                VR technology, she created a platform that makes real-world
                independence achievable and joyful for every child.
              </p>
              <blockquote className="border-l-4 border-purple-400 pl-5 py-2 bg-purple-50 rounded-r-2xl">
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

      {/* ── 9. VR Video Gallery ── */}
      <section id="gallery" className="py-20 px-4 bg-white">
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
                <div className="h-40 flex items-center justify-center relative">
                  <span className="text-7xl">{item.emoji}</span>
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

      {/* ── 10. Contact & Collaboration ── */}
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

          {/* Two-column: Get in Touch + Contact Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Get in Touch */}
            <div className="bg-white rounded-3xl shadow-xl p-10 flex flex-col gap-6">
              <div>
                <div className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  👩‍💼 Founder: Shruti More
                </div>
                <h3 className="font-display font-bold text-2xl text-gray-800 mb-1">
                  Get in Touch
                </h3>
                <p className="text-gray-500 text-sm">
                  Reach out directly — Shruti personally reads every message.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href="mailto:shruti.more@example.com"
                  data-ocid="contact.email_button.1"
                  className="flex items-center gap-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 hover:border-purple-400 hover:scale-[1.02] transition-all rounded-2xl px-6 py-4 group"
                >
                  <span className="text-3xl">📧</span>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm group-hover:text-purple-700 transition-colors">
                      Personal Email
                    </div>
                    <div className="text-purple-600 text-sm font-medium">
                      shruti.more@example.com
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:contact@zindaa.org"
                  data-ocid="contact.email_button.2"
                  className="flex items-center gap-4 bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200 hover:border-teal-400 hover:scale-[1.02] transition-all rounded-2xl px-6 py-4 group"
                >
                  <span className="text-3xl">📬</span>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm group-hover:text-teal-700 transition-colors">
                      Official Project Email
                    </div>
                    <div className="text-teal-600 text-sm font-medium">
                      contact@zindaa.org
                    </div>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/shrutimore"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.link.1"
                  className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 hover:border-blue-400 hover:scale-[1.02] transition-all rounded-2xl px-6 py-4 group"
                >
                  <span className="text-3xl">💼</span>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm group-hover:text-blue-700 transition-colors">
                      LinkedIn
                    </div>
                    <div className="text-blue-600 text-sm font-medium">
                      linkedin.com/in/shrutimore
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-white rounded-3xl shadow-xl p-10">
              <h3 className="font-display font-bold text-2xl text-gray-800 mb-6 text-center">
                ✉️ Send us a message
              </h3>
              {submitted ? (
                <div
                  data-ocid="contact.success_state"
                  className="text-center py-8"
                >
                  <div className="text-6xl mb-4">🎉</div>
                  <h4 className="font-display font-bold text-xl text-gray-800 mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-gray-500">
                    We'll be in touch soon. Thank you for your interest in
                    Zindaa!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Name
                    </label>
                    <Input
                      id="contact-name"
                      name="name"
                      data-ocid="contact.input"
                      value={form.name}
                      onChange={handleFormChange}
                      placeholder="e.g. Sarah Johnson"
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-org"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Organization
                    </label>
                    <Input
                      id="contact-org"
                      name="org"
                      value={form.org}
                      onChange={handleFormChange}
                      placeholder="e.g. Sunshine Academy"
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      data-ocid="contact.input"
                      value={form.email}
                      onChange={handleFormChange}
                      placeholder="you@example.com"
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      data-ocid="contact.textarea"
                      value={form.message}
                      onChange={handleFormChange}
                      placeholder="Tell us how you'd like to collaborate..."
                      rows={4}
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <Button
                    type="submit"
                    data-ocid="contact.submit_button"
                    disabled={submitting}
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
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-white font-display font-bold text-2xl">
            <Star className="text-yellow-400" size={24} />
            <span>Zindaa</span>
          </div>
          <p className="text-sm text-center">
            © {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              caffeine.ai
            </a>
          </p>
          <div className="flex gap-6 text-sm">
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
        </div>
      </footer>
    </div>
  );
}
