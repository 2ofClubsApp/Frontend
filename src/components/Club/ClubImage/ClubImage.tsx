import React from 'react';
import styles from "./ClubImage.module.css";

type clubImageDefinition = {
  imgURL: string
  clubName: string
}

const ClubImage = (input: clubImageDefinition) => {
  return (
    <div className={styles.logoBox}>
      <img className={styles.logo} src={input.imgURL} alt={"Image of " + input.clubName}/>
    </div>
  )
}

export default ClubImage;