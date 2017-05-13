/**
 * Created by DELL on 5/10/2017.
 */
var amqp = require('amqplib/callback_api')

amqp.connect('amqp://mqadmin:mqadminpassword@192.168.83.128:5672', function(err, conn) {
    conn.createChannel(function(err, ch) {
        var q = 'hello'

        ch.assertQueue(q, {durable: false})
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {noAck: true});
    })
})