
document.addEventListener('DOMContentLoaded', () => {
    var container = document.getElementById('map');
    var options = {
        center: new kakao.maps.LatLng(37.5516, 126.9417),
        level: 3 // zoom level
    };

    var map = new kakao.maps.Map(container, options);

});

