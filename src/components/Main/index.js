import React, { Component } from "react";
import Search from "./Search";
import Card from "./Card";
import styles from "./styles";
import axios from 'axios';

class Main extends Component {

    constructor() {
      super();
      this.state = {
        players: [],
        teams: []
      }
    }
    render() {
        // PREP THE PLAYER CARD COMPONENT WITH THE DATA IT NEEDS
        const playerList = this.state.players.map((player, key) => {
          const image = `http://localhost:3008/${player.image}`
          const team = this.state.teams.find(team => team.id === player.team)
          return(<Card
            name={player.name}
            team={team.name}
            image={image}
            key={key}
          />)
        });


        return (
            <div style={{ ...styles.container, ...this.props.style }}>
                <div style={styles.title}>NBA Interview</div>
                <Search style={styles.search} />

                {playerList}
            </div>
        );
    }

    async componentDidMount() {
      
      // GET THE PLAYER LIST
      const playersResult = await axios.get('http://localhost:3008/players');
      const players = playersResult.data;
      console.log('GOT PLAYERS', players);

      // GET THE TEAMS LIST
      const teamsResult = await axios.get('http://localhost:3008/teams');
      const teams = teamsResult.data;
      console.log('GOT TEAMS', teams);


      this.setState({players, teams})
    }
}

export default Main;
