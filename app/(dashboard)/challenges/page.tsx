'use client';

import CommunityChallenge from '@/components/social/CommunityChallenge';

export default function ChallengesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text">Challenges</h2>
      <CommunityChallenge />
    </div>
  );
}
