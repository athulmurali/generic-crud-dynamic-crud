const mongoose = require('mongoose')
const META_COLLECTION_NAME = 'META_COLLECTION'

const metaCollectionSchema = new mongoose.Schema({
    _id : String,
    fields : [mongoose.Types.Mixed]

},{collection : META_COLLECTION_NAME })


//lets have model and collection name as META_COLLECTION_NAME

const metaCollectionModel = mongoose.model(META_COLLECTION_NAME , metaCollectionSchema)

module.exports={metaCollectionModel}
