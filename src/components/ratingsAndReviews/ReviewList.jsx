import React from 'react';
import ReviewTile from './ReviewTile.jsx';

const { useState, useEffect } = React;

const ReviewList = ({reviews}) => {
  const [count, setCount] = useState(2);
  const [renderedReviews, setRenderedReviews] = useState([]);

  const setReviews = () => {
    let result = [];
    for (let i = 0; i < count; i++) {
      if (reviews[i]) {
        result.push(reviews[i]);
      } else {
        break;
      }
    }
    setRenderedReviews(result);
  };

  useEffect(() => {
    setReviews();
  }, [count]);

  return (
    <div className="w-8/12 px-4">
      <div className="overflow-auto px-4 max-h-[90vh]">
        {renderedReviews.map((review) => {
          return <ReviewTile review={review} key={review.review_id} />
        })}
      </div>
      {renderedReviews < reviews ? <button
        onClick={() => { setCount(count + 2); }}
        className="bg-white hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-400 rounded-none shadow mr-4"
      >MORE REVIEWS</button> : ''}
      <button
        className="bg-white hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-400 rounded-none shadow"
      >ADD A REVIEW +</button>
    </div>
  );
};

export default ReviewList;