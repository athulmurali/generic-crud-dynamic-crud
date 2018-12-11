const mongoose = require('mongoose')



// const sendResOnNoCollection=(req, res,next )=>{
//     console.info("Passing through queryFilter: --------")
//
//     console.log("query strings : ")
//     console.log(req.query)
//
//     }


const filterElement=( queryDict,valueDict)=>{
    console.log("filterElement---")
    const defaultReturn = true;

    for (let i in Object.keys(queryDict))
    {
        const queryKey =  Object.keys(queryDict)[i]
        console.debug({[queryKey] : queryDict[queryKey]}, "====", {[queryKey] : valueDict[queryKey]},
            queryDict[queryKey] ==  valueDict[queryKey])
        if ( queryDict[queryKey] !=  valueDict[queryKey]){return false}
    }
    return defaultReturn
}


const queryFilter=(req, res,next )=>{
    console.info("passing through queryFilter")

    const data = req.modelArray
    console.log(data)

    const queryDict = req.query

    const filteredDataArray= data.filter(valueDict => {
        console.log(filterElement(queryDict, valueDict))
        return filterElement(queryDict, valueDict)
    })

    console.info("Filtered data : ")
    console.log(filteredDataArray)

    res.send(filteredDataArray)


}
//


module.exports={queryFilter}
