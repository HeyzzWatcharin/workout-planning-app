"use client";
import Paper from "@/app/components/Papaer/PaperLayout";
import React, { useEffect, useState } from "react";
import Loading from "@/app/components/Loading";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/libs/firebase";
import FormStepPaper from "../components/Papaer/FormStepPaper";
import Button from "../components/Button";
import MultiStepForm from "@/app/components/WorkoutPlanForm";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          setLoading(false);
        } else {
          router.push("/signIn");
        }
      });

      return () => unsubscribe();
    }, 3000);
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLoading(false);
      setTimeout(() => {
        router.push("/signIn");
      }, 2000);
    } catch (err) {
      setLoading(false);
      console.error("Error logout:", error);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleGoDashBoard = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/home");
    }, 2000);
    return () => {
      setLoading(false);
    };
  };

  return (
    <Paper>
      <FormStepPaper>
        <div className="flex gap-4 justify-end">
          <Button
            className="w-[160px] !px-0 self-end"
            onClick={handleGoDashBoard}
          >
            Go Dashboard
          </Button>
          <Button className="w-[100px] !px-0 self-end" onClick={handleLogout}>
            Log out
          </Button>
        </div>
        <MultiStepForm user={user} />
      </FormStepPaper>
    </Paper>
  );
}
