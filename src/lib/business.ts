type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
type TradingHours = {
  label: string;
  days: Day[];
  opens?: string;
  closes?: string;
  closed?: boolean;
};

function optionalUrl(value: string | undefined): string | undefined {
  if (!value?.trim()) return undefined;
  const url = new URL(value.trim());
  if (!["http:", "https:"].includes(url.protocol))
    throw new Error("Use an http(s) URL in website configuration.");
  return url.toString().replace(/\/$/, "");
}

function hours(
  label: string,
  days: Day[],
  opens?: string,
  closes?: string,
): TradingHours {
  const validTime = /^([01]\d|2[0-3]):[0-5]\d$/;
  if (
    (opens || closes) &&
    (!opens ||
      !closes ||
      !validTime.test(opens) ||
      !validTime.test(closes) ||
      opens >= closes)
  ) {
    throw new Error(
      `Configure both opening and closing times for ${label} as HH:mm, with closing after opening.`,
    );
  }
  return {
    label,
    days,
    opens: opens || undefined,
    closes: closes || undefined,
  };
}

export const business = {
  name: "Autolex Auto Electrical Supplies",
  shortName: "Autolex",
  tagline: "Powering Your Journey",
  description:
    "Automotive electrical parts and components for cars, bakkies, trucks, buses and heavy machinery. Visit Autolex in Ladanna, Polokwane.",
  address: {
    street: "119 River Street",
    suburb: "Ladanna",
    city: "Polokwane",
    region: "Limpopo",
    country: "ZA",
    display: "119 River Street, Ladanna, Polokwane",
  },
  phones: [
    { display: "073 057 2188", international: "+27730572188" },
    { display: "064 039 9693", international: "+27640399693" },
  ],
  whatsapp: (process.env.BUSINESS_WHATSAPP || "27730572188").replace(
    /[\s+()-]/g,
    "",
  ),
  email: process.env.BUSINESS_EMAIL?.trim() || "info@autolex.co.za",
  tradingHours: [
    hours(
      "Monday – Friday",
      ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      process.env.WEEKDAY_OPEN || "08:00",
      process.env.WEEKDAY_CLOSE || "16:30",
    ),
    hours("Saturday", ["Saturday"], "08:00", "11:30"),
    { ...hours("Sunday and Public Holidays", ["Sunday"]), closed: true },
  ],
  socials: {
    facebook: optionalUrl(process.env.FACEBOOK_URL),
    instagram: optionalUrl(process.env.INSTAGRAM_URL),
  },
  siteUrl: optionalUrl(process.env.SITE_URL) || "http://localhost:3000",
} as const;

if (!/^\d{8,15}$/.test(business.whatsapp))
  throw new Error(
    "BUSINESS_WHATSAPP must be an international number including the country code.",
  );
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(business.email))
  throw new Error("BUSINESS_EMAIL must be an email address.");

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${business.address.display}, South Africa`)}`;

export function whatsappUrl(category?: string) {
  const message = category
    ? `Hello Autolex, I would like to enquire about ${category.toLowerCase()}. My vehicle make, model and year are: `
    : "Hello Autolex, I would like to enquire about an auto-electrical part.";
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function formatHours(entry: TradingHours) {
  if (entry.closed) return "Closed";
  return entry.opens && entry.closes
    ? `${entry.opens}–${entry.closes}`
    : "Please call to confirm";
}
