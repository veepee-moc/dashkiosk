const fs = require('fs');

module.exports.getConfig = () => new Promise((resolve, reject) => {
  var config = {};
  if (fs.existsSync(`./public/settings/config.json`)) {
    return resolve({
      config: JSON.parse(fs.readFileSync(`./public/settings/config.json`)),
      status: 200,
    });
  }
  const getUnassignedImages = () => {
    var imgs = fs.readdirSync(`./public/settings/unassigned/`);
    var ret = [];
    for (var i = 0; i < imgs.length; i++)
      ret.push(`/api/public/settings/unassigned/${imgs[i]}`);
    return ret;
  };
  config = {
    useBranding: false,
    timezone: 'Europe/Paris',
    branding: 'default',
    background_choice: 'color',
    background_color: '#1c1a1f',
    background_image: '',
    loading_image: '',
    stamp: '',
    unassigned_images: getUnassignedImages()
  };
  fs.writeFileSync(`./public/settings/config.json`, JSON.stringify(config), 'utf8');
  return resolve({
    config: config,
    status: 201
  });
});