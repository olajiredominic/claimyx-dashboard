import StoreInitializer from "./components/StoreInitializer";
import { getMockClaims } from "./actions/getClaims";
import SummaryComponent from "./components/summary";

export default async function DashboardPage() {
  const claims = await getMockClaims();

  return (
    <>
      <StoreInitializer claims={claims} />
      <SummaryComponent />
    </>
  );
}
