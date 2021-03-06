import React from "react";
import { useHistory } from "react-router-dom";


function ItemView(props) {
    const history = useHistory();
    const { item } = props;

    const shopClick = e => {
        e.preventDefault();
        history.push(`/item/${item.itemid}`);
    }

    return (
        <div className="item-browse-cards">
            <p>{item.itemname}</p>
            <p>{item.itemstatus.itemstatustype}</p>
            <p>{item.itemcostperday + "$ per day"}</p>
            <div>
                <button onClick={shopClick}>More Details</button>
            </div>
        </div>
    )
}

export default ItemView

