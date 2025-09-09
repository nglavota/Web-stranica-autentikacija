const express = require("express");
const path = require("path"); 
const app = express();

app.use(express.static(path.join(__dirname, '..', 'projekt_stranica')));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const body_parser = require("body-parser");
app.use(body_parser.json());

// učitavanje podataka iz datoteke
let k = require("./korisnici");

// ---------------------- GET SVI KORISNICI ----------------------
app.get("/korisnici", (req, res) => {
  res.send(k);
});

// ---------------------- LOGIN ----------------------
app.post("/korisnici", (req, res) => {
  const { korisnik, lozinka } = req.body;

  const user = k.find(u => u.korisnik === korisnik && u.lozinka === lozinka);

  if (user) {
    res.status(200).json({ message: "Uspjesno!", userId: user.id });
    console.log("Uspjeli ste se prijaviti!");
  } else {
    res.status(401).json({ message: "Neispravno korisničko ime ili lozinka!" });
    console.log("Neispravno korisničko ime ili lozinka!");
  }
});

// ---------------------- REGISTRACIJA ----------------------
app.post("/korisnici/register", (req, res) => {
  const { korisnik, lozinka } = req.body;

  if (k.find(u => u.korisnik === korisnik)) {
    return res.status(400).json({ message: "Korisnik već postoji!" });
  }

  const noviKorisnik = {
    id: k.length + 1,
    korisnik,
    lozinka
  };

  k.push(noviKorisnik);
  res.status(201).json({ message: "Korisnik registriran!" });
  console.log("Korisnik registriran:", korisnik);
});


app.listen(4000, () => console.log("Server sluša port 4000!"));
