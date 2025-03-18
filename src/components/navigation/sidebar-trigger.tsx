import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

export function CustomTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <button onClick={toggleSidebar} className="cursor-pointer">
      <Menu size={24} />
    </button>
  );
}
