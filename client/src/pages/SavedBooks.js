<<<<<<< HEAD
import React from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { REMOVE_BOOK } from "../utils/mutations";
import { GET_ME } from "../utils/queries";
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
=======
import React, { useState, useEffect } from 'react';
>>>>>>> 4bc1433eee0642fddb664822cc206bc18e83cbef
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

<<<<<<< HEAD
const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  if (loading) {
    return <h2>LOADING...</h2>;
  }
  
  const userData = data?.me || {};
  console.log(data.me)

  // function to delete book from database
  const handleRemoveBook = async (bookId) => {
=======
import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
>>>>>>> 4bc1433eee0642fddb664822cc206bc18e83cbef
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

<<<<<<< HEAD
    // new code
    try {
    const response = await removeBook({ variables: { bookId } });
        console.log('Deleted record: ', response);
        if (error) {
          console.log(error);
        }
      // also remove from Localstorage
      removeBookId(bookId);
    } catch (err) {
      // display any caught errors here
        console.error(err);
    }
  };

=======
    try {
      const response = await deleteBook(bookId, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }
>>>>>>> 4bc1433eee0642fddb664822cc206bc18e83cbef

  return (
    <>
      <div fluid className='text-light bg-dark p-5'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
<<<<<<< HEAD
          {userData.savedBooks?.length
            ? `Viewing ${userData.savedBooks?.length} saved ${userData.savedBooks?.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks?.map((book) => {
=======
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
>>>>>>> 4bc1433eee0642fddb664822cc206bc18e83cbef
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
<<<<<<< HEAD
                    <Button className='btn-block btn-danger' onClick={() => handleRemoveBook(book.bookId)}>
=======
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
>>>>>>> 4bc1433eee0642fddb664822cc206bc18e83cbef
                      Delete this Book!
                    </Button>
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

export default SavedBooks;
