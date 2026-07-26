import styled from 'styled-components';
import {
  JohnSubpage,
  PhotoGrid,
  Body,
  PhotoWithCaption,
} from '@/components/JohnSubpage';
import { travelTrips, getTripPhotos, isTravelVideo } from '@/lib/travel';

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
      </Body>

      <CtaBlock>
        <CtaLead>
          Got a destination in mind? Pitch the trip — he&apos;s already packing
          half a bag.
        </CtaLead>
        <TextJohnBtn href={travelSmsHref}>Text John</TextJohnBtn>
      </CtaBlock>
    </JohnSubpage>
  );
}
