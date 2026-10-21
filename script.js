let students = [];
let nextId = 1;

let form = document.getElementById("studentForm");
let nameInput = document.getElementById("name");
let ageInput = document.getElementById("age");
let courseInput = document.getElementById("course");
let studentList = document.getElementById("studentList");
let submitBtn = document.getElementById("submitBtn");
let message = document.getElementById("message");
let editId = null;

// Add student or update student
form.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = nameInput.value.trim();
    let age = Number(ageInput.value);
    let course = courseInput.value.trim();

    if (name === "" || age <= 0 || course === "") {
        message.textContent = "Please enter valid student details.";
        return;
    }
    if (editId === null) {
        let student = {
            id: nextId,
            name: name,
            age: age,
            course: course
        };
        students.push(student);
        nextId++;
        message.textContent = "Student added successfully!";
    } else {
        let student = students.find(function(item) {
            return item.id === editId;
        });
        if (student) {
            student.name = name;
            student.age = age;
            student.course = course;
        }
        editId = null;
        submitBtn.textContent = "Add Student";

        message.textContent = "Student updated successfully!";
    }
    form.reset();
    displayStudents();
});
// Display all students
function displayStudents() {
    studentList.innerHTML = "";
    students.forEach(function(student) {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>
                <button class="edit-btn"
                    onclick="editStudent(${student.id})">
                    Edit
                </button>
                <button class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        `;
        studentList.appendChild(row);
    });
}
// Edit student
function editStudent(id) {
    let student = students.find(function(item) {
        return item.id === id;
    });
    if (student) {
        nameInput.value = student.name;
        ageInput.value = student.age;
        courseInput.value = student.course;

        editId = student.id;
        submitBtn.textContent = "Update Student";

        message.textContent = "Edit the details and click Update Student.";
    }
}
// Delete student
function deleteStudent(id) {
    let index = students.findIndex(function(item) {
        return item.id === id;
    });
    if (index !== -1) {
        students.splice(index, 1);
        message.textContent = "Student deleted successfully!";
        displayStudents();
    }
    if (editId === id) {
        editId = null;
        form.reset();
        submitBtn.textContent = "Add Student";
    }
}