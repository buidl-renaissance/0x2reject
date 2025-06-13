import { SupabaseClient } from '@supabase/supabase-js';

export type Project = {
  id: string;
  profile_id: string;
  title: string;
  description: string | null;
  url: string | null;
  created_at: string;
  updated_at: string;
};

export type ProjectCreate = Omit<Project, 'id' | 'profile_id' | 'created_at' | 'updated_at'>;
export type ProjectUpdate = Partial<ProjectCreate>;

export type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  video_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
};

export type ProfileUpdate = Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;

export class ProfilesClient {
  private supabase;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data as Profile;
  }

  async updateProfile(userId: string, updates: ProfileUpdate): Promise<Profile> {
    const { data, error } = await this.supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data as Profile;
  }

  async uploadVideo(userId: string, file: File): Promise<string> {
    // Check video duration before upload
    const duration = await this.getVideoDuration(file);
    if (duration > 10) {
      throw new Error('Video must be 10 seconds or less');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `videos/${fileName}`;

    const { error: uploadError } = await this.supabase.storage
      .from('videos')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = this.supabase.storage
      .from('videos')
      .getPublicUrl(filePath);

    // Update profile with new video URL
    await this.updateProfile(userId, { video_url: publicUrl });

    return publicUrl;
  }

  // Project methods
  async getProjects(userId: string): Promise<Project[]> {
    const { data, error } = await this.supabase
      .from('projects')
      .select('*')
      .eq('profile_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Project[];
  }

  async createProject(userId: string, project: ProjectCreate): Promise<Project> {
    const { data, error } = await this.supabase
      .from('projects')
      .insert({ ...project, profile_id: userId })
      .select()
      .single();

    if (error) throw error;
    return data as Project;
  }

  async updateProject(projectId: string, updates: ProjectUpdate): Promise<Project> {
    const { data, error } = await this.supabase
      .from('projects')
      .update(updates)
      .eq('id', projectId)
      .select()
      .single();

    if (error) throw error;
    return data as Project;
  }

  async deleteProject(projectId: string): Promise<void> {
    const { error } = await this.supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) throw error;
  }

  private async getVideoDuration(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };

      video.onerror = () => {
        reject('Error loading video');
      };

      video.src = URL.createObjectURL(file);
    });
  }
} 