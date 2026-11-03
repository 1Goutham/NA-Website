import Icon from "@/components/Icon";
import { brochures } from "@/lib/programs";

const names = { recorded: "Recorded Programme", regular: "Regular Programme", premium: "Premium Programme" };

/** "Download Brochure": direct PDF download when available, otherwise asks for details via the enquiry form. */
export default function BrochureButton({ program, className = "btn btn--ghost btn--lg" }: { program: keyof typeof brochures; className?: string }) {
  const href = brochures[program];
  if (href) {
    return <a className={className} href={href} download><Icon name="file" /> Download Brochure</a>;
  }
  return (
    <button className={className} type="button" data-enquire={`Brochure: ${names[program]}`}>
      <Icon name="file" /> Download Brochure
    </button>
  );
}
