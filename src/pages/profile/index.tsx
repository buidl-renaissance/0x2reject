import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
import { DEFAULT_ACTIVITIES } from '@/lib/activities';

const Container = styled.div`
  max-width: 560px;
  margin: 0 auto;
  padding: 1.5rem;
  min-height: 100vh;
  background: #121212;
  color: #f9fafb;
  font-family: 'IBM Plex Mono', monospace;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 1.75rem;
  margin: 0 0 0.35rem;
`;

const Sub = styled.p`
  color: #9ca3af;
  margin: 0 0 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.85rem;
  color: #9ca3af;
  margin-bottom: 0.4rem;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.85rem;
  border-radius: 10px;
  border: 2px solid #2a2a2a;
  background: #1c1c1c;
  color: #f9fafb;
  font-family: inherit;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4f46e5;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  min-height: 80px;
  padding: 0.85rem;
  border-radius: 10px;
  border: 2px solid #2a2a2a;
  background: #1c1c1c;
  color: #f9fafb;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4f46e5;
  }
`;

const PhotoPreview = styled.div<{ $src?: string | null }>`
  width: 100%;
  aspect-ratio: 1;
  max-width: 220px;
  border-radius: 16px;
  background: ${(p) =>
    p.$src
      ? `center/cover no-repeat url(${p.$src})`
      : 'linear-gradient(160deg, #2a2a2a, #111)'};
  border: 2px solid #2a2a2a;
  margin-bottom: 0.75rem;
`;

const ChipGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Chip = styled.button<{ $on?: boolean }>`
  padding: 0.55rem 0.85rem;
  border-radius: 999px;
  border: 2px solid ${(p) => (p.$on ? '#4f46e5' : '#2a2a2a')};
  background: ${(p) => (p.$on ? '#1e1b4b' : '#1c1c1c')};
  color: #f9fafb;
  font-family: inherit;
  cursor: pointer;
  font-size: 0.9rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Toggle = styled.input`
  width: 18px;
  height: 18px;
`;

const Primary = styled.button`
  padding: 1rem;
  border: none;
  border-radius: 12px;
  background: #4f46e5;
  color: #fff;
  font-size: 1.05rem;
  font-family: inherit;
  cursor: pointer;

  &:disabled {
    background: #374151;
    cursor: not-allowed;
  }
`;

const Secondary = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 0.75rem;
  color: #a5b4fc;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ShareBox = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 12px;
  background: #1c1c1c;
  border: 1px solid #2a2a2a;
`;

const ShareUrl = styled.code`
  display: block;
  word-break: break-all;
  color: #c7d2fe;
  margin: 0.5rem 0 0.75rem;
  font-size: 0.85rem;
`;

