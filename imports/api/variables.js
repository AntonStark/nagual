import { Mongo } from "meteor/mongo";

export const Variables = new Mongo.Collection('variables');

export function getVariableId(name) {
    const curVariable = Variables.find({name: name});
    return (curVariable.count() === 0
        ? undefined
        : curVariable.fetch()[0]._id);
}