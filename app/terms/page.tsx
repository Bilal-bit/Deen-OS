import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — Deen OS',
  description: 'Terms of Service for Deen OS, your Islamic lifestyle tracker.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <Link href="/" className="text-xl font-bold">
            <span className="text-primary">Deen</span> OS
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold text-text mb-2">Terms of Service</h1>
        <p className="text-sm text-subtext mb-8">Last updated: April 9, 2026</p>

        <div className="prose-custom space-y-6 text-sm text-subtext leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-text mb-2">1. Acceptance of Terms</h2>
            <p>By accessing or using Deen OS, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-2">2. Description of Service</h2>
            <p>Deen OS is a free Islamic lifestyle tracking application that allows users to log daily prayers, habits, and spiritual activities. The service includes features like Akhirah Score calculation, streaks, badges, and community leaderboards.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-2">3. User Accounts</h2>
            <p>You must provide accurate information when creating an account. You are responsible for maintaining the security of your account and password. You must be at least 13 years old to use this service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-2">4. Acceptable Use</h2>
            <p>You agree to use Deen OS only for lawful purposes and in accordance with Islamic values. You may not use the service to harass, abuse, or harm others. You may not attempt to gain unauthorized access to other users&apos; data.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-2">5. User Content</h2>
            <p>You retain ownership of any content you create (journal entries, custom habits, etc.). By using the service, you grant us a limited license to store and display your content as necessary to provide the service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-2">6. Disclaimer</h2>
            <p>Deen OS is provided &ldquo;as is&rdquo; without warranties of any kind. The Akhirah Score is a motivational tool and does not represent any religious authority or judgment. We are not responsible for any spiritual or religious guidance — always consult qualified scholars.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-2">7. Limitation of Liability</h2>
            <p>In no event shall Deen OS be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-2">8. Termination</h2>
            <p>We reserve the right to suspend or terminate accounts that violate these terms. You may delete your account at any time by contacting us.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-2">9. Changes to Terms</h2>
            <p>We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-2">10. Contact</h2>
            <p>For questions about these terms, contact us at <a href="mailto:contact@deenos.app" className="text-primary hover:underline">contact@deenos.app</a>.</p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5">
          <Link href="/" className="text-sm text-primary hover:underline">&larr; Back to Home</Link>
        </div>
      </main>
    </div>
  );
}
