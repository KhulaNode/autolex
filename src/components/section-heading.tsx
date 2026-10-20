export function SectionHeading({
  eyebrow,
  title,
  children,
  light = false,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`section-heading ${light ? "heading-light" : ""}`}>
      <p className="eyebrow">
        <span />
        {eyebrow}
      </p>
      <h2>{title}</h2>
      {children && <p className="section-description">{children}</p>}
    </div>
  );
}
