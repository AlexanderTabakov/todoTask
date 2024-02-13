import React from "react";
import {App} from "app/App";
import ReactDOM from 'react-dom'
import {BrowserRouter} from "react-router-dom";
import TestMobx from "components/TestMobx";

const root = (
    <BrowserRouter>
        <TestMobx />
    </BrowserRouter>
)

ReactDOM.render(
    root,
    document.getElementById('root')
);
