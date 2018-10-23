import React,{Component} from 'react'
import {View,Text,Button,Alert,StyleSheet,TextInput} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Wallpaper from './Wallpaper';
import Form from './Form';
export default class Login extends Component{
    render() {
        return (
          <KeyboardAwareScrollView  behavior="padding" keyboardShouldPersistTaps="handled">
            <Form />
          </KeyboardAwareScrollView>
        );
      }
}
