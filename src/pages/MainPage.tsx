import React from "react";
import {useEffect, useState} from "react";
import Item from "components/Item";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {Pagination} from "antd";

const MainPage = () => {

    const PAGE_SIZE = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [minIndex, setMinIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);




    const [photos, setPhotos] = useState([])

    useEffect(()=> {
        fetch('https://jsonplaceholder.typicode.com/photos?_limit=10')
            .then((res)=> res.json())
            .then((json) => {
                setPhotos(json)
            })
            .catch((err)=> {
                console.log(err);
                alert('Ошибка получения данных')
            })
    }, [])

    useEffect(()=>{
        setTotalPage(photos.length/PAGE_SIZE)
        setMaxIndex(PAGE_SIZE)

    }, [])

    const handleChange = (page: number) => {
        setCurrentPage(page)
        setMinIndex((page-1)*PAGE_SIZE)
        setMaxIndex(page*PAGE_SIZE)
    }



    return(
        <>

            {
                photos?.length > PAGE_SIZE && (
                    <Pagination pageSize={PAGE_SIZE} total={photos.length} onChange={handleChange} current={currentPage}/>
                )
            }

            <div>
                {photos.map((obj)=> <Item key={obj.id} title={obj.title} url={obj.url}/>)}
            </div>


        </>
    )

}

export default MainPage;
