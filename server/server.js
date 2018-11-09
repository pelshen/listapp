import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Item from './models/Item';
import config from './config';

const app = express();
const router = express.Router();
app.use(cors());
app.use(bodyParser.json());
let dbUri = 'mongodb://' + config.db.username + ':' + config.db.password + '@' + config.db.host + ':' + config.db.port + '/' + config.db.name;
mongoose.connect(dbUri, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

// get list of items
router.route('/items').get((req, res) => {
    Item.find({}, (err, items) => {
        if (err)
            console.log(err);
        else
            res.json(items);
    });
});

// get single item
router.route('/items/:id').get((req, res) => {
    Item.findById(req.params.id, (err, item) => {
        if (err)
            console.log(err);
        else
            res.json(item);
    });
});

// add a new item
router.route('/items/add').post((req, res) => {
    let item = new Item(req.body);
    item.save()
        .then(item => {
            res.status(200).json({'item': item, 'status': 'success'});
        })
        .catch(err => {
            res.status(400).send({'item': item, 'status': 'failed'});
        });
});

// update an existing item
router.route('/items/update/:id').post((req, res) => {
    Item.findById(req.params.id, (err, item) => {
        if (!item)
            return next(new Error('Could not load Document'));
        else {
            item.name = req.body.name;
            item.description = req.body.description;
            item.keywords = req.body.keywords;
            item.save().then(item => {
                res.status(200).json({'item': item, 'status': 'success'});
            }).catch(err => {
                res.status(400).send({'item': item, 'status': 'failed'});
            });
        }
    });
});

// delete an item
router.route('/items/delete/:id').delete((req, res) => {
    Item.findByIdAndRemove({_id: req.params.id}, (err, item) => {
        if (err)
            res.json({'item': item, 'status': 'failed'});
        else
            res.json({'item': item, 'status': 'success'});
    });
});

app.use('/', router);
app.listen(config.app.port, () => console.log(`Express server running on port ` + config.app.port));
