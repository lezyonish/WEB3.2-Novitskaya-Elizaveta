const spisok = document.getElementById("bouquet-list");

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

        kartochka.append(foto);
        kartochka.append(nazvanie);
        kartochka.append(cena);
        kartochka.append(knopka);

        spisok.append(kartochka);
    });
}

pokazatBukety();