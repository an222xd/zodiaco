"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// imports
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
// routes
const kmRoutes_1 = __importDefault(require("./routes/kmRoutes"));
class Server {
    // constructor de la clase
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.engine('handlebars', express_handlebars_1.default({ defaultLayout: 'main' }));
        this.app.set('view engine', 'handlebars');
        this.app.set('port', process.env.PORT || 3000);
        this.app.set('views', path_1.default.join(__dirname, 'views'));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
        this.app.use(morgan_1.default("dev"));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', kmRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
