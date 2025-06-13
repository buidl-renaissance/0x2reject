import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ProfilesClient } from '@/data/profiles';
import { supabase } from '@/lib/supabase';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: #1A1A1A;
  color: #F9FAFB;
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-family: 'Space Grotesk', sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #9CA3AF;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #2A2A2A;
  border-radius: 8px;
  background: #2A2A2A;
  color: #F9FAFB;
  font-size: 1rem;
  font-family: 'IBM Plex Mono', monospace;
  
  &:focus {
    outline: none;
    border-color: #4F46E5;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #2A2A2A;
  border-radius: 8px;
  background: #2A2A2A;
  color: #F9FAFB;
  font-size: 1rem;
  font-family: 'IBM Plex Mono', monospace;
  
  &:focus {
    outline: none;
    border-color: #4F46E5;
  }
`;

const NextButton = styled.button`
  padding: 1rem;
  background: #4F46E5;
  color: #F9FAFB;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  font-family: 'IBM Plex Mono', monospace;
  margin-top: 1rem;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
  }
  
  &:disabled {
    background: #374151;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorText = styled.p`
  color: #EF4444;
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;

export default function ProfileBasics() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    birthday: '',
    gender: '',
    pronouns: '',
    customGender: '',
    customPronouns: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length > 30) {
      newErrors.firstName = 'First name must be 30 characters or less';
    }
    
    if (!formData.birthday) {
      newErrors.birthday = 'Birthday is required';
    } else {
      const age = new Date().getFullYear() - new Date(formData.birthday).getFullYear();
      if (age < 18) {
        newErrors.birthday = 'You must be 18 or older';
      }
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    if (!formData.pronouns) {
      newErrors.pronouns = 'Pronouns are required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const profilesClient = new ProfilesClient(supabase);
      await profilesClient.updateProfile(user.id, {
        full_name: formData.firstName,
        // Add other fields as needed
      });

      router.push('/profile/photos');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <Container>
      <Head>
        <title>Who Are You Really? | Epicurious</title>
      </Head>

      <Title>Who Are You Really?</Title>

      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>First Name</Label>
          <Input
            type="text"
            maxLength={30}
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="Your first name"
          />
          {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label>Birthday</Label>
          <Input
            type="date"
            value={formData.birthday}
            onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
          />
          {errors.birthday && <ErrorText>{errors.birthday}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label>Gender</Label>
          <Select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="nonbinary">Nonbinary</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
            <option value="custom">Custom</option>
          </Select>
          {errors.gender && <ErrorText>{errors.gender}</ErrorText>}
        </InputGroup>

        {formData.gender === 'custom' && (
          <InputGroup>
            <Label>Custom Gender</Label>
            <Input
              type="text"
              value={formData.customGender}
              onChange={(e) => setFormData({ ...formData, customGender: e.target.value })}
              placeholder="Tell us your gender"
            />
          </InputGroup>
        )}

        <InputGroup>
          <Label>Pronouns</Label>
          <Select
            value={formData.pronouns}
            onChange={(e) => setFormData({ ...formData, pronouns: e.target.value })}
          >
            <option value="">Select pronouns</option>
            <option value="he/him">he/him</option>
            <option value="she/her">she/her</option>
            <option value="they/them">they/them</option>
            <option value="custom">Other</option>
          </Select>
          {errors.pronouns && <ErrorText>{errors.pronouns}</ErrorText>}
        </InputGroup>

        {formData.pronouns === 'custom' && (
          <InputGroup>
            <Label>Custom Pronouns</Label>
            <Input
              type="text"
              value={formData.customPronouns}
              onChange={(e) => setFormData({ ...formData, customPronouns: e.target.value })}
              placeholder="Tell us your pronouns"
            />
          </InputGroup>
        )}

        <NextButton type="submit">
          Next
        </NextButton>
      </Form>
    </Container>
  );
} 