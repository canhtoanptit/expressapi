/**
 * Created by DELL on 5/13/2017.
 */
var amqp = require('amqplib/callback_api')
var constants = require('../common/constant')
amqp.connect(constants.rabbitmqHost, function (err, conn) {
    conn.createChannel(function(err, ch) {
        var q = 'task_queue'
        var msg = process.argv.slice(2).join(' ') || "Hello World!"

        ch.assertQueue(q, {durable: true})
        ch.sendToQueue(q, new Buffer(msg), {persistent: true})
        console.log(" [x] Sent '%s'", msg)
    });
    setTimeout(function() { conn.close(); process.exit(0) }, 500)
})