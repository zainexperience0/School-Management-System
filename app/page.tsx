"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.location.href = "/main/admin";
  });
  return <div></div>;
}