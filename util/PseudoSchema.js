const mongoose = require('mongoose');

const SchemaDataTypes = require('../const/SchemaDataTypes')


const sampleCollectionSchema  = {
    collection : "sampleCollection",
    fields :
        {
            _id     :   SchemaDataTypes.NUMBER,
            name    :  SchemaDataTypes.STRING
        }
}

// const createCollection =()=>{
//     mongoose.connection.db.createCollection(collection_name, (err) => {...});
//
// }
/**
 *
 * @param typeNameInString
 * @returns {StringConstructor}
 *
 * The default parameter is set to string
 * At this point of time,
 * there are two data types supported "STRING" , "OBJECT_ID", "NUMBER"
 *
 */
const returnTypeFunction=(typeNameInString)=>{
    switch (typeNameInString){
        case  SchemaDataTypes.STRING  : return String
        // case  SchemaDataTypes.OBJECT_ID  :return Schema.typed.
        // case  SchemaDataTypes.NUMBER  : return Number

        case SchemaDataTypes.NUMBER: return Number


        default : return String

    }
    return  String
}



const convertStringInputCollectionToTyped=(inputCollection)=>
{
    console.log(inputCollection)
    const newDict = {}
    Object.keys(inputCollection).forEach((key)=> newDict[key] = returnTypeFunction(inputCollection[key]))
    return newDict
}


function convertSchema(collectionName, untypedStringFieldsDict){
    console.log("Collection name to create : ",collectionName)
    console.log(untypedStringFieldsDict)


    const schema = mongoose.Schema({

        ...untypedStringFieldsDict


    }, {collection :collectionName})

    console.log(schema)

    return schema

}

convertStringInputCollectionToTyped(sampleCollectionSchema)
const exportedSchema = convertSchema(sampleCollectionSchema.collection, convertStringInputCollectionToTyped(sampleCollectionSchema.fields))

const exportedModel = mongoose.model( sampleCollectionSchema.collection,exportedSchema)


// exportedModel.create({name : 'test',_id: 23}).then(console.log).catch(console.log)
// exportedModel.create({name : 'test',_id: 2345}).then(console.log).catch(console.log)



module.exports={sampleCollectionSchema}



