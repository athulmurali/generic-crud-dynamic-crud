
const filterElement=( queryDict,valueDict )=>    {
    const defaultReturn = true;
    console.log("value dict : ")
    console.log(valueDict)
    console.log("query dict")
    console.log(queryDict)

    for (let i in Object.keys(queryDict))
    {
        const queryKey =  new String(Object.keys(queryDict)[i])
        console.debug({[queryKey] : queryDict[queryKey]}, "===", {[queryKey] : valueDict[queryKey]},
            queryDict[queryKey] ==  valueDict[queryKey])
        if ( queryDict[queryKey] !=  valueDict[queryKey]){return false}
    }
    return defaultReturn
}


const queryFilter=(req, res,next )=>{
    console.info("passing through queryFilter")

    const data = req.modelArray
    console.log(data)

    console.log("Query type : ")
    console.log(req.query.type)
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
