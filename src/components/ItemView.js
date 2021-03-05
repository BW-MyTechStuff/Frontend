import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

function ItemView(props) {
    const history = useHistory();
    const { item } = props;

    const shopClick = e => {
        e.preventDefault();
        history.push(`/item/${item.itemid}`);
    }

    return (
        <Container className="item-browse-cards">
            <p>{item.itemname}</p>
            <p>{item.itemstatus.itemstatustype}</p>
            <p>{item.itemcostperday + "$ per day"}</p>
            <div>
                <button onClick={shopClick}>More Details</button>
            </div>
        </Container>
    )
}

export default ItemView

const Container = styled.div ` 
    background-color: #1D817F;
    margin: 5%;
    padding: 20px;
    border-radius: 10px;
`