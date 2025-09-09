const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// Funkcija za validaciju korisničkog imena
function validirajKorisnika(kor) 
{
    return kor.length >= 6 && !kor.includes(' ');
}

// Funkcija za validaciju lozinke
function validirajLozinku(lozinka) 
{
    return lozinka.length >= 6 && lozinka[0] === lozinka[0].toUpperCase();
}

// Funkcija za prikaz poruke
function prikaziPoruku(id, poruka, tip) 
{
    const output = document.getElementById(id);
    output.textContent = poruka;
    output.className = `output ${tip}`; 
}

// PRIJAVA 
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const kor = loginForm.korisnik.value;
    const lozinka = loginForm.lozinka.value;

    if (!validirajKorisnika(kor)) 
    {
        prikaziPoruku("outputLogin", "Neispravno korisničko ime! Mora biti dulje od 5 znakova i bez razmaka.", "error");
        return;
    }

    if (!validirajLozinku(lozinka)) 
    {
        prikaziPoruku("outputLogin", "Neispravna lozinka! Mora početi velikim slovom i imati barem 6 znakova.", "error");
        return;
    }

    try 
    {
        const res = await fetch("http://localhost:4000/korisnici", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ korisnik: kor, lozinka: lozinka })
        });

        const result = await res.json();

        if (res.ok) 
        {
            prikaziPoruku("outputLogin", "Prijava uspješna! Dobrodošli, " + kor, "success");
            localStorage.setItem("prijavljeniKorisnik", kor);
            setTimeout(() => window.location.href = "stranica.html", 1500);
        } 
        else 
        {
            prikaziPoruku("outputLogin", result.message, "error");
        }
    } catch (err) {
        console.error(err);
        prikaziPoruku("outputLogin", "Greška prilikom prijave!", "error");
    }
});

// REGISTRACIJA 
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const kor = registerForm.korisnik.value;
    const lozinka = registerForm.lozinka.value;

    if (!validirajKorisnika(kor)) 
    {
        prikaziPoruku("outputRegister", "Neispravno korisničko ime! Mora biti dulje od 5 znakova i bez razmaka.", "error");
        return;
    }

    if (!validirajLozinku(lozinka)) 
    {
        prikaziPoruku("outputRegister", "Neispravna lozinka! Mora početi velikim slovom i imati barem 6 znakova.", "error");
        return;
    }

    try 
    {
        const res = await fetch("http://localhost:4000/korisnici/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ korisnik: kor, lozinka: lozinka })
        });

        const result = await res.json();

        if (res.ok) 
        {
            prikaziPoruku("outputRegister", "Registracija uspješna! Dobrodošli, " + kor, "success");
            localStorage.setItem("prijavljeniKorisnik", kor);
            setTimeout(() => window.location.href = "stranica.html", 1500);
        } 
        else 
        {
            prikaziPoruku("outputRegister", result.message, "error");
        }
    } catch (err) {
        console.error(err);
        prikaziPoruku("outputRegister", "Greška prilikom registracije!", "error");
    }
});
