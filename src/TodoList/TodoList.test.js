import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

describe("TodoList", () => {
  let mockTodos;
  beforeEach(() => {
    mockTodos = [
      { id: 1, text: "Nauczyć się Reacta", done: false },
      { id: 2, text: "Nauczyć się testować", done: false },
    ];
  });

  it("should render the list of initial todos", () => {
    render(<TodoList initialTodos={mockTodos} />);
    const todoElements = screen.getAllByRole("listitem");

    expect(todoElements).toHaveLength(2);
    expect(todoElements[0]).toHaveTextContent("Nauczyć się Reacta");
    expect(todoElements[1]).toHaveTextContent("Nauczyć się testować");
  });

  it("should add a new todo", () => {
    render(<TodoList initialTodos={mockTodos} />);

    const input = screen.getByTestId("todoInput");
    const button = screen.getByTestId("addTodoButton");

    fireEvent.change(input, { target: { value: "Nauczyć się testów" } });
    fireEvent.click(button);

    const todoElements = screen.getAllByRole("listitem");
    expect(todoElements).toHaveLength(3);
    expect(todoElements[2]).toHaveTextContent("Nauczyć się testów");
  });

  it("should delete the first todo when its delete button is clicked", () => {
    render(<TodoList initialTodos={mockTodos} />);

    // Use more specific query to find the button for the first todo
    const deleteButton = screen.getByTestId("deleteTodoButton-1");

    // Check for initial todo presence
    expect(screen.getByText("Nauczyć się Reacta")).toBeInTheDocument();

    // Simulate delete button click
    fireEvent.click(deleteButton);

    // Assert specific todo content is removed
    expect(screen.queryByText("Nauczyć się Reacta")).not.toBeInTheDocument();

    // Optionally assert remaining todos if required
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });
});
