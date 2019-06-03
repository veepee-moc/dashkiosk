const multer = require('multer');
const fs = require('fs');
const db = require('../db');
const du = require('du');
const jimp = require('jimp');
const nconf = require('nconf');

if (!fs.existsSync('./public'))
  fs.mkdirSync('./public');
if (!fs.existsSync('./public/thumbnail'))
  fs.mkdirSync('./public/thumbnail');
module.exports.renderImage = (path) =>
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

module.exports.uploadImageMid = (dest) => {
  const storage = multer.diskStorage({
    destination: dest,
    filename: function (req, file, next) {
      const originalname = encodeURIComponent(file.originalname.split('.')[0]);
      const ext = file.mimetype.split('/')[1];
      const nameAndExt = `${originalname}.${ext}`;
      const name = `${file.fieldname}${Date.now()}_${nameAndExt}`;
      if (ext !== 'jpeg' && ext !== 'png' && ext !== 'jpg' && ext !== 'svg+xml')
        return next(new Error('Invalid image'));
      next(null, name);
    }
  });
  return multer({
    limits: { fileSize: nconf.get('maxFileSizeUpload') || 5120 },
    onError: (err, next) => {
      next(err);
    },
    storage: storage
  });
}

module.exports.getPublic = () => {
  const getObjects = (arr, path) => {
    var ret = [];
    const getThumbnail = (image) => {
      const path = `./public/thumbnail/${image}`;
      try {
        fs.readFileSync(path);
      }
      catch (err) {
        return null;
      }
      return `/api/public/thumbnail/${image}`;
    };
    if (!arr)
      return null;
    for (var i = 0; i < arr.length; i++) {
      let before = arr[i].split(/_(.+)/)[1];
      let originalName = decodeURIComponent((before ? before : arr[i]).split('.')[0]);
      ret.push({
        name: originalName,
        path: `${path}${arr[i]}`,
        thumbnailPath: getThumbnail(arr[i]),
      })
    }
    return ret;
  };
  return {
    dashboard: getObjects(fs.readdirSync(`./public/dashboard/`), '/api/public/dashboard/'),
    brand: getObjects(fs.readdirSync(`./public/settings/brand`), '/api/public/settings/brand/'),
    unassigned: getObjects(fs.readdirSync(`./public/settings/unassigned`), '/api/public/settings/unassigned/'),
  };
}

module.exports.createThumbnail = (imagePath, imageName) => {
  jimp.read(imagePath, (err, thumb) => {
    if (err)
      return;
    thumb.quality(10)
      .write(`./public/thumbnail/${imageName}`);
  });
}

module.exports.checkStorage= (req, res, next) => {
  du('./public/', (err, size) => {
    const maxFileSize = nconf.get('maxFileSizeUpload');
    const maxStorage = nconf.get('maxStorageAllowed');
    if (size + maxFileSize > maxStorage)
      return res.status(403).json({ message: 'Store has reached maximum size' });
    next();
  });
}