const multer = require('multer');
const fs = require('fs');
const du = require('du');
const jimp = require('jimp');
const Store = require('../../Redux/Store');
const dashboardStorage = multer.diskStorage({
    destination: './public/dashboard',
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

module.exports.dashboardMulter = multer({
    limits: { fileSize: Store.getState().Config.Upload.maxFileSizeUpload },
    onError: (err, next) => {
        next(err);
    },
    storage: dashboardStorage
});

const unassignedStorage = multer.diskStorage({
    destination: './public/settings/unassigned',
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

module.exports.unassignedMulter = multer({
    limits: { fileSize: Store.getState().Config.Upload.maxFileSizeUpload },
    onError: (err, next) => {
        next(err);
    },
    storage: unassignedStorage
});

const brandStorage = multer.diskStorage({
    destination: './public/settings/brand',
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

module.exports.brandMulter = multer({
    limits: { fileSize: Store.getState().Config.Upload.maxFileSizeUpload },
    onError: (err, next) => {
        next(err);
    },
    storage: brandStorage
});

if(!fs.existsSync('./public'))
    fs.mkdirSync('./public');
if (!fs.existsSync('./public/thumbnail'))
    fs.mkdirSync('./public/thumbnail');
if (!fs.existsSync('./public/dashboard'))
    fs.mkdirSync('./public/dashboard');
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

module.exports.getPublic = () => {
    const getObjects = (arr, path) => {
        var ret = [];
        const getThumbnail = (image) => {
            if (fs.existsSync(`./public/thumbnail/${image}`))
                return `/api/public/thumbnail/${image}`;
            return null;
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

module.exports.checkStorage = (req, res, next) => {
    du('./public/', (err, size) => {
        const maxFileSize = Store.getState().Config.Upload.maxFileSizeUpload;
        const maxStorage = Store.getState().Config.Upload.maxStorageAllowed;
        if (size + maxFileSize > maxStorage)
            return res.status(403).json({ message: 'Store has reached maximum size' });
        next();
    });
}