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

// Add Location Event Listener
addLocation.addEventListener("click", () => {
    const location = document.getElementById("nameLocation").value;
    
    if (graph.addVertex(location)) {
        Swal.fire("Se registró correctamente", location, "success");
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se logró registrar",
        });
    }
});

// Add Route Event Listener
addRuta.addEventListener("click", () => {
    const inicioLocation = document.getElementById("startLocation").value;
    const finalLocation = document.getElementById("endLocation").value;
    const distance = parseInt(document.getElementById("cuadrasDistance").value);
    
    if (graph.addEdge(inicioLocation, finalLocation, distance)) {
        Swal.fire("Ruta agregada");
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo agregar la ruta",
        });
    }
});

// Depth-First Search (DFS) Event Listener
recorridoProfundidad.addEventListener("click", () => {
    printRecorrido.innerHTML = '';
    
    const vertices = [...graph.getVertices()][0];
    if (vertices) {
        graph.dfs(vertices, (vertex) => {
            printRecorrido.innerHTML += `${vertex} `;
        });
        Swal.fire("Ahora puede ver las terminales");
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No hay vértices disponibles",
        });
    }
});

// Breadth-First Search (BFS) Event Listener
recorridoAnchura.addEventListener("click", () => {
    printRecorridoAn.innerHTML = '';
    
    const vertices = [...graph.getVertices()][0];
    if (vertices) {
        graph.bfs(vertices, (vertex) => {
            printRecorridoAn.innerHTML += `${vertex} `;
        });
        Swal.fire("Ahora puede ver las terminales");
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
});
