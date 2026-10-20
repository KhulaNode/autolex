import { business } from "@/lib/business";

// Lucide no longer includes brand marks. Keep these small SVG marks local.
function Facebook({ size = 19 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8z" />
    </svg>
  );
}

function Instagram({ size = 19 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SocialLinks() {
  const links = [
    { name: "Facebook", url: business.socials.facebook, icon: Facebook },
    { name: "Instagram", url: business.socials.instagram, icon: Instagram },
  ];
  if (!links.some(({ url }) => url)) return null;
  return (
    <div className="social-links" aria-label="Social media">
      {links.map(({ name, url, icon: Icon }) =>
        url ? (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Autolex on ${name}`}
          >
            <Icon size={19} aria-hidden="true" />
          </a>
        ) : null,
      )}
    </div>
  );
}
