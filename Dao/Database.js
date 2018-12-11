const pseudoSchema = require("../util/PseudoSchema")

const getDocumentsById = (collectionName,_id)=>
     pseudoSchema.getModelByCollectionName(collectionName)
        .then(model =>model.findById(_id))

const deleteDocumentById = (collectionName,_id)=>
     pseudoSchema.getModelByCollectionName(collectionName)
        .then(model =>model.findByIdAndDelete(_id))

const getDocuments = (collectionName)=>
     pseudoSchema.getModelByCollectionName(collectionName)
        .then(model =>model.find())


const createDocumentInCollection = (collectionName,documentToCreate)=>
    pseudoSchema.getModelByCollectionName(collectionName)
        .then(model =>model.create({...documentToCreate}))

const updateIfExists = (collectionName, doc)=>
    pseudoSchema.getModelByCollectionName(collectionName).
    then(model => model.findOneAndUpdate({...doc},{returnNewDocument :true}))



const truncateCollection=(collectionName)=>pseudoSchema.getModelByCollectionName(collectionName)
    .then(model =>model.deleteMany({}))


module.exports={getDocuments,createDocumentInCollection,truncateCollection,getDocumentsById,
    deleteDocumentById,updateIfExists}
