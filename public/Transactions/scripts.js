/* This is for the nav-bar */
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any nav burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(($el) => {
      $el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const { target } = $el.dataset;
        const $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

/* Table display for transactions by museum */
async function getData() {
  console.log('data request');
  const result = document.querySelector('#result');
  const roleId = document.querySelector('#roleId');

  const museumIdNames = document.querySelector('#museumIdNames');
  const employeeIds = document.querySelector('#employeeIds');
  const formStaffDirectory = document.querySelector('.staffDirectory');
  const formAddStaff = document.querySelector('.addStaff');
  
  
  const requestRole = await fetch('/api/museumStaffRole');
  // const requestRoleId = await fetch('/api/staff_role');
  const requestVisTrans = await fetch('/api/visitTransactions');
  const requestMuseum = await fetch ('/api/museum_info');

  
  const tableData = await requestRole.json();
  // const tableDataRoleId = await requestRoleId.json();
  const tableDataVisTran = await requestVisTrans.json();
  const tableDataMuseum = await requestMuseum.json();

  console.table(tableData);

  // tableDataVisTran.data.forEach((element) => {
  //   console.table(element.visitor_transaction);
  // });

  // tableDataLoc.data.forEach((element) => {
  //   console.table(element.Museum_info);
  // });
  // // build table data in html for staff directory //
  // tableDataVisTran.data.forEach((transaction) => {
  //   console.log(transaction);
  //   const appendItem = document.createElement('tr');
  //   appendItem.innerHTML = `
  //       <td> ${transaction.visitor_transaction.visitor_transactions} </td>
  //       <td> ${transaction.visitor_transaction.transaction_id} </td>
  //       <td> ${transaction.visitor_transaction.visitor_id} </td>
  //       <td> ${transaction.museum_visits.museum_id} </td>
  //       <td> ${transaction.Museum_info.museum_name} </td>`;
  //   result.append(appendItem);
  // });


  // populate museum name drop menu in form //
  tableData.data.forEach((musNames) => {
    console.log(musNames);
    const appendItem = document.createElement('option');
    appendItem.innerHTML = `
      <option> ${musNames.Museum_info.museum_name} </option>`;
    museumIdNames.append(appendItem);
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

