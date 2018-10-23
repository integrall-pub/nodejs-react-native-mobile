import React,{Component} from 'react';
import {View,Text,Image,TextInput,FlatList,ScrollView,KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback,StyleSheet,Button,TouchableOpacity,Dimensions,YellowBox,Alert} from 'react-native';
import { KeyboardAwareScrollView,KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { GiftedChat } from 'react-native-gifted-chat'
import user1 from '../images/user-account.png';
import user2 from '../images/user-account2.png';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
export default class Chats extends Component{
    constructor(props){
        super(props);
        const send_user_id=this.props.send_user_id;
        const user_id = this.props.user_id;
        const box_chat_id = this.props.box_chat_id;
        this.state={
            results:[],
            user_id:user_id,
            send_user_id:send_user_id,
            box_chat_id:box_chat_id,
            datetime:"25-8-2018 vn",
            chat_json:[],
            chat_private_sms:[],
            currentDate:Date.now(),
            txt_sms_enter:"",
            fetching: false,
            focusDescriptionInput: false,
            messages: [
                {
                  _id: 1,
                  text: 'Hello developer',
                  createdAt: new Date(),
                  user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                  },
                },
              ],
        }
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._scrollEnd);
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidHide', this._scrollEnd);
      
    }
    
    componentWillMount(){
      
       //let date = new Date(1535360040266);
      // console.warn("ho"+date.toLocaleDateString("en-US"));
     // console.warn(this.state.box_chat_id);
      
      return fetch('http://10.0.2.2:8888/app/lists/boxchat/user', {  
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                box_chat_id:this.state.box_chat_id,
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    chat_json:responseJson.boxchat,
                    chat_private_sms:responseJson.messages,
                    results:responseJson.messages
                });
              //  setTimeout(() => this.autoScroll2(), 200);
                //console.warn(responseJson);
                // for(let smsUser of responseJson.messages){
                //     if(smsUser['send_user_id']===this.state.send_user_id){
                //         this.setState({
                //             results:smsUser['message']
                //         });
                //        // console.warn(smsUser['message']);
                //     }
                // }
                
            })
            .catch((error) =>{
                console.error(error);
            });   
    }
    a=()=>{
        Alert.alert("co","c0");
    }    
    _keyExtractor = (item, index) => item.send_user_id;
    _renderItem = ({item}) => (
       
        <View style={styles.boxChatFull}>
           <Text style={styles.datetime}>{this._renderDate(item.time_stamp)}</Text>
           {this._renderSMS(item.id_time)}
        </View>
    );
    _renderFooter = () => {
        return (
            <TouchableOpacity onPress={this.addReply.bind(this)} style={styles.btnAdd}>
                    <TextInput 
                        multiline = {true}
                        ref={input => { this.textInput = input }}
                        placeholder="message..." 
                        style={styles.txtMsg}
                        placeholderTextColor="white"  
                        underlineColorAndroid="transparent"
                        editable={true}
                        returnKeyType='done'
                        onSubmitEditing={this.a}
                        onChangeText={(txt_sms_enter)=>this.setState({"txt_sms_enter":txt_sms_enter})}
                        placeholderTextColor="white"/>
                    <Text style={styles.txtAdd}>Add</Text>
            </TouchableOpacity>
        )
    }
    _renderDate=(time)=>{
        let date = new Date(time);
        return date.toString();
    }
    _renderSMS=(id_time)=>{
        for (let txtsms of this.state.results) {
            if(txtsms['id_time']==id_time){
                return(
                    <FlatList style={styles.mang} data={txtsms['box_sms']}
                            keyExtractor={(item, index) => item.sms_user.toString()}
                            renderItem={({item}) =>
                                this.state.user_id===item.sms_user?
                                <View style={styles.boxUser}>
                                    <View style={styles.imgUser}>
                                        <Image source = {user1} style={styles.hinhUser}/>
                                    </View>
                                    <View style={styles.smsUser}>
                                        <Text style={styles.txtUser2}>{item.sms}</Text>
                                        <Text style={styles.txtTime}>{item.sms_time.toUpperCase()}</Text>
                                    </View>
                                </View> 
                                :
                                <View style={styles.boxUser}>
                                    <View style={styles.smsUser3}>
                                        <Text style={styles.txtUser3}>{item.sms}</Text>
                                        <Text style={styles.txtTime3}>{item.sms_time.toUpperCase()}</Text>
                                    </View>
                                    <View style={styles.imgUser}>
                                        <Image source = {user1} style={styles.hinhUser}/>
                                    </View>
                                </View> 
                            
                            
                        }
                                
                   />
                )
            }
                
            
        }
    }
    _renderShowSMS=(item)=>{
        <View style={styles.boxUser}>
            <View style={styles.imgUser}>
                <Image source = {user1} style={styles.hinhUser}/>
            </View>
            <View style={styles.smsUser}>
                <Text style={styles.txtUser2}>{item.sms}</Text>
                <Text style={styles.txtTime}>{item.sms_time.toUpperCase()}</Text>
            </View>
        </View> 
    }
    handleTitleInputSubmit=()=>{
        this.setState({focusDescriptionInput:true});
        console.warn("co chọn");
      }
    addReply=()=>{
               // for(let smsUser of this.state.chat_private_sms){
                     //if(smsUser['send_user_id']===this.state.send_user_id){

                         let data_check = this.state.chat_private_sms;
                         let check=false;
                         let id_time=null;
                         let position_v=null;
                         let dem1=0;
                         data_check.forEach(function(rows){
                            let dateSMS = new Date(rows['time_stamp']);
                            let currentSMS = dateSMS.toLocaleDateString("en-US");
                            let dateCurrent = new Date(Date.now());
                            let currentToday = dateCurrent.toLocaleDateString("en-US");
                            if(currentSMS.toString()==currentToday.toString()){
                                check=true;
                                id_time=rows['time_stamp'];
                                position_v=dem1;
                            }
                            dem1++;
                         });
                          if(check){
                            //Alert.alert("Cos","Cos:"+id_time);
                            var data_send = {
                                            "check_group":1,
                                            "user_id":this.state.user_id,
                                            "send_user_id":this.state.send_user_id,
                                            "id_time":id_time,
                                            "time_stamp":id_time,
                                            "sms_user":this.state.user_id,
                                            "sms":this.state.txt_sms_enter,
                                            "sms_time":this._getTime()
                                        }
                          let a = this.state.results;
                          a[position_v]['box_sms'].push(
                                {
                                    
                                        "sms_user": this.state.user_id,
                                        "sms":this.state.txt_sms_enter,
                                        "sms_time":this._getTime()
                                    
                                }
                            )
                           
                            this.setState({results:a});
                            //let chieucao = this.state.scrollY;
                           // this.refs.flatList.scrollToPosition(0, this.state.scrollY+2000, true)
                           // this.setState({scrollY:this.state.scrollY+1000});
                           // console.warn(this.state.scrollY)
                            //console.warn(chieucao)
                            //this.refs.flatList.scrollToOffset({offset:100,animated:true});
                           // this.refs.flatList.scrollToPosition(0, a.length*100, true);
                           // Alert.alert("so phần tử","a="+a.length+7);
                           // setTimeout(() => this.autoScroll(), 200);
                           // setTimeout(() => this.autoScroll(), 200);
                            //this.refs.scroll.scrollToEnd({animated:true},0);
                            //this.refs.flatList.scrollToOffset({x: 0, y: 0, animated: true});
                            //this.refs.flatList.scrollToOffset({ animated: true, offset: 0 });
                            this.textInput.clear();
                           
                           // this.state.results[position_v]['box_sms'].slice(data_check[position_v]['box_sms'].length-1);
                           // console.warn(c);
                            //this.setState({results:this.state.results.});
                            //this.refs.flatList.scrollToOffset({x: 0, y: 0, animated: true})
                           // this._add_sms(data_send);
                         }
                         else{
                           // Alert.alert("khong","Cos:"+Date.now());
                            var data_send = {
                                "check_group":1,
                                "user_id":this.state.user_id,
                                "send_user_id":this.state.send_user_id,
                                "id_time":Date.now(),
                                "time_stamp":Date.now(),
                                "sms_user":this.state.user_id,
                                "sms":this.state.txt_sms_enter,
                                "sms_time":this._getTime()
                            }
                            var add_new_send = {
                                    "id_time":Date.now(),
                                    "time_stamp":Date.now(),
                                    "box_sms": [
                                        {
                                            "sms_user":this.state.user_id,
                                            "sms":this.state.txt_sms_enter,
                                            "sms_time":this._getTime()
                                        }
                                    ]
                            }
                            let a = this.state.results;
                            a.push(add_new_send);
                            this.setState({results:a});
                            //let chieucao = this.state.scrollY;
                            //this.refs.flatList.scrollToPosition(0, chieucao+1200, true)
                            //this.setState({scrollY:chieucao+1200});
                            //console.warn(this.state.scrollY)
                            //this.refs.flatList.scrollToOffset({x: 0, y: this.state.scrollY, animated: true})
                            //this.refs.flatList.scrollToOffset({offset:100,animated:true});
                            //setTimeout(() => this.autoScroll(), 200);
                            //this.refs.flatList.scrollToPosition(0, a.length*100, true);
                            //Alert.alert("so phần tử","a="+a.length);
                            //setTimeout(() => this.autoScroll(), 200);
                            //this.refs.scroll.scrollToEnd({animated:true},0);
                            //this._add_sms(data_send);

                         }


                      
                                // const data_add = addSMS['box_sms'];
                                // const results = data_add.slice();
                                // results.unshift({
                                //         "sms_user":this.state.user_id,
                                //         "sms":"what your name?",
                                //         "sms_time":"15:03 pm"
                                // });
                                // this.setState({ results: results});
                               // this._add_sms(data_send);
                                // console.warn("co");
                        //         Alert.alert("Cos","Cos");
                        
            
        
      }
    _add_sms=(data_sms)=>{
      //  console.warn(data_sms);
            fetch('http://10.0.2.2:8888/app/user/sms/private', {  
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data_sms)
            })
            .then((response) => response.json())
            .then((responseJson) => {
               // console.warn(responseJson.boxchat[0]['message']);
             ////  this.setState({
              //    results:responseJson.boxchat[0]['message'],txt_sms_enter:""
              // });
               this.textInput.clear();
               setTimeout(() => this.autoScroll(), 200);
              // this.refs.flatList.scrollToOffset({x: 0, y: this.state.scrollY, animated: true})
                // this.setState({ fetching: true }, () => {
                //     const items = [...responseJson.boxchat[0]['message'].reverse()];
                //     setTimeout(() => {
                //       this.setState(
                //         { items, fetching: false },
                //       );
                //     }, 1000);
                //     setTimeout(() => this.autoScroll(), 200);
                //   });
               
               
            })
            .catch((error) =>{
                console.error(error);
            });   
    }
    autoScroll() {
        if (this.flatList!==null) {
          this.refs.flatList.scrollToEnd({animated: true},0)
        }
        this.setState({
          fetching:false
        })

      }
    autoScroll2() {
        if (this.flatList!==null) {
          this.refs.flatList.scrollToEnd({animated: true},0);
        // this.refs.scroll.scrollToEnd({animated:true},0);
        }
        
      }
    _getTime=()=>{
        var d = new Date();
        var gio = d.getHours().toString();
        var phut = d.getMinutes().toString();
        var giay = d.getSeconds().toString();
        if(gio.length<2){
            gio="0"+gio; 
        }
        if(phut.length<2){
            phut="0"+phut;
        }
        if(giay.length<0){
            giay="0"+giay;
        }
        var time = gio+":"+phut;
        
        return time.toString();
    }
    handleScroll(event) {
        this.setState({ scrollY: event.nativeEvent.contentOffset.y });
        //console.warn(event.nativeEvent.contentOffset.y)
    }
    _scrollEnd = (evt) => {
        this.refs.flatList.scrollToEnd();
      }
      renderView=(item)=>{
          return(
              <Text>{item.text}</Text>
          )
      }
    render(){
       
        return(
    //   <KeyboardAvoidingView style={{paddingTop: 22}} behavior="height" enabled>
      
               
                <FlatList style={styles.box_chat_sms}
                        ref="flatList"
                        extraData={this.state.results}
                        style={styles.mang} data={this.state.results}
                        keyExtractor={(item, index) => item.id_time.toString()}
                        renderItem={this._renderItem}
                        refreshing={this.state.fetching}
                        onEndReachedThreshold={0.5}
                        onRefresh={() => this.fetchBugDetail()}
                      ListFooterComponent={this._renderFooter}
                    // keyboardDismissMode="on-drag"
                    //    keyboardShouldPersistTaps="handled"
                    //    onScroll={event => this.handleScroll(event)}
                    //     onKeyboardWillShow={frames => {
                    //         console.log(TAG, `\n${JSON.stringify(frames)}\n`);
                    //     }}
                    //     onKeyboardWillHide={frames => {
                    //         console.log(TAG, `\n${JSON.stringify(frames)}\n`);
                    //     }}
                    //     showsVerticalScrollIndicator={false}
                    />
                
              
               
            //          <View style={{position:'relative',bottom:0}}>
            //             <TouchableOpacity onPress={this.addReply.bind(this)} style={styles.btnAdd}>
            //                 <TextInput 
            //                     multiline = {true}
            //                 ref={input => { this.textInput = input }}
            //                 placeholder="message..." 
            //                     style={styles.txtMsg}
            //                     placeholderTextColor="white"  
            //                     underlineColorAndroid="transparent"
            //                     editable={true}
            //                 returnKeyType='done'
            //                     onSubmitEditing={this.a}
            //                 onChangeText={(txt_sms_enter)=>this.setState({"txt_sms_enter":txt_sms_enter})}
            //                     placeholderTextColor="white"/>
            //                 <Text style={styles.txtAdd}>Add</Text>
            //             </TouchableOpacity>
            //          </View>
            // </KeyboardAvoidingView>
          
             
           
          
        )
    }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
       flex:1
    },
    box_chat_sms:{
        height:DEVICE_HEIGHT-100
    },
    datetime:{
        alignSelf: 'center',
        padding:20,
        color:'#5d5d5d',
        
    },
    txtItem:{
        fontSize:20
    },
    btnAdd:{
        width:DEVICE_WIDTH,
        padding:5,
    },
    txtMsg:{
        width:DEVICE_WIDTH-70,
        backgroundColor:'#fff',
        padding:8,
        position:'relative',
        left:0,
        top:0,
        color:'#000',
        
    },
    txtAdd:{
        width:50,
        color:'#fff',
        padding:8,
        backgroundColor:'#FF5733',
        position:'absolute',
        right:5,
        top:5,
    },
    boxChatFull:{
        flex:1,
    },
    boxUser:{
        flex:1,
        flexDirection: 'row',
        width:DEVICE_WIDTH-10,
        paddingLeft:5,
        paddingRight:5, 
        marginTop:5,
        marginBottom:5,
    },
    imgUser:{
        width:50,
        height:50,  
    },
    hinhUser:{
        width:'100%',
    },
    smsUser:{
        flex:1,
        padding:5,
        marginLeft:5,
        justifyContent: 'center',
        width:(DEVICE_WIDTH-10)-55,
        backgroundColor:'#d5d5d5',
        position:'relative',
        borderRadius:20,
    },
    txtUser2:{
        color:'#000',
        fontSize:14,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:15
        
    },
    txtTime:{
        position:'absolute',
        left:15,
       
        bottom:5,
        fontSize:12,
        color:'#5d5d5d'
    },
    txtUser3:{
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:15,
        color:'#000',
        fontSize:14,
    },
    txtTime3:{
        position:'absolute',
        left:15,
        bottom:5,
        fontSize:12,
        color:'#5d5d5d'
    },
    smsUser3:{
        flex:1,
        padding:5,
        marginRight:5,
        justifyContent: 'center',
        width:(DEVICE_WIDTH-10)-55,
        backgroundColor:'#d5d5d5',
        position:'relative',
        borderRadius:20,
    },
})