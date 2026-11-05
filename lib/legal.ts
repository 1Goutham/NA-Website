type Doc = { title: string; description: string; sections: { h?: string; p: string[] }[] };

const contact = { h: "Contact", p: ["Email: enquiry@nunnari.academy", "Phone: +91 90033 13175"] };

export const legal: Record<"terms" | "privacy" | "refund", Doc> = {
  terms: {
    title: "Terms & Conditions",
    description: "Terms governing your use of the Nunnari Academy website, platforms, programs and workshops.",
    sections: [
      { p: ["Nunnari Academy (“Nunnari”, “we”, “our”, “us”) is an education and training institution based in India. These Terms and Conditions govern your access to and use of our website, platforms, programs, workshops, and associated services.", "By accessing this website or enrolling in any of our offerings, you confirm that you have read, understood, and agreed to be legally bound by these Terms and Conditions."] },
      { h: "Eligibility", p: ["There are no age restrictions to access Nunnari Academy programs. However, users below the age of 18 are advised to use the platform under the guidance of a parent or legal guardian."] },
      { h: "Acceptable Use", p: ["Users agree to use the website and services strictly for lawful and ethical purposes. Any attempt to compromise system security, misuse content, or engage in unlawful activities is strictly prohibited."] },
      { h: "Intellectual Property", p: ["All materials, including but not limited to branding, logos, curriculum, videos, text, graphics, and course content, are the exclusive intellectual property of Nunnari Academy and are protected under applicable laws."] },
      { h: "Payments & Enrollment", p: ["Enrollment into any program is confirmed only upon successful payment. Nunnari Academy offers both one-time and EMI-based payment options depending on the program."] },
      { h: "Limitation of Liability", p: ["Nunnari Academy shall not be liable for any indirect, incidental, or consequential damages arising from the use of its services, platforms, or content."] },
      { h: "Amendments", p: ["We reserve the right to update these Terms & Conditions at any time. Continued use of the website constitutes acceptance of the revised terms."] },
      contact,
    ],
  },
  privacy: {
    title: "Privacy Policy",
    description: "How Nunnari Academy collects, uses, and protects personal data.",
    sections: [
      { p: ["Nunnari Academy is committed to safeguarding the privacy and personal information of its learners, visitors, and stakeholders. This Privacy Policy outlines how we collect, use, and protect personal data."] },
      { h: "Information Collected", p: ["We may collect personal details such as name, email address, contact number, educational background, course preferences, and payment-related information."] },
      { h: "Use of Information", p: ["Collected information is used solely for delivering educational services, processing enrollments, communication, support, and improving our offerings."] },
      { h: "Data Security", p: ["We employ industry-standard security practices to protect personal data from unauthorized access, disclosure, or misuse."] },
      { h: "Third-Party Services", p: ["We may engage trusted third-party services for analytics, communication, and payment processing. These services operate under their respective privacy policies."] },
      { h: "User Rights", p: ["Users may request access, correction, or deletion of their data, subject to applicable legal and operational requirements."] },
      contact,
    ],
  },
  refund: {
    title: "Refund Policy",
    description: "Terms under which payments made to Nunnari Academy are managed.",
    sections: [
      { p: ["This Refund Policy defines the terms under which payments made to Nunnari Academy are managed. By enrolling in any program, you agree to the conditions outlined below."] },
      { h: "Payment Options", p: ["Nunnari Academy offers both one-time payments and EMI-based payment plans, depending on the program structure."] },
      { h: "No Refund Policy", p: ["Once enrollment is completed and access to course materials or sessions is granted, no refunds shall be issued under any circumstances.", "This policy applies to all payment modes, including EMI-based payments, regardless of attendance, participation, or completion status."] },
      { h: "Exceptional Requests", p: ["Any exceptions to this policy are entirely at the discretion of Nunnari Academy’s management and shall not be considered a precedent."] },
      contact,
    ],
  },
};
