export interface LocationData {
    id: string;
    city: string;
    label: string;
    area: string;
    lat: number;
    lng: number;
    address: string;
    email: string;
    phone: string;
    timezone: string;
    offset: number; 
    isVip24h?: boolean;
}

export const locations: LocationData[] = [
    {
        id: "london",
        city: "London",
        label: "London HQ",
        area: "Mayfair, W1K",
        lat: 51.5283,
        lng: -0.3817,
        address: "45 Oxford Street, Westminster, United Kingdom",
        email: "contact.london@jetfly.com",
        phone: "+44 20 1234 5678",
        timezone: "GMT",
        offset: 0,
        isVip24h: true
    },
    {
        id: "new-york",
        city: "New York",
        label: "New York",
        area: "Manhattan, NY",
        lat: 40.7128,
        lng: -74.0060,
        address: "123 Broadway Avenue, Manhattan, USA",
        email: "contact.newyork@jetfly.com",
        phone: "+1 (555) 123-4567",
        timezone: "EST",
        offset: -5,
        isVip24h: true
    },
    {
        id: "dubai",
        city: "Dubai",
        label: "Dubai",
        area: "DIFC, UAE",
        lat: 25.2048,
        lng: 55.2708,
        address: "777 Sheikh Zayed Road, United Arab Emirates",
        email: "contact.dubai@jetfly.com",
        phone: "+971 4 123 4567",
        timezone: "GST",
        offset: 4,
        isVip24h: true
    },
    {
        id: "seoul",
        city: "Seoul",
        label: "Seoul",
        area: "Gangnam, 06234",
        lat: 37.5665,
        lng: 126.9780,
        address: "789 Peking Road, Dongcheng District, China",
        email: "contact.beijing@jetfly.com",
        phone: "+86 10 1234 5678",
        timezone: "KST",
        offset: 9
    },
    {
        id: "melbourne",
        city: "Melbourne",
        label: "Melbourne",
        area: "Collins St, 3000",
        lat: -37.8136,
        lng: 144.9631,
        address: "321 Collins Street, Melbourne, Australia",
        email: "contact.melbourne@jetfly.com",
        phone: "+61 3 1234 5678",
        timezone: "AEDT",
        offset: 11
    },
    {
        id: "johannesburg",
        city: "Johannesburg",
        label: "Johannesburg",
        area: "Sandton, 2196",
        lat: -26.2041,
        lng: 28.0473,
        address: "567 Mandela Street, Johannesburg, South Africa",
        email: "contact.johannesburg@jetfly.com",
        phone: "+27 11 123 4567",
        timezone: "SAST",
        offset: 2
    },
    {
        id: "rio",
        city: "Rio",
        label: "Rio",
        area: "Copacabana, 22070",
        lat: -22.9068,
        lng: -43.1729,
        address: "456 Copacabana Avenue, Rio de Janeiro, Brazil",
        email: "contact.riodejanerio@jetfly.com",
        phone: "+55 21 1234 5678",
        timezone: "BRT",
        offset: -3
    }
];
