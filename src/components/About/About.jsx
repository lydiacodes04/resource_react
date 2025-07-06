import "./About.css";
import { Link } from "react-router-dom";
import chicken from "../../images/chicken.jpg";

function About({}) {
  return (
    <div className="about">
      <p className="about__title">Meet the Website Developer: Lydia Lockhart</p>
      <div className="about__description">
        <img
          className="about__picture"
          src={chicken}
          alt="photo of Lydia, website creator, holding a chicken"
        />
        <div className="about__bio">
          Hi! My name is Lydia Lockhart, and I am a social services professional
          who has learned to code! My love of learning human languages led me to
          be interested in computer languages. As I explored coding, I was
          intrigued by how communicating with computers, I could design
          interactive websites. I decided to apply my software development
          skills to design an app youth could use to find resources near them.
        </div>
      </div>
    </div>
  );
}

export default About;
