const multer = require('multer');
const fs = require('fs');
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
const getConfig = () => new Promise((resolve, reject) => {
  var config = {};
  if (fs.existsSync(`./public/settings/config.json`)) {
    return resolve({
      config: JSON.parse(fs.readFileSync(`./public/settings/config.json`)),
      status: 200,
    });
  }
  config = {
    useBranding: false,
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

var upload = () => {
  const storage = multer.diskStorage({
    destination: `./public/settings/brand`,
    filename: function (req, file, next) {
      const ext = file.mimetype.split('/')[1];
      next(null, file.fieldname + '.' + ext);
    }
  });
  return multer({
    onError: function (err, next) {
      next(err);
    },
    storage: storage
  });
};

module.exports = function (app) {
  // Upload unnasigned images
  // TYPES : brand OR unassigned
  // app.post('/settings/upload/unassigned', upload('unassigned').single('unassigned),
  //   function (req, res, next) {
  //     try {
  //       res.status(201).send({
  //         filepath: req.file.path,
  //         filename: req.file.filename,
  //         mimetype: req.file.mimetype
  //       });
  //     } catch (err) {
  //       next(err);
  //     }
  //   });

  app.post('/settings/upload/brand/:type', multer({ dest: './public/settings/brand' }).single('loading'),
    function (req, res, next) {
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

  // Render images for unassigned OR brand group
  app.get('/settings/:type/:image', function (req, res, next) {
    const path = `./public/settings/${req.params.type}/${req.params.image}`;
    renderImage(path).then(image => {
      res.contentType('image/jpeg');
      res.send(image);
    }).catch(err => {
      next(err);
    })
  });

  // Delete image from unssigned
  app.delete('/settings/unassigned/:image', function (req, res, next) {
    var image = req.params.image;
    fs.unlink(`./public/settings/unassigned/${image}`, err => {
      if (err)
        res.sendStatus(404);
    });
    res.sendStatus(200);
  });
};