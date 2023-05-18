const UserService = require("../services/user.service");
const SessionService = require("../services/session.service");
const createApiResponse = require("../utils/createApiResponse");
const { signJwt } = require("../utils/jwt.utils");

const createSessionHandler = async (req, res) => {
    // validate email
    const user = await UserService.findUser({ email: req.body.email })
    
    // validate password
    const isPasswordValid = await user.comparePassword(req.body.password)

    if(!isPasswordValid) {
      return res.status(401).send(createApiResponse(false, null, { password: "Password is not correct!" }))
    }

    // create session
    const session = await SessionService.createSession(user.id, req.get('user-agent') || "")
    
    // create access token
    const accessToken = signJwt({ ...user, session: session.id }, { expiresIn: '15m' })

    // create refresh token
    const refreshToken = signJwt({ ...user, session: session.id }, { expiresIn: '1y' })

    // return access token and refresh token
    return res.status(201).send(createApiResponse(true, { accessToken, refreshToken }, null))
}

const SessionController = {
  createSessionHandler
}

module.exports = SessionController;