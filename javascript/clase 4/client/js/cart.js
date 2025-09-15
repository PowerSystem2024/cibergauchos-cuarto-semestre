const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");
const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");
// clearCartBtn eliminado del header: ahora se renderiza dentro del modal
let mpPublicKey = null;

async function ensurePublicKey(){
  if(mpPublicKey) return mpPublicKey;
  try{
    const res = await fetch('/config');
    const data = await res.json();
    mpPublicKey = data.publicKey;
    return mpPublicKey;
  }catch(e){
    console.error('No se pudo obtener la public key', e);
    return null;
  }
}

function saveCart(){
  localStorage.setItem('cg_cart', JSON.stringify(window.cart));
}

const displayCart = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "block";
  modalOverlay.style.display = 'block';

  /* Modal Header */
  const modalHeader = document.createElement("div");

  const modalClose = document.createElement("div");
  modalClose.innerText = "❌";
  modalClose.className = "modal-close";
  modalHeader.append(modalClose);

  modalClose.addEventListener("click", () => {
    modalContainer.style.display = "none";
    modalOverlay.style.display = "none";
  });

  const modalTitle = document.createElement("div");
  modalTitle.innerText = "Carrito";
  modalTitle.className = "modal-title";
  modalHeader.append(modalTitle);

  modalContainer.append(modalHeader);

  /* Modal Body */
  if (window.cart.length > 0) {
    window.cart.forEach((productos) => {
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
        </div>
      `;
      modalContainer.append(modalBody);

      const decrese = modalBody.querySelector(".quantity-btn-decrese");
      decrese.addEventListener("click", () => {
        if (productos.cantidad !== 1) {
          productos.cantidad--;
          displayCart();
          displayCartCounter();
          saveCart();
        }
      });

      const increse = modalBody.querySelector(".quantity-btn-increse");
      increse.addEventListener("click", () => {
  productos.cantidad++;
        displayCart();
        displayCartCounter();
  saveCart();
      });

      /* Delete */
      const deleteProduct = modalBody.querySelector(".delete-product");
      deleteProduct.addEventListener("click", () => {
        deleteCartProduct(productos.id);
        displayCartCounter();
      });
    });

    /* Modal footer */
  const total = window.cart.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalFooter.innerHTML = `
      <div class="total-price"><span>Total</span> <span>$${total}</span></div>
      <div style="display:flex; gap:.6rem; flex-wrap:wrap;">
        <button class="btn-primary" id="checkout-btn">Pagar</button>
        <button class="btn-primary" id="clear-cart-btn" style="background:#fff; color:#1d3246; box-shadow:none; border:1px solid var(--border);">Vaciar</button>
      </div>
      <div id="button-checkout" style="margin-top:.4rem;"></div>
    `;
    modalContainer.append(modalFooter);

    const clearInside = modalFooter.querySelector('#clear-cart-btn');
    clearInside.addEventListener('click', () => {
      if(window.cart.length === 0) return;
      if(confirm('¿Vaciar carrito?')){
        window.cart = [];
        saveCart();
        displayCartCounter();
        displayCart();
      }
    });

    /* MP */
    let mercadopagoInstance = null;

    ensurePublicKey().then(pk => {
      if(!pk){
        console.error('Public key ausente');
        return;
      }
      mercadopagoInstance = new MercadoPago(pk, { locale: 'es-AR' });
    });

    const checkoutButton = modalFooter.querySelector("#checkout-btn");
    checkoutButton.addEventListener("click", function () {
      checkoutButton.remove();

      const orderData = {
        items: window.cart.map(p => ({
          title: p.productname,
          unit_price: Number(p.precio),
          quantity: Number(p.cantidad),
          currency_id: 'ARS'
        })),
        description: 'Compra Tienda Cibergauchos',
        price: total,
        quantity: 1
      };

      fetch("/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then(async (response) => {
          const text = await response.text();
          let data;
          try { data = text ? JSON.parse(text) : {}; } catch(parseErr){
            console.error('[FETCH] Respuesta no JSON', text);
            throw new Error('Respuesta no JSON del backend');
          }
          return { status: response.status, data };
        })
        .then(({status, data}) => {
          console.log('[FETCH] create_preference status:', status, 'data:', data);
          if (data.id) {
            createCheckoutButton(data.id);
          } else {
            if(data.error){
              alert('Error backend: ' + data.error);
            } else {
              alert("No se recibió preferenceId");
            }
          }
        })
        .catch((error) => {
          console.error("Error fetch create_preference:", error);
          alert("Unexpected error creando preferencia");
        });
});

    function createCheckoutButton(preferenceId) {
      if(!mercadopagoInstance){
        alert('No se pudo inicializar Mercado Pago');
        return;
      }
      const brickBuilder = mercadopagoInstance.bricks();
      const renderComponent = async (brickBuilder) => {
        await brickBuilder.create("wallet", "button-checkout", {
          initialization: {
            preferenceId: preferenceId,
            redirectMode: 'redirect'
          },
          callbacks: {
            onError: (error) => console.error(error),
            onReady: () => {},
          },
        });
      };
      window.checkoutButton = renderComponent(brickBuilder);
    }
  } else {
    const modalText = document.createElement("h2");
    modalText.className = "modal-body";
    modalText.innerText = "Tu carrito está vacío";
    modalContainer.append(modalText);
  }
};

cartBtn.addEventListener("click", displayCart);

const deleteCartProduct = (id) => {
  const foundId = window.cart.findIndex((element) => element.id === id);
  window.cart.splice(foundId, 1);
  displayCart();
  displayCartCounter();
  saveCart();
};

const displayCartCounter = () => {
  const cartLength = window.cart.reduce((acc, el) => acc + el.cantidad, 0);
  if(cartLength > 0){
    cartCounter.style.display = 'inline-block';
    cartCounter.innerText = cartLength;
    cartBtn?.setAttribute('data-has-items','true');
  } else {
    cartCounter.style.display = 'none';
    cartBtn?.removeAttribute('data-has-items');
  }
};

// Botón vaciar ahora se maneja dentro del modal (clear-cart-btn)

// Limpieza de carrito después de regresar de success
if(window.location.pathname.endsWith('success.html')){
  window.cart = [];
  saveCart();
  displayCartCounter();
}

displayCartCounter();
