const CampaignController = require('./controllers/campaign.controller.js');
const DonationController = require('./controllers/donation.controller.js');
const PaymentController = require('./controllers/payment.controller.js');
const SessionController = require('./controllers/session.controller.js');
const SoilController = require('./controllers/soil.controller.js');
const SummaryController = require('./controllers/summary.controller.js');
const UserController = require('./controllers/user.controller.js');
const requireUser = require('./middleware/requireUser.js');
const validateRequest = require('./middleware/validateRequest.js');
const CampaignSchema = require('./schemas/campaign.schema.js');
const DonationSchema = require('./schemas/donation.schema.js');
const ReportSchema = require('./schemas/report.schema.js');
const User = require('./models').User;
const SessionSchema = require('./schemas/session.schema.js');
const UserSchema = require('./schemas/user.schema.js');
const multerConfig = require('./utils/multerConfig.js');

module.exports = function(app) {
  app.get('/health-check', requireUser, async (req, res) => {
    return res.send(res.locals.user)
  })

  app.post('/api/users', validateRequest(UserSchema.createUserSchema), UserController.createUserHandler);
  
  app.get('/api/user', requireUser, UserController.getUserHandler);
  app.put('/api/user', requireUser, multerConfig.single('photo'), UserController.updateUserHandler)

  app.post('/api/sessions', validateRequest(SessionSchema.createSessionSchema), SessionController.createSessionHandler)

  app.delete('/api/sessions', requireUser, SessionController.deleteSessionHandler)

  app.get('/api/campaigns', CampaignController.getCampaignsHandler);
  app.get('/api/campaigns/search', CampaignController.getSearchCampaignsHandler)
  app.post('/api/campaigns', multerConfig.fields([{ name: 'image', maxCount: 1 }, { name: 'permitDocument', maxCount: 1 }]), validateRequest(CampaignSchema.createCampaignSchema), requireUser, CampaignController.createCampaignHandler);
  app.get('/api/campaigns/:slug', CampaignController.getCampaignBySlugHandler);
  app.get('/api/campaigns/:slug/donations', CampaignController.getDonationsHandler);
  app.get('/api/campaigns/:slug/reports', CampaignController.getReportsHandler);
  app.post('/api/campaigns/:slug/reports', validateRequest(ReportSchema.createReportSchema), requireUser, CampaignController.createReportHandler);
  app.get('/api/campaigns/check-slug/:slug', CampaignController.checkSlug)
  app.get('/api/my-campaigns', requireUser, CampaignController.getMyCampaignHandler)

  app.get('/api/soils', SoilController.getSoilsHandler);
  app.get('/api/soils/:id', SoilController.getSoilByIdHandler);

  app.post('/api/campaigns/:slug/donations', validateRequest(DonationSchema.createDonationSchema), requireUser, CampaignController.createDonationHandler);

  app.get('/api/donations', requireUser, DonationController.getDonationsHandler)
  app.get('/api/donations/:invoice', requireUser, DonationController.getDonationByInvoiceHandler)
  app.get('/api/donations/:invoice/instructions', requireUser, DonationController.getDonationInstructionByInvoiceHandler)

  app.get('/api/payments', PaymentController.getPaymentsHandler)

  app.post('/api/midtrans/callback', PaymentController.midtransCallback)

  // for web dashboard
  app.get('/api/summary', SummaryController.getSummaryHandler)
}