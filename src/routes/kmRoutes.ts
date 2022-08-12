import {Router} from 'express';
import {kmController} from '../controllers/kmController';

class KmRoutes {
    public router: Router = Router();

    // constructor de la clase
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', kmController.homePage);
        this.router.post('/save', kmController.saveData);
        this.router.get('/chartPage', kmController.chartsPage);
        this.router.post('/chartPage/chartDraw', kmController.chartData);
    }
}

const kmRoutes = new KmRoutes();
export default kmRoutes.router;