const shopContent = document.getElementById("shopContent");
window.cart = JSON.parse(localStorage.getItem('cg_cart') || '[]');

function saveCart(){
    localStorage.setItem('cg_cart', JSON.stringify(window.cart));
}

function renderProducts(){
    shopContent.innerHTML = '';
    productos.forEach((producto) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img-wrapper"><img loading="lazy" src="${producto.imagen}" alt="${producto.productname}"></div>
            <h3 class="product-title">${producto.productname}</h3>
            <p class="product-price">$ ${producto.precio}</p>
        `;
        const buyButton = document.createElement('button');
        buyButton.className = 'btn-add';
        buyButton.textContent = 'Agregar';
        card.appendChild(buyButton);
        shopContent.appendChild(card);

        buyButton.addEventListener('click', ()=> addToCart(producto));
    });
}

function addToCart(producto){
    const existing = window.cart.find(p=> p.id === producto.id);
    if(existing){
        existing.cantidad++;
    } else {
        window.cart.push({
            id: producto.id,
            productname: producto.productname,
            precio: producto.precio,
            cantidad: 1,
            img: producto.imagen
        });
    }
    saveCart();
    displayCartCounter();
    showToast(`${producto.productname} agregado`);
}

renderProducts();

// Toast notifications
function showToast(message){
    const stack = document.getElementById('toast-stack');
    if(!stack) return;
    const toast = document.createElement('div');
    toast.className = 'cg-toast cg-toast-success';
    toast.innerHTML = `
        <span class="cg-toast-icon">🛒</span>
        <span>${message}</span>
        <button class="cg-toast-close" aria-label="Cerrar">×</button>
    `;
    stack.appendChild(toast);
    const closeBtn = toast.querySelector('.cg-toast-close');
    const remove = ()=>{
        toast.classList.add('hide');
        setTimeout(()=> toast.remove(), 340);
    };
    closeBtn.addEventListener('click', remove);
    setTimeout(remove, 2600);
}
