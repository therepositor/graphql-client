import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { addAuthorsQuery, addBookMutation, getBooksQuery } from './queries/queries';



export class AuthorList extends Component {
    constructor(props)  {
        super(props)
        this.state = {
            name: '',
            genre: '',
            authorid: ''
        }
    }
    displayAuthors()   {
        const data = this.props.addAuthorsQuery

        if(data.loading)    {
            return (
                <option disabled>Loading Authors</option>
            )
        } else  {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            })
        }
    }
    submitForm(e)   {
        e.preventDefault();
        console.log(this.props)
        this.props.addBookMutation({
            variables:  {
                name: this.state.name,
                genre: this.state.genre,
                authorid: this.state.authorid
            },
            refetchQueries: [{query: getBooksQuery}]
        });
        
    }
    render() {
        return (
            <form id='add-book' onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label htmlFor="book_name">Book name:</label>
                    <input onChange={(e) => this.setState({name: e.target.value})} type="text" name="book_name" id="book_name" />
                </div>
                <div className="field">
                    <label htmlFor="genre">Genre:</label>
                    <input onChange={(e) => this.setState({genre: e.target.value})} type="text" name="genre" id="genre" />
                </div>
                <div className="field">
                    <label htmlFor="author">Author:</label>
                    <select onChange={(e) => this.setState({authorid: e.target.value})} name="author" id="author">
                        {this.displayAuthors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        )
    }
}

export default compose(
    graphql(addAuthorsQuery, {name: "addAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
    )(AuthorList) 
