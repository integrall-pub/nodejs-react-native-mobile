import React,{Component} from 'react';
import {View,Text,StyleSheet,Button,Image} from 'react-native';
import ButtonBtn  from './ButtonBtn'
import { Actions } from 'react-native-router-flux';
import logo from '../images/logo34.png';
export default class Home extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={styles.container}>
                <Image source={logo} style={styles.imgLogo}/>
                <View style={styles.button}>
                        <Button style={styles.button} title="Login App" onPress={() => Actions.login()} />
                </View>
                <View style={styles.button}>
                        <Button style={styles.button} title="Products App" onPress={() => Actions.products()} />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:'center',
        justifyContent: 'center'
    },
    button:{
      margin: 2
    }
});
