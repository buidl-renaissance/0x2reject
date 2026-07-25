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
      description="You asked for cat photos. Sash delivers."
    >
      <PhotoGrid>
        <PhotoWithCaption>
          <Shot $src="/profiles/sash-cool.jpg" />
          <Caption>All grown up. Zero apologies.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <WideShot $src="/profiles/sash-first-meet.jpg" />
          <Caption>The moment we met. She chose me.</Caption>
        </PhotoWithCaption>

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
          <Shot $src="/profiles/sash-queen.jpg" />
          <Caption>Queen energy from day one.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/sash-relaxed.jpg" />
          <Caption>Fully settled. Zero worries.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/sash-suitcase.jpg" />
          <Caption>Ready for adventure. DFW approved.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <WideShot $src="/profiles/sash-cutout.jpg" />
          <Caption>Partners in crime.</Caption>
        </PhotoWithCaption>
      </PhotoGrid>

      <Body style={{ marginTop: '1.25rem' }}>
        <p>
          <strong>Sash</strong> — the cute little girl included in the package.
          Soft paws, sharp judgment, zero chill about dinner time.
        </p>
      </Body>
    </JohnSubpage>
  );
}
