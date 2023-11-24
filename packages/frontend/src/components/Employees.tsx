import { useState, useEffect } from 'react';
import config from "../config";
import { Employee } from "../types";

export const Employees = () => {
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadContactList = () => {
    setIsLoading(true);
    fetch(`${config.apiGateway.URL}/northwind`)
      .then((r) => r.json())
      .then((data) => {
        setEmployeeList(data);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadContactList();
  }, []);

  return (
    <div style={{ marginTop: 20 }}>
      {!isLoading ? (
        employeeList.length ? (
          <table cellPadding={5} border={1} style={{ margin: "auto" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Title</th>
                <th>Title of Courtesy</th>
                <th>Birth Date</th>
                <th>Hire Date</th>
                <th>Address</th>
                <th>City</th>
                <th>Region</th>
                <th>Postal Code</th>
                <th>Country</th>
                <th>Home Phone</th>
                <th>Extension</th>
                {/* <th>Photo</th> */}
                <th>Notes</th>
                <th>Reports To</th>
                <th>Photo Path</th>
              </tr>
            </thead>
            <tbody>
              {employeeList.map((employee) => (
                <tr key={employee.employeeID}>
                  <td>{employee.employeeID}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.title}</td>
                  <td>{employee.titleOfCourtesy}</td>
                  <td>{employee.birthDate}</td>
                  <td>{employee.hireDate}</td>
                  <td>{employee.address}</td>
                  <td>{employee.city}</td>
                  <td>{employee.region}</td>
                  <td>{employee.postalCode}</td>
                  <td>{employee.country}</td>
                  <td>{employee.homePhone}</td>
                  <td>{employee.extension}</td>
                  {/* <td>{employee.photo}</td> */}
                  <td>{employee.notes}</td>
                  <td>{employee.reportsTo}</td>
                  <td>{employee.photoPath}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          "No Employees found"
        )
      ) : (
        "Loading..."
      )}
    </div>
  );
}