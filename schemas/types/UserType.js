const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

const AdminType = new GraphQLObjectType({
  name: "AdminType",
  fields: () => ({
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

module.exports = AdminType;
