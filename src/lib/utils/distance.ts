export const deg2rad = (deg: number) => deg * (Math.PI / 180);

export const calculateDistance = (p1: { lat: number, lng: number }, p2: { lat: number, lng: number }) => {
    const R = 6371;
    const dLat = deg2rad(p2.lat - p1.lat);
    const dLng = deg2rad(p2.lng - p1.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(p1.lat)) * Math.cos(deg2rad(p2.lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};
