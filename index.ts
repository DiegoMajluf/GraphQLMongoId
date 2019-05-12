import assertErr = require('assert-err')

import { GraphQLScalarType, GraphQLError, Kind, StringValueNode } from "graphql";
import { ObjectId } from "mongodb";

export const GraphQLMongoId = new GraphQLScalarType({
    name: 'MongoId',

    
    serialize:  (value: ObjectId): string => {
        assertErr(ObjectId.isValid(value) && value instanceof ObjectId, TypeError, 'Field error: value is not a ObjectId BSON')
        return value.toHexString()
    },

    parseValue: (value: string): ObjectId => {
        assertErr(ObjectId.isValid(value), TypeError, 'Field error: value is not a ObjectId BSON')
        return new ObjectId(value)
    },

    
    parseLiteral: (ast: StringValueNode): ObjectId => {
        assertErr(ast.kind === Kind.STRING,
            GraphQLError, 'Query error: Can only parse strings to BSON ObjectId but got a: ' + ast.kind, [ast])

        assertErr(ObjectId.isValid(ast.value), TypeError, 'Field error: value is not a ObjectId BSON')

        return new ObjectId(ast.value)
    }
})