const pseudoSchema = require("../util/PseudoSchema")

const getDocumentsById = (collectionName,_id)=>
     pseudoSchema.getModelByCollectionName(collectionName)
        .then(model =>model.findById(_id).exec())

const deleteDocumentById = (collectionName,_id)=>
     pseudoSchema.getModelByCollectionName(collectionName)
        .then(model =>model.findByIdAndDelete(_id).exec())

const getDocuments = (collectionName)=>
     pseudoSchema.getModelByCollectionName(collectionName)
        .then(model =>model.find().exec())


const createDocumentInCollection = (collectionName,documentToCreate)=>
    pseudoSchema.getModelByCollectionName(collectionName)
        .then(model =>model.create({...documentToCreate}))

const truncateCollection=(collectionName)=>pseudoSchema.getModelByCollectionName(collectionName)
    .then(model =>model.deleteMany({}).exec())


module.exports={getDocuments,createDocumentInCollection,truncateCollection,getDocumentsById,
    deleteDocumentById}
