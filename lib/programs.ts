import type { IconName } from "@/components/Icon";

/** 12-week Regular programme tracks (from the previous nunnari.academy course library). */
export const tracks: { title: string; tag: string; icon: IconName; desc: string }[] = [
  { title: "Generative & Agentic AI", tag: "AI", icon: "cpu", desc: "Build AI systems that can generate content, reason through problems, and perform tasks autonomously." },
  { title: "Machine Learning & Deep Learning", tag: "ML/DL", icon: "layers", desc: "Learn how intelligent models are built to analyze data, recognize patterns, and make accurate predictions." },
  { title: "Full Stack Development with AI", tag: "Development", icon: "code", desc: "Develop scalable web applications enhanced with AI capabilities for smarter and more dynamic user experiences." },
  { title: "Data Science with AI", tag: "Data", icon: "chart", desc: "Transform raw data into meaningful insights using data science techniques powered by AI." },
  { title: "Data Analytics with AI", tag: "Data", icon: "trend", desc: "Analyze and visualize data effectively to uncover trends and support faster business decisions." },
  { title: "Business Analytics with AI", tag: "Business", icon: "briefcase", desc: "Use data and AI-driven insights to guide strategic business decisions and improve outcomes." },
  { title: "Digital Marketing with AI", tag: "Marketing", icon: "rocket", desc: "Leverage AI to create, optimize, and scale digital marketing campaigns with better targeting and performance." },
];

/**
 * Programme brochures (PDF). Drop the file in public/brochures/ and set its path here.
 * While a path is empty, "Download Brochure" opens the enquiry form so the team can send it.
 */
export const brochures: Record<"recorded" | "regular" | "premium", string> = {
  recorded: "",
  regular: "",
  premium: "",
};
