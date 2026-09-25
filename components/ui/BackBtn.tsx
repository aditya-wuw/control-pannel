"use client";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import React from "react";

interface backBtnProps extends React.ComponentProps<typeof Button> {}

export default function BackBtn({ className, ...props }: backBtnProps) {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} {...props}>
      Go back
    </Button>
  );
}
