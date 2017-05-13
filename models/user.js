/**
 * Created by DELL on 5/9/2017.
 */
var mongose = require('mongoose')
var Schema = mongose.Schema

var UserSchema = new Schema(
    {
        user_name: String,
        password: String
    }
)

module.exports = mongose.model('User', UserSchema)