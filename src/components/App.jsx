import React from 'react';
import {useState} from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux';
import {question, openModal, closeModal} from '../redux/actions/index.js'
import Modal from './Modal.jsx'

// import components
import Overview from './overview/Overview.jsx';
import RPandOL from './relatedProducts/RPandOL.jsx';
import QuestionsAndAnswers from './QuestionsAnswers/QuestionsAnswers.jsx'
import RatingsAndReviews from './ratingsAndReviews/RatingsAndReviews.jsx';

export default function App() {
  let isOpen = useSelector(state => state.open)
  console.log(isOpen)
  const dispatch = useDispatch();
  const handleClick = (() => {
    dispatch(question())
    dispatch(openModal())
  })
return (

  <div>
    <Overview />
    <RPandOL />
    <QuestionsAndAnswers/>
    <RatingsAndReviews />
    <Modal isOpen={isOpen} type = {useSelector(state => state.modalType)} onClose = {() => dispatch(closeModal())}/>
    <button onClick = {() => handleClick()}>Open Modal</button>
  </div>

)
};