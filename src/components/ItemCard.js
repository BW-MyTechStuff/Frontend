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
        <div>
            {console.log(item)}
            <button onClick={editClick}>{item.itemname}</button>
        </div>
    )
}

export default ItemCard