async function solve() {
    const url = `http://localhost:3030/jsonstore/collections/students`;
 
    const table = document.querySelector("#results tbody");
 
    const response = await fetch(url);
 
    const data = await response.json();
 
    Object.values(data).forEach((s) => {
        const firstName = s.firstName;
        const lastName = s.lastName;
        const facultyNumber = s.facultyNumber;
        const grade = Number(s.grade);
 
 
        const tr = document.createElement("tr");
 
        const firstNameCell = tr.insertCell(0);
        firstNameCell.innerText = firstName;
 
        const lastNameCell = tr.insertCell(1);
        lastNameCell.innerText = lastName;
 
        const facultyNumberCell = tr.insertCell(2);
        facultyNumberCell.innerText = facultyNumber;
 
        const gradeCell = tr.insertCell(3);
        gradeCell.innerText = grade;
 
        table.appendChild(tr);
    });
 
    const submitBtn = document.getElementById("submit");
 
    submitBtn.addEventListener("click", onClickSubmit);
 
    async function onClickSubmit(ev) {
        ev.preventDefault();
 
        const firstNameInput = document.getElementsByName("firstName")[0];
        const lastNameInput = document.getElementsByName("lastName")[0];
        const facultyNumberInput = document.getElementsByName("facultyNumber")[0];
        const gradeInput = document.getElementsByName("grade")[0];
 
        // const inputsArray = document.querySelectorAll('.inputs input');
 
        // Array.from(inputsArray).map( input => {
        //     input.setAttribute('required','');
        // })
 
        if (isNaN(gradeInput.value)) {
            return alert("Wrong grade format!");
        }
 
        if (
            firstNameInput.value !== "" &&
            lastNameInput.value !== "" &&
            facultyNumberInput.value !== "" &&
            gradeInput.value !== ""
        ) {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: firstNameInput.value,
                    lastName: lastNameInput.value,
                    facultyNumber: Number(facultyNumberInput.value),
                    grade: Number(gradeInput.value),
                }),
            });
 
            const tr = document.createElement("tr");
 
            const firstNameCell = tr.insertCell(0);
            firstNameCell.innerText = firstNameInput.value;
 
            const lastNameCell = tr.insertCell(1);
            lastNameCell.innerText = lastNameInput.value;
 
            const facultyNumberCell = tr.insertCell(2);
            facultyNumberCell.innerText = facultyNumberInput.value;
 
            const gradeCell = tr.insertCell(3);
            gradeCell.innerText = gradeInput.value;
            table.appendChild(tr);
        }
 
        firstNameInput.value = '';
        lastNameInput.value = '';
        facultyNumberInput.value = '';
        gradeInput.value = '';
    }
}

//second solution

/* 
document.getElementById('form').addEventListener('submit', onSubmit)
const tbody = document.querySelector('tbody')
loadStudents()


async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target)

    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const facultyNumber = formData.get('facultyNumber')
    const grade = formData.get('grade')

    const result = await createStudent({ firstName, lastName, facultyNumber, grade })
    tbody.appendChild(createRow(result))
    event.target.reset()
}

function createRow(student) {
    const row = document.createElement('tr')
    row.innerHTML = `<th>${student.firstName}</th>
    <th>${student.lastName}</th>
    <th>${student.facultyNumber}</th>
    <th>${student.grade}</th>`

    return row
}


async function loadStudents() {
    const books = await request(`http://localhost:3030/jsonstore/collections/students`)
    const result = Object.values(books).map((student) => createRow(student))

    tbody.replaceChildren(...result)
}



async function createStudent(student) {
    const result = await request(`http://localhost:3030/jsonstore/collections/students`, {
        method: 'POST',
        body: JSON.stringify(student)
    })

    return result
}


async function request(url, options) {
    if (options && options.body != undefined) {
        Object.assign(options, {
            headers: { 'Content-Type': 'application/json' }
        })
    }

    const res = await fetch(url, options);

    if (res.ok != true) {
        const error = await res.json()
        alert(error.message)
        throw new Error(error.message)
    }

    const data = await res.json()
    return data
}
*/

solve();