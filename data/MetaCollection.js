const mongoose = require('mongoose')
const META_COLLECTION_NAME = 'MetaCollection'

const metaCollectionSchema =  mongoose.Schema({
    _id : String,
    fields : Array

},{collection : META_COLLECTION_NAME , __v: { type: Number, select: false}})


//lets have model and collection name as META_COLLECTION_NAME

const metaCollectionModel = mongoose.model(META_COLLECTION_NAME , metaCollectionSchema)

module.exports={metaCollectionModel}
