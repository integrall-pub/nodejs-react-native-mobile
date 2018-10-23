import React, {Component} from 'react';
import {StyleSheet, Image,ImageBackground } from 'react-native';
import bgSrc from '../images/background3.jpg';
export default class Wallpaper extends Component {
  render() {
    return (
      <ImageBackground  style={{width: '100%', height: '100%'}} source={bgSrc}>
        {this.props.children}
      </ImageBackground >
    );
  }
}
const styles = StyleSheet.create({
 
});
