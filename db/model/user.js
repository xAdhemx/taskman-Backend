const {Schema, model} = require('mongoose')
const validator = require("validator");
const hashedPassword = require("../../utils/hashed_password")

const userSchema = new Schema({
      name: {type: String,
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
      is_active: {
        type: Boolean,
        required: true,
        default: false
      },
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
        type: String
      }
      
    })
    
    //Activé juste parce que j'ai dû faire register direct sans passer par action
    userSchema.pre('save', async function (next) {
      if (this.isNew) {
        this.password = await hashedPassword(this.password) // password deja hashé au niveau du tmpUser
      }
      next()
    })

module.exports = model('User', userSchema);