let students = [];
let editIndex = -1;

let form = document.getElementById("studentForm");
let nameInput = document.getElementById("name");
let ageInput = document.getElementById("age");
let courseInput = document.getElementById("course");
let studentList = document.getElementById("studentList");
let submitBtn = document.getElementById("submitBtn");
let message = document.getElementById("message");
// Add or Update Student
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let student = {
        name: nameInput.value.trim(),
        age: Number(ageInput.value),
        course: courseInput.value.trim()
    };
    if (student.name === "" || student.age <= 0 || student.course === "") {
        message.textContent = "Please enter valid details!";
        return;
    }
    if (editIndex === -1) {
        students.push(student);
        message.textContent = "Student added successfully!";
    } else {
        students[editIndex] = student;
        message.textContent = "Student updated successfully!";
        editIndex = -1;
        submitBtn.textContent = "Add Student";
    }
    form.reset();
    displayStudents();
});
// Display Students
function displayStudents() {
    studentList.innerHTML = "";
    students.forEach(function(student, index) {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>
                <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentList.appendChild(row);
    });
}
// Edit Student
function editStudent(index) {
    let student = students[index];

    nameInput.value = student.name;
    ageInput.value = student.age;
    courseInput.value = student.course;

    editIndex = index;
    submitBtn.textContent = "Update Student";
    message.textContent = "Edit details and click Update Student.";
}
// Delete Student
function deleteStudent(index) {
    students.splice(index, 1);
    if (editIndex === index) {
        editIndex = -1;
        form.reset();
        submitBtn.textContent = "Add Student";
    } else if (editIndex > index) {
        editIndex--;
    }
    message.textContent = "Student deleted successfully!";
    displayStudents();
}
displayStudents();