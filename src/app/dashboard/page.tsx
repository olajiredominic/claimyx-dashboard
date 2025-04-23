import StoreInitializer from "./components/StoreInitializer";
import { getMockClaims } from "./actions/getClaims";
import SummaryComponent from "./components/summary";
import ClaimsPieChart from "./components/ClaimsPieChart";

export default async function DashboardPage() {
  const claims = await getMockClaims();

  return (
    <div className="flex flex-col gap-10">
      <StoreInitializer claims={claims} />
      <SummaryComponent />
      <ClaimsPieChart />
    </div>
  );
}
