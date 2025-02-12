"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { UserBe } from "@/constants/types";

const UserProvider = ({
  user,
  children,
}: {
  user: UserBe | null;
  children: React.ReactNode;
}) => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return <>{children}</>;
};

export default UserProvider;
