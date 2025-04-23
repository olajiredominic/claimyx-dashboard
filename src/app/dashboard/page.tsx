import StoreInitializer from "./components/StoreInitializer";
import { getMockClaims } from "./actions/getClaims";

export default async function DashboardPage() {
  const claims = await getMockClaims();

  return (
    <>
      <StoreInitializer claims={claims} />
    </>
  );
}
