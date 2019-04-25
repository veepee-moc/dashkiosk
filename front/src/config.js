const path = './Resources/Images/unassigned/';
const unassigned_images = [
    require(`${path}crab.jpg`),
    require(`${path}forest.jpg`),
    require(`${path}grapes.jpg`),
    require(`${path}otter.jpg`),
    require(`${path}seagull.jpg`),
    require(`${path}solda.jpg`),
    require(`${path}water.jpg`),
    require(`${path}wheat.jpg`)
];

export default {
    timezone: 'Europe/Paris',
    unassigned_images,
    branding: 'vente-privee',
};