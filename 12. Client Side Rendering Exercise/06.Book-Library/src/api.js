let baseUrl = 'http://localhost:3030/jsonstore/collections/books';

export async function loadAllBooks() {
    let res = await fetch(baseUrl);
    let data = await res.json();
    return data;
}