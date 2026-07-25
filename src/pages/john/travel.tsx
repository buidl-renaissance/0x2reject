import {
  JohnSubpage,
  PhotoGrid,
  Shot,
  WideShot,
  Body,
  Caption,
  PhotoWithCaption,
} from '@/components/JohnSubpage';

export default function JohnTravelPage() {
  return (
    <JohnSubpage
      title="Travel"
      description="Adventure is out there. So is John."
    >
      <Body>
        <h2 style={{ marginBottom: '0.5rem', color: '#f9fafb' }}>
          Costa Rica — Ring of Fire Eclipse
        </h2>
        <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>
          October 2023
        </p>
      </Body>

      <PhotoGrid>
        <PhotoWithCaption>
          <Shot $src="/profiles/costa-rica-eclipse.jpg" />
          <Caption>Watching the Ring of Fire. Shipwreck vibes.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/costa-rica-shipwreck.jpg" />
          <Caption>World 4 Locals. Found the graffiti boat.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/costa-rica-waterfall.jpg" />
          <Caption>La Fortuna waterfall. Cold as hell, worth it.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/costa-rica-surfing.jpg" />
          <Caption>First wave. Shaka.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/costa-rica-beach.jpg" />
          <Caption>Post-surf hydration. Pura vida.</Caption>
        </PhotoWithCaption>
      </PhotoGrid>

      <Body style={{ marginTop: '1.5rem' }}>
        <p>
          Flew down for the annular eclipse. Stayed for the waves, waterfalls,
          and the chaos of a graffiti-covered shipwreck you can swim to.
        </p>
      </Body>
    </JohnSubpage>
  );
}
