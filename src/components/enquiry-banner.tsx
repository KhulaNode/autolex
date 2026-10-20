import { WhatsAppButton } from "./whatsapp-button";

export function EnquiryBanner() {
  return (
    <section className="enquiry-banner">
      <div className="container enquiry-inner">
        <div>
          <p className="eyebrow">LET’S FIND YOUR PART</p>
          <h2>
            Got a part in mind?
            <br />
            Let’s talk.
          </h2>
          <p>
            Send a photo, a part number or your vehicle details.
            <br className="desktop-break" /> Ask us about suitability and
            current availability.
          </p>
        </div>
        <WhatsAppButton />
      </div>
    </section>
  );
}
