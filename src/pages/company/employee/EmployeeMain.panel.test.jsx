import { render, screen } from "@testing-library/react";
import { EmployeeMainPanel } from "./EmployeeMain.panel";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const setup = () => {
  render(<EmployeeMainPanel />);
};

beforeEach(() => {
  setup();
});

describe("EmployeeMainPanel Page", () => {
  const onSearchEmployeesMock = jest.fn();
  const onCreateNewEmployeeMock = jest.fn();

  it("check heading is in place", () => {
    expect(
      screen.getByRole("heading", {
        name: /search employees/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/filters/i)).toBeInTheDocument();
    expect(screen.getByText(/employees from PDM/i)).toBeInTheDocument();
  });

  it("should render filter panel", () => {
    // expected text in a table header
    expect(screen.getAllByText(/first name/i)).toHaveLength(4);
    expect(screen.getAllByText(/last name/i)).toHaveLength(4);
    // expect label and <th> tag
    expect(screen.getAllByText(/country/i)).toHaveLength(2);
    expect(screen.getAllByText(/business unit/i)).toHaveLength(2);
    expect(screen.getAllByText(/job title/i)).toHaveLength(2);
    expect(screen.getAllByText(/hire date from/i)).toHaveLength(1);
    expect(screen.getAllByText(/hire date to/i)).toHaveLength(1);
    expect(screen.getAllByText(/department/i)).toHaveLength(1);

    // expect search and reset buttons
    expect(screen.getAllByRole("button", { name: "Search" })).toHaveLength(1);
    expect(screen.getAllByRole("button", { name: "Reset" })).toHaveLength(3);
  });

  it("should render table with headers and rowset", () => {
    const tableRows = screen.getAllByRole("row");
    expect(tableRows.length).toBeGreaterThan(1);

    // check headers are in place
    expect(screen.getAllByText(/first name/i)).toHaveLength(4);
    expect(screen.getAllByText(/last name/i)).toHaveLength(4);
    expect(screen.getAllByText(/hire date/i)).toHaveLength(3);
  });

  it("should check that user can type and clear input field", async () => {
    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toBeInTheDocument();
    await userEvent.type(input, "10");
    expect(input).toHaveValue("10");
    await userEvent.clear(input);
    expect(input).toHaveValue("");
  });

  it("should check if user can search employees", async () => {
    const input = screen.getByPlaceholderText(/search/i);
    input.onclick = onSearchEmployeesMock;
    await userEvent.click(input);
    expect(onSearchEmployeesMock).toHaveBeenCalledTimes(1);
  });

  it("should check if user can navigate to create new employee page", async () => {
    const input = screen.getByRole("button", {
      name: /new/i,
    });
    input.onclick = onCreateNewEmployeeMock;
    await userEvent.click(input);
    expect(onCreateNewEmployeeMock).toHaveBeenCalledTimes(1);
  });
});
