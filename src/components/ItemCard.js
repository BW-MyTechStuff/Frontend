import React from "react";
import { useHistory } from "react-router-dom";

function ItemCard(props) {
    const history = useHistory();
    const { item } = props

    const editClick = e => {
        e.preventDefault();
        history.push(`/edit-item/${item.itemid}`);
    }

    return (
        <div className='listing-container'>
            {console.log(item)}
            <div className='item-card-button'>
            <button onClick={editClick}>{item.itemname}</button>
            </div>
            
        </div>
    )
}

export default ItemCard