const UserController = require('./controllers/user.controller.js');
const validateRequest = require('./middleware/validateRequest.js');
const UserSchema = require('./schemas/user.schema.js');

module.exports = function(app) {
  app.get('/health-check', (req, res) => {
    res.status(200).send({ message: 'OK' })
  })

  app.post('/api/users', validateRequest(UserSchema.createUserSchema), UserController.createUserHandler);
}