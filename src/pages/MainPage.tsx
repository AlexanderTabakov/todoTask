import React, { useEffect } from "react";
import useStore, { IData } from "store";
import AddToDoModal from "components/AddToDoModal";
import TodoCard from "components/TodoCard";
import { Button, Spin } from "antd";
import styled from "styled-components";

const Container = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  padding: 30px 60px 30px 60px;

  .btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .spinner {
    position: fixed;
    z-index: 99;
    top: 50%;
    left: 50%;
  }
`;

const MainPage = () => {
  const {
    sortByActive,
    sortByCompleted,
    copiedData,
    reset,
    addToFavorite,
    removeFromFavorite,
    sortByFav,
    deleteTodo,
    changeStatus,
    loading,
    getData,
    addTask,
    copyData,
    hasErrors,
  } = useStore();

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      useStore.getState().getData();
      useStore.getState().changePage();
    } else {
      useStore.getState().resetPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getData().then(copyData);
  }, [deleteTodo, reset, addTask]);

  // if (hasErrors) {
  //     return <div> An Error has occurred... Reload page </div>;
  // }

  const [status, setStatus] = React.useState("");

  const changingStatus = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    item: IData,
  ) => {
    setStatus((e.target as HTMLInputElement).value);
    changeStatus(item.id, item.attributes);
  };

  return (
    <Container>
      <AddToDoModal />

      <div className={"btns"}>
        <Button onClick={sortByActive}>Sort by Active</Button>
        <Button onClick={sortByCompleted}>Sort By Completed</Button>
        <Button onClick={sortByFav}>Show Favorite</Button>
        <Button onClick={reset}> RESET </Button>
      </div>

      {loading && <Spin className={"spinner"} />}

      <div>
        {copiedData?.map((item: IData) => (
          <TodoCard
            key={item.id}
            title={item.attributes.title}
            description={item.attributes.description}
            status={item.attributes.status}
            addToFav={() => addToFavorite(item)}
            removeFromFav={() => removeFromFavorite(item.id)}
            deleteTodo={() => deleteTodo(item.id)}
            changeStatus={() => changeStatus(item.id, item.attributes.status)}
          />
        ))}
      </div>
    </Container>
  );
};

export default MainPage;
