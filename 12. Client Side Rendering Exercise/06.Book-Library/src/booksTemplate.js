import { html, render } from "../node_modules/lit-html/lit-html.js";

const baseUrl = 'http://localhost:3030/jsonstore/collections/books/';

export const booksTemplate = (booksData) => html`
${booksData.map(b => html`
<tr>
    <td>${b.title}</td>
    <td>${b.author}</td>
    <td>
        <button class="editBtn" @click=${edit}>Edit</button>
        <button class="delBtn" @click=${del}>Edit</button>
    </td>
</tr>
`)}
`

let addform = document.getElementById('add-form');
let editForm = document.getElementById('edit-form');

async function edit(e) {
    e.preventDefault();

    addform.style.display = 'none';
    editForm.style.display = 'block';

    let row = [...e.target.parentNode.parentNode];
    
    



    addform.style.display = 'block';
    editForm.style.display = 'none';
}

function del(e) {

}