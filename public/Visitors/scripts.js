async function getData() {
  console.log('data request');
  const result = document.querySelector('#result');
  const request = await fetch('/api/museum_team7');
  const tableData = await request.json();
  // return tableData;

  tableData.data.forEach((visitor) => {
    console.log(visitor);
    const appendItem = document.createElement('tr');
    // appendItem.classList.add('title', 'has-text-centered', 'is-parent', 'is-3');
    appendItem.innerHTML = `
        <td> ${visitor.visitor_id} </td>
        <td> ${visitor.visitor_fn} </td>
        <td> ${visitor.visitor_ln} </td>
        <td> ${visitor.visitor_phone_num} </td>
        <td> ${visitor.email} </td>`;
    result.append(appendItem);
  });
}
window.onload = getData;
// class="has-text-light"
// class="title is-child box has-background-link-dark"
// class="subtitle has-text-light has-text-weight-bold"
