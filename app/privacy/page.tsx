import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Deen OS',
  description: 'Privacy Policy for Deen OS, your Islamic lifestyle tracker.',
};

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold text-text mb-2">Privacy Policy</h1>
        <p className="text-sm text-subtext mb-8">Last updated: April 9, 2026</p>

        <div className="prose-custom space-y-6 text-sm text-subtext leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-text mb-2">1. Information We Collect</h2>
            <p>When you create an account, we collect your name, email address, and encrypted password. When you use the app, we store the data you choose to log — including prayer records, habit completions, journal entries, and scores.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-2">2. How We Use Your Information</h2>
            <p>Your data is used solely to provide the Deen OS service — displaying your dashboard, calculating your Akhirah Score, tracking streaks, and powering features like insights and leaderboards. We do not sell your data to third parties.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-2">3. Data Storage & Security</h2>
            <p>All data is stored securely on Supabase (PostgreSQL) with Row Level Security (RLS) enabled. Each user can only access their own data. Passwords are hashed and never stored in plain text. All communication happens over HTTPS.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-2">4. Cookies & Analytics</h2>
            <p>We use essential cookies for authentication sessions. We may use privacy-friendly analytics to understand usage patterns. We do not use advertising trackers or sell data to ad networks.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-2">5. Your Rights</h2>
            <p>You have the right to access, update, or delete your personal data at any time. You can delete your account by contacting us, and all associated data will be permanently removed within 30 days.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-2">6. Third-Party Services</h2>
            <p>We use Supabase for authentication and data storage, and Vercel for hosting. These services have their own privacy policies. If you sign in with Google OAuth, Google&apos;s privacy policy applies to the authentication process.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-2">7. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify users of significant changes via email or an in-app notice.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-2">8. Contact</h2>
            <p>If you have any questions about this privacy policy, please contact us at <a href="mailto:contact@deenos.app" className="text-primary hover:underline">contact@deenos.app</a>.</p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5">
          <Link href="/" className="text-sm text-primary hover:underline">&larr; Back to Home</Link>
        </div>
      </main>
    </div>
  );
}
