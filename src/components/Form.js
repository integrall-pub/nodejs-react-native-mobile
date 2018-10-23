import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,Text,
  Alert,AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import UserInput from './UserInput';
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import logo from '../images/logo34.png';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state={
      txt_username:"",
      txt_password:"",
      checkLogin:0,
    }
  }
  componentDidMount(){
  // AsyncStorage.clear();

    this._retrieveData();
    // return fetch('http://10.0.2.2/laravel-app/app/list')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.warn(responseJson.lists);
    //   })
    //   .catch((error) =>{
    //     console.error(error);
    //   });

  }
  _onLogin=()=>{
     // console.warn(this.state.username+"/"+this.state.password);
      this._get_info_login();
  }

  _get_info_login(){
    return fetch('http://10.0.2.2:8888/app/user/login', {  
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              txt_username: this.state.txt_username,
              txt_password: this.state.txt_password,
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
              this.setState({checkLogin:responseJson.success});
              if(this.state.checkLogin>0){
                  //console.warn(responseJson);
                  this._storeData(responseJson.user_id);
                  
                  Actions.listuser({"user_id":responseJson.user_id});
              }
              else{
                  //console.warn(this.state.checkLogin);
                  Alert.alert("Thông báo!","Bạn đã đăng nhập không thành công!");
              }
          })
          .catch((error) =>{
              console.error(error);
          });
  }
  _storeData = async (user_id) => {
    try {
      let data_user = {
        user_id:user_id
      }
      await AsyncStorage.setItem('key', JSON.stringify(data_user));
    } catch (error) {
      // Error saving data
    }
  }
  _retrieveData = async () => {
    try {
      let value = await AsyncStorage.getItem('key');
      if (value !== null) {
        let av = JSON.parse(value);
        let user_id = av.user_id;
        Actions.listuser({"user_id":user_id});
      }
     } catch (error) {
       // Error retrieving data
     }
  }
  _clearData=()=>{
    AsyncStorage.clear();
    Actions.login();
  }
  render() {
    return (
        <View style={styles.container}>
                <Image source={logo} style={styles.logoForm}/>
                <UserInput
                        source={usernameImg}
                        placeholder="Entel Username"
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                        onChangeText={(txt_username)=>this.setState({txt_username:txt_username})}
                        />
                 <UserInput
                        source={passwordImg}
                        placeholder="Entel Password"
                        autoCapitalize={'none'}
                        returnKeyType={'done'}
                        autoCorrect={false}
                        onChangeText={(txt_password)=>this.setState({txt_password:txt_password})}
                        secureTextEntry={true}
                        />
                <TouchableOpacity
                     activeOpacity={0.7}
                     style={styles.btnLogin}
                     onPress={this._onLogin}
                >
                    <Text style={styles.txtLogin}>Login</Text>
                </TouchableOpacity>
                <View style={styles.boxRegister}>
                    <TouchableOpacity style={styles.clickAccount} onPress={()=>Actions.register()}>
                        <Text style={styles.txtStyle}>Create Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.clickAccount} onPress={this._clearData.bind(this)}>
                        <Text style={styles.txtStyle}>Clear Password?</Text>
                    </TouchableOpacity>
                </View>
        </View>   
      
    );
  }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40
  },
  logoForm:{
    marginBottom:40
  },
  btnEye: {
    position: 'absolute',
    top: 55,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
  btnLogin:{
      backgroundColor: "rgba(50,205,50,0.5)",
      width:DEVICE_WIDTH-40,
      marginHorizontal: 20,
      borderRadius: 20,
      padding:12,
      marginTop:5,
  },
  txtLogin:{
    textAlign: 'center',
    color:'#FFF'
  },
  boxRegister:{
    width:DEVICE_WIDTH-40,
    marginTop:10,
    flex:1,
    height:'100%',
    flexDirection:'row',
  },
  clickAccount:{
    width:(DEVICE_WIDTH/2)-20,
    height:100,
  },
  txtStyle:{
      textAlign:'center',
      color:'#000'
  }
});
