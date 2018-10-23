import React,{Component} from 'react';
import {View,Text,Button,FlatList,ScrollView,StyleSheet,TextInput,Dimensions} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Search from './Search';
import Items from './Items';

import iconSearch from '../images/search.png';
export default class Products extends Component{
  constructor(props){
      super(props)
      this.state={
          txtSearch:"",
          dataItems:[{"hoa":"hoaabc"},{"hoa":"hoay"}]
      }
  }
componentDidMount(){
    return fetch('http://laravel.hoanguyenit.com:8888/api/videos/1')
    .then((response) => response.json())
    .then((responseJson) => {
        //console.warn(responseJson);
        this.setState({dataItems:responseJson.results});
    })
    .catch((error) =>{
        console.error(error);
    });
}
handleEditComplete=()=>{
   // console.warn("co:"+this.state.txtSearch);
   Actions.contentsearch({"keyword":this.state.txtSearch});
}
render(){
        return(
            <ScrollView style={styles.container}>
                <Search 
                    source={iconSearch}
                    multiline={false}
                    onSubmitEditing={this.handleEditComplete}
                    onChangeText={(txtSearch)=>this.setState({txtSearch:txtSearch})}
                />
            <Items datasource={this.state.dataItems}/>
            </ScrollView>
        )
  }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#333'
    }
    
})