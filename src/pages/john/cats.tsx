import {
  JohnSubpage,
  PhotoGrid,
  Shot,
  WideShot,
  Body,
} from '@/components/JohnSubpage';

export default function JohnCatsPage() {
  return (
    <JohnSubpage
      title="Cat photos"
      description="You asked for cat photos. Sash delivers."
    >
      <PhotoGrid>
        <WideShot $src="/profiles/john-sash.png" />
        <Shot $src="/profiles/john.png" />
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
