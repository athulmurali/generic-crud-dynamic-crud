const express = require('express');
const router = express.Router();

const TABLE_NAME = "tableName"

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




router.post('/',(req,res,next)=>{
    const newOrOldTable = {...req.body}
    console.log(newOrOldTable)

    metaCollectionDao.createAndUpdate(newOrOldTable)
        .then(createdOrUpdated=>{
            console.log(createdOrUpdated)
        res.send(createdOrUpdated)
    })
        .catch(err =>{
            console.error({Error : JSON.stringify(err)})
            res.send({error : "error in creation"})

        })


})


// //
// router.get('/:path'+TABLE_NAME,(req,res,next)=>{
//
// //return collections of that tables
//
//
// })


module.exports = router;
