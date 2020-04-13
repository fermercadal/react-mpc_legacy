import React, { Component } from 'react';
import './App.css';

import clap from "./Sounds/clap.mp3";

import Pad from './Components/Pad';
import Display from './Components/Display';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playedSound: '-',
      padsKit: [
        {
          padKey: 'Q',
          padName: 'The Q sound',
          padSound: clap
        },
        {
          padKey: 'W',
          padName: 'The W sound',
          padSound: clap
        },
        {
          padKey: 'E',
          padName: 'The R sound',
          padSound: clap
        },
        {
          padKey: 'A',
          padName: 'The A sound',
          padSound: clap
        },
        {
          padKey: 'S',
          padName: 'The S sound',
          padSound: clap
        },
        {
          padKey: 'D',
          padName: 'The D sound',
          padSound: clap
        },
        {
          padKey: 'Z',
          padName: 'The Z sound',
          padSound: clap
        },
        {
          padKey: 'X',
          padName: 'The X sound',
          padSound: clap
        },
        {
          padKey: 'C',
          padName: 'The C sound',
          padSound: clap
        },
      ]
    };

    this.playKey = this.playKey.bind(this);
    this.pressKey = this.pressKey.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.pressKey);
  }

  pressKey(e) {
    let validKeys = this.state.padsKit.map(key => key.padKey).concat(this.state.padsKit.map(key => key.padKey.toLowerCase()));
        
    if(validKeys.includes(e.key)) {
      this.playKey(e.key.toUpperCase());
    }
  }

  playKey(padKey) {
    let audio = document.getElementById(padKey);
    audio.play();

    this.updateDisplay(padKey);
  }

  updateDisplay(padKey) {
    let pressedKey = this.state.padsKit.filter(key => key.padKey === padKey);

    this.setState({
      playedSound: pressedKey[0].padName
    });
  }

  render() {
    let padsKit = this.state.padsKit.map((key, i) => {
      return (
        <Pad padKey={key.padKey} padSound={key.padSound} playKey={() => this.playKey(key.padKey)} key={i}  />
      )
    });

    return (
      <main id="drum-machine" className="mpc">
        <Display value={this.state.playedSound} />
        { padsKit }
      </main>
    );
  }

}

export default App;
