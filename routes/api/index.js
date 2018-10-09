/**
 * Created by Gabriel on 2018-06-10.
 */
var router = require('express').Router();

router.use('/', require('./users'));
router.use('/', require('./locations'));

router.use(function(err, req, res, next){
    if(err.name === 'ValidationError'){
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce(function(errors, key){
                errors[key] = err.errors[key].message;

                return errors;
            }, {})
        });
    }

    return next(err);
});

module.exports = router;