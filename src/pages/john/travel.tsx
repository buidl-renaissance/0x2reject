import Link from 'next/link';
import styled from 'styled-components';
import {
  JohnSubpage,
  PhotoGrid,
  Body,
  PhotoWithCaption,
} from '@/components/JohnSubpage';
import { FloatingTextJohn } from '@/components/FloatingTextJohn';
import { travelTrips, getTripPhotos, isTravelVideo } from '@/lib/travel';

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

const TripNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0 0 1.75rem;
`;

const TripNavLink = styled.a`
  display: inline-block;
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #2a2a2a;
  background: #1c1c1c;
  color: #c7d2fe;
  font-size: 0.85rem;
  text-decoration: none;

  &:hover {
    border-color: #4f46e5;
    background: #1e1b4b;
  }
`;

const TripSection = styled.section`
  margin-bottom: 2.5rem;
  scroll-margin-top: 1rem;
`;

const TripHeader = styled.header`
  margin-bottom: 1rem;
`;

const TripTitle = styled.h2`
  margin: 0 0 0.35rem;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: #f9fafb;
`;

const TripSubtitle = styled.p`
  margin: 0;
  color: #9ca3af;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const Photo = styled.img`
  display: block;
  width: 100%;
  height: auto;
  border-radius: 16px;
  border: 2px solid #2a2a2a;
`;

const Video = styled.video`
  display: block;
  width: 100%;
  height: auto;
  border-radius: 16px;
  border: 2px solid #2a2a2a;
  background: #0a0a0a;
`;

const PhotoTitle = styled.h3`
  margin: 0.65rem 0 0.25rem;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: #f9fafb;
`;

const PhotoCaption = styled.p`
  color: #9ca3af;
  font-size: 0.9rem;
  font-style: italic;
  margin: 0 0 1rem;
  line-height: 1.4;
`;

const JOHN_PHONE = '+13135503518';
const travelSmsHref = `sms:${JOHN_PHONE}?&body=${encodeURIComponent(
  "Hey John — saw your travel photos. Where are we going next?"
)}`;

export default function JohnTravelPage() {
  return (
    <JohnSubpage
      title="Travel photos"
      description="Trips with receipts — boards, boats, elephants, murals."
    >
      <TripNav>
        {travelTrips.map((trip) => (
          <TripNavLink key={trip.id} href={`#${trip.id}`}>
            {trip.title}
          </TripNavLink>
        ))}
      </TripNav>

      {travelTrips.map((trip) => {
        const photos = getTripPhotos(trip);
        return (
          <TripSection key={trip.id} id={trip.id}>
            <TripHeader>
              <TripTitle>{trip.title}</TripTitle>
              <TripSubtitle>{trip.subtitle}</TripSubtitle>
            </TripHeader>
            <PhotoGrid>
              {photos.map((photo) => (
                <PhotoWithCaption key={photo.id}>
                  {isTravelVideo(photo) ? (
                    <Video
                      src={photo.path}
                      controls
                      playsInline
                      preload="metadata"
                      aria-label={photo.title}
                    />
                  ) : (
                    <Photo src={photo.path} alt={photo.title} />
                  )}
                  <PhotoTitle>{photo.title}</PhotoTitle>
                  <PhotoCaption>{photo.caption}</PhotoCaption>
                </PhotoWithCaption>
              ))}
            </PhotoGrid>
          </TripSection>
        );
      })}

      <Body style={{ marginTop: '0.5rem' }}>
        <p>
          <strong>Passport stamps optional.</strong> Stories mandatory. Ask him
          about the rope swing, the elephant that side-eyed him, or the outdoor
          slides in Comuna 13.
        </p>
        <p>
          Got a destination in mind? Pitch the trip — he&apos;s already packing
          half a bag.
        </p>
      </Body>

      <NextLink href="/john/cats">Take me to cat photos →</NextLink>

      <FloatingTextJohn href={travelSmsHref} />
    </JohnSubpage>
  );
}
