import styled from 'styled-components';
import Link from 'next/link';
import { JohnSubpage, Body } from '@/components/JohnSubpage';

const LicensePhoto = styled.img`
  display: block;
  width: 100%;
  height: auto;
  border-radius: 12px;
`;

const Cta = styled(Link)`
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  border: 1px solid #4f46e5;
  background: #1a1a1a;
  color: #c7d2fe;
  text-decoration: none;
  font-size: 0.95rem;

  &:hover {
    background: #4f46e5;
    color: #fff;
  }
`;

export default function LicenseToShagPage() {
  return (
    <JohnSubpage
      description="Just so you know — the paperwork’s in order."
      backHref="/john?mode=bad-girl&step=taste"
      backLabel="← Back to John"
    >
      <LicensePhoto
        src="/profiles/license-to-shag.png?v=11"
        alt="License to shag"
      />
      <Body style={{ marginTop: '1.25rem' }}>
        <p>You&apos;ve been warned — in the most official way possible.</p>
      </Body>
      <Cta href="/john?mode=bad-girl&step=taste">Good to know</Cta>
    </JohnSubpage>
  );
}
