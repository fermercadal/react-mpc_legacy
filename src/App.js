import React, { Component } from 'react';
import './App.css';

import kick1 from "./Sounds/kick-1.mp3";
import kick2 from "./Sounds/kick-2.mp3";
import snare1 from "./Sounds/snare-1.mp3";
import snare2 from "./Sounds/snare-2.mp3";
import ch from "./Sounds/hihat-close.mp3";
import oh from "./Sounds/hihat-open.mp3";
import hit1 from "./Sounds/hit-1.mp3";
import hit2 from "./Sounds/hit-2.mp3";
import trumpet from "./Sounds/trumpet.mp3";

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
          padName: 'Hit A',
          padSound: hit1
        },
        {
          padKey: 'W',
          padName: 'Hit B',
          padSound: hit2
        },
        {
          padKey: 'E',
          padName: 'Trumpet',
          padSound: trumpet
        },
        {
          padKey: 'A',
          padName: 'Snare A',
          padSound: snare1
        },
        {
          padKey: 'S',
          padName: 'Snare B',
          padSound: snare2
        },
        {
          padKey: 'D',
          padName: 'Open HiHat',
          padSound: oh
        },
        {
          padKey: 'Z',
          padName: 'Kick A',
          padSound: kick1
        },
        {
          padKey: 'X',
          padName: 'Kick B',
          padSound: kick2
        },
        {
          padKey: 'C',
          padName: 'Close HiHat',
          padSound: ch
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
    audio.currentTime = 0;
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
