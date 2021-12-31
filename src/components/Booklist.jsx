import React, { Component } from 'react';
import { getBooksQuery } from './queries/queries';
import { graphql } from 'react-apollo';
import BookDetails from './BookDetails'


export class Booklist extends Component {
    constructor(props){
        super(props)
        this.state = {
            selected: null
        }
    }
    displayBooks()  {
        const data = this.props.data
        if(data.loading)    {
            return (
                <div> loading books....
                </div>
            )    
        } else {
            return data.books.map(book => {
               return (
                <li key={book.id} onClick={(e) => {this.setState({selected: book.id})}}>{book.name}</li>
               ) 
            })
        }
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <ul id='book-list'>
                    {this.displayBooks()}
                </ul>
                <BookDetails bookid={this.state.selected} />
            </div>
            
        )
    }
}

export default graphql(getBooksQuery)(Booklist)
