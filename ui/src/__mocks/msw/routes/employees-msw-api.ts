import { rest } from "msw";

import { employees } from "../../static-data/employee";

const employeesRouteTest = "http://localhost/employee";

let currentMockEmployees = employees;
let currentMockEmployee = employees[0];

const create = (req) => {
  const newEmployee = req.body;
  currentMockEmployees.push(newEmployee);
  return newEmployee;
};

const updatePatch = (req) => {
  const updatedData = req.body;

  currentMockEmployees = currentMockEmployees.map((employee) => {
    if (employee.id === updatedData.id) {
      return {
        ...employee,
        ...updatedData,
      };
    }
    return employee;
  });
  return updatedData;
};

const deleteEmployee = (employeeId) => {
  currentMockEmployees = currentMockEmployees.filter(
    (employee) => employee.id !== employeeId
  );
};

const searchEmployees = (req) => {
  const filters: URLSearchParams = req.url.searchParams;
  console.log(filters.get("businessUnitId")); //filters could be implemented in case of working demo. Not necessary only for FE development
  return currentMockEmployees;
};

export const employeeHandlers = [
  rest.get(employeesRouteTest, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(searchEmployees(req)), ctx.delay(150));
  }),
  rest.get(`${employeesRouteTest}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(currentMockEmployee), ctx.delay(150));
  }),
  rest.post(employeesRouteTest, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(create(req)), ctx.delay(150));
  }),
  rest.put(`${employeesRouteTest}/:id`, (req, res, ctx) => {
    console.log(req);
    return res(ctx.status(200), ctx.json(updatePatch(req)), ctx.delay(150));
  }),

  rest.delete(`${employeesRouteTest}/:id`, (req, res, ctx) => {
    const idAsString = req.params.id as string;
    const employeeId = parseInt(idAsString);
    deleteEmployee(employeeId);
    return res(ctx.status(200), ctx.delay(150));
  }),
];

export const employeeHandlersTests = [
  rest.get(employeesRouteTest, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(searchEmployees(req)), ctx.delay(150));
  }),
  rest.post(employeesRouteTest, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(create(req)), ctx.delay(150));
  }),
  rest.put(`${employeesRouteTest}/:id`, (req, res, ctx) => {
    console.log(req);
    return res(ctx.status(200), ctx.json(updatePatch(req)), ctx.delay(150));
  }),

  rest.delete(`${employeesRouteTest}/:id`, (req, res, ctx) => {
    const idAsString = req.params.id as string;
    const employeeId = parseInt(idAsString);
    deleteEmployee(employeeId);
    return res(ctx.status(200), ctx.delay(150));
  }),
];
