const rate_helper = require('../helpers/rate');

module.exports = {
  flushJson: (results, res, callback) => {
    const errors = new Array()

    for (const key in results) {
      if (results[key].error) {
        errors.push(
          {
            code: results[key].error.code,
            description: results[key].error.description
          }
        )
      }
    }

    if(errors.length >= 1) {
      return res.status(422).json(
        {
          errors: errors
        }
      )
    }

    return res.status(200).json(
      callback()
    );
  }
}
