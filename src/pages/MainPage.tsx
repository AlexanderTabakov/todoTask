import React from 'react';
import useStore from "store";

const MainPage = () => {
    const {data} = useStore();
    return (
        <div>
            {data?.map((item) => (<div>{item.id}</div>))}
        </div>
    );
};

export default MainPage;
