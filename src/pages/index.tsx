import styled from 'styled-components';
import Head from 'next/head';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #1A1A1A;
  color: #F9FAFB;
  font-family: 'Inter', sans-serif;
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
  background: #1A1A1A;
  text-align: center;
  border: 1px solid #D1D5DB;
  
  h3 {
    font-family: 'IBM Plex Mono', monospace;
    color: #4F46E5;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #D1D5DB;
  }
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
    content: "💔";
    position: absolute;
    left: 0;
  }
`;

const CTAButton = styled.button`
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
`;

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Epicurious</title>
        <meta name="description" content="Epicurious is the only app where rejection is part of the game. Love is awkward. We made it fun." />
        <meta name="keywords" content="Epicurious, rejection, dating, app, fun, awkward, love" />
        <meta name="author" content="Epicurious" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Inter:wght@400;500&family=IBM+Plex+Mono&display=swap" rel="stylesheet" />
      </Head>
      <Hero>
        <h1>Love is awkward. We made it fun.</h1>
        <p>Two rejections. One last chance. Rejection has never felt so right.</p>
        <ButtonGroup>
          <CTAButton as="a" href="/download">Download the App</CTAButton>
          <CTAButton>Watch How It Works</CTAButton>
        </ButtonGroup>
      </Hero>

      <Section>
        <Title>The Only App Where Rejection is Part of the Game</Title>
        <StepsGrid>
          <Step>
            <h3>Match</h3>
            <p>You&apos;re both curious.</p>
          </Step>
          <Step>
            <h3>Reject</h3>
            <p>Twice. Gently, brutally, or playfully.</p>
          </Step>
          <Step>
            <h3>Redeem</h3>
            <p>Make a comeback with style.</p>
          </Step>
          <Step>
            <h3>Decide</h3>
            <p>Ghost, go deeper, or let curiosity simmer.</p>
          </Step>
        </StepsGrid>
      </Section>

      <Section>
        <Title>Swiping is Boring. Rejection is Human.</Title>
        <BenefitsList>
          <Benefit>Turns ghosting into gameplay</Benefit>
          <Benefit>Makes rejection low-stakes and funny</Benefit>
          <Benefit>Encourages better conversations through playful tension</Benefit>
          <Benefit>Empowers people to try again (but only once 😉)</Benefit>
          <Benefit>Built for emotionally self-aware degenerates</Benefit>
        </BenefitsList>
      </Section>

      <Section>
        <Title>They Rejected Me Twice. We&apos;re Getting Married Next Fall.</Title>
        {/* Carousel implementation would go here */}
      </Section>

      <Section>
        <Title>What You&apos;ll Love (Even If You Hate Love)</Title>
        {/* Screenshots grid would go here */}
      </Section>

      <Section>
        <Title>Is This App a Joke?</Title>
        <div>
          <h3>Yes. But also no.</h3>
          <p>Ghosting is real. Let&apos;s give it some structure.</p>
          <p>No one is emotionally well. That&apos;s why we made this.</p>
        </div>
      </Section>

      <Section>
        <Title>Ready to get rejected like it&apos;s your love language?</Title>
        <ButtonGroup>
          <CTAButton as="a" href="/download">Get Epicurious Now</CTAButton>
          <CTAButton>Follow Us for Rejection Memes</CTAButton>
        </ButtonGroup>
      </Section>
    </Container>
  );
}
