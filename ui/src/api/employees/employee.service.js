import { EMPLOYEE_ROUTE } from "api/api-routes";
import { httpCommon } from "api/http-common";

const searchEmployees = (queryParams) => {
  // otherwise json-server or something else changes params to unreadable format
  // members=id_ne%3D1%26id_ne%3D2%26id_ne%3D3%26id_ne%3D4%26
  const members = queryParams.get("members");
  queryParams.set("members", "");

  return httpCommon.get(`${EMPLOYEE_ROUTE}?${members}&${queryParams}`);
};

const findAllEmployees = () => httpCommon.get(`${EMPLOYEE_ROUTE}`);

const getEmployeeById = (id) => httpCommon.get(`${EMPLOYEE_ROUTE}/${id}`);

const updateEmployee = (updatedEmployee) => {
  const { id } = updatedEmployee;
  return httpCommon.put(
    `${EMPLOYEE_ROUTE}/${id}`,
    JSON.stringify(updatedEmployee)
  );
};

const deleteEmployee = (id) => httpCommon.delete(`${EMPLOYEE_ROUTE}/${id}`);

const createEmployee = (newEmployee) => {
  return httpCommon.post(`${EMPLOYEE_ROUTE}`, newEmployee);
};

export const employeeService = {
  searchEmployees,
  findAllEmployees,
  getEmployeeById,
  updateEmployee,
  createEmployee,
  deleteEmployee,
};
