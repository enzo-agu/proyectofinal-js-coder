function tuCategoria() {
    const peso = parseInt(prompt('Ingrese su peso: '));
    switch (true) {
        case (peso >= 48 && peso <= 52):
            swal({
                title: "Categoría",
                text: "Paja",
                icon: "info",
            })
            console.log(peso + "kg");
            break;

        case (peso >= 53 && peso <= 58):
            swal({
                title: "Categoría",
                text: "Mosca",
                icon: "info",
            })
            console.log(peso + "kg");
            break;

        case (peso >= 59 && peso <= 64):
            swal({
                title: "Categoría",
                text: "Gallo",
                icon: "info",
            })
            console.log(peso + "kg");
            break;

        case (peso >= 65 && peso <= 70):
            swal({
                title: "Categoría",
                text: "Pluma",
                icon: "info",
            })
            console.log(peso + "kg");
            break;
        case (peso >= 71 && peso <= 76):
            swal({
                title: "Categoría",
                text: "Liviano",
                icon: "info",
            })
            console.log(peso + "kg");
            break;
        case (peso >= 77 && peso <= 82):
            swal({
                title: "Categoría",
                text: "Welter",
                icon: "info",
            })
            console.log(peso + "kg");
            break;
        case (peso >= 83 && peso <= 88):
            swal({
                title: "Categoría",
                text: "Mediano",
                icon: "info",
            })
            console.log(peso + "kg");
            break;
        case (peso >= 89 && peso <= 94):
            swal({
                title: "Categoría",
                text: "Mediano-Pesado",
                icon: "info",
            })
            console.log(peso + "kg");
            break;
        case (peso >= 95 && peso <= 100):
            swal({
                title: "Categoría",
                text: "Pesado",
                icon: "info",
            })
            console.log(peso + "kg");
            break;
        case (peso >= 100):
            swal({
                title: "Categoría",
                text: "Pesadisimo",
                icon: "info",
            })
            console.log(peso + "kg");
            break;
        default:
            swal({

                text: "Ingresa tu peso para conocer tu categoría",
                icon: "error",
            })
            break;
    }
}


function crearBotontuCategoria() {
    const element = document.getElementById('categorias');
    const btn = document.createElement("input");
    btn.type = "button";
    btn.value = "Conoces tu categoria?";
    btn.onclick = tuCategoria;//sin parentesis para que no se ejecute al momento
    element.appendChild(btn);
}

crearBotontuCategoria();


