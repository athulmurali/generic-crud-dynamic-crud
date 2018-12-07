const express = require('express');
const router = express.Router();

const TABLE_NAME = "tableName"

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Hola! I  am a cool api');
});

//
router.get('/:'+TABLE_NAME,(req,res,next)=>{



    res.send('Checking if exists  :  tableName : ' + path);

})


router.post('/:'+TABLE_NAME,(req,res,next)=>{

    const path =req.params[TABLE_NAME]

    const schem =  [1,2,4]

    schem.map(val =>{
        console.log(val)
        return {[val] : String}
    })
    console.log(schem)

    res.send('Checking if exists  :  tableName : ' + path);
})


router.put('/:'+TABLE_NAME,(req,res,next)=>{

    const path =req.params[TABLE_NAME]
    res.send('Checking if exists  :  tableName : ' + path);
})


module.exports = router;
