import React,{Component} from 'react';
import {View,Text,StyleSheet,TextInput,Dimensions,TouchableOpacity,ScrollView,Alert} from 'react-native'
import {Actions} from 'react-native-router-flux';
export default class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            txt_first_name:"",
            txt_last_name:"",
            txt_username:"",
            txt_password:"",
            txt_email:"",
        }
    }
    _onRegister=()=>{
        const user_id=(Math.floor(Date.now()/1000) + (5 * 1000));
        return fetch('http://112.213.88.117:8080/app/user/register', {  
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id:user_id,
              txt_first_name: this.state.txt_first_name,
              txt_last_name:this.state.txt_last_name,
              txt_username:this.state.txt_username,
              txt_email: this.state.txt_email,
              txt_password: this.state.txt_password
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
              this.setState({checkLogin:responseJson.success});
              if(this.state.checkLogin>0){
                //  console.warn(responseJson);
                  Actions.login();
             }
             else{
              // console.warn(this.state.checkLogin);
                  Alert.alert("Thông báo!","Bạn đã đăng ký không thành công!");
             }
          })
          .catch((error) =>{
              console.error(error);
          });
    }
    render(){
        return(
            <ScrollView style={styles.container}>
                <View style={styles.boxRegiser}>
                    <Text style={styles.titleRegister}>Register</Text>
                    <View style={styles.formGroup}>
                        <Text style={styles.txtLable}>First Name</Text>
                        <TextInput style={styles.txtInput}
                          placeholder="Enter first name"
                          placeholderTextColor="black"
                          underlineColorAndroid="transparent"
                          onChangeText={(txt_first_name)=>this.setState({txt_first_name:txt_first_name})}
                        ></TextInput>
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.txtLable}>Last Name</Text>
                        <TextInput style={styles.txtInput}
                          placeholder="Enter last name"
                          placeholderTextColor="black"
                          underlineColorAndroid="transparent"
                          onChangeText={(txt_last_name)=>this.setState({txt_last_name:txt_last_name})}
                        ></TextInput>
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.txtLable}>Username</Text>
                        <TextInput style={styles.txtInput}
                          placeholder="Enter username"
                          placeholderTextColor="black"
                          underlineColorAndroid="transparent"
                          onChangeText={(txt_username)=>this.setState({txt_username:txt_username})}
                        ></TextInput>
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.txtLable}>Password</Text>
                        <TextInput style={styles.txtInput}
                          placeholder="Enter password"
                          placeholderTextColor="black"
                          secureTextEntry={true}
                          underlineColorAndroid="transparent"
                          onChangeText={(txt_password)=>this.setState({txt_password:txt_password})}
                        ></TextInput>   
                    </View>
                    <View style={styles.formGroup}>
                        <Text style={styles.txtLable}>Email</Text>
                        <TextInput style={styles.txtInput}
                         placeholder="Enter email"
                         placeholderTextColor="black"
                         underlineColorAndroid="transparent"
                         onChangeText={(txt_email)=>this.setState({txt_email:txt_email})}
                        ></TextInput>
                    </View>
                    <TouchableOpacity style={styles.btnSend} onPress={this._onRegister}>
                            <Text style={styles.txtSend}>Send</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
     
    },
    boxRegiser:{
        width:DEVICE_WIDTH-10,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        marginTop:50,
        backgroundColor:'#d5d5d5'
      
    },
    titleRegister:{
        alignSelf: 'center',
        backgroundColor: '#5d5d5d',
        padding:8,
        width:DEVICE_WIDTH,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        textAlign: 'center',
        fontSize: 18,
        color:'#000'
    },
    formGroup:{
        marginTop:5
    },
    txtLable:{
        color:'#FF5733'
    },
    txtInput:{
        borderWidth:1,
        borderColor:'#5d5d5d',
        height:40
        
    },
    btnSend:{
        alignSelf: 'center',
        backgroundColor: '#32CD32',
        width:DEVICE_WIDTH-200,
        marginTop:10.
    },
    txtSend:{
        alignSelf: 'center',
        backgroundColor: '#32CD32',
        padding:8,
       
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        textAlign: 'center',
        fontSize: 18,
        color:'#fff'
    }
})