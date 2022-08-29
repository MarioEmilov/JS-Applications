export function search() {
    let tableRows = document.querySelector('.container tbody').children;
    let input = document.querySelector('#searchField');

    let searchterm = input.value
    input.value = '';

    for (const row of tableRows) {
        if (row.textContent.toLowerCase().includes(searchterm.toLowerCase()) == true) {
            row.classList.add('select');
        } else {
            row.classList.remove('select');
        }
    }
}