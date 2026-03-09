import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Meridian Neuro Foundation",
  description: "Reach out about research collaboration, community partnerships, grant inquiries, or general questions.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
