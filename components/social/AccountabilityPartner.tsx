'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function AccountabilityPartner() {
  const [email, setEmail] = useState('');
  const [partners, setPartners] = useState<{ name: string; email: string; streak: number; status: string }[]>([]);

  const handleInvite = () => {
    if (!email.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }
    setPartners([...partners, { name: email.split('@')[0], email, streak: 0, status: 'pending' }]);
    setEmail('');
    toast.success('Invitation sent!');
  };

  return (
    <Card>
      <h3 className="text-subtext text-sm font-medium uppercase tracking-wider mb-4">
        Accountability Partner
      </h3>
      <p className="text-xs text-subtext mb-4">
        Pair up with a friend and keep each other motivated. See each other&apos;s streaks and scores.
      </p>

      {/* Invite */}
      <div className="flex gap-2 mb-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Friend's email..."
          className="flex-1 bg-surface border border-white/10 rounded-xl px-4 py-2 text-sm text-text placeholder-subtext"
        />
        <Button onClick={handleInvite} size="sm">
          Invite
        </Button>
      </div>

      {/* Partners list */}
      {partners.length > 0 ? (
        <div className="space-y-2">
          {partners.map((partner, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-white/5">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
                {partner.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-sm text-text font-medium">{partner.name}</p>
                <p className="text-[10px] text-subtext">{partner.email}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                partner.status === 'pending'
                  ? 'bg-amber-500/10 text-amber-400'
                  : 'bg-green-500/10 text-green-400'
              }`}>
                {partner.status}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <p className="text-3xl mb-2">🤝</p>
          <p className="text-xs text-subtext">No partners yet. Invite someone!</p>
        </div>
      )}
    </Card>
  );
}
