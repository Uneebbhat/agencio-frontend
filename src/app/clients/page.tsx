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
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
          <h1 className="text-2xl font-semibold mb-4 md:mb-0">Clients</h1>
          <div className="flex flex-col md:flex-row md:items-center justify-end md:gap-4 gap-2">
            <Input
              type="text"
              name="searchClient"
              id="searchClient"
              placeholder="Search Client"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="md:w-[250px]"
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
