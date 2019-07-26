const fs = require('fs');
const Router = require('express').Router();
const Logger = require('../../Logger');
const tools = require('./Utils.js');
const Store = require('../../Redux/Store');
const { protectRoute } = require('../../Auth/Protect');

Router.post('/upload/dashboard', tools.checkStorage, protectRoute('imageUpload'), tools.dashboardMulter.single('dashboard'), (req, res) => {
    if (!req.file || !req.file.path) {
        res.status(500).send('Internal server error');
        return;
    }
    tools.createThumbnail(req.file.path, req.file.filename);
    res.status(200).send({
        filepath: req.file.path,
        filename: req.file.filename,
        mimetype: req.file.mimetype
    });
});

Router.get('/public/:folder/:image', (req, res) => {
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
        (err);
    })
});

Router.get('/public', (req, res) => {
    res.status(200).json(tools.getPublic());
});

Router.delete('/public/dashboard/:image', protectRoute('imageUpload'), (req, res) => {
    var img = req.params.image;
    if (img.split('.')[1] !== 'svg+xml') {
        img = encodeURIComponent(img);
        if (fs.existsSync(`./public/thumbnail/${img}`))
            fs.unlinkSync(`./public/thumbnail/${img}`);
    }
    fs.unlinkSync(`./public/dashboard/${img}`);
    res.sendStatus(200);
});

module.exports = Router;