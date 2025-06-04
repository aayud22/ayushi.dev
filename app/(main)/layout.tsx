import ClientLayout from "@/components/reviews/ClientLayout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
