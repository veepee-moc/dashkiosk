const multer = require('multer');
const fs = require('fs');
const db = require('../../db');
const upload = (type) => {
  const storage = multer.diskStorage({
    destination: './public',
    filename: function (req, file, next) {
      const ext = file.mimetype.split('/')[1];
      next(null, file.fieldname + Date.now() + '.' + ext);
    }
  });
  return multer({
    onError: function (err, next) {
      next(err);
    }, storage: storage
  });
}
const renderImage = (path) =>
  new Promise((res, rej) => {
    var img;
    try {
      img = fs.readFileSync(path);
    }
    catch (err) {
      rej({ status: 404, message: 'Image not found' });
    }
    const encode_img = img.toString('base64');
    res(new Buffer(encode_img, 'base64'));
  });

module.exports = function (app) {

  app.post('/upload', upload('dashboard').single('dashkiosk'), function (req, res, next) {
    if (!req.file && !req.file.path)
      res.sendStatus(500);
    res.status(201).send({
      filepath: req.file.path,
      filename: req.file.filename,
      mimetype: req.file.mimetype
    });
  });

  app.get('/public/:image', function (req, res, next) {
    renderImage(`./public/${req.params.image}`).then(image => {
      var ext = `image/${req.params.image.split('.')[1]}`;
      if (!ext)
        ext = 'image/jpeg';
      res.contentType(ext);
      res.send(image);
    }).catch(err => {
      next(err);
    })
  });

  app.delete('/upload/:image', function (req, res, next) {
    var image = req.params.image;

    db.Dashboard.findAll().then(data => {
      var dup = 0;
      for (i = 0; i < data.length; i++) {
        var url = data[i].dataValues.url;
        if (url.split('/api/public/')[1] === req.params.image)
          dup++;
        if (dup > 1)
          break;
      }
      if (dup === 1)
        fs.unlinkSync(`./public/${image}`, err => {
          res.sendStatus(404);
        });
    });
    res.sendStatus(200);
  });
};