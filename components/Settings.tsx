import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { User } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogoutButton } from "./Auth/logout-button";
import RegisterPassKey from "./passkey/RegisterPasskey";

interface props {
  user_name: string;
}

export default function Settings({ user_name }: props) {
  const ICON_SIZE = 16;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <User key={"Settings"} size={ICON_SIZE} />
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent>
          <div className="px-2 py-1 text-sm">
            <h1>こんにちは !</h1>
            <h1 className="text-lg">{user_name}</h1>
          </div>
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
