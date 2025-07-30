import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider as Provider } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://ktpnnhqmpqzslttojkle.hasura.ap-southeast-1.nhost.run/v1/graphql"
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    "x-hasura-admin-secret": "OhMc2TAQJ^JIiA7G!U$-ugr_9,5tTa'S" 
}}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export const ApolloClientProvider: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <Provider client={client}>{children}</Provider>
);
