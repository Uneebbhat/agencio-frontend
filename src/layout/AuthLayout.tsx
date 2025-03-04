// layouts/AuthLayout.tsx
interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex h-[100dvh] items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
