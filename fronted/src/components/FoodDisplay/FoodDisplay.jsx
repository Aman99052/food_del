import React, { useContext } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../context/StoreContext';

// Define the base URL for your images if needed
const url = 'http://localhost:4000';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {food_list.map((item,index) => {
          {console.log(category,item.category);}
          if (category === "All" || category === item.category) {
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
              ;
          }
         // return null; // Ensure to return null if item doesn't match the filter
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
