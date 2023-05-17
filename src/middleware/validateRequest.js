const createApiResponse = require("../utils/createApiResponse.js");

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params
    }, { abortEarly: false } )

    return next()
  } catch (err) {
    const errors = {};
    err.inner.forEach(err => {
      const path = err.path.replace(/^(body|params|query)\./, '');
      errors[path] = err.message;
    });

    // jika ingin menampilkan error lebih detail
    // error.inner.forEach(err => {
    //   const path = err.path.replace(/^(body|params|query)\./, '');
    //   const source = err.path.split('.')[0];
    
    //   if (!errors[source]) {
    //     errors[source] = {};
    //   }
    
    //   errors[source][path] = err.message;
    // });

    return res.status(400).send(createApiResponse(false, null, errors))
  }
}

module.exports = validate