import { useEffect } from "react";
import { CmdPalOverlay, CmdPalToast } from "./components";
import { useToast } from "./hooks/useToast";

function App() {
  const { toast, show, hide } = useToast();

  // Restore theme preference
  useEffect(() => {
    const saved = localStorage.getItem("cmdpal-theme");
    if (saved === "dark") document.documentElement.classList.add("dark");
    else if (saved === "light")
      document.documentElement.classList.remove("dark");
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* HEADER */}
      <header data-focus="top" className="pt-20 pb-12 text-center px-6">
        <h1 className="text-4xl font-bold mb-4 tracking-tight text-slate-900 dark:text-slate-100">
          CmdPal Demo
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          A keyboard-first command palette for modern web apps.
          <br />
          Press{" "}
          <kbd className="mx-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded font-mono text-sm shadow-sm text-slate-600 dark:text-slate-300">
            Ctrl
          </kbd>{" "}
          +{" "}
          <kbd className="mx-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded font-mono text-sm shadow-sm text-slate-600 dark:text-slate-300">
            K
          </kbd>{" "}
          to open.
        </p>
      </header>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-6 sm:px-0 py-12 space-y-12">
        {[
          {
            icon: "⌨️",
            title: "Keyboard First",
            desc: "Full navigation with arrows, Enter, and Escape. No mouse required.",
          },
          {
            icon: "♿",
            title: "WCAG 2.1 AA",
            desc: "Tested with NVDA & VoiceOver. Lighthouse Accessibility score = 100.",
          },
          {
            icon: "🎨",
            title: "Theme Aware",
            desc: "Native light/dark mode with smooth transitions and focus management.",
          },
          {
            icon: "⚡",
            title: "Zero Dependencies",
            desc: "Pure React + TypeScript. Custom focus trap, no heavy libs.",
          },
          {
            icon: "📱",
            title: "Responsive",
            desc: "Adapts from desktop modals to mobile overlays.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-slate-900 dark:text-slate-100">
              <span className="text-2xl">{f.icon}</span>
              {f.title}
            </h2>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}

        {/* SPACER */}
        <div className="h-40 flex items-center justify-center text-slate-500 dark:text-slate-400 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl">
          Scroll down to test "Scroll to Bottom" ↓
        </div>
      </section>

      {/* FOOTER */}
      <footer
        data-focus="bottom"
        className="py-12 text-center border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
      >
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          CmdPal Demo • Built with React & Tailwind CSS
        </p>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-sm text-blue-700 dark:text-blue-200 hover:underline font-medium cursor-pointer"
          type="button"
        >
          Back to top ↑
        </button>
      </footer>

      {/* MOBILE TRIGGER */}
      <button
        onClick={() =>
          document.dispatchEvent(
            new KeyboardEvent("keydown", {
              key: "k",
              ctrlKey: true,
              bubbles: true,
            }),
          )
        }
        className="fixed bottom-6 right-6 p-4 bg-blue-600 hover:bg-blue-100 active:bg-blue-900/30 text-white rounded-full shadow-lg transition-colors md:hidden z-40 min-w-12 min-h-12 flex items-center justify-center"
        aria-label="Open command palette"
      >
        ⌘K
      </button>

      <CmdPalOverlay onToastShow={show} />
      <CmdPalToast toast={toast} onClose={hide} />
    </main>
  );
}

export default App;
