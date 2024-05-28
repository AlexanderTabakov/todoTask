import React from 'react';
import { Card } from 'antd';
import Meta from "antd/es/card/Meta";
import {IItem} from "store";



const TodoCard:React.FC<IItem> = ({title, status, description}) => {
    return (
        <div>
            <Card
                hoverable
                style={{ width: 240 }}
                // cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                {/*<Meta title="Europe Street beat" description="www.instagram.com" />*/}
                <p>{title}</p>
                <p>{description}</p>
                <p>{status}</p>


            </Card>
        </div>
    );
};

export default TodoCard;
