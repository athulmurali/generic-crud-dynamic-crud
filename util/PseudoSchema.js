// const mongoose = require('mongoose');

const SchemaDataTypes = require('../const/SchemaDataTypes')

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

        default : return String

    }
    return  String
}


const sampleCollectionSchema  = {
    collection : "sampleCollection",
    fields :
        {
            _id : Number,
            name : returnTypeFunction(SchemaDataTypes.STRING)
        }
}

// function convertSchema(schemaToCreate){
//     console.log("Collection name to create : ", schemaToCreate.collection)
//     const schema = mongoose.Schema({
//
//     }, {collection :schemaToCreate.collection})
//
// }
//

module.exports={sampleCollectionSchema}
