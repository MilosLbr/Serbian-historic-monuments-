import React from 'react';

const SearchInput = ({searchInput, handleInputChange}) =>{
    return(
        <div className = 'col-lg-3 mb-2'>
            <input className = 'form-control' autoComplete = "off" id= "searchInput" type="text" value = {searchInput} onChange = {handleInputChange}/>
        </div>
    )
}

export default SearchInput;