
const express = require('express');
const router = express.Router({mergeParams : true});
const getMappingTableName = require('../util/MappingTable')
const mappingTableDao = require('../Dao/MappingTable')


// GET
// /api/{table1}/{id}/{table2}
// Retrieves records from {table2} whose primary key {table2}.id = {table1}_{table2}.{table2} AND {table1}.{id} = {table1}_{table2}.{table1}. Returns empty array if tables or IDs don't exist



/* GET document  from the given collection name by ID  . */
router.get('/:collectionName2/:_id2', function(req, res, next) {
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

    mappingTableDao.getAllMapping(collectionName1, collectionName2)
        .then(docs=>res.send(docs))
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





module.exports=router
