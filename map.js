// Dữ liệu tọa độ tuyến đường
const routeCoordinates = [
    { lat: 10.7769, lng: 106.7009 }, // TP.HCM
    { lat: 10.8667, lng: 106.9167 }, // Long Thành
    { lat: 10.95, lng: 107.05 },     // Dầu Giây (QL20 junction)
    { lat: 10.95, lng: 107.75 },     // Mid-point QL55
    { lat: 11.20, lng: 108.10 },     // Đa Mi
    { lat: 11.55, lng: 107.78 },     // Bảo Lộc
    { lat: 11.69, lng: 108.00 },     // Di Linh
    { lat: 11.88, lng: 108.25 },     // Đức Trọng
    { lat: 11.9436, lng: 108.4385 }  // Đà Lạt
];

// Khởi tạo bản đồ và vẽ
function initMap() {
    const bounds = L.latLngBounds(routeCoordinates.map(coord => [coord.lat, coord.lng]));
    stopsData.forEach(stop => bounds.extend([stop.lat, stop.lng]));

    const map = L.map('map').fitBounds(bounds);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Vẽ tuyến đường
    L.polyline(routeCoordinates.map(coord => [coord.lat, coord.lng]), {
        color: '#5F9EA0',
        weight: 5
    }).addTo(map);

    // Đánh dấu các điểm dừng
    stopsData.forEach(stop => {
        const marker = L.marker([stop.lat, stop.lng]).addTo(map);
        marker.bindPopup(`
            <div style="font-family: 'Be Vietnam Pro', sans-serif;">
                <h3 style="font-weight: bold; margin-bottom: 5px; color: #008080;">${stop.name}</h3>
                <p style="margin-bottom: 3px;">${stop.highlight}</p>
                <p style="font-size: 0.8em; color: #555;">${stop.distance} km | ~${stop.time}</p>
            </div>
        `);
    });
}

window.addEventListener('load', initMap);