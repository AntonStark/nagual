import { Mongo } from "meteor/mongo";

export const Markers = new Mongo.Collection('markers');

export function isMarkerHasThatVar(marker, var_id) {
    const vars = marker.data.vars;
    return (vars.filter(entry => (entry.var_id === var_id)).length > 0);
}
