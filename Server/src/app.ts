import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers'; // Import the resolvers
import typeDefs from 'SwiggyInterfaces/src'; // Import the combined typeDefs
 
const server = new ApolloServer({
  typeDefs, // Use the combined typeDefs 
  resolvers, // Add your resolvers
}); 
  
const startServer = async () : Promise<string> => { 
  const { url } = await server.listen(); 
  return `Server ready at ${url}`;
}; 
console.log(startServer());           
                            
                       
                                                                                             