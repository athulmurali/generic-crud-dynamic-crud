const metaCollectionModel = require('../data/MetaCollection').metaCollectionModel
const mongoose = require('mongoose')
const createAndUpdate =(metaCollectionDocumentToCreate)=>{

    console.debug("Dao/MetaCollection")
    console.debug(metaCollectionDocumentToCreate)
    return metaCollectionModel
        .findOneAndUpdate(
            {_id : metaCollectionDocumentToCreate._id },
            { $set: { ...metaCollectionDocumentToCreate,}},
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            })
}
const remove =(metaCollectionToDeleteId)=>metaCollectionModel.findByIdAndDelete(metaCollectionToDeleteId)

const dropAllCollections = ()=>{

    let dropCollectionPromises = []

    mongoose.connection.db.listCollections().forEach(( {name}) => {


        if (name.indexOf("system.") === -1) {
            console.log("Dropping collection:...  ", name)

            dropCollectionPromises.push(mongoose.connection.db.dropCollection(name))
        }

        else {
            console.log("Cleaning system collection:...  ", name)
            dropCollectionPromises.push(mongoose.connection.db.collection(name).deleteMany({}))
        }
    })

        return Promise.all(dropCollectionPromises)
};

module.exports={createAndUpdate, remove ,dropAllCollections}
