import { fireEvent, render, screen } from "@testing-library/react";
import { Counter } from "./Counter";

describe("Counter", () => {
  it("should render the count", () => {
    render(<Counter />);
    const elementText = screen.getByText("Count: 0");
    expect(elementText).toBeInTheDocument();
  });

  it("should increment the count", () => {
    render(<Counter />);
    const button = screen.getByTestId("myTestButton");
    fireEvent.click(button);

    const elementText = screen.getByText("Count: 1");
    expect(elementText).toBeInTheDocument();
  });
});
