import React,{Component} from 'react';
import {View,Text,StyleSheet,Button,Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
export default class ButtonBtn extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(

            <View style={styles.container}>
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

