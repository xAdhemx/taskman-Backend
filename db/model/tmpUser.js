const {Schema, model} = require('mongoose')
const validator = require("validator");
const hashedPassword = require("../../utils/hashed_password");
const genToken = require('../../utils/genToken');

const tmpUserSchema = new Schema({
      name: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Email is invalid");
          }
        }
      },
      active: {
        type: Boolean,
        required: true,
        default: false
      },
      token: {type: String},
      password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
          if (value.toLowerCase().includes("password")) {
            throw new Error('Password can not contain "password"');
          }
        }
      },
      avatar: {
        type: Buffer
      },
      createdAt: {type: Date, default: Date.now, expires: '600s' }
    })

    tmpUserSchema.pre('save', async function (next) {
      if (this.isNew) {
        this.password = await hashedPassword(this.password)
        this.token = await genToken();  
      }
      next()
    })

module.exports = model('TmpUser', tmpUserSchema);