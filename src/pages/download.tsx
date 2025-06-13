import styled from 'styled-components';
import Head from 'next/head';
// import Link from 'next/link';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #1A1A1A;
  color: #F9FAFB;
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
`;

const Hero = styled.section`
  text-align: center;
  padding: 4rem 0;
  
  h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: bold;
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-family: 'Inter', sans-serif;
    color: #D1D5DB;
    font-size: 1.2rem;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const Section = styled.section`
  margin: 4rem 0;
`;

const Title = styled.h2`
  font-family: 'Space Grotesk', sans-serif;
  font-weight: bold;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #F9FAFB;
`;

const CodeBlock = styled.pre`
  background: #2A2A2A;
  padding: 2rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'IBM Plex Mono', monospace;
  color: #F9FAFB;
  margin: 2rem 0;
`;

const Step = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  border-radius: 8px;
  background: #2A2A2A;
  border: 1px solid #D1D5DB;
  
  h3 {
    font-family: 'IBM Plex Mono', monospace;
    color: #4F46E5;
    margin-bottom: 1rem;
  }
  
  p {
    color: #D1D5DB;
    margin-bottom: 1rem;
  }
`;

const CTAButton = styled.a`
  background: #FF4D4F;
  color: #F9FAFB;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  margin: 1rem;
  font-family: 'IBM Plex Mono', monospace;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-block;
  
  &:hover {
    background: #FFC2D1;
    transform: translateY(-2px);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 2rem 0;
`;

export default function Download() {
  return (
    <Container>
      <Head>
        <title>Download Epicurious - Developer Edition</title>
        <meta name="description" content="Download and deploy your own version of Epicurious - the dating app where rejection is part of the game." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Inter:wght@400;500&family=IBM+Plex+Mono&display=swap" rel="stylesheet" />
      </Head>

      <Hero>
        <h1>Build Your Own Epicurious</h1>
        <p>Deploy the app that turns rejection into a game. Built with Next.js, Supabase, and a dash of emotional intelligence.</p>
      </Hero>

      <Section>
        <Title>Quick Start</Title>
        <Step>
          <h3>1. Clone the Repository</h3>
          <CodeBlock>
            {`git clone https://github.com/yourusername/epicurious.git
cd epicurious`}
          </CodeBlock>
        </Step>

        <Step>
          <h3>2. Install Dependencies</h3>
          <CodeBlock>
            {`yarn install`}
          </CodeBlock>
        </Step>

        <Step>
          <h3>3. Set Up Supabase</h3>
          <p>Create a new Supabase project and add your environment variables:</p>
          <CodeBlock>
            {`NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`}
          </CodeBlock>
        </Step>

        <Step>
          <h3>4. Run the Development Server</h3>
          <CodeBlock>
            {`yarn dev`}
          </CodeBlock>
        </Step>
      </Section>

      <Section>
        <Title>Ready to Deploy?</Title>
        <ButtonGroup>
          <CTAButton href="https://github.com/yourusername/epicurious" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </CTAButton>
          <CTAButton href="https://vercel.com/new" target="_blank" rel="noopener noreferrer">
            Deploy to Vercel
          </CTAButton>
        </ButtonGroup>
      </Section>

      <Section>
        <Title>Features Included</Title>
        <Step>
          <h3>✨ Core Features</h3>
          <p>• User authentication and profiles</p>
          <p>• Match and rejection system</p>
          <p>• Real-time messaging</p>
          <p>• Responsive design</p>
        </Step>
      </Section>

      <Section>
        <Title>Need Help?</Title>
        <ButtonGroup>
          <CTAButton href="https://github.com/yourusername/epicurious/issues" target="_blank" rel="noopener noreferrer">
            Report Issues
          </CTAButton>
          <CTAButton href="https://github.com/yourusername/epicurious/discussions" target="_blank" rel="noopener noreferrer">
            Join Discussion
          </CTAButton>
        </ButtonGroup>
      </Section>
    </Container>
  );
} 