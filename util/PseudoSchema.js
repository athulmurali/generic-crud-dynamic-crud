const mongoose = require('mongoose');

const SchemaDataTypes = require('../const/SchemaDataTypes')
const metaCollectionModel = require('../data/MetaCollection').metaCollectionModel


const sampleCollectionSchema  = {
    collection : "sampleCollection",
    fields :
        {
            _id     :   SchemaDataTypes.NUMBER,
            name    :  SchemaDataTypes.STRING
        }
}
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
    // console.log(inputCollection)
    const newDict = {}
    Object.keys(inputCollection).forEach((key)=> newDict[key] = returnTypeFunction(inputCollection[key]))
    return newDict
}

const convertSchema= (collectionName, untypedStringFieldsDict)=>
    mongoose.Schema(convertStringInputCollectionToTyped({...untypedStringFieldsDict}), {collection :collectionName})


convertStringInputCollectionToTyped(sampleCollectionSchema)


const getSchemaByCollectionName= async (collectionName) => {
    const collectionSchema = await  metaCollectionModel.findById(collectionName)
    return collectionSchema.fields[0]
}


const getModelByCollectionName = async(collectionName)=>{

    // await mongoose.disconnect()
    // await mongoose.connect(process.env.DB_URL,{useNewUrlParser: true})
    const schemaInDB = await getSchemaByCollectionName(collectionName)
    const convertedSchema = convertSchema(collectionName, schemaInDB)
    delete mongoose.connection.models[collectionName];

    return new mongoose.model( collectionName, convertedSchema)
}



console.log("PseudoSchemaLoaded")
module.exports={sampleCollectionSchema,getModelByCollectionName}



