import React from 'react';
import styles from "./ClubImage.module.css";

type clubImageDefinition = {
  imgURL: string
  clubName: string
}

const ClubImage = (input: clubImageDefinition) => {
  let imgURL = input.imgURL
  if (input.imgURL === "") {
    imgURL = "https://www.nicepng.com/png/detail/203-2035848_club-symbol-card-shape-game-playing-shapes-play.png";
  }

  return (
    <div className={styles.logoBox}>
      <img className={styles.logo} src={imgURL} alt={"Image of " + input.clubName}/>
    </div>
  )
}

export default ClubImage;