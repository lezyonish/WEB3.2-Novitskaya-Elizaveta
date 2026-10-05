const spisok = document.getElementById("bouquet-list");
const spisokKorziny = document.getElementById("cart-list");
const schetchik = document.getElementById("cart-count");
const itogo = document.getElementById("cart-total");
const korzina = [];

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
        cena.textContent = buket.price.toLocaleString("ru-RU") + " ₽";

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

    pokazatKorzinu();
}

function pokazatKorzinu() {
    spisokKorziny.replaceChildren();

    let summa = 0;
    let kolvo = 0;

    korzina.forEach(function (tovar) {
        const stroka = document.createElement("p");

        const summaTovara = tovar.price * tovar.kolvo;

        stroka.textContent =
            tovar.name +
            " × " +
            tovar.kolvo +
            " — " +
            summaTovara.toLocaleString("ru-RU") +
            " ₽";

        spisokKorziny.append(stroka);

        summa = summa + summaTovara;
        kolvo = kolvo + tovar.kolvo;
    });

    schetchik.textContent = kolvo;
    itogo.textContent = summa.toLocaleString("ru-RU");
}

pokazatBukety();