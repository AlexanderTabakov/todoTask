import React from "react";

type TProps = {
    title:string;
    url:string
}

const Item:React.FC<TProps> = ({title, url}) => {

    return (
        <div>
            <h1>{title}</h1>
            <img src={url} alt="img"/>


        </div>
    )

};

export default Item
