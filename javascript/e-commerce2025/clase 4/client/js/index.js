const shopContent = document.getElementById("shopContent");
const cart = [];

productos.forEach((producto) => {
   const content = document.createElement("div");
    content.innerHTML = `
    <img src=${producto.imagen}>
    <h3>${producto.productname}</h3>
    <p>${producto.precio} $</p>
    `;
    shopContent.append(content);

    const buyButton = document.createElement("button");
    buyButton.innerText = "Comprar";

    content.append(buyButton);

    buyButton.addEventListener("click", ()=>{
        const repeat = cart.some((repeatProduct) => repeatProduct.id === producto.id);

        if(repeat) {
            cart.map((prod)=> {
                if(prod.id === producto.id){
                    prod.cantidad++;
                    displayCartCounter();
                }
            });
        } else{
            cart.push({
            id: producto.id,
            productname: producto.productname,
            precio: producto.precio,
            cantidad: producto.cantidad,
            img: producto.imagen,
        });
        displayCartCounter();

        }
        
        console.log(cart)

    })
});
