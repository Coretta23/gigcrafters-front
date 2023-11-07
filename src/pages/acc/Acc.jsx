import React from "react";
import "./Acc.scss";
import Feature from "../../components/navbar/feature/feature";
import Trusted from "../../components/navbar/trusted/trusted";
import Slide from "../../components/navbar/slide/Slide";
import CatCard from "../../components/navbar/catCard/CatCard";
import { cards, projects } from "../data";
import ProjectCard from "../../components/navbar/projectCard/ProjectCard";
const Acc = () => {
    return (
   <div>
    <Feature />
        <Trusted />
        <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>

     
      <Slide slidesToShow={5} arrowsScroll={5}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>
     </div>
            
    )
}
export default Acc