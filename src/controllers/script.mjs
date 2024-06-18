import Graph from "../models/Graph.mjs";

const graph = new Graph();

const addLocation = document.getElementById("addLocation");
const addRuta = document.getElementById("addRoute");
const recorridoProfundidad = document.getElementById("profundidadButton");
const recorridoAnchura = document.getElementById("anchuraButton");
const printRecorrido = document.getElementById("mostrarRecorridos");
const printRecorridoAn = document.getElementById("mostrarRecorridosAn");
const caminoCortoButton = document.getElementById("rutaCorta");
const printRouteCorta = document.getElementById("mostrarCaminoCorto");


addLocation.addEventListener("click", () => {
    const location = document.getElementById("nameLocation").value;
    if (location === '') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Rellene los campos correctamente",
        });
        document.getElementById("nameLocation").value = ''; 
        return;
    }
    
    if (graph.addVertex(location)) {
        Swal.fire("Se registró correctamente", location, "success");
        document.getElementById("nameLocation").value = ''; 
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se logró registrar",
        });
        document.getElementById("nameLocation").value = '';
    }
});


addRuta.addEventListener("click", () => {
    const inicioLocation = document.getElementById("startLocation").value;
    const finalLocation = document.getElementById("endLocation").value;
    const distance = parseInt(document.getElementById("cuadrasDistance").value);
    
    if (graph.addEdge(inicioLocation, finalLocation, distance)) {
        Swal.fire("Ruta agregada");
        document.getElementById("startLocation").value = ''; 
        document.getElementById("endLocation").value = '';   
        document.getElementById("cuadrasDistance").value = ''; 
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo agregar la ruta, rellene los campos correctamente",
        });
        document.getElementById("startLocation").value = ''; 
        document.getElementById("endLocation").value = '';   
        document.getElementById("cuadrasDistance").value = ''; 
    }
});


recorridoProfundidad.addEventListener("click", () => {
    printRecorrido.innerHTML = '';
    
    const vertices = [...graph.getVertices()][0];
    if (vertices) {
        graph.dfs(vertices, (vertex) => {
            printRecorrido.innerHTML += `${vertex} `;
        });
        Swal.fire("Los locales/lugares son: ");
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No hay vértices disponibles",
        });
    }
});

recorridoAnchura.addEventListener("click", () => {
    printRecorridoAn.innerHTML = '';
    
    const vertices = [...graph.getVertices()][0];
    if (vertices) {
        graph.bfs(vertices, (vertex) => {
            printRecorridoAn.innerHTML += `${vertex} `;
        });
        Swal.fire("Los locales/lugares son: ");
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No hay vértices disponibles",
        });
    }
});


caminoCortoButton.addEventListener("click", () => {
    let origen = document.getElementById("inicioLocation").value.trim();
    let destino = document.getElementById("destinoLocation").value.trim();

    if (origen === '' || destino === '') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Debes ingresar nodos válidos para calcular el camino más corto.",
        });
        document.getElementById("inicioLocation").value = ''; 
        document.getElementById("destinoLocation").value = ''; 
        return;
    }

    const distance = graph.dijkstra(origen, destino);

    if (distance === 1000000) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se encontro ningun camino",
        });
    } else {
        printRouteCorta.innerHTML = `La ruta más corta es ${distance}`;
        Swal.fire({
            icon: "info",
            text: "Ya puede ver la ruta más corta",
        });
    }

    document.getElementById("inicioLocation").value = '';
    document.getElementById("destinoLocation").value = '';
});
