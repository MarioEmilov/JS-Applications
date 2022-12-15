import { getAll } from "../api/data.js";
import { html } from "../lib.js";

const productTemplate = (product) => html`
    <div class="product">
        <img src="${product.imageUrl}" alt="example1" />
        <p class="title">${product.name}</p>
        <p><strong>Price:</strong><span class="price">${product.price}</span>$</p>
        <a class="details-btn" href="/details/${product._id}">Details</a>
    </div>
`;

const catalogTemplate = (products) => html`
    <h2>Products</h2>

    ${products.length === 0
        ? html`<h2>No products yet.</h2>`
        : html` <section id="dashboard"> ${products.map((p) => productTemplate(p))} </section>`}
`;

export async function catalogPage(ctx) {
    const products = await getAll();

    ctx.render(catalogTemplate(products));
}
