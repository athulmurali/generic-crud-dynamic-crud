
const mappingCollectionModel = require('../data/MappingTable')
const createMapping =(collectionName1, collectionName2, _id1, _id2)=>
    mappingCollectionModel
    .mappingModel(collectionName1,collectionName2)
    .create({
        [collectionName1] : _id1,
        [collectionName2] : _id2
    })


const getAllMapping =(collectionName1, collectionName2,_id1)=>
    mappingCollectionModel
    .mappingModel(collectionName1,collectionName2)
        .find({[collectionName1] : _id1}).
        select({ [collectionName2]: 1, "_id": 0})
        // .populate(collectionName2)


//deletes all documents matching
// collection1Name = collectionName1 and _id =_id1
// collection2Name = collectionName2 and _id2 = id2

const deleteMappingByBothCollectionId =(collectionName1, collectionName2, _id1, _id2)=>
{

    return mappingCollectionModel
        .mappingModel(collectionName1,collectionName2)
        .deleteOne({
            [collectionName1] : _id1,
            [collectionName2] : _id2
        })



}

const deleteMappingByCollectionId =(collectionName1, collectionName2, _id1)=>
{
    return mappingCollectionModel
        .mappingModel(collectionName1,collectionName2)
        .deleteMany({
            [collectionName1] : _id1,
        })



}


module.exports={
    createMapping,getAllMapping,
    deleteMappingByBothCollectionId,
    deleteMappingByCollectionId
}
