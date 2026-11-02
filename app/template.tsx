/* Re-mounts on every navigation: a short CSS fade/rise gives page transitions without hiding SSR content. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
