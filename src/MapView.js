import React, { Component } from "react";
import Map from "./Map.js";

import "./MapView.css";

const tileLayerUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";


class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 32.708916,
      lng: -117.154221,
      zoom: 13
    };
  }

  onMapMoved({ lat, lng, zoom }) {
    if (
      this.state.lat !== lat ||
      this.state.lng !== lng ||
      this.state.zoom !== zoom
    ) {
      this.setState({ lat, lng, zoom });
    }
  }
  render() {
    return (
      <div className="map-view">
        <Map
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          tileLayerUrl={tileLayerUrl}
          onMapMoved={this.onMapMoved.bind(this)}
          dataSimulation={this.props.dataSimulation}
        />
        <div className="map-view-toolbar">
          <div className="map-view-mode-buttons" />
        </div>
      </div>
    );
  }
}

export default MapView;
