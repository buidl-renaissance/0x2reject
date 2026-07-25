import styled from 'styled-components';
import { useState, useRef, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';

const Page = styled.div`
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 1.5rem;
  background: #121212;
  color: #f9fafb;
  font-family: 'IBM Plex Mono', 'SF Mono', ui-monospace, monospace;
`;

const Back = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #a5b4fc;
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;

  &:hover {
    color: #c7d2fe;
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 1.75rem;
  margin: 0 0 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #9ca3af;
`;

const Input = styled.input`
  padding: 0.85rem 1rem;
  border-radius: 10px;
  border: 1px solid #2a2a2a;
  background: #1c1c1c;
  color: #f9fafb;
  font-size: 1rem;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #4f46e5;
  }
`;

const TextArea = styled.textarea`
  padding: 0.85rem 1rem;
  border-radius: 10px;
  border: 1px solid #2a2a2a;
  background: #1c1c1c;
  color: #f9fafb;
  font-size: 1rem;
  font-family: inherit;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4f46e5;
  }
`;

const DropZone = styled.div<{ $active?: boolean; $hasFiles?: boolean }>`
  border: 2px dashed ${(p) => (p.$active ? '#4f46e5' : '#2a2a2a')};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(p) => (p.$active ? '#1e1b4b' : '#1c1c1c')};

  &:hover {
    border-color: #4f46e5;
    background: #1e1b4b;
  }
`;

const DropText = styled.p`
  color: #9ca3af;
  margin: 0;
  font-size: 0.95rem;
`;

const FileInput = styled.input`
  display: none;
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.75rem;
  margin-top: 1rem;
`;

const PreviewItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  background: #1c1c1c;
  border: 1px solid #2a2a2a;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PreviewVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveBtn = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #ef4444;
  }
`;

const CaptionInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 6px;
  border: 1px solid #2a2a2a;
  background: #1c1c1c;
  color: #f9fafb;
  font-size: 0.8rem;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #4f46e5;
  }
`;

const SubmitBtn = styled.button`
  padding: 1rem;
  border: none;
  border-radius: 12px;
  background: #4f46e5;
  color: #fff;
  font-size: 1.05rem;
  font-family: inherit;
  cursor: pointer;
  margin-top: 0.5rem;

  &:disabled {
    background: #374151;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #4338ca;
  }
`;

const Message = styled.p<{ $type?: 'error' | 'success' }>`
  padding: 1rem;
  border-radius: 10px;
  background: ${(p) => (p.$type === 'error' ? '#2a1515' : '#152a15')};
  border: 1px solid ${(p) => (p.$type === 'error' ? '#ef4444' : '#10b981')};
  color: ${(p) => (p.$type === 'error' ? '#fca5a5' : '#6ee7b7')};
  margin-bottom: 1rem;
`;

const UnauthorizedMessage = styled.div`
  padding: 1rem;
  border-radius: 10px;
  background: #2a1515;
  border: 1px solid #ef4444;
  color: #fca5a5;
  margin-bottom: 1rem;
`;

type FileWithPreview = {
  file: File;
  preview: string;
  caption: string;
};

export default function TravelUploadPage() {
  const { user, isLoading } = useUser();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return;

    const validFiles = Array.from(newFiles).filter((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      const validExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'mp4', 'mov', 'webm'];
      return validExts.includes(ext);
    });

    const withPreviews = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      caption: '',
    }));

    setFiles((prev) => [...prev, ...withPreviews]);
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const removeFile = (index: number) => {
    setFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const updateCaption = (index: number, caption: string) => {
    setFiles((prev) =>
      prev.map((f, i) => (i === index ? { ...f, caption } : f))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setMessage({ text: 'Title is required', type: 'error' });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const expRes = await fetch('/api/travel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, description, location, date }),
      });

      const expData = await expRes.json();
      if (!expRes.ok) throw new Error(expData.error || 'Failed to create experience');

      const experienceId = expData.experience.id;

      if (files.length > 0) {
        const formData = new FormData();
        formData.append('experienceId', experienceId);
        formData.append('captions', JSON.stringify(files.map((f) => f.caption)));
        files.forEach((f) => formData.append('files', f.file));

        const uploadRes = await fetch('/api/travel/upload', {
          method: 'POST',
          credentials: 'include',
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || 'Failed to upload files');
      }

      setMessage({ text: 'Travel experience created successfully!', type: 'success' });
      setTitle('');
      setDescription('');
      setLocation('');
      setDate('');
      files.forEach((f) => URL.revokeObjectURL(f.preview));
      setFiles([]);
    } catch (err) {
      setMessage({
        text: err instanceof Error ? err.message : 'Something went wrong',
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const isVideo = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    return ['mp4', 'mov', 'webm', 'avi'].includes(ext);
  };

  return (
    <Page>
      <Head>
        <title>Upload Travel Experience | John</title>
      </Head>
      <Back href="/john/travel">← Back to travel</Back>
      <Title>Add Travel Experience</Title>

      {!isLoading && !user ? (
        <UnauthorizedMessage>Unauthorized</UnauthorizedMessage>
      ) : user ? (
        <>
          {message && <Message $type={message.type}>{message.text}</Message>}

          <Form onSubmit={handleSubmit}>
            <FieldGroup>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                type="text"
                placeholder="e.g., Thailand"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                placeholder="e.g., Chiang Mai, Phi Phi Islands"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="text"
                placeholder="e.g., November 2024"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="description">Description</Label>
              <TextArea
                id="description"
                placeholder="Tell the story of this trip..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FieldGroup>

            <FieldGroup>
              <Label>Photos & Videos</Label>
              <DropZone
                $active={dragActive}
                $hasFiles={files.length > 0}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <DropText>
                  {files.length > 0
                    ? `${files.length} file${files.length > 1 ? 's' : ''} selected — click or drop to add more`
                    : 'Drag & drop photos/videos here, or click to select'}
                </DropText>
              </DropZone>
              <FileInput
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) => handleFiles(e.target.files)}
              />

              {files.length > 0 && (
                <PreviewGrid>
                  {files.map((f, i) => (
                    <div key={i}>
                      <PreviewItem>
                        {isVideo(f.file.name) ? (
                          <PreviewVideo src={f.preview} muted />
                        ) : (
                          <PreviewImage src={f.preview} alt="" />
                        )}
                        <RemoveBtn type="button" onClick={() => removeFile(i)}>
                          ×
                        </RemoveBtn>
                      </PreviewItem>
                      <CaptionInput
                        type="text"
                        placeholder="Caption..."
                        value={f.caption}
                        onChange={(e) => updateCaption(i, e.target.value)}
                      />
                    </div>
                  ))}
                </PreviewGrid>
              )}
            </FieldGroup>

            <SubmitBtn type="submit" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create Experience'}
            </SubmitBtn>
          </Form>
        </>
      ) : null}
    </Page>
  );
}
