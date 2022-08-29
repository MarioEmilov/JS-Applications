import { html, render } from "../../06.Book-Library/node_modules/lit-html/lit-html.js";


export const studentsTemplate = (studentsData) => html`
    ${studentsData.map(s => html`
        <tr>
            <td>${s.firstName} ${s.lastName}</td>
            <td>${s.email}</td>
            <td>${s.course}</td>
        </tr>
    `)}
`