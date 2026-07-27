import Link from 'next/link';
import styled from 'styled-components';
import {
  JohnSubpage,
  PhotoGrid,
  Shot,
  Body,
  Caption,
  PhotoWithCaption,
} from '@/components/JohnSubpage';
import { FloatingTextJohn } from '@/components/FloatingTextJohn';

const NextLink = styled(Link)`
  display: block;
  margin: 0.5rem 0 4rem;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  border: 1px solid #2a2a2a;
  background: #1c1c1c;
  color: #e5e7eb;
  text-decoration: none;
  font-size: 0.95rem;

  &:hover {
    border-color: #4f46e5;
    background: #1e1b4b;
  }
`;

const JOHN_PHONE = '+13135503518';
const catsSmsHref = `sms:${JOHN_PHONE}?&body=${encodeURIComponent(
  'Hey John — saw Sash(a Cutie). When can we plan a play date?'
)}`;

export default function JohnCatsPage() {
  return (
    <JohnSubpage
      title="Cat photos"
      description="You asked for cat photos. Sash(a Cutie) delivers."
    >
      <PhotoGrid>
        <PhotoWithCaption>
          <Shot $src="/profiles/sash-found.jpg" />
          <Caption>Found her on the street. Tail up, no fear.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/sash-chin-scratches.jpg" />
          <Caption>First chin scratches. Instant trust.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/sash-tiny-cap.jpg" />
          <Caption>For scale: one baseball cap.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/sash-cozy.jpg" />
          <Caption>Making herself at home.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/sash-croquet.jpg" />
          <Caption>Learning the yard. Croquet assistant.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/sash-cutout.jpg" />
          <Caption>Partners in crime.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/sash-nuzzle.jpg" />
          <Caption>Nose kisses. She&apos;s home.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/sash-loft.jpg" />
          <Caption>Loft life. Watching everything.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/sash-suitcase.jpg" />
          <Caption>Ready for adventure. DFW approved.</Caption>
        </PhotoWithCaption>
      </PhotoGrid>

      <Body style={{ marginTop: '1.25rem' }}>
        <p>
          <strong>Sash(a Cutie)</strong> — the cute little girl included in the
          package. Soft paws, sharp judgment, zero chill about dinner time.
        </p>
        <p>
          Soft spot for cats? Sash already likes you — say hi to John… and maybe
          you two can meet.
        </p>
      </Body>

      <NextLink href="/john/travel">Where has John been? →</NextLink>

      <FloatingTextJohn href={catsSmsHref} />
    </JohnSubpage>
  );
}
