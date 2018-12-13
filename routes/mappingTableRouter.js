
const express = require('express');
const router = express.Router({mergeParams : true});
const mappingTableDao = require('../Dao/MappingTable')
const pseudoSchema = require("../util/PseudoSchema")


//
// Retrieves records from {table2} whose primary key
// {table2}.id = {table1}_{table2}.{table2} AND {table1}.{id} = {table1}_{table2}.{table1}.
// Returns empty array if tables or IDs don't exist
/* GET document  from the given collection name by ID  . */
router.get('/:collectionName2', async function (req, res, next) {


    try{
        const collectionName1 = req.params.collectionName1
        const collectionName2 = req.params.collectionName2

        const _id1 = req.params._id1
        const _id2 = req.params._id2

        if (collectionName1== collectionName2)

        {
            res.status(403)
            res.send({Error: "Collection names cannot be same"})
            return
        }


        const actorModel = await pseudoSchema.getModelByCollectionName(collectionName2)

        // const docsList = await  databaseSchema.getDocumentsList(collectionName2,[1234])

        const docs = await  mappingTableDao.getAllMapping(collectionName1, collectionName2, _id1)
        const output =[]
        docs.forEach(doc=>output.push(doc[collectionName2]))
        console.log(output)
        res.send(output)


    }

    catch(err){
        console.log(err)
        res.status(403)
        res.send(err)
    }



});


//
// POST
// /api/{table1}/{id1}/{table2}/{id2}
// Creates/updates mapping table called {table1}_{table2}
// (and/or {table2}_{table1}) with foreign keys referencing records table1.id1
// and table2.id2.
// Foreign keys in {table1}_{table2} are called {table1} and {table2}. {table1}
// referring to {table1}.id and {table2} referring to {table2}.id.
//
//
router.post('/:collectionName2/:_id2', function(req, res, next) {
    const collectionName1 = req.params.collectionName1
    const collectionName2 = req.params.collectionName2

    const _id1 = req.params._id1
    const _id2 = req.params._id2

    if (collectionName1 == collectionName2)
    {
        res.status(403)
        res.send({ Error :   "Collection names cannot be same"})
        return
    }

    mappingTableDao.createMapping(collectionName1, collectionName2,_id1,_id2)
        .then(doc=>res.send(doc))
});



//
// Removes record from {table1}_{table2}
// where {table1} and {table2} foreign keys are {id1} and {id2}.
// Records are not removed from {table1} and {table2}.

router.delete('/:collectionName2/:_id2', function(req, res, next) {
    const collectionName1 = req.params.collectionName1
    const collectionName2 = req.params.collectionName2

    console.log("deleting.....")

    const _id1 = parseInt(req.params._id1)
    const _id2 = parseInt(req.params._id2)

    if (collectionName1 == collectionName2)
    {
        res.status(403)
        res.send({ Error :   "Collection names cannot be same"})
        return
    }

    mappingTableDao
        .deleteMappingByBothCollectionId(collectionName1, collectionName2,_id1,_id2)
        .then(doc=>res.send(doc))
        .catch(err=>{
            res.status(403)
            res.send(err)

    })
});
// Removes all records from {table1}_{table2}
// where {table1} foreign key is {id1}.
// Records are not removed from {table1} or {table2}

router.delete('/:collectionName2', function(req, res, next) {
    const collectionName1 = req.params.collectionName1
    const collectionName2 = req.params.collectionName2

    console.log("deleting.....")


    const _id1 = parseInt(req.params._id1)

    if (collectionName1 == collectionName2)
    {
        res.status(403)
        res.send({ Error :   "Collection names cannot be same"})
        return
    }
    mappingTableDao
        .deleteMappingByCollectionId(collectionName1, collectionName2,_id1)
        .then(doc=>res.send(doc))
        .catch(err=>{
            res.status(403)
            res.send(err)

        })
});


module.exports=router
