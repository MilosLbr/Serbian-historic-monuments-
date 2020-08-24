import React from 'react';
import { placeMarkers } from '../mapScripts/placeMarkers.js';
import SearchInput from './presentational/searchInput.js';
import SelectOptions from './presentational/selectOptions.js';
import ResultsList from './presentational/resultsList.js';
import { closeResultsList, scrollMapIntoView } from '../events/windowEvents.js';
import { showHideLoaderGif } from '../mapScripts/showHideLoaderGif.js';
import { getDirections } from '../mapScripts/getDirections';

window.addEventListener('click', closeResultsList);
$('#map').off("click").on('click', '.directions-btn', getDirections);

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchInput: '',
            category: 'celaLista',
            jsonResponse: {},
            showResultsList: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.searchPlacesData = this.searchPlacesData.bind(this);
        this.displayResultsOnMap = this.displayResultsOnMap.bind(this);
        this.displayAllInCategory = this.displayAllInCategory.bind(this);
        this.placeResultMarker = this.placeResultMarker.bind(this)
    }


    handleInputChange(){
        let inputValue = event.target.value;

        if(inputValue.trim() !== ''){
            this.searchPlacesData(inputValue);
        }
        

        this.setState({
            searchInput: inputValue,
            showResultsList: true
        });
    };

    handleSelectChange(){
        const selectOptionValue = event.target.value;
        const {searchInput} = this.state;

        // search for results in the newly selected category
        this.searchPlacesData(searchInput, selectOptionValue); 

        this.setState({
            category: selectOptionValue
        });
    };

    searchPlacesData(inputValue, category  = this.state.category){
        const upperCasedInputValue = inputValue.toUpperCase();

        const parameters = {
            inputValue: upperCasedInputValue,
            category
        }

        // search only for strings that have at least 3 characters
        if(inputValue.length < 3){
            return;
        }

        $.getJSON('/search', parameters)
        .then(data => {
            this.setState({
                jsonResponse: data
            });
        });
    };

    displayResultsOnMap(){
        // display markers on the map for the search result

        scrollMapIntoView();

        const {jsonResponse, searchInput} = this.state;

        if(searchInput.length < 3 || Object.keys(jsonResponse).length === 0 ){
            return;
        }else{
            map.geoObjects.removeAll(); // first delete all markers than place new markers from the response
            showHideLoaderGif();

            placeMarkers(jsonResponse).then(() => {
                showHideLoaderGif();
                map.setCenter([44, 21.09], 7); // zoom out the map to show results
            });
        }

        this.setState({
            searchInput: '',
            showResultsList: false,
            jsonResponse: {}
        });
    }

    displayAllInCategory(){
        // display markers for all localities in selected category

        scrollMapIntoView()        

        const { category } = this.state;
        showHideLoaderGif();

        const parameters = {
            inputValue: '',
            category
        }

        $.getJSON('/search', parameters)
        .then(data => {

            map.geoObjects.removeAll(); // first delete all markers than place new from the response
            

            placeMarkers(data).then(() => {
                showHideLoaderGif();
                map.setCenter([44, 21.09], 7);  // zoom out the map to show results
            });

            this.setState({
                wholeCategoryData: data,
                showResultsList: false
            });
        });
    }

    placeResultMarker(data){
        // when result list item is clicked, place marker on a map and zoom in to that location
        map.geoObjects.removeAll();

        placeMarkers([data]);
        map.setCenter([data.latitude, data.longitude], 14);
    }

    render(){
        const { searchInput, jsonResponse, showResultsList} = this.state;

        return (
        <div>
            <div className = 'row p-1 m-0 mb-3 justify-content-center align-items-center position-relative'>
                <SearchInput searchInput = {searchInput} handleInputChange = {this.handleInputChange} />

                <button className = 'btn btn-primary col-lg-3 button-90w mb-2' onClick = {this.displayResultsOnMap}>Прикажи на мапи</button>

                <SelectOptions handleSelectChange = {this.handleSelectChange}/>

                <button className = 'btn btn-primary col-lg-3 button-90w mb-2' onClick = { this.displayAllInCategory }>Прикажи све из категорије</button>

                {(Object.keys(jsonResponse).length > 0 && searchInput.length > 2 && showResultsList)&& <ResultsList resultsArray = {jsonResponse} placeResultMarker = {this.placeResultMarker}/>}

            </div>
            
        </div>)
    }
}

export default App;