const { UserRepo } = require("../db/repository")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const {TmpUser} = require("../db/model")
const sendEmail = require('../utils/email/sendEmail_2');
const user = require("../db/model/user");

const login = async ({email, password}) => {
    const SECRET = process.env.JWT_SECRET;
    const expiresIn = process.env.TOKEN_EXPIRES_IN;

    const connectingUser = await UserRepo.findOne({email})

    if(!connectingUser) {
        return {status:401 ,message: 'Email introuvable', data: null}
    }

    const isPasswordValid = await bcrypt.compare(password, connectingUser.password);

    if (!isPasswordValid) {
        return { status: 401, message: "Infos. d'identification incorrect, email ou password invalid ",  data:null }
    }

    try {
        // generate access token
        const accessToken = jwt.sign({userId: connectingUser._id}, SECRET, {expiresIn});
        // generate access token
        const refreshToken = jwt.sign({userId: connectingUser._id}, SECRET, {expiresIn: '7d'});
        // retourner le user sans certains champs avec les infos login (les tokens)
        const {password, __v, is_active, ...rest} = connectingUser.toJSON()

        return {status: 200,  message: 'vous êtes connectés', data: {user: rest, accessToken, refreshToken}  }
        
    } catch (error) {
        return { status:500, message: 'Server error', data: null }
    }
}


const Register = async (userData) => {
    
  const {email} = userData;
  console.log(' userData : ', userData)

  const existingUser = await UserRepo.findOne({email});

  if (existingUser) {
    return { status: 422, message: `Ce compte est déjà existant`,  data:null } 
  }

  try {
    const newUser = await UserRepo.create({...userData, is_active: true})
    return { status: 200, message: `Compte crée avec succès !`, data: newUser }
    
  } catch (error) {
    return { status: 422, message: `Error de creation de compte ! `, data: null }
  }


}

// const Register = async (userData) => {
    
//     const {email} = userData;

//     const existingUser = await UserRepo.findOne({email});

//     if (existingUser) {
//       return { status: 422, message: `Ce compte est déjà existant et actif`,  data:null } 
//     }
  
//     const existingTmpUser = await TmpUser.findOne({email});
  
//     if (existingTmpUser) {
//       return {
//         status: 422, 
//         message: `Un processus de creation de compte est déjà en cours pour cet eMail ${email}. Veuillez patienter 10mn pour reprendre si nécéssaire. merci `,
//         data: null
//        }
//     }
  
//     try {

//       const user = await (new TmpUser(userData)).save()

//       const link = `${process.env.URL_PROTOCOL}://${process.env.CLIENT_URL}/#${process.env.ACTIVATION_PATH}?token=${user.token}&id=${user._id}`;
//       console.log('link: ', link)
//       const payload = {name: user.name, link}

//       await sendEmail(user.email, "vérification et activation de compte", payload, "./template/emailVerification.handlebars")
//       console.log('Mail sent !!')
//       return { status: 200, message: `création de compte entamée avec succes. Un email a été envoyé sur ${user.email}, pour verification et activation. `, data: null}
    
//     } catch (error) {
//       return {status: 422, message: error.message,  data:  null }
//     }


// }


const Activation = async (payload) => {

  const { token, userId } = payload;
  
  const user = await TmpUser.findById(userId);

  if (!user) {
      return { status: 200, isOk: false, message: "Désolé votre token d'activation a expiré, vous pouvez reprendre le processus de creation de compte. merci.", data: null  }
  }

  if (user.token !== token) {
      return { status: 200, isOk: false, message: "Désolé votre token est invalide", data: null }
  }

  try {
      const {__v, _id, otp, createdAt, token, ...rest} = user.toJSON()

      const existingUser = await UserRepo.findOne({_id: rest._id});

      if (!existingUser) {

        const newUser = await UserRepo.create({...rest, is_active: true})

        return { status: 200, isOk: true, message: "Votre compte a été activé avec succès. vous pouvez vous connecter à présent",  data: newUser }
        
      } else {
        return { status: 200, isOk: false, message: "Le compte utilisateur est déjà existant et activé.",  data: existingUser }
      }
      
  } catch (error) {
      return { status: 401, isOk: false, message: error.message,  data: null }
  }

}  


module.exports = {
    login,
    Register,
    Activation
  }
