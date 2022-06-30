import React from 'react';
import {useParams} from "react-router-dom";

function Task() {
    let params = useParams();
    
    return (
        <h1>Invoice {params.taskId}</h1>
    );
}

export default Task;