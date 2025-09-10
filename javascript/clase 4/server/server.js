const express = require("express");
const app = express();
const cors = require("cors");
const { MercadoPagoConfig, Preference } = require("mercadopago");
const path = require("path");
require("dotenv").config();

// Configuración Mercado Pago usando variables de entorno
if (!process.env.MP_ACCESS_TOKEN) {
  console.warn("[WARN] MP_ACCESS_TOKEN no definido. Creá un archivo .env basado en .env.example");
}
if (!process.env.MP_PUBLIC_KEY) {
  console.warn("[WARN] MP_PUBLIC_KEY no definido. Creá un archivo .env basado en .env.example");
}

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || "" // vacío si falta (se mostrará warning arriba)
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Logging básico de cada request
app.use((req, _res, next) => {
  console.log(`[REQ] ${req.method} ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, "../client")));
app.use(cors());

// Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client/media", "index.html"));
});

// Endpoint para exponer la public key al frontend de forma segura
app.get("/config", (req, res) => {
  res.json({ publicKey: process.env.MP_PUBLIC_KEY || null });
});

// Crear preferencia
app.post("/create_preference", async (req, res) => {
  try {
    const { items, description, price, quantity } = req.body;
    if (!process.env.MP_ACCESS_TOKEN) {
      return res.status(500).json({ error: "Access token ausente en el servidor" });
    }
    if(!items && (!price || !description)){
      console.log('[MP] Payload incompleto recibido:', req.body);
    }
    const preference = new Preference(client);

  // Construir base URL dinámico (soporta localhost u otro host)
  const baseUrl = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get('host')}`;

    const bodyItems = Array.isArray(items) && items.length > 0 ? items : [
      {
        title: description || "Compra Tienda Cibergauchos",
        unit_price: Number(price),
        quantity: Number(quantity) || 1,
        currency_id: "ARS"
      }
    ];

    const backUrls = {
      success: `${baseUrl}/media/success.html`,
      failure: `${baseUrl}/media/failure.html`,
      pending: `${baseUrl}/media/pending.html`
    };

    // Validar success para auto_return; si falta, no enviar auto_return
    const preferenceBody = {
      items: bodyItems,
      back_urls: backUrls
      // auto_return removido temporalmente mientras resolvemos error invalid_auto_return
    };

    console.log('[MP] Creando preferencia con body:', JSON.stringify(preferenceBody, null, 2));

    const result = await preference.create({ body: preferenceBody });
    const preferenceId = result?.id || result?.body?.id;
    console.log("[MP] Preferencia creada:", { preferenceId, rawKeys: Object.keys(result || {}) });
    if (!preferenceId) {
      return res.status(500).json({ error: "No se obtuvo preference id", raw: result });
    }
    res.json({ id: preferenceId });
  } catch (error) {
    console.error("[MP] Error creando preferencia:", error?.message, error);
    res.status(500).json({ error: error?.message || 'error desconocido', stack: error?.stack });
  }
});

// Middleware final para 404 API
app.use((req, res, next) => {
  if (req.method !== 'GET') {
    console.warn(`[WARN] Ruta no encontrada: ${req.method} ${req.url}`);
  }
  return next(); // permitir que static sirva GETs restantes
});

// Feedback de pago
app.get("/feedback", (req, res) => {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor Tienda Cibergauchos corriendo en http://localhost:${PORT}`);
});
