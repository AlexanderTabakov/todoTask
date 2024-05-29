import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Button, Input, Modal, Select} from "antd";
import useStore from "store";


const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const AddToDoModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
        setStatus(value)
    };

    const{addTask, getData, copyData} = useStore()

    useEffect(() => {

        setTimeout(copyData(), 1000)
         //TODO понять как сделать асинхронщиной
    }, []);




    const [formValues, setFormValues] = useState(null);
    const [taskTitle, seTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [status, setStatus] = useState("");

    const changeTaskTitle = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        seTaskTitle((e.target as HTMLInputElement).value.trim());
    };

    console.log('taskName', taskTitle)

    const changeTaskDescription = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        setTaskDescription((e.target as HTMLInputElement).value.trim());
    };

    console.log('taskDesc', taskDescription)

    const onSubmit = (e: Event) => {
        e.preventDefault();
        let createdAt = Date.now();
        // const newFormValue = {
        //     // id: id, // TODO Не забыть убрать закоменченный код и логи
        //     taskTitle: taskTitle,
        //     taskDescription: taskDescription,
        //     status: status,
        //     createdAt:createdAt,
        //     updatedAt:"2024-05-28T16:29:41.590Z",
        //     publishedAt:"2024-05-28T16:18:36.076Z",
        // };

        const newFormValue = {
           data:{
               title: taskTitle,
               description: taskDescription,
               status: status,
           }
        };




        addTask(newFormValue);
        // Очистить поля ввода после отправки
        seTaskTitle("");
        setTaskDescription("");
        console.log("newFormValue", newFormValue);
    };



    return (
        <Container>
            <Button type="primary" onClick={showModal}>
                ADD TODO
            </Button>
            <Modal title="Add TODO" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input placeholder="Title" type="text" onChange={changeTaskTitle} />
                <Input placeholder="Description" type="text" onChange={changeTaskDescription} />

                <Select
                    style={{ width: 120 }}

                    onChange={handleChange}
                    options={[
                        { value: 'active', label: 'Active' },
                        { value: 'completed', label: 'Completed' },
                    ]}
                />
                <Button type="primary" onClick={() => onSubmit(event)} >ADD TODO</Button>
            </Modal>
        </Container>
    );
};

export default AddToDoModal;
