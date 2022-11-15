import { useState } from "react";

import { TabContent, TabPane } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import { businessUnitsData } from "__mocks/data/business-units-mocks";
import { countries } from "__mocks/data/countries-mocks";
import { departmentsData } from "__mocks/data/departments-mocks";
import { jobTitlesData } from "__mocks/data/jobTitles-mocks";
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
import {
  createEmployee,
  deleteEmployee,
  searchEmployee,
  searchEmployees,
  updateEmployee,
} from "redux/features";
import { selectAllEmployeeData } from "redux/features";

export const EmployeeMainPanel = () => {
  const [activePanel, setActivePanel] = useState(EMPLOYEE_SEARCH);

  const [currentEmployee, setCurrentEmployee] = useState({});

  const dispatch = useDispatch();
  const employees = useSelector(selectAllEmployeeData);

  const departments = departmentDataAsSelectOptions(departmentsData);
  const countriesData = countriesDataAsSelectOptions(countries());
  const businessUnits = businessUnitsDataAsSelectOptions(businessUnitsData);
  const jobtitles = jobTitlesDataAsSelectOptions(jobTitlesData);

  const onCreateNew = (newEmployee) => {
    dispatch(createEmployee(newEmployee));
  };

  const onSave = (partialEmployee) => {
    dispatch(updateEmployee(partialEmployee));
  };

  const onViewEmployeeDetails = (id) => {
    const foundEmployee = employees.find((employee) => employee.id === id);
    setCurrentEmployee(foundEmployee);
    dispatch(searchEmployee(id));
    setActivePanel(EMPLOYEE_DETAILS);
  };

  const onSearchEmployees = (employeeSearchRequest) => {
    dispatch(searchEmployees(employeeSearchRequest));
  };

  const onDelete = (id) => {
    dispatch(deleteEmployee(parseInt(id)));
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
