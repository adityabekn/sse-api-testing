const express = require("express");
const app = express();
const router = express.Router();
// const sseExpress = require('sse-express')


router.route("/").get((req, res) => {
  try {
    app.emit("message", Math.random());
    return res.send({ msg: "Hello" });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ msg: "Error" });
  }
});

router.route('/stream').get((req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

    app.on("message", (data) => {
    res.write(`event: message\n`);
    res.write(`data: ${JSON.stringify(data)}\n`);
    res.write("\n\n");
  });
})

// app.get("/stream", (req, res) => {
//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");
//   res.setHeader("X-Accel-Buffering", "no");
//   // res.setHeader("Transfer-Encoding", "gzip");
//   // res.setHeader('X-Requested-With', 'XMLHttpRequest');
//
//   app.on("message", (data) => {
//     res.write(`event: message\n`);
//     res.write(`data: ${JSON.stringify(data)}\n`);
//     res.write("\n\n");
//   });
// });

// router.route("/stream").get((req, res) => {
//   res.set({
//     "Content-Type": "text/event-stream",
//     "Cache-Control": "no-cache",
//     Connection: "keep-alive",
//   });
//   res.flushHeaders();
//   app.on("message", (data) => {
//     res.write(`data: ${data}\n\n`);
//   });
// });

// app.get("/stream", function (req, res) {
//   res.sse("update", {
//     welcomeMsg: "Hello World",
//   });
// });

module.exports = router;
