# Web stranica - autentikacija korisnika 

Ovaj projekt je jednostavna interaktivna stranica za prijavu i registraciju korisnika. 

## Funkcionalnosti 

- Prijava postojećeg korisnika
- Registracija novog korisnika
- Provjera ispravnosti korisničkog imena i lozinke
- Prikaz poruka o uspješnoj ili neuspješnoj autentikaciji
- Preusmjeravanje nakon uspješne prijave ili registracije
- Podaci o korisnicima pohranjeni su lokalno u `korisnici.js`

## Pokretanje projekta
1. Kloniraj repozitorij i uđi u folder projekt_server:
   
     **git clone https://github.com/nglavota/web-stranica-autentikacija**  
     **cd *web-stranica-autentikacija/projekt_server***
   
2. Instaliraj potrebne pakete:
    
   **npm install**

3. Pokreni server:
  
   **node index.js**  
   Server će slušati na portu 4000.
   
5. Otvori stranicu **pocetna.html** putem poveznice **http://localhost:4000/pocetna.html** u pregledniku i klikom na gumb prijeći ćeš na stranicu s mogućnostima prijave ili registracije.
