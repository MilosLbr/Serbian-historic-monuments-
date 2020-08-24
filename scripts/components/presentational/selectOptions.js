import React from 'react';

const SelectOptions = ({handleSelectChange}) => {
    return(
        <div className = 'col-lg-3 mb-2'>
            <select className= 'custom-select' onChange = { handleSelectChange }>
                    <option value="celaLista" defaultValue="selected">Сви споменици</option>
                    <option value="arheoloskaNalazista">Археолошка налазишта</option>
                    <option value="spomeniciUnesco">Споменици на Унеско листи</option>
                    <option value="prostorneKulturnoIstorijskeCeline">Просторне културно-историјске целине</option>
                    <option value="spomeniciKulture">Споменици културе</option>
                    <option value="znamenitaMesta">Знаменита места</option>
            </select>
        </div>
    )
};


export default SelectOptions;
