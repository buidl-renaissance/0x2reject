import styled from 'styled-components';
import Link from 'next/link';
import { JohnSubpage, Body } from '@/components/JohnSubpage';

const LetterLink = styled(Link)`
  color: #a5b4fc;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: #c7d2fe;
  }
`;

const CtaBlock = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #2a2a2a;
  text-align: center;
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
  'Hey John — our paths crossed. Want to connect?'
)}`;

export default function JohnAboutPage() {
  return (
    <JohnSubpage
      title="John"
      description="Loving cat daddy looking for his next adventure."
    >
      <Body>
        <p>
          I&apos;m the guy who grills the steaks. Talk is cheap — from plan to
          action.
        </p>
        <p>
          Home base is couch negotiations with{' '}
          <LetterLink href="/john/cats">Sash</LetterLink>. Out in the world:{' '}
          <LetterLink href="/john/travel">trips with receipts</LetterLink> —
          boards, boats, elephants, murals.
        </p>
        <p>
          If you&apos;re curious, say hi. Just a conversation — and maybe the
          next adventure.
        </p>
      </Body>

      <CtaBlock>
        <TextJohnBtn href={aboutSmsHref}>Text John</TextJohnBtn>
      </CtaBlock>
    </JohnSubpage>
  );
}
