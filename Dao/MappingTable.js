
const mappingCollectionModel = require('../data/MappingTable')
const createMapping =(collectionName1, collectionName2, _id1, _id2)=>
    mappingCollectionModel
    .mappingModel(collectionName1,collectionName2)
    .create({
        [collectionName1] : _id1,
        [collectionName2] : _id2
    })



const getAllMapping =(collectionName1, collectionName2)=>
    mappingCollectionModel
    .mappingModel(collectionName1,collectionName2)
        .find()

const deleteMapping =(collectionName1, collectionName2, _id1, _id2)=>
    mappingCollectionModel
    .mappingModel(collectionName1,collectionName2)
    .create({
        [collectionName1] : _id1,
        [collectionName2] : _id2
    })





module.exports={createMapping,deleteMapping,getAllMapping}
