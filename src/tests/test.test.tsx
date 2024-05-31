import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MainPage from "../pages/MainPage";
import useStore from "/store/index";

jest.mock("store", () => ({
  useStore: jest.fn(),
}));

describe("MainPage Component", () => {
  const mockData = {
    sortByActive: jest.fn(),
    sortByCompleted: jest.fn(),
    copiedData: [
      {
        id: "1",
        attributes: {
          title: "Test Task 1",
          description: "Description 1",
          status: "active",
        },
      },
      {
        id: "2",
        attributes: {
          title: "Test Task 2",
          description: "Description 2",
          status: "completed",
        },
      },
    ],
    reset: jest.fn(),
    addToFavorite: jest.fn(),
    removeFromFavorite: jest.fn(),
    sortByFav: jest.fn(),
    deleteTodo: jest.fn(),
    changeStatus: jest.fn(),
    loading: false,
    hasErrors: false,
    getData: jest.fn().mockResolvedValue([]),
    addTask: jest.fn(),
    nextPage: jest.fn(),
    copyData: jest.fn(),
    changePage: jest.fn(),
    resetPage: jest.fn(),
  };

  beforeEach(() => {
    // @ts-ignore
    useStore.mockImplementation(() => mockData);
  });

  it("renders MainPage component", () => {
    render(<MainPage />);
    // @ts-ignore
    expect(screen.getByText("Sort by Active")).toBeInTheDocument();
    // @ts-ignore
    expect(screen.getByText("Sort By Completed")).toBeInTheDocument();
    // @ts-ignore
    expect(screen.getByText("Show Favorite")).toBeInTheDocument();
    // @ts-ignore
    expect(screen.getByText("RESET")).toBeInTheDocument();
  });

  it("calls sortByActive when Sort by Active button is clicked", () => {
    render(<MainPage />);
    fireEvent.click(screen.getByText("Sort by Active"));
    expect(mockData.sortByActive).toHaveBeenCalled();
  });
});
