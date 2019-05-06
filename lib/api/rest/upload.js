const multer = require('multer');
const path = require('path');
const fs = require('fs');
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

module.exports = function (app) {

  app.post('/upload', upload.single('dashkiosk'), function (req, res, next) {
    if (req.file) {
      console.log('_______________________________');
      console.log(req.file);
      res.status(201).send({
        filepath: req.file.path,
        filename: req.file.filename,
        mimetype: req.file.mimetype
      });
    }
  });

  app.get('/public/:image', function (req, res, next) {
    const imgId = req.params.image;
    const img = fs.readFileSync(path.join(__dirname, `../../../public/${imgId}`));
    const encode_img = img.toString('base64');
    const final_img = {
      image: new Buffer(encode_img, 'base64')
    };
    res.contentType('image/jpeg');
    res.send(final_img.image);
  });

  app.delete('/upload', function (req, res, next) {

  });
};