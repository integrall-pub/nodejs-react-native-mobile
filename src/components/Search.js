import React,{Component} from 'react';
import {View,Button,Text,Image,StyleSheet,TouchableOpacity,Dimensions,TextInput,Alert} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Search extends Component{
    constructor(props){
        super(props);
        
    }
    render(){
        return(
            <View style={styles.search}>
                <Image source={this.props.source} style={styles.inlineImg} />
                <TextInput style={styles.txtSearch} 
                 placeholderTextColor="white"
                 underlineColorAndroid="transparent"
                 onChangeText={this.props.onChangeText}
                 multiline={this.props.multiline}
                 onSubmitEditing={this.props.onSubmitEditing}
                 placeholder="Tìm kiếm..."/>
            </View>
        )
    }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    search:{
        flex:1
    },
    txtSearch:{
        width:DEVICE_WIDTH-10,
        margin: 5,
        padding:2,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 20,
        paddingLeft: 10,
        color:'white'
    },
    inlineImg: {
        position: 'absolute',
        zIndex: 99,
        width: 22,
        height: 22,
        right: 14,
        top: 11,
      },
})