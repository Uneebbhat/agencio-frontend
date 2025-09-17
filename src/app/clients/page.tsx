"use client";
import { useState } from "react";
import ClientsTable from "@/components/Clients/ClientsTable";
import { Input } from "@/components/ui/input";
import CreateClient from "@/components/Clients/CreateClient";

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <section className="py-[20px]">
        <div>
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-2xl font-semibold md:mb-0">Goals</h1>
            <div className="flex items-center gap-2">
              <Input
                type="search"
                name="searchClient"
                id="searchClient"
                placeholder="Search Client"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="md:w-[250px] hidden md:block"
              />
              <CreateClient />
            </div>
          </div>
          <div>
            <Input
              type="search"
              name="searchClient"
              id="searchClient"
              placeholder="Search Client"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block md:hidden"
            />
          </div>
        </div>
      </section>
      <ClientsTable searchQuery={searchQuery} />
    </>
  );
}
