import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useContext } from "react";

function Main({ onCardClick, clothingItems, onCardLike, isLoggedIn }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main>
      <section className="cards">
        <p className="cards__text">Search for resources near you.</p>
        <ul className="cards__list">
          {clothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;

// <ul className="cards__list">
//         {clothingItems
//           .filter((item) => {
//             return item.zip === resourceData.zip;
//           })
//           .map((item) => {
//             return (
//               <ItemCard
