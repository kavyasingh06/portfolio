# Kavya Singh Sakhare | Developer Portfolio

I wanted a portfolio that people actually spend time on, not just skim and close. So instead of another static resume page, I built something interactive. There's a terminal you can type commands into, 4 hidden games to discover, cursor trails that change based on what section you're reading, and 10 color themes you can switch on the fly. Built it to feel like a product, not a template.

🔗 **Live:** [Kavya Singhsakhare.netlify.app](https://Kavya Singhsakhare.netlify.app)

---

## What's Inside

### Sections
- **Hero** with typing animation, parallax orbs, and a code editor style headshot card
- **About Me** in a bento grid layout with animated stat counters that count up when scrolled into view
- **Tech Stack** with real technology logos, filterable by category with staggered fade-in animations
- **Experience** as a visual timeline with glassmorphism cards
- **Projects** with accent-colored cards, live demo links, and a loading notice for free-tier hosted apps
- **Certifications** with verify links, license ID copy buttons, and PDF preview modals
- **Education** section
- **Contact** with direct email, phone, and LinkedIn links

### Interactive Features

| Feature | How to Find It |
|---|---|
| **Terminal** | Click the `>_` button in the bottom left corner |
| **Snake Game** | Open terminal, type `snake` |
| **Memory Match** | Open terminal, type `memory` |
| **Tetris** | Open terminal, type `tetris` |
| **Typing Speed Test** | Open terminal, type `typing` |
| **Konami Code Easter Egg** | Press ↑↑↓↓←→←→BA on your keyboard |
| **Theme Switcher** | Click the moon/sun icon or color dots in the top right |
| **Neofetch** | Open terminal, type `neofetch` |
| **Matrix Mode** | Open terminal, type `matrix` |
| **Dev Jokes** | Open terminal, type `joke` |
| **ASCII Art** | Open terminal, type `ascii` |

### Terminal Commands

```
NAVIGATION:  about, skills, experience, projects, certs, education, contact
INFO:        resume, github, linkedin, email, neofetch, whoami
FUN:         games, joke, coffee, matrix, ascii, sudo hire Kavya Singh
SYSTEM:      theme dark, theme light, ls, pwd, clear, exit
```

### Theme System

10 color palettes across light and dark modes:

**Light:** Slate (cyan), Sand (amber), Mint (emerald), Rose Quartz (pink), Lavender (violet)

**Dark:** Midnight (cyan), Charcoal (gold), Forest (green), Neon Tokyo (magenta), Arctic (ice blue)

Switch modes with the moon/sun toggle. Pick a palette by clicking the color dots.

### Cursor & Animations
- Custom dot + ring cursor with click feedback
- Emoji trail particles that change based on the current section you're viewing
- Scroll-triggered fade-in animations on every section
- Animated stat counters
- Parallax floating orbs in the hero
- Glassmorphism cards with hover glow effects
- Scroll progress bar at the top
- Noise/grain texture overlay for depth

---

## Tech Stack & Architecture

This portfolio is built entirely in React with zero CSS frameworks or component libraries. Every style is inline, every color flows from a single theme object, and every piece of content lives in one data file. The theme engine uses React Context to propagate color changes instantly across all components. Animations are handled through CSS keyframes and IntersectionObserver-based scroll triggers, keeping the bundle light with no animation library dependencies. The cursor trail system uses a custom hook that tracks both mouse position and the currently visible section via IntersectionObserver, spawning themed emoji particles that float and fade with CSS animations. Games run on canvas (Snake, Tetris) or pure React state (Memory, Typing Test). The terminal is a fully functional command parser with 20+ commands. Everything is designed to be maintainable: add a new project, certification, or job by editing `src/config/data.js`. Change every color on the site by editing `src/config/themes.js`.

**Built with:** React 18, Vite, JavaScript (no TypeScript), Inline Styles, CSS Animations, Canvas API, React Context

**Deployed on:** Netlify with automatic deploys from GitHub

---

## Project Structure

```
src/
├── config/
│   ├── data.js              # All personal content (edit this to customize)
│   └── themes.js            # All 10 color palettes (edit this to retheme)
├── context/
│   └── ThemeContext.jsx      # Theme state management
├── hooks/
│   ├── useTypingEffect.js   # Hero typing animation
│   ├── useFadeIn.js         # Scroll-triggered fade in
│   ├── useMouse.js          # Mouse position tracking
│   ├── useCountUp.js        # Animated number counters
│   └── useCursorTrail.js    # Section-aware emoji cursor
├── components/
│   ├── common/
│   │   ├── Glass.jsx        # Glassmorphism card component
│   │   ├── Section.jsx      # Animated section wrapper
│   │   └── SectionTitle.jsx # Section header component
│   ├── Nav.jsx              # Navigation with theme switcher
│   ├── Hero.jsx             # Hero with parallax and code editor card
│   ├── About.jsx            # Bento grid with animated counters
│   ├── TechStack.jsx        # Filterable tech icons
│   ├── Experience.jsx       # Timeline layout
│   ├── Projects.jsx         # Project cards with loading notice
│   ├── Certifications.jsx   # Certs with verify, copy, and preview
│   ├── Education.jsx        # Education cards
│   ├── Contact.jsx          # Contact section
│   ├── Footer.jsx           # Footer with Konami hint
│   ├── Terminal.jsx         # Interactive terminal with 20+ commands
│   ├── SnakeGame.jsx        # Classic snake game
│   ├── MemoryGame.jsx       # Tech stack memory match
│   ├── TetrisGame.jsx       # Tetris game
│   └── TypingGame.jsx       # Typing speed test
├── App.jsx                  # Main app with cursor, scroll, and game state
└── main.jsx                 # Entry point with ThemeProvider
```

---

Built by [Kavya Singh Sakhare](https://www.linkedin.com/in/Kavya Singhsakhare/) in Boston, MA.