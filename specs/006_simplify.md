# Phase 6: UI Simplification & Unified Logging

This phase focuses on streamlining the user experience by replacing the floating creation UI with a more integrated bottom bar and unifying the log entry types.

### 1. Unified Entry Creation Bar
- **Transition from FAB:** Remove the floating action button (FAB) in the bottom right corner.
- **Bottom Bar Implementation:** Add a persistent (or semi-persistent) input bar at the bottom of the screen.
- **Input Layout:** The bar should contain a text input field and a "+" button on the same horizontal line.

### 2. Smart Auto-Expanding Input
- **Initial State:** The input field should start as a single line.
- **Dynamic Growth:** As the user types more text or adds new lines, the input height should automatically increase.
- **Max Height:** The input should grow up to exactly 2 lines. 
- **Scroll Behavior:** If the content exceeds 2 lines, the input height should remain at 2 lines, and a scroll bar should appear to allow viewing/editing the rest of the text.

### 3. Preservation of Multi-line Content
- **Timeline Display:** When a multi-line entry is saved, it must appear on the timeline exactly as typed, preserving all line breaks and white space formatting.

### 4. Consolidated Entry Types
- **Type Removal:** Eliminate the distinction between "Event," "Task," and "Note."
- **Default Behavior:** All entries should now default to the "Note" type.
- **Visual Consistency:** Use the color previously reserved for "Note" (`var(--color-note)`) for the timestamps of all entries on the timeline.

## System Log (To be appended after implementation)
- **Architectural Decisions:** 
    - Replaced the FAB + BottomSheet creation flow with a persistent `EntryInputBar` for immediate logging.
    - Unified all entries under the "Note" type to simplify the data model and UI (removing category selectors).
    - Preserved `BottomSheet` specifically for editing and deleting existing entries to maintain focus during those operations.
- **Code Delta:** 
    - Created `src/components/EntryInputBar.tsx` with auto-expanding textarea logic.
    - Modified `src/db/db.ts` to simplify `EntryType` and updated schema to version 2 with an upgrade path.
    - Updated `src/App.tsx` to integrate the new bar and remove the FAB.
    - Simplified `src/components/BottomSheet.tsx` and `src/components/EntryCard.tsx` to handle unified colors and multi-line content.
    - Deleted `src/components/FAB.tsx`.
- **Trade-offs:** 
    - Moving to a persistent bottom bar reduces screen real estate for the timeline slightly, compensated by adding bottom padding to the timeline container.
    - Auto-expanding height is capped at 2 lines to ensure the keyboard doesn't obscure too much of the timeline during typing, switching to scrollable behavior beyond that.
