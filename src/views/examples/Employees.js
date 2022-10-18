/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Card,
  CardFooter,
  CardHeader,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { employeesData } from "data/employees";
import { useState } from "react";

const Employees = () => {
  const [employees, setEmployees] = useState(employeesData);

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const handlePageClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  const handlePreviousPageClick = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
  };

  const handleNextPageClick = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
  };

  const handleEditEmployee = (e, employee) => {
    e.preventDefault();
    console.log("Edit employee:", employee);
  };

  const handleDeleteEmployee = (e, id) => {
    e.preventDefault();
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Employees</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Title</th>
                    <th scope="col">Email</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {employees
                    .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                    .map((employee) => (
                      <tr key={employee.id}>
                        <td>
                          <span className="mb-0 text-sm">{employee.id}</span>
                        </td>
                        <td>
                          <span className="mb-0 text-sm">
                            {employee.firstName}
                          </span>
                        </td>
                        <td>
                          <span className="mb-0 text-sm">
                            {employee.lastName}
                          </span>
                        </td>
                        <td>
                          <span className="mb-0 text-sm">{employee.title}</span>
                        </td>
                        <td>
                          <span className="mb-0 text-sm">{employee.email}</span>
                        </td>

                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => handleEditEmployee(e, employee)}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) =>
                                  handleDeleteEmployee(e, employee.id)
                                }
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem disabled={currentPage <= 0}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => handlePreviousPageClick(e)}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>

                    {Array.from(
                      { length: Math.ceil(employeesData.length / pageSize) },
                      (x, i) => i + 1
                    ).map((page, i) => (
                      <PaginationItem
                        className={i === currentPage ? "active" : null}
                        key={i}
                      >
                        <PaginationLink
                          onClick={(e) => handlePageClick(e, i)}
                          href="#"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem
                      disabled={
                        currentPage <=
                        Math.ceil(employeesData.length / pageSize)
                      }
                    >
                      <PaginationLink
                        href="#"
                        onClick={(e) => handleNextPageClick(e)}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Employees;
