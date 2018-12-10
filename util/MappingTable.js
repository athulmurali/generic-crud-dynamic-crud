const getMappingTableName = (collectionName1, collectionName2)=>{

    const arrToSort= [collectionName1,collectionName2]
    arrToSort.sort()
    return arrToSort.join("_")
}

module.exports= getMappingTableName
