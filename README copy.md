# Log App

A modern, high-aesthetic, and local-first Progressive Web App (PWA) designed for precise and beautiful daily logging. 

---

## 📱 For End Users

Log App is designed to help you visualize your day with clarity and style. It prioritizes a distraction-free experience and absolute privacy by keeping all your data exclusively on your device.

### Core Features
- **3D Glassmorphic UI:** A premium "Soft Dark" theme with ultra-subtle glass effects and smooth transitions.
- **Visual Timeline:** A reverse-chronological feed that connects your logs with a dotted vertical line, showing the literal flow of your time.
- **Precise Durations:** Automatically calculates the time gap between entries (e.g., `1h 15m 30s`) and displays them at the center of your timeline.
- **Cross-Day Continuity:** Shows the duration between the last entry of the previous day and your first entry today, maintaining a sense of continuous time.
- **Local-First Privacy:** Your logs never leave your device. No cloud sync, no accounts, just pure local storage.
- **Progressive Web App:** Installable on your phone or desktop for a native, standalone experience.

### How to Use
- **Create:** Tap the translucent **+** button in the bottom right corner.
- **Log Types:** Choose between **Note** (Blue), **Task** (Green), or **Event** (Violet).
- **Edit/Delete:** Long-press any log entry card to open the editing drawer.
- **Navigate:** Use the `<` and `>` arrows at the top to browse through different days. Tap **Today** to return to the current date.

---

## 🛠 For Developers

Log App is built with a focus on performance, context efficiency, and modern CSS techniques.

### Tech Stack
- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Database:** [Dexie.js](https://dexie.org/) (High-performance IndexedDB wrapper)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** JetBrains Mono (Global)
- **Deployment:** GitHub Pages (`gh-pages`)

### Architecture & Design Patterns
- **Database Layer:** Reactive data fetching using `useLiveQuery` from `dexie-react-hooks`.
- **CSS Strategy:** Vanilla CSS with custom properties (variables) for the "Soft Dark" theme.
- **Performance Optimization:** 
    - Minimized `backdrop-filter` usage on repetitive items (cards) to ensure smooth 60fps scrolling.
    - Optimized PWA manifest and service worker configuration using `vite-plugin-pwa`.
- **Custom Hooks:** `useEntries` for daily data and `usePreviousDayLastEntry` for cross-day duration logic.

### Getting Started

1. **Clone and Install:**
   ```bash
   npm install
   ```

2. **Development:**
   ```bash
   npm run dev
   ```

3. **Build & Production Preview:**
   ```bash
   npm run build
   npm run preview
   ```

4. **Deployment:**
   The project is configured for GitHub Pages under the `/log/` subdirectory.
   ```bash
   npm run deploy
   ```

### PWA Configuration
The PWA setup is managed in `vite.config.ts`. It includes a custom glowing SVG icon and is configured for `autoUpdate` register type.
