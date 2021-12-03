// Copied from https://stackoverflow.com/questions/19114150/get-the-class-function-name-within-itself
export function getName(obj) {
    if (obj.name) {
        return obj.name;
    }

    let funcNameRegex = /function (.{1,})\(/;
    let results = (funcNameRegex).exec(obj.toString());
    let result = results && results.length > 1 && results[1];

    if (!result) {
        funcNameRegex = /return _this.(.*);/;
        results = (funcNameRegex).exec(obj.toString());
        result = results && results.length > 1 && results[1];
    }
    return result || '';
}
