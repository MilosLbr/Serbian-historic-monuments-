import React from 'react';

const ResultsList = ({resultsArray, placeResultMarker}) => {
    
    let listitems = resultsArray.map((el, ind) => {
        return <li className ='list-group-item list-group-item-action' onClick = {() => placeResultMarker(el)} key = {ind}>{el.placeName}</li>
    });
    
    return(
        <ul id = "resultsList" className = "resultsList list-group">
            {listitems}
        </ul>
    )
}

export default ResultsList;