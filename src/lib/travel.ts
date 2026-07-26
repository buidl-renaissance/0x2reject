/**
 * Travel photo catalog — trips, titles, captions, and paths.
 * Mirrored at /public/travel/catalog.json
 */
import catalog from '@/data/travel-photos.json';

export type TravelPhoto = {
  id: string;
  file: string;
  path: string;
  title: string;
  caption: string;
  original?: string;
  hidden?: boolean;
};

export type TravelTrip = {
  id: string;
  title: string;
  subtitle: string;
  photoIds: string[];
};

export const travelPhotos = catalog.photos as TravelPhoto[];
export const travelTrips = (catalog.trips ?? []) as TravelTrip[];

const photoById = Object.fromEntries(
  travelPhotos.map((p) => [p.id, p])
) as Record<string, TravelPhoto>;

export function getTravelPhoto(id: string): TravelPhoto | undefined {
  return photoById[id];
}

export function getTripPhotos(trip: TravelTrip): TravelPhoto[] {
  return trip.photoIds
    .map((id) => photoById[id])
    .filter((p): p is TravelPhoto => Boolean(p) && !p.hidden);
}
