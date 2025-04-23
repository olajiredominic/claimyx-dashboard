```md
# Claimyx Healthcare Billing Dashboard

This project is a technical assessment for the Senior Frontend Developer position at Claimyx. It implements a healthcare billing dashboard with interactive visualizations, real-time simulations, and data management using Next.js 14+, Tailwind CSS, TypeScript, Zustand, and shadcn/ui.

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/claimyx-dashboard.git
cd claimyx-dashboard
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Run the Development Server

```bash
pnpm dev
# or
npm run dev
```

---

## 📁 Project Structure

```txt
app/
│
├── dashboard/                      # RSC-based route with server fetching
│   └── page.tsx                    # Server Component that fetches mock claims
│   └── layout.tsx                  # Dashboard Layout component
│   └── actions/                    # Server Actions
│       └── getClaims.ts            # Mock claim fetching for server side
│   └── components/                 # Dashboard Components
│       └── store-initializer.tsx   # Client component that sets Zustand store
│       └── summary.tsx             # Total billing, claim counts, pie chart
│       └── claims-table.tsx        # Sortable, filterable billing table
│       └── claims-pie-chart.tsx    # Pie Chart showing claims distribution
│       └── forecast-tool.tsx       # Monte Carlo sliders and results chart
│       └── simulation-results.tsx  # Monte Carlo results chart
│   └── store/                      # Dashboard store
│       └── useDashboardStore.tsx   # Client component that sets Zustand store
│   └── data/                       # Mock 
│       └── mock-claims.tsx         # Mock Claims
│
├── types/                          # Shared types for whole application 
│   └── claims.tsx                  # Type definition for claims
│
components/
│
├── navbar                          # App Navbar
│   └── Navbar.tsx 
├── ui                              # UI components from shadcn
│   └── button.tsx 
│   └── card.tsx 
│   └── input.tsx 
│   └── slider.tsx 
│   └── table.tsx 
│   └── input.tsx 
│

```

---

## 🧱 Component Architecture

### **Server Components**
- `dashboard/page.tsx`: Fetches mock claims using a Server Action (`getMockClaims`) and initializes layout.
- Enables fast load, data consistency, and optimizes for SEO.

### **Client Components**
- `StoreInitializer.tsx`: Hydrates Zustand store with fetched claims on the client.
- `SummaryComponent.tsx`: Displays total billing amount, claim count, and pie chart using `shadcn/ui`.
- `ClaimsTable.tsx`: Fully interactive table with:
  - Column sorting
  - Global search
  - Status filters
- `ForecastTool.tsx`: Includes sliders and Monte Carlo simulation visualization.
  - Uses responsive UI updates and a Web Worker pattern (or `requestIdleCallback`) for smooth simulation performance.

---

## ⚙️ State Management Strategy

The app uses **Zustand** for lightweight global state:

### Why Zustand?
- Minimal boilerplate
- Built-in reactivity
- Works seamlessly with both client and server components in Next.js

### Store Lifecycle
- On server: claims are fetched using `getMockClaims()`
- On client: `StoreInitializer` uses `useEffect()` to populate the Zustand store
- All UI components (`SummaryComponent`, `ClaimsTable`, `ForecastTool`) consume state directly via hooks

```ts
const claims = useDashboardStore((state) => state.claims);
```

No prop drilling. Pure global state flow.

---

## 📊 Monte Carlo Simulation

The Revenue Forecast Tool runs 2000+ iterations using user-defined probabilities for `Pending`, `Approved`, and `Denied` statuses. It:

1. Randomizes claim payouts based on sliders
2. Calculates projected revenue per simulation
3. Aggregates to show:
   - Mean expected revenue
   - Minimum & maximum bounds
4. Renders this in a responsive chart (`shadcn/ui` compatible)

Simulation is optimized to avoid blocking the main thread (via `requestIdleCallback` or batching).

---

## 🎨 Design & UI Decisions

- Tailwind CSS + `shadcn/ui` for composable, accessible components
- Responsive, minimal UI with built-in dark/light mode support
- Component logic split by responsibility (Summary vs Table vs Forecasting)

---

## ✅ What This Demo Shows

- Next.js App Router with both Server and Client Components
- Zustand global state with dynamic initialization
- Monte Carlo simulation with real-time reactivity
- Component-driven, scalable architecture
- Interactive, real-world dashboard features

---

## 📬 Feedback

Happy to walk through my choices and expand on specific implementation details if needed.

```