import React from 'react';
import useStore from "store";
import AddToDoModal from "components/AddToDoModal";
import TodoCard from "components/TodoCard";

const MainPage = () => {
    const {data} = useStore();
    return (

        <>
            {/*<div>*/}
            {/*    {data?.map((item) => (<div key={item.id}>{item.id}</div>))}*/}
            {/*</div>*/}


            <AddToDoModal/>


            <div>

                {data?.map(item => (
                    <TodoCard
                        key={item.id}
                        title={item.attributes.title}
                        description={item.attributes.description}
                        status={item.attributes.status}
                        createdAt={item.attributes.createdAt}
                        updatedAt={item.attributes.updatedAt}
                        publishedAt={item.attributes.publishedAt}/>
                ))}
            </div>





            {/*<div>*/}

            {/*    {data?.map(item => (*/}
            {/*        <div key={item.id}>*/}
            {/*            <h2>{item.attributes.title}</h2>*/}
            {/*            <p>{item.attributes.description}</p>*/}
            {/*            <p>Status: {item.attributes.status}</p>*/}
            {/*            <p>Created At: {item.attributes.createdAt}</p>*/}
            {/*            <p>Updated At: {item.attributes.updatedAt}</p>*/}
            {/*            <p>Published At: {item.attributes.publishedAt}</p>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </>

    )
};

export default MainPage;
