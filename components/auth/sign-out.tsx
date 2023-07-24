"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      className="justify-start text-gray-400 hover:text-gray-200 transition-all"
      onClick={() => signOut()}
    >
      Goddammit, sign me out!
    </button>
  );
}
