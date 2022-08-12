"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const kmController_1 = require("../controllers/kmController");
class KmRoutes {
    // constructor de la clase
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', kmController_1.kmController.homePage);
        this.router.post('/save', kmController_1.kmController.saveData);
        this.router.get('/chartPage', kmController_1.kmController.chartsPage);
        this.router.post('/chartPage/chartDraw', kmController_1.kmController.chartData);
        //this.router.get('/todo', kmController_1.kmController.todo);
    }
}
const kmRoutes = new KmRoutes();
exports.default = kmRoutes.router;
