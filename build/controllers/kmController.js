"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kmController = void 0;
const kmDAO_1 = require("../dao/kmDAO");
let clusterMaker = require('clusters');
class KmController {
    // redireccion a pagina encuesta
    homePage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('index');
        });
    }
    // redireccion pagina de grafica
    chartsPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // opciones con el nombre identico al de las tablas
            const options = [
                { option: 'Mes', name: 'Signo zodiacal' },
                { option: 'Ego', name: 'Genero de musica' },
                { option: 'Impulsivo', name: 'Edad' },
                { option: 'Dinero', name: 'Sueldo' },
                { option: 'Razon', name: 'Parejas Amorosas' }
            ];
            // atraer cuantos datos existen
            const countData = yield kmDAO_1.dao.countData();
            //console.log(countData);
            const dataC = countData[0].count;
            // redireccion
            res.render('kmeans', { options, dataC });
        });
    }
    // metodo para tratado de datos con KMeans y armado de grafica
    chartData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // obtener datos de la peticion
            const x = req.body.x;
            const y = req.body.y;
            const k = req.body.k;
            // obtener datos por columnas seleccionadas
            const response = yield kmDAO_1.dao.getData(x, y);
            //console.log(response);
            
            // verificar existencia de datos
            if (response.length > 0) {
                // declarar variables para sepracion de X Y
                let xA = [];
                let yA = [];
                // extraer datos de acuerdo a columna seleccionada en x
                switch (x) {
                    case 'Mes': {
                        for (let i = 0; i < response.length; i++) {
                            xA.push(response[i].Mes);
                        }
                    }
                        break;
                    case 'Ego': {
                        for (let i = 0; i < response.length; i++) {
                            xA.push(response[i].Ego);
                        }
                    }
                        break;
                    case 'Impulsivo': {
                        for (let i = 0; i < response.length; i++) {
                            xA.push(response[i].Impulsivo);
                        }
                    }
                        break;
                    case 'Dinero': {
                        for (let i = 0; i < response.length; i++) {
                            xA.push(response[i].Dinero);
                        }
                    }
                        break;
                    case 'Razon': {
                        for (let i = 0; i < response.length; i++) {
                            xA.push(response[i].Razon);
                        }
                    }
                        break;
                }
    
                // extraer datos de acuerdo a columna seleccionada en y
                switch (y) {
                    case 'Mes': {
                        for (let i = 0; i < response.length; i++) {
                            yA.push(response[i].Mes);
                        }
                    }
                        break;
                    case 'Ego': {
                        for (let i = 0; i < response.length; i++) {
                            yA.push(response[i].Ego);
                        }
                    }
                        break;
                    case 'Impulsivo': {
                        for (let i = 0; i < response.length; i++) {
                            yA.push(response[i].Impulsivo);
                        }
                    }
                        break;
                    case 'Dinero': {
                        for (let i = 0; i < response.length; i++) {
                            yA.push(response[i].Dinero);
                        }
                    }
                        break;
                    case 'Razon': {
                        for (let i = 0; i < response.length; i++) {
                            yA.push(response[i].Razon);
                        }
                    }
                        break;
                }
                // funcion para scalar valores en x
                //console.log(xA);
                let resX = [];
                let maxRangeX = Math.max.apply(Math, xA);
                let minRangeX = Math.min.apply(Math, xA);
                for (let i = 0; i < xA.length; i++) {
                    let unscaled = xA[i];
                    let scaled = (10 - 0.1) * (unscaled - minRangeX) / (maxRangeX - minRangeX) + 0.1;
                    resX.push(scaled);
                }
                // funcion para scalar valores en y
                let resY = [];
                let maxRangeY = Math.max.apply(Math, yA);
                let minRangeY = Math.min.apply(Math, yA);
                for (let i = 0; i < yA.length; i++) {
                    let unscaled = yA[i];
                    let scaled = (10 - 0.1) * (unscaled - minRangeY) / (maxRangeY - minRangeY) + 0.1;
                    resY.push(scaled);
                }
                // conformar valores para entedimiento de libreria de KMeans
                let dataOre = [];
                for (let i = 0; i < resX.length; i++) {
                    dataOre.push([resX[i], resY[i]]);
                }
                // declaracion de clusters
                clusterMaker.k(k);
                // declaracion de iteraciones
                clusterMaker.iterations(750);
                // insercion de datos a algoritmo
                clusterMaker.data(dataOre);
                // ejecucion y guardado de respuesta de algoritmos
                let cluster = clusterMaker.clusters();
                // verificar datos obtenidos
                if (cluster.length > 0) {
                    // variable que tendra los puntos a graficar
                    let dataDraw = [];
                    // ciclo para iterar por clusters
                    for (let i = 0; i < cluster.length; i++) {
                        // variable que tendra el formato de puntos para la graficacion
                        let dataCluster = [];
                        // ciclo que recorre los puntos del cluster seleccionado
                        for (let i2 = 0; i2 < cluster[i].points.length; i2++) {
                            // insercion de los puntos con formato
                            dataCluster.push({ x: cluster[i].points[i2][0], y: cluster[i].points[i2][1] });
                        }
                        // insercion de puntos por cluster para graficar
                        dataDraw.push({
                            type: "scatter",
                            toolTipContent: `<span style=\"color:#4F81BC \"><b>{name}</b></span><br/><b> ${x} </b> {x}<br/><b> ${y} </b></span> {y}`,
                            name: "Cluster " + (i + 1),
                            showInLegend: true,
                            dataPoints: dataCluster
                        });
                    }
                    // ciclo para iterar por cluster (obtener centroides)
                    let dataCentroids = [];
                    for (let i = 0; i < cluster.length; i++) {
                        dataCentroids.push({ x: cluster[i].centroid[0], y: cluster[i].centroid[0] });
                    }
                    // insercion de centroides
                    dataDraw.push({
                        type: "scatter",
                        toolTipContent: `<span style=\"color:#4F81BC \"><b>{name}</b></span><br/><b> ${x} </b> {x}<br/><b> ${y} </b></span> {y}`,
                        name: "Centroide",
                        showInLegend: true,
                        markerType: "triangle",
                        dataPoints: dataCentroids
                    });
                    // datos extras e insercion de puntos cluster (dato para graficar)
                    let dataL = {
                        animationEnabled: true,
                        title: {
                            text: "Datos a gráficar"
                        },
                        axisX: {
                            title: x
                        },
                        axisY: {
                            title: y,
                            includeZero: true
                        },
                        data: dataDraw
                    };
                    // retornar puntos a front
                    return res.status(200).json(dataL);
                }
                else {
                    return res.sendStatus(201);
                }
            }
            else {
                return res.sendStatus(201);
            }
        });
    }
    saveData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // obtener datos de peticion
                const signo = parseInt(req.body.signo);
                const genero = parseInt(req.body.genero);
                const edad = parseInt(req.body.edad);
                const sueldo = parseInt(req.body.sueldo);
                const parejas = parseInt(req.body.parejas);
                // guardar datos en BD
                const response = yield kmDAO_1.dao.saveData(signo, genero, edad, sueldo, parejas);
                // verificar lineas afectadas
                //console.log(response);
                if (response.affectedRows > 0) {
                    return res.sendStatus(200);
                }
                else {
                    return res.sendStatus(201);
                }
            }
            catch (e) {
                return res.sendStatus(502);
            }
        });
    }

}
exports.kmController = new KmController();
