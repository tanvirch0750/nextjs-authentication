import Navbar from './_components/Navbar';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="flex py-28 flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 to-gray-900">
      <Navbar />
      {children}
    </div>
  );
}

export default ProtectedLayout;
