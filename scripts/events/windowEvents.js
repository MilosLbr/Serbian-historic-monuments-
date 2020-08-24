const closeResultsList = () => {
    let resultsList = $('#resultsList');

    if(event.target.id !== 'searchInput'){

        resultsList.css('visibility', 'hidden')
    }else{
        resultsList.css('visibility', 'visible')
    }
}

const scrollMapIntoView = () => {
    // scroll map into view when the button is clicked
    const mapDiv = document.getElementById('map');
    const mapRect = mapDiv.getBoundingClientRect();
    window.scrollTo(0, mapRect.top + 265);
}

export {
    closeResultsList,
    scrollMapIntoView
}