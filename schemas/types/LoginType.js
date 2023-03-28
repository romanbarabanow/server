const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

module.exports = new GraphQLObjectType({
  name: "loginType",
  fields: () => ({
    userId: { type: GraphQLString },
    token: { type: GraphQLString },
    tokenExpiration: { type: GraphQLInt },
  }),
});
