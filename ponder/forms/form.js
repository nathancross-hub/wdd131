
// get the form from the dom, print out the result
const form = document.querySelector("#fsyForm");

console.log(form);

// Helper Function to return check campuses
function getCheckedCampuses(campuses) {
    return Array.from(campuses)
                .filter(campus => campus.checked)
                .map(campus => campus.value);
};


function isDateValid() {
    const date = new Date(document.getElementById("availableDate").value);
    const todaysDate = new Date();

    return date > todaysDate;
}


// add event listener to the form to detect submit

form.addEventListener("submit", event => {
    event.preventDefault();
    console.log(form.firstName.value);

    const numberOfCampuses = form.travelRange.value;
    const campuses = form.campus;

    console.log(campuses)

    if(numberOfCampuses === "one" &&
        getCheckedCampuses(campuses).length == 0){
            console.log("No campuses selected")

            document.getElementById("output").textContent = "Please select one campus."
    };

    if(!isDateValid()) {
        document.getElementById("output")
            .textContent = "Please choose a later date."
    }

    if(numberOfCampuses === "many" &&
        getCheckedCampuses(campuses).length < 2){
            document.getElementById("output").textContent = "Please select two or more campuses."
    };
    if(numberOfCampuses === "many"){
            document.getElementById("notesContainer").hidden = false;
            document.getElementById("notes").required = true;
    };

    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const type = form.travelRange.value;
    const availableDate = form.availableDate.value;
    const selectedCampuses = getCheckedCampuses(campuses);
    const note = form.notes.value.trim();


    output.innerHTML = `
      <h2>Preference Submitted</h2>
      <p>${firstName} ${lastName}</p>
      <p>Email: ${email}</p>
      <p>Availability: ${availableDate}</p>
      <p>Campuses: ${selectedCampuses.join(", ")}</p>
      <p>Preference Level: ${type}</p>
      `;
});
