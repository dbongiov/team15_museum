/* This is for the nav-bar */
document.addEventListener('DOMContentLoaded', () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll('.navbar-burger'),
    0
  );

  // Check if there are any nav burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(($el) => {
      $el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const { target } = $el.dataset;
        const $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

/* Table display for staff, role titles, and museum */
async function getData() {
  console.log('data request');
  const result = document.querySelector('#result');
  const roleId = document.querySelector('#roleId');
  const museumIdNames = document.querySelector('#museumIdNames');
  const employeeIds = document.querySelector('#employeeIds');
  const formStaffDirectory = document.querySelector('.staffDirectory');
  const formAddStaff = document.querySelector('.addStaff');
  const requestRole = await fetch('/api/museumStaffRole');
  // const requestLoc = await fetch('/api/museumStaffLocation');
  const requestRoleId = await fetch('/api/staff_role');
  const tableData = await requestRole.json();
  // const tableDataLoc = await requestLoc.json();
  const tableDataRoleId = await requestRoleId.json();

  console.table(tableData);

  tableData.data.forEach((element) => {
    console.table(element.staff_role);
  });

  // tableDataLoc.data.forEach((element) => {
  //   console.table(element.Museum_info);
  // });
  // build table data in html for staff directory //
  tableData.data.forEach((staff) => {
    console.log(staff);
    const appendItem = document.createElement('tr');
    appendItem.innerHTML = `
        <td> ${staff.staff_id} </td>
        <td> ${staff.employee_first_name} </td>
        <td> ${staff.employee_last_name} </td>
        <td> ${staff.museum_id} </td>
        <td> ${staff.Museum_info.museum_name} </td>
        <td> ${staff.role_id} </td>
        <td> ${staff.role_title} </td>`;
    result.append(appendItem);
  });
  // populate employee name in drop menu in from //
  tableData.data.forEach((names) => {
    console.log(names);
    const appendItem = document.createElement('option');
    appendItem.innerHTML = `
      <option> ${names.employee_first_name} </option>
      <option> ${names.employee_last_name} </option>`;
    employeeIds.append(appendItem);
  });
  // populate museum name drop menu in form //
  tableData.data.forEach((musNames) => {
    console.log(musNames);
    const appendItem = document.createElement('option');
    appendItem.innerHTML = `
      <option> ${musNames.Museum_info.museum_name} </option>`;
    museumIdNames.append(appendItem);
  });
  // populate role id drop menu in form //
  tableDataRoleId.data.forEach((roleIds) => {
    console.log(roleIds);
    const appendItem = document.createElement('option');
    appendItem.innerHTML = `
      <option> ${roleIds.role_id} </option>
      <option> ${roleIds.role_title} </option>`;
    roleId.append(appendItem);
  });
  // update staff directory //
  formStaffDirectory.addEventListener('put', (event) => {
    event.preventDefault();
    console.log('staff directory update');
  });

  // add staff //
  formAddStaff.addEventListener('post', (event) => {
    event.preventDefault();
    console.log('add staff to directory');
  });
}

window.onload = getData;
