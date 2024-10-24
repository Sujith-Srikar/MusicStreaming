"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Appbar({ showThemeSwitch = true, isSpectator = false }) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    // If a session exists, navigate to the dashboard
    if (session?.data?.user) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="flex justify-between px-5 py-4 md:px-10 xl:px-20">
      <div
        onClick={() => {
          router.push("/");
        }}
        className={`flex flex-col justify-center text-lg font-bold hover:cursor-pointer ${
          showThemeSwitch ? "" : "text-white"
        }`}
      >
        Muzer
      </div>
      <div className="flex items-center gap-x-2">
        {isSpectator}
        {session.data?.user && (
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            Logout
          </Button>
        )}
        {!session.data?.user && (
          <div className="space-x-3">
            <Button
              className="bg-purple-600 text-white hover:bg-purple-700"
              onClick={() => signIn()}
            >
              Signin
            </Button>
          </div>
        )}

        {/* {showThemeSwitch && <ThemeSwitcher />} */}
      </div>
    </div>
  );
}
