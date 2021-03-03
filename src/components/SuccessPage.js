import React from 'react'
import { useHistory } from "react-router-dom";
function SuccessPage() {
    const history = useHistory();

    const returnToDash = () => {
        history.push("/user-dashboard")
    }

    return (
        <div>
            <h1>Thanks for Renting</h1>
            <button onClick={returnToDash}>Return to Dashboard</button>
        </div>
    )
}

export default SuccessPage