import tryRequire from './utils.js';



/*
    IMAGE PATH: 
    This is the images path, used in almost every import
    You should not modify it
    Default is './Resources/Images/'
*/
const image_path = './Resources/Images/';


/*
    TIMEZONE: 
    You can modify the timezone of the displayed clock on unassigned display
    Just modify what is between ''
    All valid entries are the one in the 'TZ database name' on this page: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
*/
const timezone = 'Europe/Paris';


/*
    BRANDING: 
    Here you can change the branding, 
    If you don't want to use it, use 'default' or ''

    If you DON'T use branding, you can personalize your unassigned displays in the first part bellow
    
    If you DO use branding, you can personalize your unassigned displays in the second part bellow
    And don't forget to add a 'stamp-{ your branding }.{ your extension}' and a 'loading-{ your branding }.{ your extension}' images in the images folder
*/
const branding = 'vente-privee';




/* FIRST PART: Modify this part if you DON'T use branding */


/*
    UNASSIGNED IMAGE PATH: 
    This is the unassigned images path
    You should not modify it
    It uses the image_path above, make sure that image_path is valid or unassigned path won't work
    Default is `${image_path}unassigned/`
*/
const unassigned_path = `${image_path}unassigned/`; 


/*
    UNASSIGNED IMAGES: 
    Thoses images are the images displayed on unassigned displays
    You may want to add or remove some of them
    Make sure to put a valid name, with the valid path (default is './Resources/Images/unassigned'), or you will have a blank screen
    You should only modify what comes after ${unassigned_path}
    You can add or remove lines as you want
    Don't forget the commas
*/
const unassigned_images = [
    tryRequire(`${unassigned_path}crab.jpg`),
    tryRequire(`${unassigned_path}forest.jpg`),
    tryRequire(`${unassigned_path}grapes.jpg`),
    tryRequire(`${unassigned_path}otter.jpg`),
    tryRequire(`${unassigned_path}seagull.jpg`),
    tryRequire(`${unassigned_path}solda.jpg`),
    tryRequire(`${unassigned_path}water.jpg`),
    tryRequire(`${unassigned_path}wheat.jpg`),
];




/* SECOND PART: Modify this part if you DO use branding */


/* 
    BACKGROUND: 
    You can change the background color or set a background image
    Put 'image' to use a background image, and 'color' to use a background color
    /!\ If you use an image, make sure to put it in the images folder.
    Default is 'color'
*/
const background_choice = 'color';


/*
    BACKGROUND IMAGE AND COLORS: 
    You can set your loading background color or background image here
    To change the color, replace the content in '' by the color you want
        Supported formats are 'rgb(r, g, b)', all hexadecimal formats, and default values such are 'green', 'black' etc.
    To change the background image modify what is after ${image_path}
    You should not change ${image_path},
        You should only modify what comes after ${image_path}
        Don't forget the extension 
        You may want to use the ${branding} variable which contains your branding name
        Don't forget to put your image on the ./Resources/Images/ folder
*/
const background_color = '#1c1a1f';
const background_image = `${image_path}background-${branding}.png`;




/*
    /!\ You should NOT modify what comes after this line /!\
*/

export default {
    timezone,
    unassigned_images,
    branding: branding === '' ? 'default' : branding,
    loading: tryRequire(`${image_path}loading-${branding}.svg`),
    stamp: tryRequire(`${image_path}stamp-${branding}.svg`),
    background_choice,
    background: background_choice !== 'image' ? background_color : tryRequire(background_image),
};