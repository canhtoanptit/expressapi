/**
 * Created by DELL on 5/10/2017.
 */
var amqp = require('amqplib/callback_api')

amqp.connect('amqp://mqadmin:mqadminpassword@192.168.83.128:5672', function (err, conn) {
    if (err) {
        console.log(err)
        return
    }

    conn.createChannel(function (err, channel) {
        var queue = 'hello'

        channel.assertQueue(queue, {durable: false})

        for (var i = 0; i< 10000; i++) {
            channel.sendToQueue(queue, new Buffer('Hello World' + i))
        }
        console.log("[x] Sent 'Hello World")
    })


    setTimeout(function() { conn.close(); process.exit(0) }, 500)
})
