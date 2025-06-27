import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
          deserunt natus ex. Expedita eos libero quas, illo magni numquam error
          nihil dolor labore aperiam quisquam explicabo! Quasi, ratione.
          Perferendis autem praesentium a numquam culpa. Tenetur laudantium
          beatae sapiente deserunt! Maiores repellendus animi est nulla
          doloremque. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Architecto, doloribus molestias repudiandae soluta, neque quia aut
          magni labore deserunt ipsum hic repellendus nobis ab animi culpa
          voluptatibus? Fuga perspiciatis  ad dignissimos quo dolorum
          nobis ea sint, laudantium quidem eaque sapiente quasi? Blanditiis,
          animi ipsa!
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad,
          voluptates!
        </p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, sequi
          in impedit libero adipisci quis voluptatibus beatae, consequatur quos
          modi, ipsum optio laborum! Inventore dolorem quia nobis beatae. Non
          quae quos quasi soluta quidem corporis!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim,
          cupiditate?
        </p>
        <p>Lorem ipsum dolor sit.</p>
      </div>
    </div>
  );
};

export default Biography;
