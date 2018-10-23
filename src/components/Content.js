import React,{Component} from 'react';
import {View,Text,Button,ScrollView,StyleSheet,Dimensions,YellowBox} from 'react-native';
import HTML from 'react-native-render-html';
export default class Content extends Component{
    constructor(props){
        super(props)
        this.state={
            item:[],
            showLoading: true,
            contenthtml:'<iframe width="560" height="315" src="https://www.youtube.com/embed/5-_g0P_GgFU?list=PL5Op9pxYdADbPSgFCtfyVTpiQ2LlJHZdk" frameborder="0" allowfullscreen></iframe>'
        }
    }
    componentDidMount(){
        return fetch('http://laravel.hoanguyenit.com:8888/api/videos/link/'+this.props.url)
        .then((response) => response.json())
       
        .then((responseJson) => {
           // console.warn(responseJson);
            this.setState({item:responseJson, showLoading: false});
           
        })
        .catch((error) =>{
            console.error(error);
        });
    }
    render(){
        if(this.state.showLoading) { 
            return(
                <View><Text>Loading...</Text></View>
            )
        }
        return(
            <ScrollView style={styles.container}>
                <View style={styles.boxTitle}>
                    <Text style={styles.titleItem}>{this.state.item[0].title}</Text>
                    <Text style={styles.authorItem}>Author: {this.state.item[0].author}</Text>
                    <Text style={styles.dateItem}>Date: {this.state.item[0].created_at}</Text>
                    <Text style={styles.viewItem}>View: {this.state.item[0].view}</Text>
                </View>
                <View style={styles.boxContent}>
                     <HTML html={this.state.item[0].content.replace('width','id')} imagesMaxWidth={Dimensions.get('window').width-20} staticContentMaxWidth={Dimensions.get('window').width-20}/>
                </View>
            
            </ScrollView>
        )
    }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    boxTitle:{
        margin:10,
        padding: 10,
        width:DEVICE_WIDTH-20,
        backgroundColor: '#FFDEAD'
    },
    titleItem:{
        color:'#1E90FF',
        fontSize: 20
    },
    authorItem:{
        color:'#000',
        fontSize: 18
    },
    dateItem:{
        color:'#000',
        fontSize: 18
    },
    viewItem:{
        color:'#000',
        fontSize: 18
    },
    boxContent:{
        marginLeft: 10,
        marginRight: 10
    }
});
