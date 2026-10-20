import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section not-found">
      <div className="container">
        <p className="eyebrow">404 · WRONG TURN</p>
        <h1>Let’s get you back on track.</h1>
        <p>
          We couldn’t find that page. Explore our products or get in touch with
          Autolex.
        </p>
        <Link className="button button-navy" href="/">
          Back to home
        </Link>
      </div>
    </section>
  );
}
