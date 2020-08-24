
const placeMarkers = (placesArray) => {
    
    placesArray.forEach(elem => {
        let balloonDiv = createBalloonContent(elem);
        
        if(elem.latitude && elem.longitude && ymaps.Map){
            
            let placemark = new ymaps.Placemark([elem.latitude, elem.longitude], {
                hintContent: elem.placeName,
                balloonContent: balloonDiv.html()
            }, {
                iconLayout: 'default#image',
                iconImageSize: [30, 30],
                iconImageHref: 'static/redicon.png',
                balloonCloseButton: false,
            });
            
            map.geoObjects.add(placemark);
                
        }
            
        }
    );

    // returns a promise when all markers are placed on the map so that loader image can be toggled on or off
    
    return new Promise((resolve) => {
        resolve('Completed');
    })
}

const createBalloonContent = (data) => {
    // creating html elements for balloon and storing variables
    let latitude = data.latitude;
    let longitude = data.longitude;
    let balloonDiv = $('<div>');
    balloonDiv.addClass("myBallonDiv")
    let title = data.placeName;
    let imageLink = data.imgLink ? data.imgLink : null; // some entries don't have images or text description
    let paragraphText = data.paragraphText ? data.paragraphText : null;
    let placeHref = data.placeHref;
    let getDirectionsButton = $('<button>');
    getDirectionsButton.addClass('btn btn-success directions-btn');
    getDirectionsButton.html("Путања довде");
    getDirectionsButton.attr({
        'data-lat': latitude,
        'data-long': longitude
    });
    

    let balloonFooter = $('<div>')
    balloonFooter.addClass('balloonFooter align-items-center')

    // filling the balloon with content
    balloonDiv.append(`<h3 class="balloonTitle" ">${title}</h3>`);
    
    if(imageLink){
        balloonDiv.append(`<div class="imageContainer"><img alt='Слика локалитета' src= "${imageLink}"/> </div>`)
    }
    if(paragraphText){
        balloonDiv.append(`<p class="balloonParagraph">${paragraphText}</p>`)
    }

    // the bootom of the balloon has 'more info link' and 'show directions button'
    balloonFooter.append(`<a class="btn btn-info m-1" target="_blank" href="${placeHref}">Више <i class="fas fa-info-circle"></i></a>`);
    balloonFooter.append(getDirectionsButton)

    // finaly append the footer and return the whole ballon content
    balloonDiv.append(balloonFooter);

    return balloonDiv;
}


export {
    placeMarkers
}