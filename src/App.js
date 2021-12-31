import Booklist from './components/Booklist';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import AuthorList from './components/AuthorList';

function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
  })
  return (
    <ApolloProvider client={client}>
      <div id='main' className="App">
        <h1>Teddy's Reading List</h1>
        <Booklist />
        <AuthorList />
      </div>
    </ApolloProvider>
    
  );
}

export default App;
