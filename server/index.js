const { ApolloServer, gql } = require('apollo-server');
const { mainCards, animals, categories } = require('./db');

// === TYPE DEFINITIONS ===
const typeDefs = gql`
  type MainCard {
      title: String!
      image: String!
  }

  type Animal {
      id: ID!
      image: String!
      title: String!
      rating: Float
      price: String!
      description: [String!]!
      slug: String
      stock: Int!
      onSale: Boolean
      category: Category
  }

  type Category {
      id: ID!
      image: String!
      category: String!
      slug: String!
      animals: [Animal!]!
  }

  type Query {
    mainCards: [MainCard]
    animals: [Animal]
    animal(slug: String!): Animal
    categories: [Category!]!
    category(slug: String!): Category
  }
`;




 // ==== RESOLVERS & QUERIES ====
const resolvers = {
    Query: {
      mainCards: () => mainCards,
      animals: () => animals,
      animal: (parent, args, ctx) => {
          let animal = animals.find((animal) => animal.slug === args.slug);
          console.log(args);
          return animal;
      },
      categories: () => categories,
      category: (parent, args, ctx) => {
        let category = categories.find((category => category.slug === args.slug));
        console.log(args);
        return category;
      }
    },
  };

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});