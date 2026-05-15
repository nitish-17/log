# Product Requirements Document: [Log App]

## 1. Executive Summary

A modern, mobile-first Progressive Web App (PWA) designed for high-aesthetic daily logging. The app features a reverse-chronological timeline that visualizes the flow of time between notes, tasks, and events with precision and visual clarity. The app is strictly local-first and intentionally minimalist, prioritizing a distraction-free user experience and high performance.

## 2. User Interface & Experience (UI/UX)

- **Design Philosophy:** Modern, visually aesthetic, pragmatic, and highly visible.
- **Theme:** "Soft" Dark Mode (moderate contrast, blue-black tones).
- **Platform:** PWA (Responsive).
- **Core Navigation:**
  - **Header:** Date navigation bar `< [Day, Month Date] >`.
  - **Action:** Floating Action Button (FAB) in the bottom right corner for entry creation.
- **Timeline Visualization:**
  - **Order:** Reverse-chronological (newest at the top).
  - **Connector:** A vertical dotted line connects timestamps down the timeline (behind/between, not over text).
  - **Entry Component:** `[Timestamp (small)]` | `[Category Icon (small)]` | `[Content Card]`.
  - **Interactions:** Long-press on an entry card opens the bottom sheet drawer pre-filled with that entry's data for editing.
- **Duration Logic:**
  - Format: `x h y m`. (Seconds are ignored).
  - If difference < 60s: No duration text, cards appear adjacent (no gap).
  - If difference < 1h: Show `y m` only.
  - Location: Centered in the gap between cards.
- **Proposed Visual Palette:**
  - **Note:** Ice Blue icon / Borderless card with subtle glow.
  - **Task:** Emerald Green icon / Focused contrast.
  - **Event:** Soft Violet icon / Elegant spacing.

## 3. Functional Requirements

### 3.1 Entry Creation, Editing, & Deletion

- **Interface:** Bottom sheet drawer triggered by FAB or long-press.
- **Input Controls:** Text box, Radio buttons (**Note**, **Task**, **Event**), "Void" (close), and "Enter" (commit).
- **Editing Mode:** Triggered via long-press on an existing card.
- **Deletion:**
  - A "Delete" icon (trash can) appears in the bottom sheet _only_ during the editing of an existing entry.
  - **Logic:** Upon deletion, the timeline must immediately recalculate and display the duration between the two entries that have now become adjacent.

### 3.2 Data Management

- **Database:** Dexie.js (IndexedDB wrapper).
- **Persistence:** Entirely local-to-device. No authentication, cloud sync, or external export/import features to maintain maximum simplicity.

## 4. Technical Constraints

- **PWA:** Must be installable with a manifest and service worker.
- **Library:** Dexie.js for database operations.
- **Styling:** Focused on "High Visibility" and "Soft Dark" aesthetics using CSS variables for easy theme adjustment.

## 5. Brand Assets

- **App Logo / Favicon:** A glowing SVG download-style icon (Lucide-react inspired) using a blue-black color palette.
