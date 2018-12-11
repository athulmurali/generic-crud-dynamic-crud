
const express = require('express');
const router = express.Router({mergeParams : true});
const databaseSchema = require("../Dao/Database")
const mappingTableRouter = require("./mappingTableRouter")
const getFieldTypeDict = require('../util/PseudoSchema').getFieldTypeDict
const queryFilter= require("./middlewares/Filter").queryFilter;


const metaCollectionModel = require('../data/MetaCollection').metaCollectionModel
const metaCollectionDao= require('../Dao/MetaCollection')

/* GET All meteCollection Schemas  listing. */
router.get('/', function(req, res, next) {

    metaCollectionModel.find().then(
        metaCollections =>
        {
            console.log(metaCollections)
            res.send(metaCollections);
        }
    )


});

/* Delete All meteCollection Schemas  listing. */

router.delete('/', function(req,res,next){
    metaCollectionDao.dropAllCollections()
        .then(_=>res.send({}))
        .catch(res.send)

})

router.post('/:collectionName',(req,res,next)=>{
    const docToInsert = {...req.body}
    const fieldTypeDict = getFieldTypeDict(docToInsert)
    const collectionName =  req.params.collectionName

    const metaCollectionSchema = {
        // the following id represents the name of the collection to be created.
        _id: collectionName,
        fields:{
            ...fieldTypeDict
        }
    }

    metaCollectionDao.createAndUpdate(metaCollectionSchema)
        .then(newMetaCollectionDoc=>{
            console.info("result from MetaCollection")
            console.debug(newMetaCollectionDoc)
            return databaseSchema.createDocumentInCollection(collectionName,docToInsert)
    })
        .then((insertedDoc)=>res.send(insertedDoc))
        .catch(err =>{
            console.error({Error : JSON.stringify(err)})
            res.send({error : "error in creation"})

        })
})

/* GET all documents from the given collection name  . */
// queryFilter sends filter data to the client
router.get('/:collectionName',  (req, res, next) =>{
    const collectionName = req.params.collectionName

    databaseSchema.getDocuments(collectionName)
        .then(docs=>{
            console.log(docs    )
            req.modelArray =  docs
            return next()
        })
        .catch(err=>res.send(err))
}, queryFilter);


/* GET document  from the given collection name by ID  . */
router.get('/:collectionName/:_id', function(req, res, next) {
    const collectionName = req.params.collectionName
    const _id = req.params._id

    databaseSchema.getDocumentsById(collectionName,_id)
        .then(doc=>res.send(doc))
        .catch(err=>res.send({Error : JSON.stringify(err)}))
});


/* PUT document  from the given collection name by ID  . */
router.put('/:collectionName/:_id', async function (req, res) {

    const collectionName = req.params.collectionName
    const docIdToUpdate = parseInt(req.params._id)
    try{
        console.log("updateIfExists")

        const foundDoc = await databaseSchema.getDocumentsById(collectionName, docIdToUpdate)
        console.info(foundDoc)

        if (!foundDoc)
        {
            console.log("No such  collection or document with that Id present!")
            res.send(null)
            return
        }
        console.log("doc found ")

        const docToInsert = {...req.body, _id : docIdToUpdate}
        const fieldTypeDict = getFieldTypeDict(docToInsert)
        const metaCollectionSchema = {
            // the following id represents the name of the collection to be created.
            _id: collectionName,
            fields: {
                ...fieldTypeDict
            }
        }

        metaCollectionDao.createAndUpdate(metaCollectionSchema)
            .then(newMetaCollectionDoc => {
                console.info("result from MetaCollection")
                console.debug(newMetaCollectionDoc)
                return databaseSchema.updateIfExists(collectionName, docToInsert)
            })
            .then((insertedDoc) => {
                console.info(insertedDoc)
                res.send(insertedDoc)})
            .catch(err => {
                console.error({Error: JSON.stringify(err)})
                res.send({error: "error in creation"})

            })

    }
    catch (err){
        console.log("error!")
        //error : due to table not present
        console.error(err)

        //send null
        res.send(null)
    }
});

// DELETE
// /api/{table}
// Truncates the content of the table
router.delete('/:collectionName', function(req, res) {
    const collectionName = req.params.collectionName
    databaseSchema.truncateCollection(collectionName)
        .then(docs=>res.send([]))
        .catch(err=>{
            res.send( err)
        })
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
