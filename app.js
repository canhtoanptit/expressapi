/**
 * Created by ToanNC on 5/3/2017.
 */
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose   = require('mongoose')
var Bear     = require('./models/bear')

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

mongoose.Promise = global.Promise
mongoose.connect('mongodb://192.168.8.202:27017/mydb')

var port = 3000

var router = express.Router()

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function (req, res) {
    res.json({ message: 'Hahah how are you!' })
})

app.use('/api', router)

router.route('/bears')
    .post(function (req, res) {
        var bear = new Bear()
        bear.name = req.body.name

        bear.save(function (err) {
            if (err) {
                res.send(err)
            } else {
                res.json({
                    message: 'Bear created'
                })
            }
        })
    })
    .get(function (req, res) {
        Bear.find(function (err, bears) {
            if (err) {
                res.sendStatus(404)
            } else {
                res.sendStatus(404)
                //res.json(bears)
            }
        })
    })

router.route('/bears/:bear_id')
    .get(function (req, res) {
        Bear.findById(req.params.bear_id, function (err, bear) {
            if (err) {
                res.send(err)
            } else {
                res.json(bear)
            }
        })
    })
    .put(function (req, res) {
        Bear.findById(req.params.bear_id, function (err, bear) {
            if (err) {
                res.send(err)
            } else {
                bear.name = req.body.name
                bear.save(function (err) {
                    if (err) {
                        res.send(err)
                    } else {
                        res.json(
                            {
                                message: 'Bear updated'
                            }
                        )
                    }

                })
            }
        })
    })
    .delete(function (req, res) {
        Bear.remove({_id: req.params.bear_id}, function (err, bear) {
            if (err) {
                res.send(err)
            } else {
                res.json({
                    message: 'Successful delete'
                })
            }
        })
    })

app.listen(port, function () {
    console.log('Example app listening on port 3000!')
})