const { Session } = require('../models');

const createSession = (userId, userAgent) => {
  return Session.create({
    userId,
    valid: true,
    userAgent
  })
}

const SessionService = {
  createSession
}

module.exports = SessionService;