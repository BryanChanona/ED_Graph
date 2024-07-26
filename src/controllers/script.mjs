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
    printRecorrido.innerHTML='';
    const vertices=[...graph.getVertices()][0]
    graph.dfs(vertices,(vertex) => {
        printRecorrido.innerHTML += `${vertex} `
        console.log(vertex)

    });
    Swal.fire("Ahora puede ver las terminales");




});
document.addEventListener('DOMContentLoaded',()=> {
    recorridoAnchura.addEventListener("click", () => {


        printRecorridoAn.innerHTML='';
        
        const vertices=[...graph.getVertices()][0]
        graph.bfs(vertices,(vertex) => {
            printRecorridoAn.innerHTML += `${vertex} `
            console.log(vertex)
    
        });
        Swal.fire("Ahora puede ver las terminales");
    
    
    });


});


caminoCortoButton.addEventListener("click", ()  => {
   
    let origen =document.getElementById("inicioLocation").value.trim();
    let destino = document.getElementById("destinoLocation").value.trim();

    const shortestDistance = graph.dijkstra(origen, destino);

    if (shortestDistance === 1000000) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se encontro ningun camino",
        });
    } else {
        printRouteCorta.innerHTML = ` La ruta mas corta es ${shortestDistance} ` ;
        Swal.fire({
            icon: "info",
            text: "Ya puede ver la ruta mas corta"
            
        })
    }
});
