import {
  JohnSubpage,
  PhotoGrid,
  Shot,
  WideShot,
  Body,
  Caption,
  PhotoWithCaption,
} from '@/components/JohnSubpage';
import Link from 'next/link';
import styled from 'styled-components';

const UploadLink = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  border: 1px solid #4f46e5;
  background: #1a1a1a;
  color: #c7d2fe;
  font-size: 0.85rem;
  text-decoration: none;

  &:hover {
    background: #4f46e5;
    color: #fff;
  }
`;

export default function JohnTravelPage() {
  return (
    <JohnSubpage
      title="Travel"
      description="Adventure is out there. So is John."
    >
      <UploadLink href="/john/travel/upload">+ Add Experience</UploadLink>
      {/* Thailand */}
      <Body>
        <h2 style={{ marginBottom: '0.5rem', color: '#f9fafb' }}>
          Thailand
        </h2>
        <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>
          November 2024
        </p>
        <h3 style={{ marginBottom: '0.5rem', color: '#d1d5db', fontSize: '1.25rem' }}>
          Chiang Mai — Elephant Sanctuary
        </h3>
      </Body>

      <PhotoGrid>
        <PhotoWithCaption>
          <WideShot $src="/profiles/thailand-elephant-rain.jpg" />
          <Caption>Rainy day at the sanctuary. She didn&apos;t mind.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <WideShot $src="/profiles/thailand-elephant-mist.jpg" />
          <Caption>Misty mountains. Gentle giants.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/thailand-elephant-touch.jpg" />
          <Caption>Made a friend. Mud and all.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/thailand-elephants-rain.jpg" />
          <Caption>Squad goals. Monsoon edition.</Caption>
        </PhotoWithCaption>
      </PhotoGrid>

      <Body style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
        <p>
          Spent the day at an ethical elephant sanctuary outside Chiang Mai.
          Fed them, walked with them, got rained on together. Worth every muddy step.
        </p>
      </Body>

      {/* Phi Phi Islands */}
      <Body>
        <h3 style={{ marginBottom: '0.5rem', color: '#d1d5db', fontSize: '1.25rem' }}>
          Phi Phi Islands
        </h3>
      </Body>

      <PhotoGrid>
        <PhotoWithCaption>
          <WideShot $src="/profiles/thailand-phiphi-boat.jpg" />
          <Caption>Lagoon tour with the homie. Limestone cliffs everywhere.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <WideShot $src="/profiles/thailand-phiphi-harbor.jpg" />
          <Caption>Phi Phi harbor. Boats, mountains, chaos.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/thailand-phiphi-coconut.jpg" />
          <Caption>Beach office. Coconut water on deck.</Caption>
        </PhotoWithCaption>

        <PhotoWithCaption>
          <Shot $src="/profiles/thailand-phiphi-island.jpg" />
          <Caption>Island hopping. Coconut in hand. No complaints.</Caption>
        </PhotoWithCaption>
      </PhotoGrid>

      <Body style={{ marginTop: '1.5rem', marginBottom: '2.5rem' }}>
        <p>
          Island hopped through Phi Phi. Crystal water, limestone karsts,
          and more coconuts than I could count. The Beach was filmed here for a reason.
        </p>
      </Body>

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
