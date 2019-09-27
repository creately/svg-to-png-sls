const { convert } = require('./convert-svg-to-png');

exports.handler = async event => {
    const body = JSON.parse( event.body );
    if ( !body.svg ) {
        return {
            statusCode: 500,
            body: 'svg is missiing',
        }
    }

    try {
        const png = await convert(body.svg, { width: body.width, height: body.height });
        return {
          statusCode: 200,
          body: png,
          // FIXME: Should be able to directly set the buffer instead of base64 encodeed string
          //        find why it doesn't work setting buffer to the body in serverless
          isBase64Encoded: true,
      
          headers: {
            "content-type": "image/png"
          }
        };       
    } catch (error) {
        return {
            statusCode: 500,
            body: 'Failed to generate svg',
        }
    }
}
