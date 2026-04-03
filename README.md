# Finance Dashboard UI

A robust, responsive, and aesthetically premium frontend dashboard built to track and understand financial activity.

## Features

- **Dashboard Overview**: Summary cards (Total Balance, Income, Expenses) alongside dynamic Area and Pie charts to visualize cash flow trends and spending breakdowns.
- **Transactions Management**: A full data table displaying structured lists of transactions with functional UI filtering, text-search, and CSV export functionality.
- **Simulated Role-Based Access (RBAC)**: Switch between `Viewer` (read-only) and `Admin` (mock write/delete permissions) via the top navigation bar.
- **Insights Engine**: Auto-calculates your highest spending category and overall financial health.
- **Premium Aesthetics & Dark Mode**: A custom, lightweight design system built entirely from scratch with Vanilla CSS featuring smooth keyframe animations and a native Dark/Light mode toggle.
- **Persistent Storage**: Changes to the mock data, filters, and theme are seamlessly persisted across sessions via standard `localStorage`.

---

## Technical Decisions and Trade-offs

This section outlines the core technical reasoning behind the implementation stack.

### 1. Framework: React + Vite (with TypeScript)
- **Decision:** Selected React bundled with Vite instead of Next.js or Create React App.
- **Reasoning:** Vite provides an incredibly fast Hot Module Replacement (HMR) development environment and pristine build optimizations. Next.js would have added unnecessary overhead (SSR, Node dependency) for what is purely a client-side SPA dashboard. TypeScript was enforced to guarantee type safety across the mock data and state payloads.
- **Trade-off:** Lacks built-in file-system routing. For a massive application, a robust router (like `react-router-dom`) would be strictly necessary. However, for a streamlined two-page dashboard, a lightweight state-based active-view router was implemented to keep the bundle size minimal while achieving the desired result.

### 2. Styling Approach: Vanilla CSS & CSS Variables
- **Decision:** Engineered the design system using pure Vanilla CSS, actively avoiding utility frameworks (like Tailwind) or heavy UI component libraries (like Material UI).
- **Reasoning:** Demonstrates strong fundamental CSS architectural knowledge. By strictly using CSS Variables (`--bg-primary`, `--text-secondary`, etc.) at the `:root` level, implementing a robust, highly performant Dark Mode toggle was achieved simply by injecting a `.dark` class onto the document body—no heavy runtime JS styling calculations required.
- **Trade-off:** Standard Vanilla CSS is susceptible to global class-name collisions. If this project were to cleanly scale to hundreds of components, adopting CSS Modules or an atomic CSS-in-JS solution would become necessary to guarantee aggressive styling encapsulation.

### 3. State Management: Zustand
- **Decision:** Adopted `zustand` to act as the centralized application store over Redux or standard React Context.
- **Reasoning:** Zustand provides an un-opinionated, zero-boilerplate global state solution mapped directly to React hooks. It perfectly handles the simulated database layer, complex filtering logic, and role states in a highly performant way. Crucially, it features a first-party `persist` middleware, making the LocalStorage caching enhancement effortless.
- **Trade-off:** Redux is often favored in enterprise applications because its strict dispatch/reducer patterns force rigid architectural predictability. Zustand was chosen as it sacrifices some of that strict enterprise rigidity in favor of rapid development speed and a drastically reduced learning curve.

### 4. Data Visualizations: Recharts
- **Decision:** Recharts was utilized to render the `AreaChart` and `PieChart`.
- **Reasoning:** Recharts offers highly composable, declarative React bindings. It natively allowed for the premium visual requirements of the dashboard, such as embedding custom SVG linear gradients for the Cash Flow Trend and rich responsive tooltips, without wrestling with an underlying Canvas manipulation API.

---

## Setup Instructions

### Prerequisites
Make sure you have Node.js installed. 

### Local Development

1. Clone the repository and navigate into the root directory.
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the dashboard in your browser via the provided local port (typically `http://localhost:5173`).

### Production Build
To generate an optimized, minified bundle for deployment:
```bash
npm run build
```
