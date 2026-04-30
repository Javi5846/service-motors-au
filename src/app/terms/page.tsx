import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Service Motors AU",
  description: "Terms and conditions for Service Motors AU services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-[#0A0A0A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="w-8 h-8 text-[#DC2626]" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase">
              Terms &amp; Conditions
            </h1>
          </div>
          <p className="mt-3 text-gray-400 max-w-lg">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 text-gray-600 text-sm leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-[#0A0A0A] mb-2">1. General</h2>
          <p>
            These Terms and Conditions govern all services provided by Service Motors AU (ABN 64 716 968 248), operated by Javier De Martino, based in Eastgardens, NSW 2036, Australia. By booking a service or purchasing a product, you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#0A0A0A] mb-2">2. Payment Terms</h2>
          <p>Payment is due upon completion of the service or at the time of purchase. We accept the following payment methods:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Bank Transfer</li>
            <li>PayID</li>
            <li>Visa &amp; Mastercard</li>
            <li>Cash</li>
          </ul>
          <p className="mt-2">
            All prices are quoted in Australian Dollars (AUD) and are inclusive of GST where applicable. Quotes provided are estimates only and may be subject to change if unforeseen issues are discovered during the service.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#0A0A0A] mb-2">3. Bookings &amp; Cancellations</h2>
          <p>
            We ask that any cancellation or rescheduling request be made at least <strong className="text-[#0A0A0A]">24 hours prior</strong> to the scheduled appointment. This allows us to manage our schedule and accommodate other clients.
          </p>
          <p className="mt-2">
            Late cancellations (less than 24 hours notice) or no-shows may incur a call-out fee to cover travel and time costs. We understand that emergencies happen and will handle these situations on a case-by-case basis.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#0A0A0A] mb-2">4. Mobile Servicing — Client Responsibilities</h2>
          <p>The client is responsible for ensuring:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Safe and legal access to the vehicle at the agreed location</li>
            <li>Adequate working space around the vehicle</li>
            <li>The vehicle is on a flat, stable surface</li>
            <li>The vehicle is accessible at the agreed appointment time</li>
          </ul>
          <p className="mt-2">
            Service Motors AU reserves the right to refuse or reschedule a service if the working conditions are deemed unsafe or unsuitable.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#0A0A0A] mb-2">5. Oil Service — Pre-Existing Conditions</h2>
          <p>
            We use calibrated torque wrenches on all oil services to ensure proper tightening and prevent damage. However, if pre-existing damage is discovered during the service — such as a stripped or damaged sump drain plug thread — this will be communicated to the client immediately.
          </p>
          <p className="mt-2">
            Repair of such pre-existing conditions will require additional time and will incur an extra charge, which will be agreed upon with the client before proceeding. Service Motors AU accepts no responsibility for damage that existed prior to the service.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#0A0A0A] mb-2">6. Warranty on Labour</h2>
          <p>
            Our workmanship is carried out to a professional standard. If you experience an issue directly related to work performed by Service Motors AU, please contact us within <strong className="text-[#0A0A0A]">7 days</strong> of the service date and we will assess the situation in good faith.
          </p>
          <p className="mt-2">
            The following are not covered under any labour warranty:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Normal brake noise or vibration during the bedding-in period of new brake components</li>
            <li>Wear and tear on parts installed</li>
            <li>Issues arising from pre-existing vehicle conditions unrelated to the work performed</li>
            <li>Damage caused by the client or a third party after the service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#0A0A0A] mb-2">7. Parts &amp; Products</h2>
          <p>
            All parts sold by Service Motors AU are sourced from reputable suppliers. Manufacturer warranties on parts apply where provided. Warranty claims on parts must be directed to us and we will liaise with the supplier on your behalf.
          </p>
          <p className="mt-2">
            Returns and refunds on parts are handled in accordance with the Australian Consumer Law. Parts that have been installed or used are not eligible for change-of-mind returns.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#0A0A0A] mb-2">8. Pre-Purchase Inspection — Disclaimer</h2>
          <p>
            This report represents a professional visual and operational assessment of the vehicle at the time and location of inspection. It does not constitute a guarantee of future reliability, performance, or roadworthiness.
          </p>
          <p className="mt-2">
            The inspection is limited to observable conditions and does not include dismantling, internal component testing, or specialist diagnostic procedures beyond those outlined. Service Motors AU accepts no liability for faults or defects that were not detectable at the time of inspection, or that arise subsequently.
          </p>
          <p className="mt-2">
            This report is for informational purposes to assist in a purchasing decision and is not a warranty, statutory guarantee, or insurance policy. Clients are advised to also conduct their own PPSR and history checks.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#0A0A0A] mb-2">9. Limitation of Liability</h2>
          <p>
            To the extent permitted by law, the total liability of Service Motors AU for any claim arising from a service or product shall not exceed the amount paid for that specific service or product.
          </p>
          <p className="mt-2">
            We are not liable for any indirect, consequential, or incidental loss arising from the use of our services, including but not limited to loss of income, loss of use of the vehicle, or third-party claims.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#0A0A0A] mb-2">10. Australian Consumer Law</h2>
          <p>
            Nothing in these Terms and Conditions excludes, restricts, or modifies any rights or remedies you may have under the Australian Consumer Law (Schedule 2 of the Competition and Consumer Act 2010). Statutory guarantees applicable to consumers cannot be excluded.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#0A0A0A] mb-2">11. Governing Law</h2>
          <p>
            These terms are governed by the laws of New South Wales, Australia. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of NSW.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#0A0A0A] mb-2">12. Contact</h2>
          <ul className="space-y-1">
            <li><span className="font-medium text-[#0A0A0A]">Javier De Martino</span> (trading as Service Motors AU)</li>
            <li>ABN: 64 716 968 248</li>
            <li>
              Email:{" "}
              <a href="mailto:servicemotorsau@gmail.com" className="text-[#DC2626] hover:underline">
                servicemotorsau@gmail.com
              </a>
            </li>
            <li>Location: 5 Finch Dr, 2036 Eastgardens, NSW, Australia</li>
          </ul>
        </section>

        <p className="text-xs text-gray-400 pt-4 border-t border-gray-100">
          Last updated: April 2026 &nbsp;·&nbsp; &copy; Service Motors AU — NSW, Australia.
        </p>

      </div>
    </div>
  );
}
