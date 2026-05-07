# 💼 CmdPal: React Command Palette

> A lightweight, accessible **command palette for React apps** built with **TypeScript, Vite, and Tailwind CSS**.  
> _Designed to deliver fast, keyboard-driven navigation with zero external dependencies._

---

## ⚡ Live Demo

https://command-pal-two.vercel.app/

---

## 🧭 Table of Contents

- [📝 Description](#-description)
- [✨ Features](#-features)
- [♿ Accessibility](#-accessibility)
- [🔧 Technologies Used](#-technologies-used)
- [📦 Installation & Usage](#-installation--usage)
- [🗂️ Project Structure](#-project-structure)
- [🧱 Roadmap](#-roadmap)
- [🤝 Contributions](#-contributions)
- [📄 License](#-license)
- [👤 Author](#-author)

---

## 📝 Description

**CmdPal** is a VS Code / Linear-inspired command palette that enables **keyboard-first navigation and action execution** in React applications.

This project focuses on **deep understanding of browser fundamentals**:

- Native keyboard event handling
- Custom focus management (focus trap)
- Accessibility-first UI design (WCAG 2.1 AA)

Unlike typical implementations, CmdPal is built with **zero external libraries for hotkeys or command handling**, making it a strong demonstration of **low-level frontend engineering skills**.

**Goals:**

- Showcase mastery of **DOM events & accessibility patterns**
- Build a **reusable UI module** for dashboards & SaaS apps
- Deliver a **high-performance, minimal bundle solution**

---

## ✨ Features

### ✅ Core (v1)

- Global activation via `Ctrl + K` / `Cmd + K`
- Real-time command search
- Full keyboard navigation:
  - `↑` / `↓` → navigate
  - `Enter` → execute
  - `Esc` → close
  - `Tab` → focus control
- Custom **focus trap** (no libraries)
- Action execution with visual feedback
- Lightweight & fast (<15kb gzipped)

---

### 🚧 Planned (v2)

- Fuzzy search (Fuse.js or custom algorithm)
- Nested command groups
- Custom command persistence (localStorage)
- i18n support
- Theming support (dark/light toggle)

---

## ♿ Accessibility

CmdPal is built with accessibility as a **first-class concern**:

- WCAG 2.1 AA compliance
- Full keyboard operability (no mouse required)
- Managed focus lifecycle (trap + restore)
- ARIA roles and semantic structure
- Screen reader-friendly interactions

---

## 🔧 Technologies Used

| **Category**    | **Choice**                                        |
| --------------- | ------------------------------------------------- |
| **Frontend**    | React 18 + TypeScript (Strict Mode)               |
| **Build Tool**  | Vite                                              |
| **Styling**     | Tailwind CSS                                      |
| **State Logic** | Custom hooks (`useCommandEngine`, `useFocusTrap`) |
| **Deployment**  | Vercel                                            |

---

## 📦 Installation & Usage

```bash
# 1. Clone the repository
git clone https://github.com/your-username/cmdpal.git
cd cmdpal

# 2. Install dependencies
npm install

# 3. Run in development
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview

```

---

## 🗂️ Project Structure

```bash
src/
├── types/        # TypeScript interfaces & schemas
├── lib/          # Static data & utilities (commands)
├── hooks/        # Core logic (events, search, focus trap)
├── components/   # UI primitives (Overlay, Input, List)
└── App.tsx       # Application entry point

## Architectures:

Logic isolation → custom hooks
Pure UI components → no business logic
Immutable data layer → commands config
Strict typing → centralized types
```

---

## 🗺️ Roadmap

Planned features and improvements are listed in [ROADMAP.md](./ROADMAP.md).

---

## 🤝 Contributions

🙅‍♂️ **No direct contributions** (pull requests) are accepted at this time.

You can still:

- Open issues for bugs or feature requests
- Share feedback or ideas via GitHub Discussions
- Reach out on social media or by email

Thanks for your interest and support!

---

## 📄 License

This project is licensed under the **MIT License**.
Feel free to **fork, modify, and use** it for your own projects, but **please do not submit pull requests**.

See the [LICENSE](./LICENSE) file for full details.

---

## 👤 Author

**Heïdi Al Ihmid Jeremia** – [Innovat1k](https://github.com/Innovat1k)
Open to **collaboration, feedback, or freelance opportunities**. Reach out anytime!

```

```
