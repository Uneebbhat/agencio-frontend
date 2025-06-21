"use client";

import Header from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Users,
  ClipboardList,
  MessageCircle,
  LogIn,
  UserPlus,
  LayoutDashboard,
  LucideIcon,
} from "lucide-react";

// Feature Cards
const features: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Agency Creation",
    description: "Build your agency’s digital presence effortlessly.",
    icon: Briefcase,
  },
  {
    title: "Client & Team Management",
    description: "Manage clients and internal teams on one platform.",
    icon: Users,
  },
  {
    title: "Task Pipelines & Project Management",
    description:
      "Streamline project workflows to reduce overhead and improve productivity.",
    icon: ClipboardList,
  },
  {
    title: "Real-Time Chat and File Storage",
    description:
      "Communicate instantly and store your important documents securely.",
    icon: MessageCircle,
  },
];

// How It Works Cards
const howItWorksSteps: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Sign Up as Agency Owner",
    description: "Create your account and establish your agency profile.",
    icon: LogIn,
  },
  {
    title: "Invite Team Members & Clients",
    description:
      "Easily send invite links and unique agency IDs for secure member onboarding.",
    icon: UserPlus,
  },
  {
    title: "Manage Projects with Ease",
    description:
      "Access features such as task pipelines, real-time chat, and secure file storage from one centralized dashboard.",
    icon: LayoutDashboard,
  },
];

export default function Home() {
  return (
    <>
      <Header />

      <main className="px-[20px] md:px-[120px] py-[20px] text-center min-h-[80dvh] flex items-center justify-center relative z-20">
        <div className="flex flex-col gap-[20px] items-center">
          <h1 className="text-[36px] md:text-[56px] font-extrabold leading-auto">
            Unify Your Agency Workflow in One Seamless Platform
          </h1>
          <p className="max-w-[800px] mx-auto leading-[28px] text-gray-600">
            Agencio empowers freelancers and agencies to manage communications,
            tasks, files, and projects—eliminating the chaos of multiple apps.
          </p>
          <Button className="w-max">Get started</Button>
        </div>
      </main>

      {/* Features Section */}
      <section className="px-[20px] md:px-[120px] py-[40px]">
        <h2 className="text-[28px] md:text-[36px] font-bold text-center mb-10">
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="transition-transform hover:scale-[1.03] hover:shadow-xl border border-gray-200 p-4 rounded-2xl"
            >
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="flex flex-col items-center text-lg md:text-xl font-semibold gap-[10px]">
                  <feature.icon className="text-primary" size={30} />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600">
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-[20px] md:px-[120px] py-[40px] bg-gray-50">
        <h2 className="text-[28px] md:text-[36px] font-bold text-center mb-10">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howItWorksSteps.map((step, index) => (
            <Card
              key={index}
              className="transition-transform hover:scale-[1.03] hover:shadow-xl border border-gray-200 p-4 rounded-2xl"
            >
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="flex flex-col items-center text-lg text-center md:text-xl font-semibold gap-[10px]">
                  <step.icon className="text-primary" size={30} />
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-600">
                <p>{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
