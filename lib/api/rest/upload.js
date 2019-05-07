const multer = require('multer');
const path = require('path');
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
const uploadImage = (imgId) =>
  new Promise((res, rej) => {
    var img;
    try {
      img = fs.readFileSync(path.join(__dirname, `../../../public/${imgId}`));
    }
    catch (err) {
      rej({ status: 404, message: 'Image not found' });
    }
    const encode_img = img.toString('base64');
    res(new Buffer(encode_img, 'base64'));
  });

module.exports = function (app) {

  app.post('/upload', upload.single('dashkiosk'), function (req, res, next) {
    if (req.file) {
      res.status(201).send({
        filepath: req.file.path,
        filename: req.file.filename,
        mimetype: req.file.mimetype
      });
    }
  });

  app.get('/public/:image', function (req, res, next) {
    uploadImage(req.params.image).then(image => {
      res.contentType('image/jpeg');
      res.send(image);
    }).catch(err => {
      res.send(err.status).json({ message: err.message })
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
      if (dup === 0)
        fs.unlink(path.join(__dirname, `../../../public/${image}`));
    });
    res.sendStatus(201);
  });
};