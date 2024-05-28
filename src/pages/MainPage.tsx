import React from 'react';
import useStore from "store";

const MainPage = () => {
    const {data} = useStore();
    return (

        <>
            <div>
                {data?.map((item) => (<div key={item.id}>{item.id}</div>))}
            </div>


            {/*<div>*/}
            {/*    {data.map((item) => (*/}
            {/*        <div key={item.id}>{item.attributes.map((todo) => (*/}
            {/*            <div key={todo.createdAt}>{todo.title}</div>*/}
            {/*        ))}</div>*/}
            {/*    ))}*/}
            {/*</div>*/}


            <div>

                {data?.map(item => (
                    <div key={item.id}>
                        <h2>{item.attributes.title}</h2>
                        <p>{item.attributes.description}</p>
                        <p>Status: {item.attributes.status}</p>
                        <p>Created At: {item.attributes.createdAt}</p>
                        <p>Updated At: {item.attributes.updatedAt}</p>
                        <p>Published At: {item.attributes.publishedAt}</p>
                    </div>
                ))}
            </div>
        </>

    )
};

export default MainPage;
