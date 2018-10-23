import React, {Component} from 'react';
import {View,Text,Alert,ScrollView} from 'react-native';
import Items from './Items';
export default class ContentSearch extends Component{
    constructor(props){
        super(props);
        this.state={
            items:[],
            isLoading:true
        }
    }
    componentDidMount(){
        return fetch('http://laravel.hoanguyenit.com:8888/api/videos/search/'+this.props.keyword)
            .then((response) => response.json())
            .then((responseJson) => {
               // console.warn(responseJson);
                this.setState({items:responseJson,isLoading:false})
            })
            .catch((error) =>{
                console.error(error);
            });
    }
    render(){
        if(this.state.isLoading){
            return(
                <ScrollView>
                    <Text>Không có kết quả tìm kiếm nào!</Text>
                </ScrollView>
            )
        }
        return(
            <ScrollView>
                <Items dataItems={this.state.items}/>
            </ScrollView>
        )
    }
}