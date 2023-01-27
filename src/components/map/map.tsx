import { Icon, LayerGroup, Marker } from 'leaflet';
import { useEffect, useRef } from 'react';
import { URL_MARKERS } from '../../const';
import useMap from '../../hooks/use-map';
import { Coords, BookingQuestInfo, Location } from '../../types/booking';

const ZOOM = 10;
const COORDINATES: Coords = [59.96831, 30.31749];

const { DEFAULT, CURRENT } = URL_MARKERS;

type MapProps = {
  quest?: BookingQuestInfo;
  selectedLocation?: Location;
};

const defaultIcon = new Icon({
  iconUrl: DEFAULT,
  iconSize: [23, 42],
  iconAnchor: [11.5, 42],
});

const currentIcon = new Icon({
  iconUrl: CURRENT,
  iconSize: [23, 42],
  iconAnchor: [11.5, 42],
});

function Map({ quest, selectedLocation }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, COORDINATES);

  useEffect(() => {
    map?.setView(COORDINATES, ZOOM);
  }, [map]);

  const layer = new LayerGroup();

  useEffect(() => {
    if (map) {
      if (!quest) {
        const [lat, lng] = COORDINATES;
        const marker = new Marker({ lat, lng });

        marker.setIcon(defaultIcon);
        layer.addLayer(marker);
        layer.addTo(map);
      } else {
        quest.locations.forEach((location) => {
          const [lat, lng] = location.coords;
          const marker = new Marker({ lat, lng });

          marker.setIcon(
            selectedLocation && location.id === selectedLocation.id
              ? currentIcon
              : defaultIcon
          );
          layer.addLayer(marker);
        });

        layer.addTo(map);
      }
    }

    return () => {
      layer.clearLayers();
    };
  });

  return <div className='map__container' ref={mapRef} />;
}

export default Map;
