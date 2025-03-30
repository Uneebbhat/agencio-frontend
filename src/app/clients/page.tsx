"use client";
import { useState } from "react";
import ClientsTable from "@/components/Clients/ClientsTable";
import { Input } from "@/components/ui/input";
import CreateClient from "@/components/Clients/CreateClient";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <section className="p-[20px]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Clients</h1>
          <div className="flex items-center gap-4">
            <Input
              type="text"
              name="searchClient"
              id="searchClient"
              placeholder="Search Client"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[250px]"
            />
            <CreateClient />
          </div>
        </div>
      </section>
      <ClientsTable searchQuery={searchQuery} />
    </>
  );
};

export default Page;
