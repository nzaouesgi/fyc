module.exports = function (req, res, next) {
    res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' ; style-src 'self' 'unsafe-inline' stackpath.bootstrapcdn.com ; script-src 'self' kit.fontawesome.com cdnjs.cloudflare.com code.jquery.com stackpath.bootstrapcdn.com; connect-src 'self' ka-f.fontawesome.com; font-src ka-f.fontawesome.com"
    );
    next();
}