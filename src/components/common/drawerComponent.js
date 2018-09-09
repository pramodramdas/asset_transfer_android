import React, { Component } from 'react';
import Drawer from 'react-native-drawer'
import { View, Text, DrawerLayoutAndroid } from 'react-native';
import SideBar from './sideBar';
import Header from './header';

class DrawerComponent extends Component {
  constructor(props) {
    super(props);
  }

  closeControlPanel = () => {
      this._drawer.close()
    };
    openControlPanel = () => {
      this._drawer.open()
    };
    render () {
      var navigationView = (
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
          </View>
        );

        return (
          <DrawerLayoutAndroid
            drawerWidth={300}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => navigationView}>
            <View style={{height:200}}>
                {this.props.children}
            </View>
          </DrawerLayoutAndroid>
        );
    }
}

export default DrawerComponent;