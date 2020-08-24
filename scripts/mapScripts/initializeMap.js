const initializeMap = () => {
    
    window.map = new ymaps.Map(("map"), {
        center: [44, 21.09],
        zoom: 7,
        controls: ['routeEditor', 'typeSelector', 'fullscreenControl', 'zoomControl', 'rulerControl', 'geolocationControl']
    });
    
    let placemark = new ymaps.Placemark([44, 21.09], {
        hintContent: "Србија",
    }, {
        iconLayout: 'default#image',
        iconImageSize: [30, 30],
        iconImageHref: 'static/redicon.png',
    });

    map.geoObjects.add(placemark); // initial marker on center

    map.events.add('click', function (e) {  

        map.balloon.close();
       
    }); // close baloon when clicked outside of it

    map.behaviors.disable('scrollZoom');  // disable zooming on scroll
}

export {initializeMap};