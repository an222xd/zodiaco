// imports
import path from 'path';
import morgan from 'morgan';
require('dotenv').config();
import express, {Application} from 'express';
import exphbs from 'express-handlebars';


// routes
import kmRoutes from './routes/kmRoutes';

class Server {

    public app: Application;

    // constructor de la clase
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.engine('handlebars', exphbs({defaultLayout: 'main'}));
        this.app.set('view engine', 'handlebars');
        this.app.set('port', process.env.PORT || 3000);
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.use('/', kmRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));

        });
    }
}

const server = new Server();
server.start();