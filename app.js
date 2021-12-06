import express from 'express';
import Handlebars from 'handlebars';
import { engine } from 'express-handlebars';

import registerComponentHelpers from './components/index.js';

registerComponentHelpers(Handlebars).then(() => {
    const app = express();
    const handlebarsEngine = engine({ Handlebars, extname: '.hbs' });
    app.engine('hbs', handlebarsEngine);
    app.set('view engine', 'hbs');
    app.set('views', './views');

    app.get('/', (req, res) => {
        res.render('home');
    });

    app.listen(3000);
});