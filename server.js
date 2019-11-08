const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
app.use(express.json({ extended: false }));
app.use(cors());

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.use((req, res, next) => {
  res.status(400).json({ error: "Not Found" });
});

/*
For future use
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ error: { message: error.message } });
});
*/
