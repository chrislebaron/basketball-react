import React, { Component } from "react";
import Search from "./Search";
import Card from "./Card";
import styles from "./styles";
import axios from 'axios';
import parse from 'parse-link-header'

class Main extends Component {

    constructor() {
      super();
      this.state = {
        players: [],
        teams: [],
        links: {}
      }
    }


    render() {
        // PREP THE PLAYER CARD COMPONENT WITH THE DATA IT NEEDS
        const playerList = this.state.players.map((player, key) => {
          const image = `http://localhost:3008/${player.image}`
          const team = this.state.teams.find(team => team.id === player.team)
          return(<Card
            name={player.name}
            image={image}
            team={team ? team.name : ''}
            key={key}
          />)
        });

        return (
            <div style={{ ...styles.container, ...this.props.style }}>
                <div style={styles.title}>NBA Interview</div>
                <Search style={styles.search} />

                {playerList}
              <div style={styles.pagination}>
                  <a href="#" onClick={() => this.getPlayers(this.state.links.prev ? this.state.links.prev.url: null)}>Previous</a> | <a href="#" onClick={() => this.getPlayers(this.state.links.next ? this.state.links.next.url : null)}>Next</a>
              </div>
            </div>
        );
    }

    async componentDidMount() {
        // GET THE PLAYER LIST
        await this.getPlayers();

        // GET THE TEAMS LIST
        const teamsResult = await axios.get('http://localhost:3008/teams');
        const teams = teamsResult.data;
        console.log('GOT TEAMS', teams);
        this.setState({teams})
    }

    getPlayers = async (url) => {
      // console.log('URL CLICKED', url);
      if(!url) url = "http://localhost:3008/players?_page=1&_limit=10";
      const playersResult = await axios.get(url);
      // console.log('Full Player Results Info', playersResult);
      const players = playersResult.data;
      // console.log('GOT PLAYERS', players);

      const links = parse(playersResult.headers.link);
      console.log('GOT THE LINKS', links);

      this.setState({players, links});
    }
}

export default Main;
