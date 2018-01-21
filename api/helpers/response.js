var rate_helper = require("../helpers/rate");

module.exports = {
  flush_json: function(results, res, callback) {
    var errors = new Array()

    for (var key in results) {
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
        {errors: errors}
      )
    }
    else {
      return res.status(200).json(
        callback()
      );
    }
  }
}
