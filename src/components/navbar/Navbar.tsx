'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-sm font-bold">
          Logo
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Claimyx Health Claims</h1>
      </div>
      <div>
        <Link href="/dashbaord" className="text-sm text-gray-600 hover:text-black transition">
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
