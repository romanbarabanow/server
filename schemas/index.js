const { GraphQLSchema } = require("graphql");
const RootQuery = require("./query");
const Mutation = require("./mutation");

const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

module.exports = schema;
