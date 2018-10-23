import React, { PropTypes } from 'react'
import {View, ListView, Text,TouchableOpacity,TextInput } from 'react-native'

export default class Demo2 extends React.Component {

  constructor (props) {
    super(props)

    // Set up our two placeholder values.
    this.listHeight = 0
    this.footerY = 0

    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11, 12, 13, 14, 15, 16,17, 18, 19, 20,21,22,23,24]

    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows(data)
    }
  }

  componentDidMount () {
    setTimeout(() => this.scrollToBottom(), 100);
  }

  // The magical function! 🎉
  scrollToBottom(animated = true) {
    if (this.listHeight && this.footerY && this.footerY > this.listHeight) {
      // Calculates the y scroll position inside the ListView
      const scrollTo = this.footerY - this.listHeight
      console.warn("y="+this.footerY+"/height="+this.listHeight+"/top="+scrollTo);
      // that sucker!
      this.refs.listView.scrollTo({
        y: scrollTo,
        animated: animated,
      });
      // var scrollDistance = this.listHeight - this.footerY;
      // this.refs.listView.getScrollResponder().scrollTo({y: -scrollDistance,
      //      animated: animated});
    }
  }

  customRowRender = (rowData, sectionId, rowId) => {
    return (
      <View style={{height: 100}}>
        <Text>{rowData}</Text>
      </View>
    )
  }

  // Save the list's height when it renders
  onLayout = (event) => {
    const layout = event.nativeEvent.layout
    this.listHeight = layout.height
  }

  // Render a fake footer
  renderFooter = () => {
    return (
      <View onLayout={this.onFooterLayout} />
    )
  }

  // When the fake footer is laid out, store the y-position
  onFooterLayout = (event) => {
    const layout = event.nativeEvent.layout
    this.footerY = layout.y
   
  }

  render () {
    return (
      <View>
        <ListView style={{height:400}}
          ref='listView'
          dataSource={this.state.dataSource}
          onLayout={this.onLayout}
          renderFooter={this.renderFooter}
          renderRow={this.customRowRender}
          enableEmptySections />
          <TouchableOpacity >
                    <TextInput 
                        multiline = {true}
                       
                        placeholder="message..." 
                      
                        placeholderTextColor="white"  
                        underlineColorAndroid="transparent"
                        editable={true}
                        returnKeyType='done'
                      
                        placeholderTextColor="white"/>
                    
            </TouchableOpacity>
      </View>
    )
  }
}

