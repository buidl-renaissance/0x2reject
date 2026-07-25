-- Renaissance SSO + Drifter dating card fields
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS renaissance_id TEXT UNIQUE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS vibe TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS photo_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS activities JSONB DEFAULT '[]'::jsonb;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;

CREATE INDEX IF NOT EXISTS profiles_renaissance_id_idx ON profiles (renaissance_id);
CREATE INDEX IF NOT EXISTS profiles_slug_idx ON profiles (slug);
CREATE INDEX IF NOT EXISTS profiles_is_public_idx ON profiles (is_public) WHERE is_public = true;

-- Lead capture from dating card funnel
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  phone TEXT,
  visitor_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  source TEXT NOT NULL DEFAULT 'share' CHECK (source IN ('deck', 'share')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS leads_profile_id_idx ON leads (profile_id);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can view their leads"
  ON leads FOR SELECT
  USING (auth.uid() = profile_id);

CREATE POLICY "Anyone can insert leads"
  ON leads FOR INSERT
  WITH CHECK (true);

-- Swipe history for multi-user deck
CREATE TABLE IF NOT EXISTS swipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  swiper_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  direction TEXT NOT NULL CHECK (direction IN ('left', 'right')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE (swiper_id, profile_id)
);

CREATE INDEX IF NOT EXISTS swipes_swiper_id_idx ON swipes (swiper_id);

ALTER TABLE swipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own swipes"
  ON swipes FOR SELECT
  USING (auth.uid() = swiper_id);

CREATE POLICY "Users can insert their own swipes"
  ON swipes FOR INSERT
  WITH CHECK (auth.uid() = swiper_id);
