import { Mongo } from "meteor/mongo";

export const Markers = new Mongo.Collection('markers');

export function isMarkerHasThatVar(marker, var_id) {
    const vars = marker.data.vars;
    return (vars.filter(entry => (entry.var_id === var_id)).length > 0);
}

export function getValue(marker_id, var_id) {
    const marker = Markers.findOne(marker_id);
    if (!marker || !isMarkerHasThatVar(marker, var_id))
        return;

    const vars = marker.data.vars;
    return vars.filter(entry => (entry.var_id === var_id))[0].value;
}