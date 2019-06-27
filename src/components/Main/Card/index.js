import React from "react";
import styles from "./styles";

const Card = props => {
    return (
        <div style={{ ...styles.container, ...props.style }}>
            <div style={styles.name}>Gordon "Snake" Hayward</div>
            <img src={props.image} style={styles.playerImage} alt="player_image" />

            <div>Boston Celtics</div>
        </div>
    );
};

export default Card;
