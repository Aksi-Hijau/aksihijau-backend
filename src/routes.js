const SessionController = require('./controllers/session.controller.js');
const UserController = require('./controllers/user.controller.js');
const validateRequest = require('./middleware/validateRequest.js');
const User = require('./models').User;
const SessionSchema = require('./schemas/session.schema.js');
const UserSchema = require('./schemas/user.schema.js');

module.exports = function(app) {
  app.get('/health-check', async (req, res) => {
    const user = User
    console.log(user)
    return true
    // res.status(200).send(users)
  })

  app.post('/api/users', validateRequest(UserSchema.createUserSchema), UserController.createUserHandler);

  app.post('/api/sessions', validateRequest(SessionSchema.createSessionSchema), SessionController.createSessionHandler)
}