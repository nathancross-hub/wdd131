const form = document.querySelector("#fsyForm");
const output = document.getElementById("output");
const notesContainer = document.getElementById("notesContainer");
const notesLabel = document.querySelector("label[for='notes']");

function isDateValid() {
    const selectedDate = new Date(form.availableDate.value + "T00:00:00");
    const todaysDate = new Date();
    todaysDate.setHours(0, 0, 0, 0);

    return selectedDate > todaysDate;
}

form.travelRange.addEventListener("change", () => {
    if(form.travelRange.value === "one"){
        notesContainer.hidden = false;
        notesLabel.textContent = "Student I#";
        form.notes.required = true;
        form.notes.value = "";
    }
    else if(form.travelRange.value === "many"){
        notesContainer.hidden = false;
        notesLabel.textContent = "Access Code";
        form.notes.required = true;
        form.notes.value = "";
    }
    else {
        notesContainer.hidden = true;
        form.notes.required = false;
        form.notes.value = "";
    }
});

form.addEventListener("submit", event => {
    event.preventDefault();

    output.textContent = "";

    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const type = form.travelRange.value;
    const availableDate = form.availableDate.value;
    const note = form.notes.value.trim();

    if(!isDateValid()) {
        output.textContent = "Please choose a later date.";
        return;
    }

    if(type === "one" && !/^\d{9}$/.test(note)){
        output.textContent = "Student I# must be 9 digits.";
        return;
    }

    if(type === "many" && note !== "EVENT131"){
        output.textContent = "Incorrect Access Code.";
        return;
    }

    output.innerHTML = `
      <h2>Ticket Created</h2>
      <p>Name: ${firstName} ${lastName}</p>
      <p>Email: ${email}</p>
      <p>Event Date: ${availableDate}</p>
      <p>Type: ${type === "one" ? "Student" : "Guest"}</p>
      `;
});