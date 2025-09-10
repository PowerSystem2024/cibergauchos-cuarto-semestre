const shopContent = document.getElementById("shopContent");
const cart = [];

productos.forEach((producto) => {
   const content = document.createElement("div");
    content.innerHTML = `
    <img src="${producto.imagen}">
    <h3>${producto.productname}</h3>
    <p>${producto.precio} $</p>
    `;
    shopContent.append(content);

    const buyButton = document.createElement("button");
    buyButton.innerText = "Comprar";

    content.append(buyButton);

    buyButton.addEventListener("click", ()=>{
        cart.push({
            id: producto.id,
            productname: producto.productname,
            price: producto.precio,
            quanty: producto.cantidad,
            img: producto.imagen,
        })
        console.log(cart)

    })
});
