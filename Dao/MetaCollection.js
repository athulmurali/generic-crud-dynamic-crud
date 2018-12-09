const metaCollectionModel = require('../data/MetaCollection').metaCollectionModel

const createAndUpdate =(metaCollectionToCreate)=>metaCollectionModel
    .findOneAndUpdate(
                {_id : metaCollectionToCreate._id },
                { $set: { ...metaCollectionToCreate }},
        {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        })

const remove =(metaCollectionToDeleteId)=>metaCollectionModel.findByIdAndDelete(metaCollectionToDeleteId)



module.exports={createAndUpdate, remove }
