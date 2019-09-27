const launchChromeHeadless = require( '@serverless-chrome/lambda' );
const superAgent = require( 'superagent' );

const launchChrome = async () => {
    const chrome = await launchChromeHeadless();
    const response = await superAgent
                        .get( chrome.url + '/json/version' )
                        .set( 'Content-Type', 'application/json' );

    return {
        endpoint: response.body.webSocketDebuggerUrl,
        instance: chrome,
    };
};

module.exports = launchChrome;
