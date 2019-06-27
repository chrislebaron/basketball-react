import React, { Component } from "react";
import Search from "./Search";
import Card from "./Card";
import styles from "./styles";

class Main extends Component {
    render() {
        return (
            <div style={{ ...styles.container, ...this.props.style }}>
                <div style={styles.title}>NBA Interview</div>
                <Search style={styles.search} />
                <Card
                  name='Gordon "Snake" Hayward'
                  team="Boston Celtics"
                  image="http://localhost:3008/gordon_hayward.png"
                />
            </div>
        );
    }
}

export default Main;
