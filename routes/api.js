const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Hola! I  am a cool api');
});

//
router.get('/:path',(req,res,next)=>{
    console.log(req.params)

    connso:
    res.send('api path is :' + JSON.stringify(req.params));
})



module.exports = router;
