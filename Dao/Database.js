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

const getDocumentsList = (collectionName, idList)=>
    pseudoSchema.getModelByCollectionName(collectionName)
        .then(model =>model.find(  {'_id': { $in: [...idList]}}))


const createDocumentInCollection = (collectionName,documentToCreate)=>
    pseudoSchema.getModelByCollectionName(collectionName)
        .then(model =>model.create({...documentToCreate}))

const updateIfExists = (collectionName, doc)=>{

    console.log(doc)
    console.log(collectionName)
    return pseudoSchema.getModelByCollectionName(collectionName).
    then(model =>{
        return model.findOneAndUpdate({_id: doc._id}, {$set:{...doc}}, {new: true})
    })



}


const truncateCollection=(collectionName)=>
    pseudoSchema.getModelByCollectionName(collectionName)
    .then(model =>{
        console.log(model)
        return model.deleteMany({})
    })


module.exports={getDocuments,createDocumentInCollection,truncateCollection,getDocumentsById,
    deleteDocumentById,updateIfExists,getDocumentsList}
