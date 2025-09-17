
import AIChatForm from "@/components/AIChat/AIChatForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AIChatPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token").value
  if (!token) {
    redirect("/login")
  }

  return (
    <section className="py-[20px] flex flex-col h-[85vh]">
      <AIChatForm />
    </section>
  );
}
