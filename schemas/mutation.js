const User = require("../pgAdaptor");
const { GraphQLObjectType, GraphQLString } = require("graphql");
const AdminType = require("./types/UserType");

module.exports = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createAdmin: {
      type: AdminType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const user = await User.exists({ email: args.email });
        if (user === null) {
          const data = new User({
            name: args.name,
            email: args.email,
            password: args.password,
          });
          data.save();
          return {
            name: args.name,
            email: args.email,
            password: args.password,
          };
        }
        throw new Error("Some error");
      },
    },
  },
});
