const CampaignController = require('./controllers/campaign.controller.js');
const DonationController = require('./controllers/donation.controller.js');
const SessionController = require('./controllers/session.controller.js');
const SoilController = require('./controllers/soil.controller.js');
const UserController = require('./controllers/user.controller.js');
const requireUser = require('./middleware/requireUser.js');
const validateRequest = require('./middleware/validateRequest.js');
const DonationSchema = require('./schemas/donation.schema.js');
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

  app.get('/api/campaigns', CampaignController.getCampaignsHandler);
  app.get('/api/campaigns/:slug', CampaignController.getCampaignBySlugHandler);
  app.get('/api/campaigns/:slug/donations', CampaignController.getDonationsHandler);
  app.get('/api/campaigns/:slug/reports', CampaignController.getReportsHandler);

  app.get('/api/soils/:id', SoilController.getSoilByIdHandler);

  app.post('/api/campaigns/:slug/donations', validateRequest(DonationSchema.createDonationSchema), requireUser, CampaignController.createDonationHandler);

  app.get('/api/donations', requireUser, DonationController.getDonationsHandler)
  app.get('/api/donations/:invoice', requireUser, DonationController.getDonationByInvoiceHandler)
}