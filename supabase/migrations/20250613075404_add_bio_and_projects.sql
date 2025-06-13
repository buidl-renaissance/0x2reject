-- Add bio column
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for projects
CREATE POLICY "Public projects are viewable by everyone"
    ON projects FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own projects"
    ON projects FOR INSERT
    WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own projects"
    ON projects FOR UPDATE
    USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own projects"
    ON projects FOR DELETE
    USING (auth.uid() = profile_id);

-- Create updated_at trigger for projects
CREATE TRIGGER handle_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();
