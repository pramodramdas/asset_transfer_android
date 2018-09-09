import { connect } from "react-redux";
import React from "react";
import { View, Text } from 'react-native';
import { getParticipants } from "../actions/participant";
import { DeckSwiper, Card, CardItem, Thumbnail, Left, Body, Icon, Image, Button } from 'native-base';

class SearchItems extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        message:""
    }

    renderParticipants(item) {
         return (
             <Card style={{ elevation: 3 }}>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../img/profile.png')} />
                        <Body>
                            <Text style={boldStyle}>empId : {item.empId}</Text>
                            <Text style={boldStyle}>name : {item.name}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Text style={boldStyle}>email : {item.email}  </Text>
                    <Text style={boldStyle}>role : {item.role}   </Text>
                    <Text style={boldStyle}>department  : {item.department}</Text>
                </CardItem>
             </Card>
         );
    }

    renderAssets(item) {
         return (
             <Card style={{ elevation: 3 }}>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../img/profile.png')} />
                        <Body>
                            <Text style={boldStyle}>assetId : {item.assetId}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Text style={boldStyle}>owner : {item.owner}  </Text>
                    <Text style={boldStyle}>description : {item.description} </Text>
                </CardItem>
             </Card>
         );
    }

    render() {
        return(
            <View style={{ flexDirection: "column", flex: 1, position: "relative" }}>
                <View>
                    {
                        this.props[this.props.type].length > 0 ?
                        <View style={{ flexDirection: "column", flex: 1, position: "relative" }}>
                            <DeckSwiper
                                ref={(c) => {this._deckSwiper = c}}
                                dataSource={this.props[this.props.type]}
                                renderEmpty={() => <View style={{ alignSelf: "center" }}>
                                                <Text>Over</Text>
                                            </View>}
                                renderItem={(this.props.type === "assets")? this.renderAssets: this.renderParticipants}
                            />
                            <View style={{ flexDirection: "row", flex: 1, bottom: -100, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
                              <Button iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
                                <Icon name="arrow-back" />
                                <Text>Swipe Left</Text>
                              </Button>
                              <Button iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
                                <Icon name="arrow-forward" />
                                <Text>Swipe Right</Text>
                              </Button>
                            </View>
                       </View>
                        :null
                    }
                </View>
            </View>
        );
    }
}

const gridStyle = {
    width: '100%',
    textAlign: 'center',
    height: 100
};

const boldStyle = {
    fontWeight: "bold"
};

const mapStateToProps = (state) => {
    return {
        participants:state.participant.participants,
        assets:state.asset.assets
    }
};

export default connect(mapStateToProps, {})(SearchItems);