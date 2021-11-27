const splitURL = (req) => req._parsedOriginalUrl.href.split("/").slice(1);

module.exports = splitURL;