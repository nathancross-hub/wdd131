const course = {
    code: "WDD131",
    name: "Dynamic Web Fundamentals",
    sections: [
        { sectionNum: "1", roomNum: "STC 247", enrolled: 24, days: 'TTh', instructor: "Brother Keeres"},
        { sectionNum: "2", roomNum: "STC 110", enrolled: 3, days: 'TTh', instructor: "Brother Alvey"}
    ],
    enrollStudent: function(sectionNum) {
        // find the section from the array
        // enroll one more student in that section
        const sectionIndex = this.sections.findIndex(section => section.sectionNum == sectionNum);

        this.sections[sectionIndex].enrolled++;
        renderSections(this.sections);
    }
    
};

function sectionTemplate(section) {
    return `<tr>
      <td>${section.sectionNum}</td>
      <td>${section.roomNum}</td>
      <td>${section.enrolled}</td>
      <td>${section.days}</td>
      <td>${section.instructor}</td></tr>`
}

function renderSections(sections) {
const html = sections.map(sectionTemplate);
document.querySelector("#sections").innerHTML = html.join("");
}

renderSections(course.sections);

document.querySelector("#enrollStudent").addEventListener("click", function () {
    const sectionNum = document.querySelector("#sectionNumber").value;
    aCourse.enrollStudent(sectionNum);
});
      