const showHideLoaderGif = () =>{    
    const ajaxLoaderDiv = $('#ajaxLoaderDiv');

    ajaxLoaderDiv.css('display') === 'none' ? ajaxLoaderDiv.css('display', 'block') : ajaxLoaderDiv.css('display', 'none');

}

export {
    showHideLoaderGif
}