import { html, render } from "../../06.Book-Library/node_modules/lit-html/lit-html.js";

import { getAllStudents } from "./api.js";
import { studentsTemplate } from "./studentsTemplate.js";
import { search } from "./search.js";


let tableBody = document.querySelector('.container tbody');
let studentsData = await getAllStudents();

let template = studentsTemplate(Object.values(studentsData));

render(template, tableBody)

document.querySelector('#searchBtn').addEventListener('click', search)

