import Navbar from '@/components/navbar/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#fdf9f2]">
      <Navbar />
      <main className="p-5 md:p-10 lg:p-15 xl:p-20">{children}</main>
    </div>
  );
}
