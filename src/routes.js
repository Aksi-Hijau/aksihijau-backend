const SessionController = require('./controllers/session.controller.js');
const UserController = require('./controllers/user.controller.js');
const requireUser = require('./middleware/requireUser.js');
const validateRequest = require('./middleware/validateRequest.js');
const User = require('./models').User;
const SessionSchema = require('./schemas/session.schema.js');
const UserSchema = require('./schemas/user.schema.js');

module.exports = function(app) {
  app.get('/health-check', requireUser, async (req, res) => {
    return res.send(res.locals.user)
  })

  app.post('/api/users', validateRequest(UserSchema.createUserSchema), UserController.createUserHandler);

  app.post('/api/sessions', validateRequest(SessionSchema.createSessionSchema), SessionController.createSessionHandler)

  app.delete('/api/sessions', requireUser, SessionController.deleteSessionHandler)
}