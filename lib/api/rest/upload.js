const multer = require('multer');
const fs = require('fs');
const db = require('../../db');
const storage = multer.diskStorage({
  destination: './public',
  filename: function (req, file, next) {
    const ext = file.mimetype.split('/')[1];
    next(null, file.fieldname + Date.now() + '.' + ext);
  }
});
const upload = multer({
  onError: function (err, next) {
    next(err);
  }, storage: storage
});
const renderImage = (imgId) =>
  new Promise((res, rej) => {
    var img;
    try {
      img = fs.readFileSync(`./public/${imgId}`);
    }
    catch (err) {
      rej({ status: 404, message: 'Image not found' });
    }
    const encode_img = img.toString('base64');
    res(new Buffer(encode_img, 'base64'));
  });

module.exports = function (app) {

  app.post('/upload', upload.single('dashkiosk'), function (req, res, next) {
    try {
      res.status(201).send({
        filepath: req.file.path,
        filename: req.file.filename,
        mimetype: req.file.mimetype
      });
    } catch (err) {
      next(err);
    }
  });

  app.get('/public/:image', function (req, res, next) {
    renderImage(req.params.image).then(image => {
      res.contentType('image/jpeg');
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
        fs.unlinkSync(`./public/${image}`);
    });
    //handle error
    res.sendStatus(200);
  });
};