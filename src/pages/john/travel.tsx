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
      {/* Medellín, Colombia */}
      <Body>
        <h2 style={{ marginBottom: '0.5rem', color: '#f9fafb' }}>
          Medellín — Comuna 13
        </h2>
        <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>
          October 2024
        </p>
      </Body>

      <PhotoGrid>
        <PhotoWithCaption>
          <WideShot $src="/profiles/medellin-hillside.jpg" />
          <Caption>Comuna 13. Built on resilience.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/medellin-stairs.jpg" />
          <Caption>Rainbow stairs. Every step is art.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/medellin-slides.jpg" />
          <Caption>Slides instead of stairs. This neighborhood gets it.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/medellin-space.jpg" />
          <Caption>Found the astronaut. Lost my mind.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/medellin-graffiti.jpg" />
          <Caption>Street art tour. Main character energy.</Caption>
        </PhotoWithCaption>
      </PhotoGrid>

      <Body style={{ marginTop: '1.5rem', marginBottom: '2.5rem' }}>
        <p>
          Comuna 13 went from one of the most dangerous neighborhoods in the world
          to an open-air gallery. Escalators up the hillside, murals everywhere,
          and slides built into the streets. Transformation is possible.
        </p>
      </Body>

      {/* Utah Road Trip */}
      <Body>
        <h2 style={{ marginBottom: '0.5rem', color: '#f9fafb' }}>
          Headed West — Utah
        </h2>
        <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>
          March 2024
        </p>
      </Body>

      <PhotoGrid>
        <PhotoWithCaption>
          <Shot $src="/profiles/utah-snowboard.jpg" />
          <Caption>Powder day. No complaints.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/utah-slc.jpg" />
          <Caption>Salt Lake City from above. Mountains in every direction.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/utah-red-canyon.jpg" />
          <Caption>Red Canyon. Dixie National Forest. Tourist photo obligatory.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/utah-bryce.jpg" />
          <Caption>Bryce Canyon in the snow. Hoodoos for days.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/utah-zion.jpg" />
          <Caption>Zion. Found a perch. Stayed a while.</Caption>
        </PhotoWithCaption>
      </PhotoGrid>

      <Body style={{ marginTop: '1.5rem', marginBottom: '2.5rem' }}>
        <p>
          Drove west through Utah hitting the national parks. Snowboarding,
          red rocks, hoodoos, and canyon walls. The desert in winter hits different.
        </p>
      </Body>

      {/* Costa Rica */}
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
