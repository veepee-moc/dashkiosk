const multer = require('multer');
const bus = require('../../bus');
const fs = require('fs');
const image = require('../../tools/imageManagement');
const settings = require('../../tools/configSettings');

module.exports = function (app) {
  // Upload unnasigned images
  // TYPES : unassigned
  app.post('/settings/upload/unassigned', image.checkStorage, function (req, res, next) {
    image.uploadImageMid('./public/settings/unassigned').single('unassigned')(req, res, (err) => {
      if (err) {
        res.status(403).send(err.message);
        return;
      }
      if (!req.file || !req.file.path) {
        res.status(500).send('Internal server error');
        return;
      }
      image.createThumbnail(req.file.path, req.file.filename);
      res.status(200).send({
        filepath: req.file.path,
        filename: req.file.filename,
        mimetype: req.file.mimetype
      });
    });
  });
  // Upload brand images
  // TYPES : brand
  app.post('/settings/upload/brand', image.checkStorage, function (req, res, next) {
    image.uploadImageMid('./public/settings/brand').single('brand')(req, res, (err) => {
      if (err) {
        res.status(403).send(err.message);
        return;
      }
      if (!req.file || !req.file.path) {
        res.status(500).send('Internal server error');
        return;
      }
      image.createThumbnail(req.file.path, req.file.filename);
      res.status(200).send({
        filepath: req.file.path,
        filename: req.file.filename,
        mimetype: req.file.mimetype
      });
    });
  });

  // Edit config
  app.put('/settings/config', function (req, res, next) {
    if (!req.body || !req.body.config)
     res.sendStatus(400);
    fs.writeFileSync(`./public/settings/config.json`, JSON.stringify(req.body.config), 'utf8');
    bus.publish('settings.updated', JSON.stringify(req.body.config));
    res.sendStatus(202);
  });

  // Create config.json if doesnt exist
  app.get('/settings/config', function (req, res, next) {
    settings.getConfig().then(conf => res.status(conf.status).send(conf.config));
  });

  // Render images for unassigned OR brand group
  app.get('/public/settings/:type/:image', function (req, res, next) {
    const path = `./public/settings/${req.params.type}/${req.params.image}`;
    var ext = `image/${req.params.image.split('.')[1]}`;
    if (!ext)
      ext = 'image/jpeg';
    image.renderImage(path).then(image => {
      res.contentType(ext);
      res.send(image);
    }).catch(err => {
      next(err);
    })
  });

  app.delete('/public/settings/:folder/:image', function (req, res, next) {
    var imgpath = req.params.image;
    var folder = req.params.folder;
    if (imgpath.split('.')[1] !== 'svg+xml') {
      imgpath = encodeURIComponent(imgpath);
      if (fs.existsSync(`./public/thumbnail/${imgpath}`))
        fs.unlinkSync(`./public/thumbnail/${imgpath}`);
    }
    fs.unlinkSync(`./public/settings/${folder}/${imgpath}`, err => {
      if (err)
        res.sendStatus(404);
    });
    res.sendStatus(200);
  });
};