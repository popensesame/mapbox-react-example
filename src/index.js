import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoidmlvbGluY291bnRlciIsImEiOiJjazVpYWR0ZDMwY2tsM2ttc3NpY2Q3YmphIn0.pC2R893Zj9URNbpj1OuRDQ';

const styleOptions = {
    'streets': 'mapbox://styles/mapbox/streets-v11',
    'dark': 'mapbox://styles/mapbox/dark-v10'
}

class Mapviewer extends React.Component {

  constructor(props) {
    super(props);
    this.switchStyle = this.switchStyle.bind(this);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2,
      style: 'streets'
    };
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: this.props.styleOptions[this.state.style],
      center: [this.state.lng, this.state.lat]
    });

    this.map.on('move', () => {
      this.setState({
        lng: this.map.getCenter().lng.toFixed(4),
        lat: this.map.getCenter().lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2)
      });
    })
  }

  switchStyle(style) {
    this.map.setStyle(this.props.styleOptions[style])
    this.setState({ 'style': style });
  }

  render() {
    return (
      <div>
        <LocationInfo lng={this.state.lng} lat={this.state.lat} zoom={this.state.zoom} />
        <StyleSelect switchStyle={this.switchStyle} styleOptions={this.props.styleOptions} selected={this.state.style} />
        <div ref={el => this.mapContainer = el} className='mapContainer' />
      </div>
    )
  }

}

class LocationInfo extends React.Component {

  render() {
    return (
      <div className='locationInfo'>
        <div>Longitude: {this.props.lng} | Latitude: {this.props.lat} | Zoom: {this.props.zoom}</div>
      </div>
    )
  }

}

class StyleSelect extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.switchStyle(e.target.value);
  }

  render() {
    const listItems = Object.keys(this.props.styleOptions).map(styleName => {
      return (
        <div key={styleName}>
          <input onChange={this.handleChange} type='radio' id={styleName + 'Select'} name={styleName} value={styleName} checked={this.props.selected === styleName} />
          <label htmlFor={styleName + 'Select'}>{styleName}</label>
        </div>
      ) 
    });

    return (
      <div className='styleSelect'>
        {listItems}        
      </div>
    )
  }
}

ReactDOM.render(<Mapviewer styleOptions={styleOptions} />, document.getElementById('app'));


