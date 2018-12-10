const mongoose = require('mongoose')

const mappingTableName= require("../util/MappingTable")



const mappingTableSchema = (collection1Name, collection2Name) =>
    mongoose.Schema({

    [collection1Name]: {type: Number, ref : collection2Name},
    [collection2Name] : {type:Number, ref : collection2Name}

},{collection : mappingTableName(collection1Name,collection2Name)
    ,
    __v: { type: Number, select: false}})


//lets have model and collection name as META_COLLECTION_NAME

const mappingModel = (collection1Name, collection2Name)=>{
    delete mongoose.connection.models[mappingTableName(collection1Name,collection2Name)];
    return mongoose.model(mappingTableName(collection1Name,collection2Name) ,
        mappingTableSchema(collection1Name,collection2Name))
}
module.exports={mappingModel}
