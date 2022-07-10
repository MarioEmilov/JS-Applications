// x load all books
// x create book
// x delete book
// x update book

// x handle create form
// x handle edit form

// x load book for editing
// x handle delete button

// x initialization

const tbody = document.querySelector('tbody')
const createForm = document.getElementById('createForm')
const editForm = document.getElementById('editForm')
document.getElementById('loadBooks').addEventListener('click', loadBooks)
createForm.addEventListener('submit', onCreate)
editForm.addEventListener('submit', onEditSubmit)
tbody.addEventListener('click', onTableClick)
loadBooks()


async function onEditSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target)

    const id = formData.get('id')
    const author = formData.get('author')
    const title = formData.get('title')

    const result = await updateBook(id, { author, title })
    // tbody.appendChild(createRow(result._id, result))


    createForm.style.display = 'block'
    editForm.style.display = 'none'

    event.target.reset()
    // console.log('here ')
    loadBooks()

}


function onTableClick(event) {
    if (event.target.className == 'delete') {
        onDelete(event.target)
    } else if (event.target.className == 'edit') {
        onEdit(event.target)
    }
}

async function onEdit(button) {
    const id = button.parentElement.dataset.id
    const book = await loadBookById(id)

    createForm.style.display = 'none'
    editForm.style.display = 'block'

    editForm.querySelector('[name="id"]').value = id
    editForm.querySelector('[name="author"]').value = book.author
    editForm.querySelector('[name="title"]').value = book.title
}


async function onDelete(button) {
    const id = button.parentElement.dataset.id;
    await deleteBook(id)
    button.parentElement.parentElement.remove()

}



async function onCreate(event) {
    event.preventDefault();
    const formData = new FormData(event.target)

    const author = formData.get('author')
    const title = formData.get('title')

    const result = await createBook({ author, title })
    tbody.appendChild(createRow(result._id, result))
    event.target.reset()
    // console.log('here ')


}


function createRow(id, book) {
    const row = document.createElement('tr')
    row.innerHTML = `<td>${book.title}</td>
<td>${book.author}</td>
<td data-id=${id}>
    <button class='edit'>Edit</button>
    <button class='delete' >Delete</button>
</td>`

    return row
}


async function loadBooks() {
    const books = await request(`http://localhost:3030/jsonstore/collections/books`)
    const result = Object.entries(books).map(([id, book]) => createRow(id, book))
    // console.log(result)

    tbody.replaceChildren(...result)
}

async function loadBookById(id) {
    const book = await request(`http://localhost:3030/jsonstore/collections/books/` + id)
    return book
}


async function createBook(book) {
    const result = await request(`http://localhost:3030/jsonstore/collections/books`, {
        method: 'POST',
        body: JSON.stringify(book)
    })

    return result
}


async function updateBook(id, book) {
    const result = await request(`http://localhost:3030/jsonstore/collections/books/` + id, {
        method: 'PUT',
        body: JSON.stringify(book)
    })

    return result

}


async function deleteBook(id) {
    const result = await request(`http://localhost:3030/jsonstore/collections/books/` + id, {
        method: 'DELETE'
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

/*
function solve() {
    const loadBooksBtn = document.getElementById('loadBooks');
    const submitBtn = document.querySelector('form button');
    const inputFields = document.querySelectorAll('form input');
    const tbody = document.querySelector('tbody');
    const url = 'http://localhost:3030/jsonstore/collections/books';

    loadBooksBtn.addEventListener('click', () => {
        tbody.replaceChildren();

        fetch(url)
            .then(res => res.json())
            .then(data => {
                Object.entries(data).forEach(([id, book]) => {
                    tbody.appendChild(addBook(id, book));
                });
            })
            .catch(error => console.log(error));
    });

    submitBtn.addEventListener('click', (ev) => {
        ev.preventDefault();

        const inputValues = getInputFieldsValues();
        const title = inputValues.title;
        const author = inputValues.author;

        if (!title.trim() || !author.trim()) {
            return;
        }

        fetch(url, {
            method: 'POST',
            'Content-Type': 'application/json',
            body: JSON.stringify({
                title,
                author
            })
        })

        clearInputFields();
        loadBooksBtn.click();
    });

    function addBook(id, { author, title }) {
        const tr = document.createElement('tr');
        tr.id = id;

        const authorName = createComponent('td', author);
        const titleName = createComponent('td', title);
        const buttonsTd = createComponent('td', '');

        const editBtn = createComponent('button', 'Edit');
        editBtn.addEventListener('click', editBook);

        const deleteBtn = createComponent('button', 'Delete');
        deleteBtn.addEventListener('click', deleteBook);

        buttonsTd.appendChild(editBtn);
        buttonsTd.appendChild(deleteBtn);
        tr.appendChild(authorName);
        tr.appendChild(titleName);
        tr.appendChild(buttonsTd);

        return tr;
    }

    async function editBook(ev) {
        deleteBook(ev);

        const bookId = ev.target.parentNode.parentNode.id;

        const data = await fetch(`${url}/${bookId}`);
        const res = await data.json();

        const { title, author } = res;

        inputFields[0].value = title;
        inputFields[1].value = author;

        const values = getInputFieldsValues();

        if (!values.title.trim() || !values.author.trim()) {
            return;
        }

        fetch(`${url}/${bookId}`, {
            method: 'PUT',
            'Content-Type': 'application/json',
            body: JSON.stringify({
                author: values.author,
                title: values.title
            })
        });
    }

    function deleteBook(ev) {
        const bookId = ev.target.parentNode.parentNode.id;

        fetch(`${url}/${bookId}`, {
            method: 'DELETE'
        })

        loadBooksBtn.click();
    }

    function createComponent(type, value) {
        const td = document.createElement(type);
        td.textContent = value;
        return td;
    }

    function clearInputFields() {
        inputFields.forEach(input => input.value = '');
    }

    function getInputFieldsValues() {
        const title = inputFields[0].value;
        const author = inputFields[1].value;

        return {
            title,
            author
        }
    }
}

solve();
*/