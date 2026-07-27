import styled from 'styled-components';
import {
  JohnSubpage,
  PhotoGrid,
  Shot,
  Body,
  Caption,
  PhotoWithCaption,
} from '@/components/JohnSubpage';

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
const catsSmsHref = `sms:${JOHN_PHONE}?&body=${encodeURIComponent(
  "Hey John — saw Sash(a Cutie). When do I meet the cat?"
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
      </Body>

      <CtaBlock>
        <CtaLead>
          Soft spot for cats? Sash already likes you — say hi to John… and maybe
          you two can meet.
        </CtaLead>
        <TextJohnBtn href={catsSmsHref}>Text John</TextJohnBtn>
      </CtaBlock>
    </JohnSubpage>
  );
}
