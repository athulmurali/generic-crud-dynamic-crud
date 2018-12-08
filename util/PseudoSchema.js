const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaDataTypes = require('../const/SchemaDataTypes')

 const sampleCollectionSchema  = {
    collection : {
        required : true
    },
    fields :
        {
            id : Number,
            name : String,
        }
}

function convertSchema(schemaToCreate){
    console.log("Collection name to create : ", schemaToCreate.collection)
    const schema = monngoose.Schema({

    }, {collection :schemaToCreate.collection})

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

        default : return String

    }
}
