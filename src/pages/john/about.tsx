import styled from 'styled-components';
import {
  JohnSubpage,
  Body,
  TagList,
  Tag,
} from '@/components/JohnSubpage';

const Section = styled.section`
  margin-bottom: 1.75rem;
`;

const SectionTitle = styled.h2`
  margin: 0 0 0.75rem;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #f9fafb;
`;

const CtaBlock = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #2a2a2a;
  text-align: center;
`;

const CtaLead = styled.p`
  margin: 0 0 1rem;
  color: #d1d5db;
  font-size: 0.95rem;
  line-height: 1.45;
`;

const TextJohnBtn = styled.a`
  display: inline-block;
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  border: 1px solid #4f46e5;
  background: #1a1a1a;
  color: #c7d2fe;
  font-size: 0.95rem;
  text-decoration: none;
  letter-spacing: 0.02em;

  &:hover {
    background: #4f46e5;
    color: #fff;
  }
`;

const JOHN_PHONE = '+13135503518';
const aboutSmsHref = `sms:${JOHN_PHONE}?&body=${encodeURIComponent(
  "Hey John — just learned about you. When's the next adventure?"
)}`;

export default function JohnAboutPage() {
  return (
    <JohnSubpage
      title="Learn about John"
      description="Loving cat daddy looking for his next adventure."
    >
      <Section>
        <SectionTitle>Who he is</SectionTitle>
        <Body>
          <p>
            Roasts your dating app, still shows up with snacks. Silly faces are
            a love language; so is remembering what you ordered last time.
          </p>
          <p>
            Ghosts the group chat, then somehow plans the trip. Soft for
            animals, hard on bad coffee.
          </p>
        </Body>
      </Section>

      <Section>
        <SectionTitle>What he builds</SectionTitle>
        <Body>
          <p>
            Software, app blocks, and weird little worlds that shouldn&apos;t
            exist but somehow do. Days in code and community; nights negotiating
            couch territory with Sash.
          </p>
          <p>
            Ask what he &quot;does&quot; and get a shrug, then a riff on cities,
            crypto rabbit holes, pinball, and whatever he&apos;s shipping this
            week.
          </p>
        </Body>
      </Section>

      <TagList>
        <Tag>Soft for animals, hard on bad coffee</Tag>
        <Tag>Builder who treats life like a prototype</Tag>
        <Tag>City experiments (Renaissance)</Tag>
        <Tag>Crypto curiosity, not crypto bro cosplay</Tag>
        <Tag>Pinball, travel, events</Tag>
      </TagList>

      <CtaBlock>
        <CtaLead>
          Still curious? The next adventure might need a plus-one.
        </CtaLead>
        <TextJohnBtn href={aboutSmsHref}>Text John</TextJohnBtn>
      </CtaBlock>
    </JohnSubpage>
  );
}
