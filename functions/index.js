const functions = require("firebase-functions");
const next = require("next");

const isDev = process.env.NODE_ENV !== "production";
const nextApp = next({
  dev: isDev,
  conf: { distDir: ".next" }
});

const handle = nextApp.getRequestHandler();

exports.nextApp = functions.https.onRequest(async (req, res) => {
  try {
    await nextApp.prepare();
    handle(req, res);
  } catch (error) {
    console.error("Error handling the request", error);
    res.status(500).send("Internal Server Error");
  }
});

