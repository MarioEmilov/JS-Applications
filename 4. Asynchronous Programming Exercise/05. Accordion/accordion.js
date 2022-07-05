async function solution() {
    const main = document.getElementById('main');
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';

    const res = await fetch(url);
    const data = await res.json();

    data.forEach(dataEl => {
        main.appendChild(createArticle(dataEl));
    });
}

function createArticle({ _id, title }) {
    const accordion = createComponent('div', 'accordion', '');
    const head = createComponent('div', 'head', '');
    const titleSpan = createComponent('span', '', title);
    const moreBtn = createComponent('button', 'button', 'More');
    const extraDiv = createComponent('div', 'extra', '');
    extraDiv.style.display = 'none';
    const contentParagraph = createComponent('p', '', '');
    moreBtn.id = _id;

    head.append(titleSpan, moreBtn);
    extraDiv.appendChild(contentParagraph);
    accordion.append(head, extraDiv);

    moreBtn.addEventListener('click', async () => {
        if (extraDiv.style.display == 'none') {
            const response = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${_id}`);
            const dataEl = await response.json();

            moreBtn.textContent = 'Less';
            extraDiv.style.display = 'block';
            contentParagraph.textContent = dataEl.content;
        } else {
            moreBtn.textContent = 'More';
            extraDiv.style.display = 'none';
        }
    });

    return accordion;
}

function createComponent(type, className, content) {
    const element = document.createElement(type);
    element.className = className;
    element.textContent = content;
    return element;
}

solution();