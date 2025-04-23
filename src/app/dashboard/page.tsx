import StoreInitializer from "./components/store-initializer";
import { getMockClaims } from "./actions/getClaims";
import SummaryComponent from "./components/summary";
import ClaimsPieChart from "./components/claims-pie-chart";
import ForecastToollComponent from "./components/forecast-tool";
import ClaimsTable from "./components/claims-table";

export default async function DashboardPage() {
  const claims = await getMockClaims();

  return (
    <div className="flex flex-col gap-10">
      <StoreInitializer claims={claims} />
      <SummaryComponent />
      <ClaimsPieChart />
      <ClaimsTable />
      <ForecastToollComponent />
    </div>
  );
}
