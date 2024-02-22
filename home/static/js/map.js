
document.addEventListener('DOMContentLoaded', () => {
    let container = document.getElementById('map');
    let options = {
        center: new kakao.maps.LatLng(37.5516, 126.9417),
        level: 3 // zoom level
    };

    let map = new kakao.maps.Map(container, options);
    let marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(37.5516, 126.9417),
        map: map
    })

    let infoWindow = new kakao.maps.InfoWindow({
        content: '<div style="padding:5px;">인포윈도우 :D</div>'
    })

    infoWindow.open(map, marker)
});

