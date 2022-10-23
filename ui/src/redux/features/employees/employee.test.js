import { setupServer } from "msw/node";
import { reduxInitialState } from "redux/app/redux-initial-state";
import { createStoreWithState } from "test/test-utils-rtl";
import {
  createEmployee,
  deleteEmployee,
  searchEmployee,
  searchEmployees,
  updateEmployee,
} from "./employee.actions";
import { employeeHandlers } from "__mocks/msw/routes/employees-msw-api";

const server = setupServer(...employeeHandlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

console.log(() => server.listen());
const testStoreInitialization = () => {
  const reduxStore = createStoreWithState(reduxInitialState);
  const selectAllEmployeesData = reduxStore.getState().employee;
  expect(selectAllEmployeesData.entities).toHaveLength(0);
  return { reduxStore, selectAllEmployeesData }; //for later reuse
};
const testStoreAfterSearchAllEmployees = async () => {
  const { reduxStore } = testStoreInitialization();

  await reduxStore.dispatch(searchEmployees({}));
  const selectAllEmployeesData = reduxStore.getState().employee;
  expect(selectAllEmployeesData.entities).not.toBeFalsy();
  return { reduxStore };
};
const testStoreAfterSearchEmployee = async () => {
  const { reduxStore } = await testStoreAfterSearchAllEmployees();
  const { id } = reduxStore.getState().employee.entities[0];
  await reduxStore.dispatch(searchEmployee(id));
  const selectAllEmployeesData = reduxStore.getState().employee;
  expect(selectAllEmployeesData.entities).not.toBeFalsy();
  return { reduxStore };
};
const testStoreAfterCreateEmployee = async () => {
  const { reduxStore } = testStoreInitialization();
  const newEmployee = { firstName: "Johnny", lastName: "Depp", id: 1 };
  await reduxStore.dispatch(createEmployee(newEmployee));
  const selectAllEmployeesData = reduxStore.getState().employee;
  expect(selectAllEmployeesData.entities).toHaveLength(1);
  expect(selectAllEmployeesData.entities[0].firstName).toBe("Johnny");
  expect(selectAllEmployeesData.entities[0].lastName).toBe("Depp");
  return { reduxStore, newEmployee };
};
const testStoreAfterUpdateExistingEmployee = async () => {
  const { reduxStore, newEmployee: employeeToUpdate } =
    await testStoreAfterCreateEmployee();
  employeeToUpdate.firstName = "Angelina";
  employeeToUpdate.lastName = "Jolie";
  await reduxStore.dispatch(updateEmployee(employeeToUpdate));
  const selectAllEmployeesData = reduxStore.getState().employee;
  expect(selectAllEmployeesData.entities).toHaveLength(1);
  expect(selectAllEmployeesData.entities[0].firstName).toBe("Angelina");
  expect(selectAllEmployeesData.entities[0].lastName).toBe("Jolie");
  return { reduxStore, employeeToUpdate };
};
const testStoreAfterDeleteEmployee = async () => {
  const { reduxStore, newEmployee: employeeToDelete } =
    await testStoreAfterCreateEmployee();
  const { id } = employeeToDelete;
  await reduxStore.dispatch(deleteEmployee(id));
  const selectAllEmployeesData = reduxStore.getState().employee;
  expect(selectAllEmployeesData.entities).toHaveLength(0);
};
describe("Employee Feature", () => {
  describe("when app starts", () => {
    it("redux store should be empty", () => {
      testStoreInitialization();
    });
  });

  describe("when search employees is performed", () => {
    it("redux store should contain employees from api", async () => {
      await testStoreAfterSearchAllEmployees();
    });
  });

  describe("when search employee is performed", () => {
    it("redux store should contain employee data from api", async () => {
      await testStoreAfterSearchEmployee();
    });
  });

  describe("when employee is updated", () => {
    it("redux store should update relevant employee from api response", async () => {
      await testStoreAfterUpdateExistingEmployee();
    });
  });
  describe("when employees is created", () => {
    it("should check store when employee is created", async () => {
      await testStoreAfterCreateEmployee();
    });
  });
  describe("when employee is deleted", () => {
    it("redux store should remove employee ", async () => {
      await testStoreAfterDeleteEmployee();
    });
  });
});
