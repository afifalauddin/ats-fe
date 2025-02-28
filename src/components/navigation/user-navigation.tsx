"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import useUser from "~/hooks/useUser";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { type User } from "~/types/user";

const UserNavigation = () => {
  const { logout, profile } = useUser();

  //get user profile
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const getUser = async () => {
      const data = await profile();
      if (data?.data) {
        setUser(data?.data);
      }
    };
    void getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserIcon className="h-6 w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        {user && (
          <>
            <DropdownMenuItem
              className="focus:bg-primary-150/80 cursor-pointer"
              onClick={logout}
            >
              <span> {user?.email} </span>
            </DropdownMenuItem>

            <Separator className="h-px bg-border" />
          </>
        )}

        <DropdownMenuItem
          className="focus:bg-primary-150/80 cursor-pointer"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavigation;
