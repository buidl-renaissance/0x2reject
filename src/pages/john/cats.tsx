import {
  JohnSubpage,
  PhotoGrid,
  Shot,
  WideShot,
  Body,
  Caption,
  PhotoWithCaption,
} from '@/components/JohnSubpage';

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
          <WideShot $src="/profiles/sash-croquet.jpg" />
          <Caption>Learning the yard. Croquet assistant.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <WideShot $src="/profiles/sash-cutout.jpg" />
          <Caption>Partners in crime.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/sash-nuzzle.jpg" />
          <Caption>Nose kisses. She&apos;s home.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <WideShot $src="/profiles/sash-loft.jpg" />
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
    </JohnSubpage>
  );
}
