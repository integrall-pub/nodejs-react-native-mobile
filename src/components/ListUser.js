import React,{Component} from 'react';
import {View,Text,Image,TextInput,FlatList,StyleSheet,TouchableOpacity,Dimensions} from 'react-native';
import {Actions} from 'react-native-router-flux';
import user1 from '../images/user-account.png';
import user2 from '../images/user-account2.png';
import arrow from '../images/LeftArrow.png';
//import customData from '../../data/chat.json';

export default class ListUser extends Component{
    constructor(props){
        super(props);
        const user_id = this.props.user_id;
        this.state={
            user_id:user_id,
            datas_user:[],
            results:[],
            check_data:true,
        }
    }
    componentWillMount(){
        //console.warn(this.state.user_id)
        return fetch('http://10.0.2.2:8888/app/lists/user', {  
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id:this.state.user_id,
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
              this.setState({
                  datas_user:responseJson.lists['datas'],
                  results:responseJson.messages,
                  check_data:false
                });
             // console.warn(responseJson.messages);
          })
          .catch((error) =>{
              console.error(error);
         });
     
            // for (let userObject of this.state.datas_user) {
            //     if(userObject['user_id']===this.state.user_id){
            //         console.warn(userObject['private_message']);
            //         this.setState({
            //             results:userObject['private_message']
            //         })
            //     }
            // }
     }
    
    _returnName=(send_user_id)=>{
        for (let userObject of this.state.datas_user) {
            if(userObject['user_id']===send_user_id){
                return userObject['firstname']+" "+userObject['lastname'];
             }
        }
        
    }
    _returnAvatar=(send_user_id)=>{
        for (let userObject of this.state.datas_user) {
            if(userObject['user_id']===send_user_id){
                return userObject['avatar'];
             }
           
        }
        
       
    }
    _keyExtractor = (item, index) => item.send_user_id;
    _renderItem = ({item}) => (
        <View style={styles.boxChatFull}>
           <TouchableOpacity style={styles.boxUser} onPress={()=>this._onUser(item.send_user_id, item.box_chat_id)}>
                <View style={styles.imgUser}>
                    <Image  style={{width: 50, height: 50}} source={{uri: this._returnAvatar(item.send_user_id)}} />
                </View>
                <View style={styles.boxName}>
                   <Text style={styles.txtName}>{this._returnName(item.send_user_id)}</Text>
                   <Image source = {arrow} style={styles.btnArrow}/>
                </View>
           </TouchableOpacity>
        </View>
    );
    _onUser=(send_user_id,box_chat_id)=>{
        //console.warn(item);
        Actions.chats({"user_id":this.state.user_id,"send_user_id":send_user_id,"box_chat_id":box_chat_id});
    }
    render(){
       if(!this.state.check_data){
            return(
                <View style={styles.container}>
                    <FlatList data={this.state.results}
                        keyExtractor={(item, index) => item.send_user_id.toString()}
                        renderItem={this._renderItem}
                    />
                </View>
            )
        }
        else{
            return(
                <View><Text></Text></View>
            )
        }
    }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,   
    },
    boxChatFull:{
        width:DEVICE_WIDTH,

    },
    boxUser:{
        width:DEVICE_WIDTH,
        flex:1,
        flexDirection: 'row',
        padding:8,
        backgroundColor:"#FFFAF0",
        marginTop:2
    },
    imgUser:{
        width:50,
        
    },
    hinhUser:{
        width:'100%'
    },
    boxName:{
        width:DEVICE_WIDTH-50,
        paddingLeft:20,
        flex:1,
        justifyContent: 'center',
        position:'relative'

    },
    txtName:{
        color:'#000',
        fontSize:20
    },
    btnArrow:{
        width:20,
        height:20,
        position:'absolute',
        left:DEVICE_WIDTH-125,
        transform: [{ rotate: '180deg'}]
    }
})