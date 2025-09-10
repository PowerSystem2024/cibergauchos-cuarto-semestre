const express = require("express");
const app = express();
const cors = require("cors");
const { MercadoPagoConfig, Preference } = require("mercadopago");
const path = require("path");

// REPLACE WITH YOUR ACCESS TOKEN
const client = new MercadoPagoConfig({
  accessToken: "APP_USR-3824982672945110-090822-2f41b9db1ec9fcb1b617f9aeb2b428e3-2681256372" // poné tu access token real
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client")));
app.use(cors());

// Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client/media", "index.html"));
});

// Crear preferencia
app.post("/create_preference", async (req, res) => {
  try {
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title: req.body.description,
            unit_price: Number(req.body.price),
            quantity: Number(req.body.quantity),
          },
        ],
        back_urls: {
          /*success: "http://localhost:8080/success",*/
          failure: "http://localhost:8080/failure",
          pending: "http://localhost:8080",
        },
        /*auto_return: "approved",*/
      },
    });

    res.json({ id: result.id || result.body.id  });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Feedback de pago
app.get("/feedback", (req, res) => {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

app.listen(8080, () => {
  console.log("Servidor corriendo en http://localhost:8080");
});
