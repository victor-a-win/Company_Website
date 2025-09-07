"use client";

import { useAuth } from "@/context/auth.context";
import { Button } from "flowbite-react";
import { LogOutIcon } from "lucide-react";

const DashboardHeader = () => {
  const auth = useAuth();
  return (
    <div className="space-y-2">
      <h1 className="text-5xl font-bold">Posts List</h1>
      <h3 className="text-lg">Here you can manage your posts.</h3>
      <hr className="border-gray-300" />
      <section className="flex flex-col gap-1">
        <p className="capitalize">{auth?.user?.name}</p>
        <strong>{auth?.user?.email}</strong>
        <Button
          color="red"
          className="w-40 cursor-pointer"
          onClick={() => {
            auth?.signOut();
          }}
        >
          <LogOutIcon className="mr-2" />
          Sign Out
        </Button>
      </section>
      <hr className="mt-4 border-gray-300" />
    </div>
  );
};
export default DashboardHeader;
