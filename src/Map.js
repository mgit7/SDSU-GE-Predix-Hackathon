import React, { Component } from "react";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this._onMapMoved = this._onMapMoved.bind(this);
    this._nodes = [];
    this._data1 = [];
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this._data1 = this.props.dataSimulation;
    this.$map.addEventListener("px-map-moved", this._onMapMoved);
    this.updateMapProps(this.$map, this.props);
    this.updateMarkers(this.$map);
    this.$tileLayer.url = this.props.tileLayerUrl;
  }

  componentWillUnmount() {
    this.$map.removeEventListener("px-map-moved", this._onMapMoved);
  }

  componentWillReceiveProps(nextProps) {
    this._data1 = nextProps.dataSimulation;
    this.updateMapProps(this.$map, nextProps);
    this.updateMarkers(this.$map);
    this.$tileLayer.url = nextProps.tileLayerUrl;
  }

  //Update the maps props
  updateMapProps(el, props) {
    el.lat = props.lat;
    el.lng = props.lng;
    el.zoom = props.zoom;
  }

  updateMarkers(el) {
    let numberOfCars;
    let numOfPeds;

    // Reset all nodes from the map
    if (this._nodes.length) {
      this._nodes.forEach(m => {
        el.removeChild(m);
      });
      this._nodes = [];
    }
    this._data1.data.forEach((m, i) => {
      // Present the number of cars and pedestrians accordingly
      if (isNaN(m.numberOfCars) && !isNaN(m.numberOfPedestrians)) {
        numOfPeds = m.numberOfPedestrians;
        numberOfCars = "N/A";
      } else if (!isNaN(m.numberOfCars) && isNaN(m.numberOfPedestrians)) {
        numOfPeds = "N/A";
        numberOfCars = m.numberOfCars;
      } else if (!isNaN(m.numberOfCars) && !isNaN(m.numberOfPedestrians)) {
        numOfPeds = m.numberOfPedestrians;
        numberOfCars = m.numberOfCars;
      }
      const marker = document.createElement("px-map-marker-static");
      const tooltip = document.createElement("px-map-popup-data");
      marker.setAttribute("lat", m.latitude);
      marker.setAttribute("lng", m.longitude);
      marker.setAttribute("type", m.type);
      tooltip.setAttribute("title", "Street Light Info");
      tooltip.setAttribute(
        "data",
        '{"Percentage of Brightness":"' +
          m.brightness +
          "%" +
          '","Cars":  "' +
          numberOfCars +
          '","Lat": "' +
          m.latitude +
          '","Long": "' +
          m.longitude +
          '", "Pedestrians": "' +
          numOfPeds +
          '"}'
      );

      marker.appendChild(tooltip);
      el.append(marker);
      this._nodes[i] = marker; //Populate with all new markers
    });
  }

  _onMapMoved(e) {
    if (this.props.onMapMoved) {
      const { lat, lng, zoom } = e.detail;
      if (
        this.props.lat !== lat ||
        this.props.lng !== lng ||
        this.props.zoom !== zoom
      ) {

        this.props.onMapMoved({ lat, lng, zoom });
      }
    }
  }

  render() {
    return (
      <px-map
        style={{ "--px-map-icon-info-color": "green" }} //styles each marker accordingly to the type of marker set
        flex-to-size
        ref={n => {
          this.$map = n;
        }}
      >
        <px-map-tile-layer ref={n => (this.$tileLayer = n)} />
      </px-map>
    );
  }
}

export default Map;
