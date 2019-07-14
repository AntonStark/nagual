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

export function changeName(typeId, name) {
    const nAffected = MTypes.update(typeId, {$set: {name: name}});
    return nAffected > 0;
}

export function changeColor(typeId, color) {
    const nAffected = MTypes.update(typeId, {$set: {color: color}});
    return nAffected > 0;
}

export function updateType(typeId, name, color) {
    const nAffected = MTypes.update(typeId, {$set: {name: name, color: color}});
    return nAffected > 0;
}

export function deleteType(typeId) {
    return MTypes.remove(typeId);
}