import { useState } from "react";

import { TabContent, TabPane } from "reactstrap";

import { businessUnitsData } from "__mocks/data/business-units-mocks";
import { countries } from "__mocks/data/countries-mocks";
import { departmentsData } from "__mocks/data/departments-mocks";

import {
  businessUnitsDataAsSelectOptions,
  countriesDataAsSelectOptions,
  departmentDataAsSelectOptions,
  jobTitlesDataAsSelectOptions,
} from "common/category-utils";

import { CreateEmployeePanel } from "./create-employee/CreateEmployee.panel";
import { EmployeeDetailsPanel } from "./employee-details/EmployeeDetails.panel";
import {
  EMPLOYEE_CREATE,
  EMPLOYEE_DETAILS,
  EMPLOYEE_SEARCH,
} from "./employee.routes.consts";
import { SearchEmployeesPanel } from "./search-employees/SearchEmployees.panel";
import { employeeService } from "api/employees";
import { jobTitlesData } from "__mocks/data/jobTitles-mock";

export const EmployeeMainPanel = () => {
  const [activePanel, setActivePanel] = useState(EMPLOYEE_SEARCH);
  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState({});

  const departments = departmentDataAsSelectOptions(departmentsData);
  const countriesData = countriesDataAsSelectOptions(countries());
  const businessUnits = businessUnitsDataAsSelectOptions(businessUnitsData);
  const jobtitles = jobTitlesDataAsSelectOptions(jobTitlesData);

  const onCreateNew = async (newEmployee) => {
    await employeeService.createEmployee(newEmployee);
  };

  const onSave = async (partialEmployee) => {
    await employeeService.updateEmployee(partialEmployee);
  };

  const onViewEmployeeDetails = async (id) => {
    const { data } = await employeeService.getEmployeeById(id);
    console.log(data);
    setCurrentEmployee(data);
    setActivePanel(EMPLOYEE_DETAILS);
  };

  const onSearchEmployees = async (employeeSearchRequest) => {
    const queryParams = new URLSearchParams(employeeSearchRequest);
    const { data } = await employeeService.searchEmployees(queryParams);
    setEmployees(data);
  };

  const onDelete = async (id) => {
    employeeService.deleteEmployee(id);
    setEmployees(employees.filter((employee) => employee.id !== parseInt(id)));
  };

  return (
    <>
      <TabContent activeTab={activePanel}>
        <TabPane tabId={EMPLOYEE_SEARCH}>
          <SearchEmployeesPanel
            employees={employees}
            departments={departments}
            countries={countriesData}
            businessUnits={businessUnits}
            jobtitles={jobtitles}
            navigateToPanel={setActivePanel}
            onSearchEmployees={onSearchEmployees}
            onDelete={onDelete}
            onViewDetails={onViewEmployeeDetails}
          />
        </TabPane>
        <TabPane tabId={EMPLOYEE_CREATE}>
          <CreateEmployeePanel
            onSaveNewEmployee={onCreateNew}
            navigateToPanel={setActivePanel}
          />
        </TabPane>
        <TabPane tabId={EMPLOYEE_DETAILS}>
          <EmployeeDetailsPanel
            employee={currentEmployee}
            onSave={onSave}
            navigateToPanel={setActivePanel}
          />
        </TabPane>
      </TabContent>
    </>
  );
};
