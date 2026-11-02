import StickyCta from "@/components/StickyCta";

/** All programme pages share the floating "Still Confused?" call-to-action. */
export default function ProgramsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <StickyCta />
    </>
  );
}
