const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} = require("graphql");
const AdminType = require("./types/UserType");
const User = require("../pgAdaptor");
const jwt = require("jsonwebtoken");
const LoginType = require("./types/LoginType");

module.exports = new GraphQLObjectType({
  name: "Query",
  fields: {
    getAllAdmins: {
      type: new GraphQLList(AdminType),
      args: { token: { type: GraphQLString } },
      async resolve(parent, args) {
        const detoken = jwt.verify(args.token, "timurandernestareawesome");
        if (!detoken) {
          throw new Error("Error");
        }
        const isExsist = await User.exists({ email: detoken.email });
        if (isExsist == null) {
          throw new Error("Error");
        }
        const users = await User.find();
        const data = [];
        users.map((el) =>
          data.push({
            email: el.email,
            password: el.password,
            name: el.name,
          })
        );
        return data;
      },
    },
    login: {
      type: LoginType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const user = await User.findOne({ email: args.email });
        if (user === null) {
          throw new Error("Login or password are incorrect");
        }
        if (user.password !== args.password) {
          throw new Error("Login or password are incorrect");
        }
        const id = user._id;
        const token = jwt.sign(
          { email: user.email },
          "timurandernestareawesome"
        );
        return {
          token: token,
          tokenExpiration: 1,
        };
      },
    },
  },
});
