const allowedCors = [
  'http://127.0.0.1:3000',
  'http://localhost:3000',
  'http://127.0.0.1:443',
  'http://192.168.1.154:3001',
  'http://network.mesto.nomoredomains.xyz',
  'https://network.mesto.nomoredomains.xyz',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  return next();
};
module.exports = cors;
