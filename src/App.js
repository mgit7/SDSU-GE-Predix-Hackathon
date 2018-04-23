import React, { Component } from "react";
import MapView from "./MapView";
import "./App.css";
import {
  data1,
  data2,
  data3,
  data4,
  data5,
  data6,
  data7,
  data8,
  data9,
  data10,
  data11,
  data12,
  data13,
  data14,
  data15,
  data16,
  data17,
  data18,
  data19,
  data20,
  data21,
  data22,
  data23,
  data24,
  data25,
  data26,
  data27,
  data28,
  data29
} from "./data";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationTitle: "Predix Hackathon: San Diego State University ",
      energySaved: 0,
      energyUsed: 0,
      dataArray: [
        data1,
        data2,
        data3,
        data4,
        data5,
        data6,
        data7,
        data8,
        data9,
        data10,
        data11,
        data12,
        data13,
        data14,
        data15,
        data16,
        data17,
        data18,
        data19,
        data20,
        data21,
        data22,
        data23,
        data24,
        data25,
        data26,
        data27,
        data28,
        data29
      ],
      dataSimulation: { data: [] },
      simulateClicked: true
    };

    this.onClickSimulation = this.onClickSimulation.bind(this);
    this.simulate = this.simulate.bind(this);
    this.nodeBrightness = this.nodeBrightness.bind(this);
    this._data1 = [];
    this.i = 0;
    /*eslint-disable no-undef*/
    //Access Token from Mapbox
    this.mapboxClient = new MapboxClient(
      "pk.eyJ1IjoibWdpdDciLCJhIjoiY2pnOTM5bmk3MmxiMTJybGpzNDI2cDAxbyJ9.Y6WzeD8QBJK3wl51CiLKDg"
    );
    /*eslint-enable no-undef*/
  }

  // Function that calculates the amount of brightness to
  // set for each node
  nodeBrightness() {
    var energyUsed = 0;
    var energySaved = 0;
    var totalBrightness = 0;
    this._data1.data.forEach(m => {
      m.brightness = 0;
    });

    // Calculate the outer and inner brightness levels for
    // adaptive lighting
    this._data1.data.forEach((m, i) => {
      if (
        (m.numberOfPedestrians === 0 || m.numberOfPedestrians === "N/A") &&
        m.brightness === 0
      ) {
        m.brightness = 10;
      } else if (m.numberOfPedestrians > 0) {
        m.brightness = 100;
        this._data1.data.forEach((n, key) => {
          if (
            n.latitude >= m.latitude - 0.004 &&
            n.latitude <= Number(m.latitude) + 0.004 &&
            n.longitude >= m.longitude - 0.004 &&
            n.longitude <= Number(m.longitude) + 0.004 &&
            n.brightness !== 100
          ) {
            n.brightness = 60;
          }
          if (
            n.latitude >= m.latitude - 0.001 &&
            n.latitude <= Number(m.latitude) + 0.001 &&
            n.longitude >= m.longitude - 0.001 &&
            n.longitude <= Number(m.longitude) + 0.001
          ) {
            n.brightness = 100;
          }
        });
      }
    });

    //Set the marker elements accordingly
    this._data1.data.forEach(m => {
      totalBrightness += m.brightness;
      if (m.brightness === 100) {
        m.type = "important"; //red color
      } else if (m.brightness === 60) {
        m.type = "warning";
      } else if (m.brightness === 10) {
        m.type = "info";
      }
    });

    // Amount of energy being saved
    energyUsed = Math.round(totalBrightness / this._data1.data.length);
    energySaved = Math.round(100 - energyUsed);

    this.setState({ energyUsed: energyUsed, energySaved: energySaved });
  }

  //This is a hack
  onClickSimulation() {
    this.setState({ simulateClicked: !this.state.simulateClicked });
    if (this.state.simulateClicked)
      this.interval = setInterval(this.simulate, 5000);
    else {
      clearInterval(this.interval);
      // console.log("else stament triggered");
    }
  }
  // Simulate the data
  simulate() {
    if (this.i >= 0) {
      this.setState({
        dataSimulation: this.state.dataArray[this.i]
      });
      this.i--;
    } else {
      this.i = 28;
      this.setState({
        dataSimulation: this.state.dataArray[this.i]
      });
    }
    this._data1 = this.state.dataSimulation; //Set the data that is being simulated 
    this.nodeBrightness();
    this.setState(this.state);
  }
  componentDidMount() {}
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <px-branding-bar applicationTitle={this.state.applicationTitle}></px-branding-bar>

        </div>
        <div style={{ position: "absolute", zIndex: 2 }}>
          <div style={{ width: "120px", marginTop: 40, marginLeft: 40 }}>
            <button
              className="btn btn--primary"
              style={{ width: "100%" }}
              // Handle the simulation logic here
              //State doesnt update right after so logic is a bit reversed
              onClick={() => this.onClickSimulation()}
            >
              {!this.state.simulateClicked ? "Stop Simulation" : "Simulate"}
            </button>
          </div>
          <div style={{ width: "120px", marginTop: 40, marginLeft: 40 }}>
            <h3 style={{ textAlign: "center" }}>
              Percent of Energy being Used
            </h3>
            <px-percent-circle
              val={this.state.energyUsed}
              max="100"
              thickness="15"
            />
          </div>

          <div style={{ width: "120px", marginTop: 40, marginLeft: 40 }}>
            <h3 style={{ textAlign: "center" }}>
              Percent of Energy being Saved
            </h3>
            <px-percent-circle
              val={this.state.energySaved}
              max="100"
              thickness="15"
            />
          </div>
          <div style={{ width: "120px", marginTop: 40, marginLeft: 40 }}>
            <h3 style={{ textAlign: "center", color: "green" }}>
              Green: 10% Brightness
            </h3>
            <h3 style={{ textAlign: "center", color: "orange" }}>
              Orange: 60% Brightness
            </h3>
            <h3 style={{ textAlign: "center", color: "red" }}>
              Red: 100% Brightness
            </h3>
          </div>
        </div>
        <div className="app-content">
          <MapView
            mapboxClient={this.mapboxClient}
            dataSimulation={this.state.dataSimulation}
          />
        </div>
      </div>
    );
  }
}

export default App;
