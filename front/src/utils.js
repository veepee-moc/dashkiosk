export default function(path) {
    try {
        return require(`${path}`);
    } catch (err) {
        console.log('coucouuuuuuss');
        return '';
    }
}