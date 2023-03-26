import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { useMutation } from "@apollo/client";
import { SAVE_BOOK } from "../utils/mutations";
import Auth from '../utils/auth';
import { searchGoogleBooks } from '../utils/API';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
=======
>>>>>>> 4bc1433eee0642fddb664822cc206bc18e83cbef
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

<<<<<<< HEAD
const SearchBooks = () => {

  const [searchedBooks, setSearchedBooks] = useState([]);

  const [searchInput, setSearchInput] = useState('');

  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  const [saveBook, { error }] = useMutation(SAVE_BOOK)


=======
import Auth from '../utils/auth';
import { saveBook, searchGoogleBooks } from '../utils/API';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

const SearchBooks = () => {
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
>>>>>>> 4bc1433eee0642fddb664822cc206bc18e83cbef
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

<<<<<<< HEAD

=======
  // create method to search for books and set state on form submit
>>>>>>> 4bc1433eee0642fddb664822cc206bc18e83cbef
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
<<<<<<< HEAD
        link: book.volumeInfo.infoLink,
=======
>>>>>>> 4bc1433eee0642fddb664822cc206bc18e83cbef
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

<<<<<<< HEAD
  const handleSaveBook = async (bookId) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

=======
  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // get token
>>>>>>> 4bc1433eee0642fddb664822cc206bc18e83cbef
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
<<<<<<< HEAD
      await saveBook({
        variables: { input: { ...bookToSave } },
      });
=======
      const response = await saveBook(bookToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if book successfully saves to user's account, save book id to state
>>>>>>> 4bc1433eee0642fddb664822cc206bc18e83cbef
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div fluid className='text-light bg-dark pt-5'>
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
<<<<<<< HEAD
            <Row>
=======
            <Form.Row>
>>>>>>> 4bc1433eee0642fddb664822cc206bc18e83cbef
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
<<<<<<< HEAD
            </Row>
=======
            </Form.Row>
>>>>>>> 4bc1433eee0642fddb664822cc206bc18e83cbef
          </Form>
        </Container>
      </div>

      <Container>
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {searchedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? (
                    <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveBook(book.bookId)}>
                        {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                          ? 'This book has already been saved!'
                          : 'Save this Book!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

<<<<<<< HEAD
export default SearchBooks;
=======
export default SearchBooks;
>>>>>>> 4bc1433eee0642fddb664822cc206bc18e83cbef