const Msg = styled.p<{ $err?: boolean }>`
  color: ${(p) => (p.$err ? '#ef4444' : '#10b981')};
  font-size: 0.9rem;
  margin: 0;
`;

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function ProfileBuilderPage() {
  const router = useRouter();
  const { user, isLoading, refreshUser } = useUser();
  const [fullName, setFullName] = useState('');
  const [vibe, setVibe] = useState('');
  const [age, setAge] = useState('');
  const [slug, setSlug] = useState('');
  const [activities, setActivities] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(true);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const appUrl =
    typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || 'https://0x2reject.vercel.app';

  const shareUrl = useMemo(() => {
    if (!slug) return '';
    return `${appUrl}/p/${slug}`;
  }, [appUrl, slug]);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace('/start?next=/profile');
      return;
    }

    const load = async () => {
      try {
        const res = await fetch('/api/profiles', { credentials: 'include' });
        if (!res.ok) return;
        const profile = await res.json();
        setFullName(profile.full_name || user.displayName || '');
        setVibe(profile.vibe || '');
        setAge(profile.age != null ? String(profile.age) : '');
        setSlug(profile.slug || slugify(user.username || user.displayName || 'drifter'));
        setActivities(Array.isArray(profile.activities) ? profile.activities : []);
        setIsPublic(profile.is_public ?? true);
        setPhotoUrl(profile.photo_url || profile.avatar_url || user.photoUrl || null);
      } catch {
        /* ignore */
      }
    };

    void load();
  }, [user, isLoading, router]);

  const toggleActivity = (id: string) => {
    setActivities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const onPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append('photo', file);
      const res = await fetch('/api/profiles/upload-photo', {
        method: 'POST',
        credentials: 'include',
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setPhotoUrl(data.photoUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const cleanSlug = slugify(slug);
      const ageNum = age.trim() ? parseInt(age, 10) : null;
      if (!fullName.trim()) throw new Error('Name is required');
      if (!vibe.trim()) throw new Error('Vibe is required');
      if (!cleanSlug) throw new Error('Slug is required');
      if (!photoUrl) throw new Error('Photo is required');
      if (activities.length === 0) throw new Error('Pick at least one activity');
      if (ageNum != null && (Number.isNaN(ageNum) || ageNum < 18 || ageNum > 120)) {
        throw new Error('Age must be 18–120');
      }

      const res = await fetch('/api/profiles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          full_name: fullName.trim(),
          vibe: vibe.trim(),
          age: ageNum,
          slug: cleanSlug,
          activities,
          is_public: isPublic,
          photo_url: photoUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      setSlug(data.slug);
      setMessage('Card saved. You can share it as an app.');
      await refreshUser();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const copyShare = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError('Could not copy — select the URL manually');
    }
  };

  if (isLoading || !user) {
    return (
      <Container>
        <Head>
          <title>My card | 0x2 Reject</title>
        </Head>
        Loading…
      </Container>
    );
  }

  return (
    <Container>
      <Head>
        <title>Build your card | 0x2 Reject</title>
      </Head>
      <Title>Build your dating card</Title>
      <Sub>Your personal lead funnel disguised as a dating profile.</Sub>

      <Form onSubmit={onSubmit}>
        <div>
          <Label>Photo</Label>
          <PhotoPreview $src={photoUrl} />
          <Input type="file" accept="image/*" onChange={onPhotoChange} disabled={uploading} />
          {uploading && <Msg>Uploading…</Msg>}
        </div>

        <div>
          <Label>Name</Label>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your name"
            maxLength={40}
          />
        </div>

        <div>
          <Label>Age</Label>
          <Input
            type="number"
            min={18}
            max={120}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="37"
          />
        </div>

        <div>
          <Label>Vibe</Label>
          <TextArea
            value={vibe}
            onChange={(e) => setVibe(e.target.value)}
            placeholder="One line that is you"
            maxLength={160}
          />
        </div>

        <div>
          <Label>Activities</Label>
          <ChipGrid>
            {DEFAULT_ACTIVITIES.map((a) => (
              <Chip
                key={a.id}
                type="button"
                $on={activities.includes(a.id)}
                onClick={() => toggleActivity(a.id)}
              >
                {a.emoji} {a.label}
              </Chip>
            ))}
          </ChipGrid>
        </div>

        <div>
          <Label>Share slug</Label>
          <Input
            value={slug}
            onChange={(e) => setSlug(slugify(e.target.value))}
            placeholder="your-name"
          />
        </div>

        <Row>
          <Toggle
            id="isPublic"
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          <Label htmlFor="isPublic" style={{ margin: 0 }}>
            Public — show in Ren deck & shareable link
          </Label>
        </Row>

        {error && <Msg $err>{error}</Msg>}
        {message && <Msg>{message}</Msg>}

        <Primary type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save card'}
        </Primary>
      </Form>

      {slug && (
        <ShareBox>
          <Label>Share your profile as an app</Label>
          <ShareUrl>{shareUrl}</ShareUrl>
          <Primary type="button" onClick={() => void copyShare()}>
            {copied ? 'Copied!' : 'Copy share link'}
          </Primary>
        </ShareBox>
      )}

      <Secondary href="/deck">Open the multi-user deck →</Secondary>
    </Container>
  );
}
