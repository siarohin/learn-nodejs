export const getKeyValueString = (obj) => {
    const getString = (param) => {
        return Object.entries(param).map(([key, value]) => {
            if (typeof value !== 'object') {
                return `${key}: ${value}`;
            } else if (Array.isArray(value)) {
                return `${key}: ${value.join(', ')}`;
            }
            return `${key}: { ${getString(value)} }`;
        });
    };
    return getString(obj).join(', ');
};
