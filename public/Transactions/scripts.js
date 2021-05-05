async function getData() {
  console.log("data request");
  const result = document.querySelector("#result");
  const request = await fetch("/api/museumTrans");
  const tableData = await request.json();
  // return tableData;

  tableData.data.forEach((name) => {
    console.log(name);
    const appendItem = document.createElement("tr");
    // appendItem.classList.add('title', 'has-text-centered', 'is-parent', 'is-3');
    appendItem.innerHTML = `
          <select><option> ${name.museum_name} </option></select>
          <select><option> ${name.museum_name} </option></select>
          <select><option> ${name.museum_name} </option></select>
          <select><option> ${name.museum_name} </option></select>
          <select><option> ${name.museum_name} </option></select>
          <select><option> ${name.museum_name} </option></select>
          <select><option> ${name.museum_name} </option></select>
          <select><option> ${name.museum_name} </option></select>`;
    result.append(appendItem);
  });
}
window.onload = getData;

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
// class="has-text-light"
// class="title is-child box has-background-link-dark"
// class="subtitle has-text-light has-text-weight-bold"