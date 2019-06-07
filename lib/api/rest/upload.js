const tools = require('../../tools/imageManagement');
const fs = require('fs');

module.exports = function (app) {

  app.post('/upload/dashboard', tools.checkStorage, function (req, res, next) {
    tools.uploadImageMid('./public/dashboard').single('dashboard')(req, res, (err) => {
      if (err) {
        res.status(403).send(err.message);
        return ;
      }
      if (!req.file || !req.file.path) {
        res.status(500).send('Internal server error');
        return ;
      }
      tools.createThumbnail(req.file.path, req.file.filename);
      res.status(200).send({
        filepath: req.file.path,
        filename: req.file.filename,
        mimetype: req.file.mimetype
      });
    });
  });

  app.get('/public/:folder/:image', function (req, res, next) {
    var imgpath = req.params.image;
    if (imgpath.split('.')[1] !== 'svg+xml')
      imgpath = encodeURIComponent(imgpath);
    tools.renderImage(`./public/${req.params.folder}/${imgpath}`).then(image => {
      var ext = `image/${req.params.image.split('.')[1]}`;
      if (!ext)
        ext = 'image/jpeg';
      res.contentType(ext);
      res.send(image);
    }).catch(err => {
      next(err);
    })
  });

  app.get('/public', function (req, res, next) {
    res.status(200).json(tools.getPublic());
  });

  app.delete('/public/dashboard/:image', function (req, res, next) {
    var img = req.params.image;
    if (img.split('.')[1] !== 'svg+xml') {
      img = encodeURIComponent(img);
      if (fs.existsSync(`./public/thumbnail/${img}`))
        fs.unlinkSync(`./public/thumbnail/${img}`);
    }
    fs.unlinkSync(`./public/dashboard/${img}`);
    res.sendStatus(200);
  });
};