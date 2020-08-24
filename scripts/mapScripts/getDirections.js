import {showHideLoaderGif} from '../mapScripts/showHideLoaderGif.js';

const getDirections = () => {
    let [localityLatitude, localityLongitude] = [event.target.dataset.lat, event.target.dataset.long];
    showHideLoaderGif();
    
    ymaps.geolocation.get().then(res => {
        let [userLatitude, userLongitude] = res.geoObjects.position;

        ymaps.route([[userLatitude, userLongitude], [localityLatitude, localityLongitude]], {
            multiRoute: true,
            mapStateAutoApply: true
        }).done(function (route) {
            // remove any already placed routes
            let previousRouteIndex;
            map.geoObjects.each((elem, index) => {
                if(elem.geometry == null){
                    // routes have null geometry
                    previousRouteIndex = index;
                }
            })
            map.geoObjects.splice(previousRouteIndex, 1);

            // add new route, so only one route is shown
            map.geoObjects.add(route)

            showHideLoaderGif();
        }, function (err) {
            throw err;
        }, this);
    })
}

export {
    getDirections
}