const logger = require('../../util/logger')

/*
    Error handler for the application, pass this to the app to use,
    pulls the error code, status and message from the thrown OAuthError.
*/
function handleError(err, req, res, next) {

    logger.info('Logging an error')
    logger.info(err)

    res.set('Cache-Control', 'no-store');
    res.set('Pragma', 'no-cache');
    
    if (err.code === 'invalid_client') {
        var header = 'Bearer realm="book", error="invalid_token",' +
        'error_description="No access token provided"';
        res.set('WWW-Authenticate', header);
    }
    
    logger.info("Error status " + err.status)
    logger.info("Error code " + err.code)
    logger.info("Error message " + err.message)

    res.status(err.status).send({
        error: err.code,
        description: err.message
    });

}

module.exports = handleError;