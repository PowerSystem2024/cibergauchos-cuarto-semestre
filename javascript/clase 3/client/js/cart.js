const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");

const cartBtn = document.getElementById("cart-btn");


const displayCart = () => {

    modalContainer.innerHTML = "";
    modalContainer.style.display = "block";
    
    
/*Modal Header */
    const modalHeader = document.createElement("div");

    const modalClose = document.createElement("div");
    modalClose.innerText = "❌";
    modalClose.className = "modal-close";
    modalHeader.append(modalClose);

    modalClose.addEventListener ("click", () => {
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    })

    const modalTitle = document.createElement("div");
    modalTitle.innerText = "Cart";
    modalTitle.className = "modal-title";
    modalHeader.append(modalTitle);

    modalContainer.append(modalHeader);

    /*Modal Body */

    cart.forEach((productos) => {
        const modalBody = document.createElement("div");
        modalBody.className = "modal-body";
        modalBody.innerHTML = `
        <div class="productos">
            <img class="productos-img" src="${productos.img}"/>
            <div class="productos-info">
                <h4>${productos.productname}</h4>
        </div>
        <div class="quantity">
            <span class="quantity-btn-decrese">-</span>
            <span class="quantity-input">${productos.cantidad}</span>
            <span class="quantity-btn-increse">+</span>
        </div>
            <div class="price">$${productos.precio * productos.cantidad}</div>
            <div class="delete-product">❌</div>
        
           
        `;
        modalContainer.append(modalBody);

        const decrese = modalBody.querySelector(".quantity-btn-decrese");
        decrese.addEventListener("click", () =>{
            if (productos.cantidad !== 1){
                productos.cantidad--;
                displayCart();
            }
        } )

        const increse = modalBody.querySelector(".quantity-btn-increse");  
        increse.addEventListener("click", () =>{
            productos.cantidad++;
                displayCart();
        })

        /*Delete*/
        const deleteProduct = modalBody.querySelector(".delete-product");
        deleteProduct.addEventListener("click", () =>{
            deleteCartProduct(productos.id)
        })

    })
    
    /*Modal footer*/

    const total = cart.reduce((acc, el)=>acc + el.precio * el.cantidad, 0);

    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalFooter.innerHTML = `
    <div class="total-price">Total: ${total}</div>
    `;
    modalContainer.append(modalFooter);
};

cartBtn.addEventListener("click", displayCart);

const deleteCartProduct = (id) => {
    const foundId = cart.findIndex((element) => element.id === id);
    cart.splice(foundId, 1);
    displayCart();
};