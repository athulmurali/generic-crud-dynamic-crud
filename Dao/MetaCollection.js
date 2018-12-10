const metaCollectionModel = require('../data/MetaCollection').metaCollectionModel

const createAndUpdate =(metaCollectionDocumentToCreate)=>{

    console.debug("Dao/MetaCollection")
    console.debug(metaCollectionDocumentToCreate)
    return metaCollectionModel
        .findOneAndUpdate(
            {_id : metaCollectionDocumentToCreate._id },
            { $set: { ...metaCollectionDocumentToCreate }},
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            })
}

const remove =(metaCollectionToDeleteId)=>metaCollectionModel.findByIdAndDelete(metaCollectionToDeleteId)



module.exports={createAndUpdate, remove }
