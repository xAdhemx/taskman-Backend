const SecurityService = require('../services/securityService')
const jwt = require('jsonwebtoken');

const login = async (request, response) => {
    const {email, password} = request.body;
    const result = await SecurityService.login({email, password});

    if (result.data && result.status == 200) {
        const {accessToken, refreshToken} = result.data;
        return response.cookie('refreshToken', refreshToken)
        .header('Authorization', accessToken)
        .status(result.status)
        .json({...result});
    }
    return response.status(result.status).send({message:result.message})
}


const register = async (req, res) => {
    const {body} = req
    console.log('body: ', body)
    const result = await SecurityService.Register(body)
    res.status(result.status).json({...result})
}

const Activation = async (request, response) => {
    const {token, userId } = await request.body
    const result = await SecurityService.Activation({token, userId });
    return response.json(result)
}

const logout = async (request, response) => {
    const SECRET = 'qqefkuhio3k2rjkofn2mbikbkwjhnkk'
    const accessToken = jwt.sign({userId: request.user}, SECRET, {expiresIn: 1});
    const refreshToken = jwt.sign({userId: request.user}, SECRET, {expiresIn: 1});
    return response.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
    .header('Authorization', "")
    .json({message: 'vous êtes déconnectés', data: {accessToken, refreshToken} });
}




module.exports = {
    login,
    register,
    Activation,
    logout
}