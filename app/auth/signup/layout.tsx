import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Portfolio Admin",
  description: "Create an account to manage your portfolio",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
