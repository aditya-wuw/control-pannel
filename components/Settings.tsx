import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Settings2 } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogoutButton } from "./logout-button";
import RegisterPassKey from "./passkey/RegisterPasskey";
import { ThemeSwitcher } from "./theme-switcher";

export default function Settings() {
  const ICON_SIZE = 16;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Settings2 key={"Settings"} size={ICON_SIZE} />
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent sideOffset={16}>
          <DropdownMenuItem>
            <RegisterPassKey />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
