import { Mongo } from 'meteor/mongo';

export const MTypes = new Mongo.Collection('types');

export function addType(name, color) {
    if (Array.isArray(color) && color.length === 3) {
        // noinspection UnnecessaryLocalVariableJS
        const markerTypeId = MTypes.insert({name: name, color: color});
        return markerTypeId;
    }
    else
        throw new Error('color argument must be an array of three integers');
}

export function getTypes() {
    return MTypes.find({});
}

export function changeColor(typeId, newColor) {
    const nAffected = MTypes.update(typeId, {$set: {color: newColor}});
    return nAffected > 0;
}
