const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");

const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");

const displayCart = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "block";

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
  if (cart.length > 0) {
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
        </div>
      `;
      modalContainer.append(modalBody);

      const decrese = modalBody.querySelector(".quantity-btn-decrese");
      decrese.addEventListener("click", () => {
        if (productos.cantidad !== 1) {
          productos.cantidad--;
          displayCart();
          displayCartCounter();
        }
      });

      const increse = modalBody.querySelector(".quantity-btn-increse");
      increse.addEventListener("click", () => {
        productos.cantidad++;
        displayCart();
        displayCartCounter();
      });

      /* Delete */
      const deleteProduct = modalBody.querySelector(".delete-product");
      deleteProduct.addEventListener("click", () => {
        deleteCartProduct(productos.id);
        displayCartCounter();
      });
    });

    /* Modal footer */
    const total = cart.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
    modalFooter.innerHTML = `
      <div class="total-price">Total: ${total}</div>
      <button class="btn-primary" id="checkout-btn">Ir al checkout</button>
      <div id="button-checkout"></div>
    `;
    modalContainer.append(modalFooter);

    /* MP */
    const mercadopago = new MercadoPago(
      "APP_USR-cd12f9b8-191a-48c9-a6e6-48c8f2f29fbf",
      { locale: "es-AR" }
    );

    const checkoutButton = modalFooter.querySelector("#checkout-btn");
    checkoutButton.addEventListener("click", function () {
      checkoutButton.remove();

      const orderData = {
        quantity: 1,
        description: "compra de ecommerce",
        price: total,
      };

      fetch("http://localhost:8080/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => response.json())
    .then((preference) => {
      console.log("Respuesta backend:", preference); // 
      if (preference.id) {
        createCheckoutButton(preference.id || preference.body?.id);
      } else {
        alert("No se recibió preferenceId");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Unexpected error");
    });
});

    function createCheckoutButton(preferenceId) {
      const brickBuilder = mercadopago.bricks();
      const renderComponent = async (brickBuilder) => {
        await brickBuilder.create("wallet", "button-checkout", {
          initialization: {
            preferenceId: preferenceId,
            redirectMode: 'modal',
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
  const foundId = cart.findIndex((element) => element.id === id);
  cart.splice(foundId, 1);
  displayCart();
  displayCartCounter();
};

const displayCartCounter = () => {
  const cartLength = cart.reduce((acc, el) => acc + el.cantidad, 0);
  if (cartLength > 0) {
    cartCounter.style.display = "block";
    cartCounter.innerText = cartLength;
  } else {
    cartCounter.style.display = "none";
  }
};
