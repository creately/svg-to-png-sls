const { convert } = require('./convert-svg-to-png');

exports.handler = async event => {
    const body = JSON.parse( event.body );
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
}