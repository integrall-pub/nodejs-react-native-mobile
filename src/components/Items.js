import React,{Component} from 'react';
import {View,Text,FlatList,Button,Dimensions,StyleSheet,TouchableOpacity,Image,Alert} from 'react-native';
import { Actions } from 'react-native-router-flux';
import imgItem from '../images/vuejs.jpg';
export default class Items extends Component{
    constructor(props){
        super(props)
        this.state={
            items:[],
            isLoading:true
        }
       // this.onShowItem = this.onShowItem.bind(this);
    }
    componentDidMount(){
        //console.warn(this.props.datasource);
        if(!this.props.dataItems){
            return fetch('http://laravel.hoanguyenit.com:8888/api/videos')
            .then((response) => response.json())
            .then((responseJson) => {
                //console.warn(responseJson);
                this.setState({items:responseJson,isLoading:false});
            })
            .catch((error) =>{
                console.error(error);
            });
        }
        this.setState({items:this.props.dataItems,isLoading:false})
    }
    onShowItem(link){
       // alert("co"+link);
        //this.props.history.push("/login");
       // {this.onShowItem.bind(item.id,item.link)
       Actions.content({url:link});
    }
    render(){
        if(!this.isLoading){
            return(
                <View style={styles.container}>
                    <View style={styles.boxItems}>
                
                        <FlatList
                            data={this.state.items}
                            renderItem={({item}) =>
                                    <TouchableOpacity style={styles.item} onPress={this.onShowItem.bind(item.id,item.link)}>
                                        <Image source={imgItem} style={styles.hinhItem}></Image>
                                        {/* <Text style={styles.tag_link}>HTML/CSS</Text> */}
                                        <View style={styles.infoItem}>
                                            <Text style={styles.titleItem}>{item.title}</Text>
                                            <Text style={styles.authorItem}>Author: {item.author}</Text>
                                            <Text style={styles.dateItem}>Date: {item.created_at}</Text>
                                            <Text style={styles.viewItem}>View: {item.view}</Text>
                                        </View>
                                    </TouchableOpacity>
                            }
                            keyExtractor={(item, index) => index.toString()}
                            />
                        
                    </View>
                </View>
            )
         }
        return(
            <View>
                <Text>Đang cập nhật!</Text>
            </View>
        )
    }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles=StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    boxItems:{
        flex:1,
        width:DEVICE_WIDTH
    },
    item:{
        flex:1,
        marginLeft:4,
        marginRight: 4,
        marginBottom: 4,
        padding: 4,
        width:DEVICE_WIDTH-8,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF'
    },
    hinhItem:{
        width:100,
        height:100
    },
    tag_link:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        width:100,
        height:100,
        backgroundColor:'#686', 
    },
    infoItem:{
        paddingLeft: 10,
        width:(DEVICE_WIDTH-10)-100,
        
    },
    titleItem:{
        fontSize: 18,
        color: '#1E90FF'
    }
   
})