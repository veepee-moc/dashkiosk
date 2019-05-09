const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
  destination: './public/settings/unassigned',
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
      img = fs.readFileSync(`./public/settings/unassigned/${imgId}`);
    }
    catch (err) {
      rej({ status: 404, message: 'Image not found' });
    }
    const encode_img = img.toString('base64');
    res(new Buffer(encode_img, 'base64'));
  });

module.exports = function (app) {

  app.post('/settings/upload', upload.single('unssignedImage'), function (req, res, next) {
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

  const getConfig = () => new Promise((resolve, reject) => {
    var config = {};
    if (fs.existsSync(`./public/settings/config.json`)) {
      return resolve({
        config: JSON.parse(fs.readFileSync(`./public/settings/config.json`)),
        status: 200,
      });
    }
    config = {
      timezone: 'Europe/Paris',
      branding: 'default',
      background_choice: 'color',
      background_color: '#1c1a1f',
      background_image: '',
      loading_image: '',
      stamp: '',
      unassigned_images: fs.readdirSync(`./public/settings/unassigned/`)
    };
    fs.writeFileSync(`./public/settings/config.json`, JSON.stringify(config), 'utf8');
    resolve({
      config: config,
      status: 201
    });
  });

  // Edit config
  app.put('/settings/config', function (req, res, next) {
    if (!req.body && !req.body.config)
      res.sendStatus(400);
    fs.writeFileSync(`./public/settings/config.json`, JSON.stringify(req.body.config), 'utf8');
    res.sendStatus(202);
  });

  // Create config.json if doesnt exist
  app.get('/settings/config', function (req, res, next) {
    getConfig().then(conf => res.status(conf.status).send(conf.config));
  });

  // Render images for unssigned group
  app.get('/settings/unassigned/:image', function (req, res, next) {
    renderImage(req.params.image).then(image => {
      res.contentType('image/jpeg');
      res.send(image);
    }).catch(err => {
      next(err);
    })
  });

  // Delete image from unssigned
  app.delete('/settings/:image', function (req, res, next) {
    var image = req.params.image;
    fs.unlink(`./public/settings/unassigned/${image}`);
    res.sendStatus(200);
  });
};