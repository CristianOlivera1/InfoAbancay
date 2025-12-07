import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from '@iconify/react';
import Loader from '../../../../components/Loader';

interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}

interface LocationPickerProps {
  onLocationChange?: (location: LocationData) => void;
  defaultLocation?: { lat: number; lng: number };
}

export default function LocationPicker({
  onLocationChange,
  defaultLocation
}: LocationPickerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Coordenadas por defecto de Abancay
  const DEFAULT_COORDS: [number, number] = defaultLocation
    ? [defaultLocation.lat, defaultLocation.lng]
    : [-13.630989540918572, -72.88552664628554];

  // Inicializar mapa
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const initializeMap = () => {
      if (!mapContainerRef.current) return;

      // Crear mapa
      const map = L.map(mapContainerRef.current, {
        center: DEFAULT_COORDS,
        zoom: 15,
        zoomControl: true
      });

      // Definir capas base
      const calles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      });

      const satelital = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 19,
          attribution: 'Tiles © Esri — Source: Esri, Earthstar Geographics'
        }
      );

      calles.addTo(map);

      L.control.layers(
        {
          'Calles': calles,
          'Satelital': satelital,

        },
        undefined,
        { collapsed: false }
      ).addTo(map);

      mapRef.current = map;

      setTimeout(() => {
        map.invalidateSize();
      }, 100);

      updateLocationInternal(DEFAULT_COORDS[0], DEFAULT_COORDS[1]);

      setTimeout(() => {
        requestUserLocation();
      }, 500);
    };

    const timer = setTimeout(initializeMap, 100);

    return () => {
      clearTimeout(timer);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      if (markerRef.current) {
        markerRef.current = null;
      }
    };
  }, []);

  const updateLocationInternal = async (lat: number, lng: number) => {
    const newLocation: LocationData = {
      latitude: lat,
      longitude: lng
    };

    try {
      const addressText = await reverseGeocode(lat, lng);
      newLocation.address = addressText;
      setAddress(addressText);
    } catch (err) {
      console.error('Error al obtener dirección:', err);
      setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    }

    onLocationChange?.(newLocation);

    setLoading(false);

    if (mapRef.current) {
      mapRef.current.setView([lat, lng], 15);

      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 100);

      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        const customIcon = L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });

        const marker = L.marker([lat, lng], {
          draggable: true,
          icon: customIcon
        }).addTo(mapRef.current);

        marker.on('dragend', async (e) => {
          const target = e.target as L.Marker;
          const position = target.getLatLng();
          await updateLocationInternal(position.lat, position.lng);
        });

        markerRef.current = marker;
      }
    }
  };

  const requestUserLocation = async () => {
    setError('');

    if (!navigator.geolocation) {
      setError('Tu navegador no soporta geolocalización');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        updateLocationInternal(latitude, longitude);
        setError('');
      },
      (error) => {
        let errorMessage = 'No se pudo obtener tu ubicación';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Permiso de ubicación denegado. Usando ubicación por defecto.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Información de ubicación no disponible.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Tiempo de espera agotado.';
            break;
        }

        setError(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  };

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'LocationPicker/1.0'
          }
        }
      );
      const data = await response.json();

      if (data.display_name) {
        return data.display_name;
      }
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    } catch (error) {
      console.error('Error en geocodificación inversa:', error);
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
  };

  const searchLocation = async (searchText: string) => {
    if (!searchText.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}&limit=1`,
        {
          headers: {
            'User-Agent': 'LocationPicker/1.0'
          }
        }
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        await updateLocationInternal(parseFloat(lat), parseFloat(lon));
      } else {
        setError('No se encontró la ubicación');
      }
    } catch (err) {
      console.error('Error al buscar la ubicación:', err);
      setError('Error al buscar la ubicación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <label className="flex flex-col">
        <p className="text-gray-800 text-base font-medium leading-normal pb-2">
          Ubicación{' '}
          <span className="text-gray-500 text-sm">(opcional)</span>
        </p>

        <div className="flex gap-2 mb-3">
          <div className="relative flex-1 text-sm ">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  searchLocation(address);
                }
              }}
              placeholder="Buscar dirección o arrastrar marcador"
              className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-800 focus:ring-blue-200"
            />
            <button
              type="button"
              onClick={() => searchLocation(address)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Buscar ubicación">
              <Icon icon="lucide:search" width="24" height="24" />
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-2">
              <Icon icon="material-symbols:info" className="text-blue-600 text-lg shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800 flex-1">{error}</p>
            </div>
          </div>
        )}

        <div className="relative border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
              <div className="flex flex-col items-center gap-3">
                <Loader />
                <p className="text-sm text-gray-600">Cargando mapa...</p>
              </div>
            </div>
          )}

          <div
            ref={mapContainerRef}
            className="w-full h-80 z-0"
          />
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Arrastra el marcador o busca una dirección para cambiar la ubicación
        </p>
      </label>
    </div>
  );
}