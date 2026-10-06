const spisok = document.getElementById("bouquet-list");

const spisokKorziny = document.getElementById("cart-list");
const blokKorziny = document.getElementById("cart");
const knopkaKorziny = document.getElementById("cart-button");
const zakrytKorzinu = document.getElementById("close-cart");
const schetchik = document.getElementById("cart-count");
const itogo = document.getElementById("cart-total");

const knopkaZakaza = document.getElementById("order-button");
const modalZakaza = document.getElementById("order-modal");
const zakrytZakaz = document.getElementById("order-close");
const formaZakaza = document.getElementById("order-form");
const soobshenieZakaza = document.getElementById("order-message");

const sohranennayaKorzina = localStorage.getItem("korzina");
const korzina = sohranennayaKorzina
    ? JSON.parse(sohranennayaKorzina)
    : [];


function pokazatBukety() {
    bukety.forEach(function (buket) {
        const kartochka = document.createElement("article");
        kartochka.classList.add("bouquet-card");

        const foto = document.createElement("img");
        foto.src = buket.image;
        foto.alt = buket.name;

        const nazvanie = document.createElement("h2");
        nazvanie.textContent = buket.name;

        const cena = document.createElement("p");
        cena.textContent =
            buket.price.toLocaleString("ru-RU") + " ₽";

        const knopka = document.createElement("button");
        knopka.type = "button";
        knopka.textContent = "Добавить в корзину";
        knopka.classList.add("add-button");

        knopka.addEventListener("click", function () {
            dobavitVKorzinu(buket.id);
        });

        kartochka.append(foto);
        kartochka.append(nazvanie);
        kartochka.append(cena);
        kartochka.append(knopka);

        spisok.append(kartochka);
    });
}


function sohranitKorzinu() {
    localStorage.setItem(
        "korzina",
        JSON.stringify(korzina)
    );
}


function dobavitVKorzinu(id) {
    const tovar = korzina.find(function (element) {
        return element.id === id;
    });

    if (tovar) {
        tovar.kolvo = tovar.kolvo + 1;
    } else {
        const buket = bukety.find(function (element) {
            return element.id === id;
        });

        korzina.push({
            id: buket.id,
            name: buket.name,
            price: buket.price,
            kolvo: 1
        });
    }

    sohranitKorzinu();
    pokazatKorzinu();
}


function pokazatKorzinu() {
    spisokKorziny.replaceChildren();

    let summa = 0;
    let kolvo = 0;

    korzina.forEach(function (tovar) {
        const blok = document.createElement("div");
        blok.classList.add("cart-item");

        const nazvanie = document.createElement("p");
        nazvanie.textContent = tovar.name;

        const cena = document.createElement("p");
        cena.textContent =
            (tovar.price * tovar.kolvo)
                .toLocaleString("ru-RU") + " ₽";

        const upravlenie = document.createElement("div");
        upravlenie.classList.add("cart-controls");

        const minus = document.createElement("button");
        minus.type = "button";
        minus.textContent = "−";

        minus.addEventListener("click", function () {
            izmenitKolvo(tovar.id, -1);
        });

        const chislo = document.createElement("span");
        chislo.textContent = tovar.kolvo;

        const plus = document.createElement("button");
        plus.type = "button";
        plus.textContent = "+";

        plus.addEventListener("click", function () {
            izmenitKolvo(tovar.id, 1);
        });

        const udalit = document.createElement("button");
        udalit.type = "button";
        udalit.textContent = "Удалить";
        udalit.classList.add("delete-button");

        udalit.addEventListener("click", function () {
            udalitTovar(tovar.id);
        });

        upravlenie.append(minus);
        upravlenie.append(chislo);
        upravlenie.append(plus);

        blok.append(nazvanie);
        blok.append(cena);
        blok.append(upravlenie);
        blok.append(udalit);

        spisokKorziny.append(blok);

        summa = summa + tovar.price * tovar.kolvo;
        kolvo = kolvo + tovar.kolvo;
    });

    schetchik.textContent = kolvo;
    itogo.textContent = summa.toLocaleString("ru-RU");
}


function izmenitKolvo(id, shag) {
    const tovar = korzina.find(function (element) {
        return element.id === id;
    });

    if (!tovar) {
        return;
    }

    tovar.kolvo = tovar.kolvo + shag;

    if (tovar.kolvo <= 0) {
        udalitTovar(id);
        return;
    }

    sohranitKorzinu();
    pokazatKorzinu();
}


function udalitTovar(id) {
    const index = korzina.findIndex(function (element) {
        return element.id === id;
    });

    if (index !== -1) {
        korzina.splice(index, 1);
    }

    sohranitKorzinu();
    pokazatKorzinu();
}



knopkaKorziny.addEventListener("click", function () {
    blokKorziny.classList.add("open");
});



zakrytKorzinu.addEventListener("click", function () {
    blokKorziny.classList.remove("open");
});



knopkaZakaza.addEventListener("click", function () {
    blokKorziny.classList.remove("open");

    modalZakaza.classList.remove("hidden");
    formaZakaza.classList.remove("hidden");
    soobshenieZakaza.classList.add("hidden");
});



zakrytZakaz.addEventListener("click", function () {
    modalZakaza.classList.add("hidden");
});



formaZakaza.addEventListener("submit", function (event) {
    event.preventDefault();

    formaZakaza.classList.add("hidden");
    soobshenieZakaza.classList.remove("hidden");
});


pokazatBukety();
pokazatKorzinu();