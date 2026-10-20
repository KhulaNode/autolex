import { productImages } from "./product-images";

export const products = [
  {
    slug: "starter-motors",
    name: "Starter motors",
    eyebrow: "GET GOING",
    description:
      "New and reconditioned starter motors. Enquire with your vehicle details or the number on your existing unit.",
    image: productImages["starter-motors"],
  },
  {
    slug: "alternators",
    name: "Alternators",
    eyebrow: "STAY CHARGED",
    description:
      "New and reconditioned alternators for automotive electrical systems. Ask about the right unit for your application.",
    image: productImages["alternators"],
  },
  {
    slug: "batteries",
    name: "Batteries",
    eyebrow: "POWER UP",
    description:
      "Automotive batteries for starting and electrical power. Share your vehicle details to discuss a suitable option.",
    image: productImages["batteries"],
  },
  {
    slug: "vehicle-lighting",
    name: "Vehicle lighting",
    eyebrow: "SEE & BE SEEN",
    description:
      "Vehicle lamps, bulbs and lighting components. Contact us with the type of light and vehicle you need it for.",
    image: productImages["vehicle-lighting"],
  },
  {
    slug: "wiring-cables",
    name: "Wiring and cables",
    eyebrow: "MAKE THE CONNECTION",
    description:
      "Wiring, cables and electrical connections for vehicle applications. Tell us the specifications you require.",
    image: productImages["wiring-cables"],
  },
  {
    slug: "relays-fuses",
    name: "Relays and fuses",
    eyebrow: "PROTECT THE CIRCUIT",
    description:
      "Electrical relays and fuses for vehicle circuits. Send the rating or a photo of your existing component.",
    image: productImages["relays-fuses"],
  },
  {
    slug: "switches-gauges",
    name: "Switches and gauges",
    eyebrow: "TAKE CONTROL",
    description:
      "Switches and gauges for vehicle electrical functions. Enquire with the part details and application.",
    image: productImages["switches-gauges"],
  },
  {
    slug: "sensors",
    name: "Sensors",
    eyebrow: "KEEP IN SIGNAL",
    description:
      "Automotive electrical sensors. Share your vehicle make, model, year and part number to help identify your requirement.",
    image: productImages["sensors"],
  },
  {
    slug: "horns-buzzers",
    name: "Horns and buzzers",
    eyebrow: "SOUND THE SIGNAL",
    description:
      "Horns and buzzers for vehicle signalling. Ask about options for your vehicle or equipment.",
    image: productImages["horns-buzzers"],
  },
  {
    slug: "accessories",
    name: "Other auto-electrical accessories",
    eyebrow: "THE FINISHING TOUCH",
    description:
      "Looking for another electrical component? Send a photo or part number and let us know what you need.",
    image: productImages["accessories"],
  },
] as const;
