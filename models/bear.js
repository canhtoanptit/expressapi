/**
 * Created by ToanNC on 5/3/2017.
 */
var mongose = require('mongoose')
var Schema = mongose.Schema

var BearSchema = new Schema(
    {
        name: String
    }
)

module.exports = mongose.model('Bear', BearSchema)