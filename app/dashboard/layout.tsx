import { PageTemplate } from "@/components/PageTemplate";

/*

Implementera en auth context likt den förut för firebase som hämtar datan när det finns en användare,
gör den med context så att alla child elements kan komma åt datan

*/
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <PageTemplate defaultPage={true}>{children}</PageTemplate>;
}
