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

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const Step = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  background: #2A2A2A;
  border: 1px solid #D1D5DB;
  text-align: center;
  
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

const CodeBlock = styled.pre`
  background: #1A1A1A;
  padding: 2rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'IBM Plex Mono', monospace;
  color: #F9FAFB;
  margin: 2rem 0;
  border: 1px solid #4F46E5;
`;

const BenefitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
`;

const Benefit = styled.li`
  margin: 1rem 0;
  padding-left: 2rem;
  position: relative;
  color: #F9FAFB;
  
  &:before {
    content: "⚡";
    position: absolute;
    left: 0;
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
        <ButtonGroup>
          <CTAButton href="https://github.com/yourusername/epicurious" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </CTAButton>
          <CTAButton href="https://vercel.com/new" target="_blank" rel="noopener noreferrer">
            Deploy to Vercel
          </CTAButton>
        </ButtonGroup>
      </Hero>

      <Section>
        <Title>Quick Start Guide</Title>
        <StepsGrid>
          <Step>
            <h3>1. Clone</h3>
            <CodeBlock>
              {`git clone https://github.com/yourusername/epicurious.git
cd epicurious`}
            </CodeBlock>
          </Step>
          <Step>
            <h3>2. Install</h3>
            <CodeBlock>
              {`yarn install`}
            </CodeBlock>
          </Step>
          <Step>
            <h3>3. Configure</h3>
            <CodeBlock>
              {`NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key`}
            </CodeBlock>
          </Step>
          <Step>
            <h3>4. Run</h3>
            <CodeBlock>
              {`yarn dev`}
            </CodeBlock>
          </Step>
        </StepsGrid>
      </Section>

      <Section>
        <Title>Why Build With Epicurious?</Title>
        <BenefitsList>
          <Benefit>Modern tech stack with Next.js and Supabase</Benefit>
          <Benefit>Real-time features out of the box</Benefit>
          <Benefit>Scalable authentication system</Benefit>
          <Benefit>Built-in matchmaking algorithm</Benefit>
          <Benefit>Responsive design for all devices</Benefit>
        </BenefitsList>
      </Section>

      <Section>
        <Title>Core Features</Title>
        <StepsGrid>
          <Step>
            <h3>Auth</h3>
            <p>Secure user authentication with Supabase Auth</p>
          </Step>
          <Step>
            <h3>Matches</h3>
            <p>Smart matching system with rejection mechanics</p>
          </Step>
          <Step>
            <h3>Chat</h3>
            <p>Real-time messaging powered by Supabase</p>
          </Step>
          <Step>
            <h3>UI/UX</h3>
            <p>Beautiful, responsive design system</p>
          </Step>
        </StepsGrid>
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