"use client";
import React, { useEffect, useState } from "react";
import FormStepPaper from "@/app/components/Papaer/FormStepPaper";
import Button from "@/app/components/Button";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";
import Paper from "../components/Papaer/PaperLayout";
import { PlanListType } from "@/types/dashBoard";
import Table from "../components/Table/Table";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const router = useRouter();
  const [planList, setPlanList] = useState<PlanListType[]>([]);

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      try {
        const response = await fetch(`/api/workout-plans/${user?.uid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch workout plans");
        }
        const data: PlanListType[] = await response.json();
        setPlanList(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error("An unexpected error occurred");
        }
      }
    };

    if (user?.uid) {
      setLoading(true);
      fetchWorkoutPlans();
    }
  }, [user?.uid]);

  useEffect(() => {
    setTimeout(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          setPageLoading(false);
        } else {
          router.push("/signIn");
        }
      });

      return () => unsubscribe();
    }, 3000);
  }, [router]);

  if (pageLoading) {
    return <Loading />;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setPageLoading(false);
      setTimeout(() => {
        router.push("/signIn");
      }, 2000);
    } catch (err) {
      setPageLoading(false);
      console.error("Error logout:", error);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleGoPlan = () => {
    setPageLoading(true);
    setTimeout(() => {
      router.push("/plan");
    }, 2000);
    return () => {
      setPageLoading(false);
    };
  };

  return (
    <Paper>
      <FormStepPaper>
        <div className="flex gap-4 justify-end">
          <Button className="w-[100px] !px-0 self-end" onClick={handleGoPlan}>
            Go Plan
          </Button>
          <Button className="w-[100px] !px-0 self-end" onClick={handleLogout}>
            Log out
          </Button>
        </div>
        <h2 className="text-2xl text-black mb-4 text-center font-semibold ">
          Workout Plan List
        </h2>
        <Table data={planList} loading={loading} />
      </FormStepPaper>
    </Paper>
  );
}
