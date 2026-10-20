import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHero({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={13} aria-hidden="true" />
          <span aria-current="page">{label}</span>
        </nav>
        <p className="eyebrow">AUTOLEX AUTO ELECTRICAL SUPPLIES</p>
        <h1>{title}</h1>
        <p className="page-hero-description">{children}</p>
      </div>
      <span className="hero-stripe" aria-hidden="true" />
    </section>
  );
}
