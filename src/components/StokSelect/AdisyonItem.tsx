import { colors } from '@components';
import { IAdisyonProduct, IStok } from '@models';
import React, { Component } from 'react';
import { Dimensions, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Collapsible from 'react-native-collapsible';

const { width, scale, height } = Dimensions.get("window");

interface Props {
    item: IStok;
    selectedStoks?: { [key: number]: IAdisyonProduct };
    onAddPress?: (stokId: number) => void;
    onRemovePress?: (stokId: number) => void;
}

export class AdisyonItem extends Component<Props, any> {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true
        };
    }

    componentDidMount() {
       
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        
    }
    
    render() {
        const { item } = this.props;
        const stok = this.props.selectedStoks[item.STOKID];

        return (
            <View style={{
                flex: 1,
                borderBottomWidth: 1,
                paddingVertical: 5,
                paddingHorizontal: 5,
                marginVertical: 2,
                borderBottomColor: colors.borderColor,
            }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{
                        width: "50%"
                    }}>
                        <TouchableHighlight underlayColor="#ffffff00"
                            style={{ flexDirection: "row" }}
                            onPressIn={() => this.setState({ collapsed: !this.state.collapsed })}>
                            <React.Fragment>
                                <Icon style={{
                                    borderWidth: 1,
                                    alignContent: "center",
                                    alignSelf: "center",
                                    alignItems: "center",
                                    textAlign: "center",
                                    padding: 3,
                                    height: 20,
                                    marginRight: 5,
                                    borderRadius: 20,
                                    width: 20
                                }}
                                    name={this.state.collapsed ? "angle-down" : "angle-up"} size={15} />
                                <Text>{item.ADI}</Text>
                            </React.Fragment>
                        </TouchableHighlight>
                    </View>
                    <View style={{
                        width: "30%",
                        flexDirection: "row"
                    }}>
                        <TouchableHighlight underlayColor="#ffffff00"
                            activeOpacity={1}
                            style={{
                                width: 30,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: colors.inputBackColor,
                                height: 30,
                                alignSelf: "center",
                                alignItems: "center"
                            }}
                            onPressIn={() => {
                                if (this.props.onRemovePress)
                                    this.props.onRemovePress(item.STOKID);
                                this.setState({});
                            }}
                        >
                            <Icon name="minus" size={25} />
                        </TouchableHighlight>
                        <Text style={{
                            width: 28,
                            alignSelf: "center",
                            alignItems: "center",
                            textAlign: "center",
                            fontSize: 18,
                            fontWeight: "bold"
                        }}>
                            {stok ? stok.QUANTITY : 0}
                        </Text>
                        <TouchableHighlight underlayColor="#ffffff00"
                            activeOpacity={1}
                            style={{
                                width: 30,
                                borderRadius: 10,
                                borderColor: colors.inputBackColor,
                                borderWidth: 1,
                                height: 30,
                                alignSelf: "center",
                                alignItems: "center"
                            }}
                            onPressIn={() => {
                                if (this.props.onAddPress)
                                    this.props.onAddPress(item.STOKID);
                                this.setState({});
                            }}>
                            <Icon name="plus" size={25} />
                        </TouchableHighlight>
                    </View>
                    <View style={{ width: "20%" }}>
                        <Text style={{ textAlign: "right", width: "100%" }}>{(item.SFIYAT1 * stok.QUANTITY).toFixed(2)}</Text>
                    </View>
                </View>
                <Collapsible
                    collapsed={this.state.collapsed}>
                    <View style={{
                    }}>
                        <TextInput
                            value={this.props.selectedStoks[item.STOKID] ? this.props.selectedStoks[item.STOKID].DESC : ""}
                            editable={this.props.selectedStoks[item.STOKID] && this.props.selectedStoks[item.STOKID].QUANTITY > 0 ? true : false}
                            onChangeText={(text) => {
                                this.props.selectedStoks[item.STOKID].DESC = text;
                            }}
                            style={{
                                width: "100%",
                                borderColor: colors.inputBackColor,
                                borderWidth: 1,
                                paddingVertical: 1,
                                marginTop: 5,
                                marginBottom: 0
                            }}
                            placeholder="Not" />
                    </View>
                </Collapsible>
            </View>
        )
    }
}


