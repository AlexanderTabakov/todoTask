import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainPage from "pages/MainPage";

test("Renders correctly", () => {
  render(<MainPage />);
  const elem = screen.getByText("ADD TODO");
  expect(elem).toBeInTheDocument();
});
