import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Statement | Service Motors AU",
  description: "Privacy statement for Service Motors AU.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-[#0A0A0A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="w-8 h-8 text-[#DC2626]" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase">
              Privacy Statement
            </h1>
          </div>
          <p className="mt-3 text-gray-400 max-w-lg">
            How we collect, use and protect your information.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6 text-gray-600 text-sm leading-relaxed">
        <section>
          <h2 className="text-base font-bold text-[#0A0A0A] mb-2">Information We Collect</h2>
          <p>
            If you decide to contact us then you will be asked to submit the limited personal data which is necessary for us to handle your query. This is completely voluntary.
          </p>
        </section>
        <p>
          If you do contact us we rely on the legitimate interests basis of processing in order to handle your query.
        </p>
        <p>
          If any form which collects your personal data allows you to voluntarily provide additional information, we seek this information because we think it will help us to give you a better quality service. You do not have to provide such information if you do not wish to do so.
        </p>
        <section>
          <h2 className="text-base font-bold text-[#0A0A0A] mb-2">Cookies</h2>
          <p>We use two types of cookies on this site:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <span className="font-semibold text-[#0A0A0A]">Essential cookies</span> — required for the site to function (e.g. admin session management). These cannot be disabled.
            </li>
            <li>
              <span className="font-semibold text-[#0A0A0A]">Analytics &amp; advertising cookies</span> — optional cookies used to measure site performance and deliver relevant advertising (e.g. Google Ads, Google Analytics). These are only set if you click &ldquo;Accept all&rdquo;.
            </li>
          </ul>
          <p className="mt-2">
            You can choose your cookie preference at any time by clearing your browser&apos;s local storage. We handle your data in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#0A0A0A] mb-2">Complaints</h2>
          <p>
            If you are not satisfied with our response to a privacy complaint, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) at{" "}
            <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-[#DC2626] hover:underline">
              www.oaic.gov.au
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#0A0A0A] mb-2">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The updated version will be posted on the Site with a new &ldquo;Last Updated&rdquo; date. We encourage you to review this page periodically.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-[#0A0A0A] mb-2">Contact Us</h2>
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
      </div>
    </div>
  );
}
