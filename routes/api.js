
const express = require('express');
const router = express.Router({mergeParams : true});
const databaseSchema = require("../Dao/Database")
const mappingTableRouter = require("./mappingTableRouter")
const getFieldTypeDict = require('../util/PseudoSchema').getFieldTypeDict

const metaCollectionModel = require('../data/MetaCollection').metaCollectionModel
const metaCollectionDao= require('../Dao/MetaCollection')

/* GET users listing. */
router.get('/', function(req, res, next) {

    metaCollectionModel.find().then(
        metaCollections =>
        {
            console.log(metaCollections)
            res.send(metaCollections);
        }
    )


});

router.post('/:collectionName',(req,res,next)=>{
    const newOrOldTable = {...req.body}

    console.log(newOrOldTable)


    const fieldTypeDict = getFieldTypeDict(newOrOldTable)

    const collectionName =  req.params.collectionName


    const metaCollectionSchema = {
        // the following id represents the name of the collection to be created.
        _id: collectionName,
        fields:{
            ...fieldTypeDict
        }
    }


    metaCollectionDao.createAndUpdate(metaCollectionSchema)
        .then(createdOrUpdated=>{
            console.log(createdOrUpdated)
            res.send(createdOrUpdated)
    })
        .catch(err =>{
            console.error({Error : JSON.stringify(err)})
            res.send({error : "error in creation"})

        })


})




/* GET all documents from the given collection name  . */
router.get('/:collectionName', function(req, res, next) {
    const collectionName = req.params.collectionName

    databaseSchema.getDocuments(collectionName)
        .then(docs=>res.send(docs))
        .catch(err=>res.send({}))
});

/* Create document for  the given collection name  . */
// router.post('/:collectionName', function(req, res, next) {
//     const collectionName = req.params.collectionName
//     const documentToCreate = req.body
//
//     console.log(collectionName)
//     databaseSchema.createDocumentInCollection(
//         collectionName,{...documentToCreate})
//         .then(docs=>res.send(docs)).catch(err=>res.send({Error : err}))
//
//
// });
//

// DELETE
// /api/{table}
// Truncates the content of the table
router.delete('/:collectionName', function(req, res, next) {
    const collectionName = req.params.collectionName

    databaseSchema.truncateCollection(
        collectionName)
        .then(docs=>res.send([])).catch(err=>res.send({Error : err}))


});



/* GET document  from the given collection name by ID  . */
router.get('/:collectionName/:_id', function(req, res, next) {
    const collectionName = req.params.collectionName
    const _id = req.params._id

    databaseSchema.getDocumentsById(collectionName,_id)
        .then(doc=>res.send(doc))
        .catch(err=>res.send({Error : JSON.stringify(err)}))
});

/* Delete document  from the given collection name by ID  . */
router.delete('/:collectionName/:_id', function(req, res, next) {
    const collectionName = req.params.collectionName
    const _id = req.params._id

    databaseSchema.deleteDocumentById(collectionName,_id)
        .then(doc=>res.send(doc))
        .catch(err=>res.send({Error : JSON.stringify(err)}))
});





router.use('/:collectionName1/:_id1',mappingTableRouter)

module.exports = router;
