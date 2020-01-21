import { colors } from '@components';
import { IAdisyonProduct, IStok, IStokGrup } from '@models';
import { StokActions } from '@reducers';
import { ApplicationState } from '@store';
import ColorScheme from 'color-scheme';
import Fuse, { FuseOptions } from 'fuse.js';
import colorPalette from 'nice-color-palettes';
import React, { Component } from 'react';
import { Dimensions, KeyboardAvoidingView, StyleProp, StyleSheet, Text, TextInput, TouchableHighlight, View, ViewStyle } from 'react-native';
import RNMaterialLetterIcon from 'react-native-material-letter-icon';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FlatList, NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StokItem } from './StokItem';

const { width, scale, height } = Dimensions.get("window");

interface StokSelectState {
    selectedGrup?: IStokGrup;
    search?: string;
    searchOptions?: Fuse.FuseOptions<IStok>;
    data?: Fuse<IStok, FuseOptions<IStok>>;
}

interface StokSelectProps {
    style?: StyleProp<ViewStyle>;
    selectedStoks?: { [key: number]: IAdisyonProduct };
    onPress?: (data: { [key: number]: IAdisyonProduct }) => void;
}

type Props = NavigationInjectedProps & StokSelectProps & ApplicationState;

class StokSelectInfoComp extends Component<Props, StokSelectState> {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            searchOptions: {
                keys: ['ADI'],
            }
        };

        this.scheme = new ColorScheme();
        this.scheme.from_hue(10)
            .scheme('triade')
            .variation('pastel');
    }
    componentDidMount() {
        this.setState({ data: new Fuse(this.props.Stok.items, this.state.searchOptions) });
    }
    scheme;
    invertColor(hex, bw?) {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        }
        var r = parseInt(hex.slice(0, 2), 16),
            g = parseInt(hex.slice(2, 4), 16),
            b = parseInt(hex.slice(4, 6), 16);
        if (bw) {
            return (r * 0.299 + g * 0.587 + b * 0.114) > 186
                ? '#000000'
                : '#FFFFFF';
        }
        var rString = (255 - r).toString(16);
        var gString = (255 - g).toString(16);
        var bString = (255 - b).toString(16);
        return "#" + this.padZero(rString) + this.padZero(gString) + this.padZero(bString);
    }
    padZero(str, len?) {
        len = len || 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }
    render() {
        return (

            <KeyboardAvoidingView style={{ flex: 1, width: width, height: height }}
                behavior="padding"
                enabled
                keyboardVerticalOffset={25}>
                <View style={{
                    flex: 1,
                    width: width - 5,
                    height: height,
                    flexDirection: "row",
                    marginBottom: 0,
                    padding: 5,
                    paddingBottom: 0
                }}>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: colors.borderColor,
                            flexDirection: "column",
                            width: "65%",
                            marginRight: 5
                        }}>
                        <FlatList
                            data={this.state.data && this.state.search ? this.state.data.search(this.state.search) as IStok[] : this.props.Stok.items}
                            renderItem={({ item, index }) => {
                                const stok = this.props.selectedStoks[item.STOKID];
                                return (
                                    <StokItem
                                        item={item}
                                        selectedStoks={this.props.selectedStoks}
                                        onAddPress={(stokId) => {
                                            const { selectedStoks } = this.props;
                                            if (!selectedStoks[stokId])
                                                selectedStoks[stokId] = { ID: stokId, QUANTITY: 0 };
                                            selectedStoks[stokId].QUANTITY = selectedStoks[stokId].QUANTITY + 1;
                                            if (this.props.onPress)
                                                this.props.onPress(selectedStoks);
                                        }}
                                        onRemovePress={(stokId) => {
                                            const { selectedStoks } = this.props;
                                            if (selectedStoks[stokId] && selectedStoks[stokId].QUANTITY > 0) {
                                                selectedStoks[stokId].QUANTITY = selectedStoks[stokId].QUANTITY - 1;
                                                if (this.props.onPress)
                                                    this.props.onPress(selectedStoks);
                                            }
                                        }}
                                    />
                                    // <View style={{
                                    //     flex: 1,
                                    //     borderBottomWidth: 1,
                                    //     paddingVertical: 5,
                                    //     paddingHorizontal: 5,
                                    //     marginVertical: 2,
                                    //     borderBottomColor: colors.borderColor,
                                    // }}>
                                    //     <View style={{ flex: 1, flexDirection: "row" }}>
                                    //         <View style={{
                                    //             width: "63%"
                                    //         }}>
                                    //             <Text>{item.ADI}    ({item.SFIYAT1.toFixed(2)})</Text>
                                    //         </View>
                                    //         <View style={{
                                    //             width: "37%",
                                    //             flexDirection: "row"
                                    //         }}>
                                    //             <TouchableHighlight
                                    //                 style={{
                                    //                     width: 30,
                                    //                     borderRadius: 10,
                                    //                     borderWidth: 1,
                                    //                     borderColor: colors.inputBackColor,
                                    //                     height: 30,
                                    //                     alignSelf: "center",
                                    //                     alignItems: "center"
                                    //                 }}
                                    //                 onPress={() => {
                                    //                     const { selectedStoks } = this.props;
                                    //                     if (selectedStoks[item.STOKID].QUANTITY > 0)
                                    //                         selectedStoks[item.STOKID].QUANTITY = selectedStoks[item.STOKID].QUANTITY - 1;
                                    //                     if (this.props.onPress)
                                    //                         this.props.onPress(selectedStoks);
                                    //                 }}
                                    //             >
                                    //                 <Icon name="minus" size={25} />
                                    //             </TouchableHighlight>
                                    //             <Text style={{
                                    //                 width: 28,
                                    //                 alignSelf: "center",
                                    //                 alignItems: "center",
                                    //                 textAlign: "center",
                                    //                 fontSize: 18,
                                    //                 fontWeight: "bold"
                                    //             }}>
                                    //                 {stok ? stok.QUANTITY : 0}
                                    //             </Text>
                                    //             <TouchableHighlight
                                    //                 style={{
                                    //                     width: 30,
                                    //                     borderRadius: 10,
                                    //                     borderColor: colors.inputBackColor,
                                    //                     borderWidth: 1,
                                    //                     height: 30,
                                    //                     alignSelf: "center",
                                    //                     alignItems: "center"
                                    //                 }}
                                    //                 onPress={() => {
                                    //                     const { selectedStoks } = this.props;
                                    //                     if (!selectedStoks[item.STOKID])
                                    //                         selectedStoks[item.STOKID] = { ID: item.STOKID, QUANTITY: 0 };
                                    //                     selectedStoks[item.STOKID].QUANTITY = selectedStoks[item.STOKID].QUANTITY + 1;
                                    //                     if (this.props.onPress)
                                    //                         this.props.onPress(selectedStoks);
                                    //                 }}>
                                    //                 <Icon name="plus" size={25} />
                                    //             </TouchableHighlight>
                                    //         </View>
                                    //     </View>
                                    //     <View style={{
                                    //     }}>
                                    //         <TextInput
                                    //             editable={this.props.selectedStoks[item.STOKID] && this.props.selectedStoks[item.STOKID].QUANTITY > 0 ? true : false}
                                    //             style={{
                                    //                 width: "100%",
                                    //                 borderColor: colors.inputBackColor,
                                    //                 borderWidth: 1,
                                    //                 paddingVertical: 1,
                                    //                 marginTop: 5,
                                    //                 marginBottom: 0
                                    //             }}
                                    //             placeholder="Not" />
                                    //     </View>
                                    // </View>

                                )
                            }}
                            numColumns={1}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: colors.borderColor,
                            flexDirection: "column",
                            width: "35%",
                        }}>
                        <FlatList
                            data={this.props.StokGrup.items}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableHighlight underlayColor="#ffffff00" key={index}
                                        style={{
                                            width: "100%",
                                            borderBottomColor: colors.borderColor,
                                            borderBottomWidth: 1,
                                            paddingVertical: 2,
                                            backgroundColor: this.state.selectedGrup == item ? colors.buttonBackColor : "#ffffff"
                                        }}
                                        onPressIn={() => {
                                            this.setState({ selectedGrup: item })
                                        }}>
                                        <View style={{
                                            flexDirection: "row",
                                            width: "100%",
                                            overflow: "hidden",
                                            alignItems: "flex-start",
                                            alignSelf: "flex-start"
                                        }}>
                                            <View style={{
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                                marginRight: 3,
                                                marginLeft: 2,
                                                alignSelf: "flex-start"
                                            }}>
                                                <RNMaterialLetterIcon
                                                    size={35}
                                                    border={false}
                                                    shapeColor={colorPalette[index % colorPalette.length][0]}
                                                    letterColor={this.invertColor(colorPalette[index % colorPalette.length][0])}
                                                    shapeType={"round"}
                                                    borderRy={6}
                                                    borderRx={6}
                                                    borderSize={1}
                                                    lettersNumber={1}
                                                    initialsNumber={1}
                                                    letterSize={20}
                                                    letter={item.ADI}
                                                />
                                            </View>
                                            <View style={{
                                                flexDirection: "column",
                                                flex: 1,
                                                alignSelf: "center"
                                            }}>
                                                <Text style={{
                                                    fontWeight: this.state.selectedGrup == item ? "bold" : "normal",
                                                    fontSize: 12,
                                                    color: this.state.selectedGrup == item ? "#ffffff" : colors.inputTextColor,
                                                    flexWrap: "wrap",
                                                    overflow: "hidden",
                                                    textAlignVertical: "center",
                                                    textAlign: "left"
                                                }}>{item.ADI}</Text>

                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                )
                            }}
                            numColumns={1}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>

                <TextInput
                    placeholder="Tüm ürünlerde ara"
                    autoFocus={true}
                    clearButtonMode="always"
                    clearTextOnFocus
                    onChangeText={text => {
                        this.setState({ search: text })
                    }}
                    style={{
                        color: colors.inputTextColor,
                        backgroundColor: "#fff",
                        borderColor: colors.borderColor,
                        borderWidth: 1,
                        paddingVertical: 5,
                        marginHorizontal: 5,
                        marginTop: 5,
                        paddingHorizontal: 15,
                        textAlign: "left",
                        fontSize: 20,
                        borderRadius: 0
                    }} />
            </KeyboardAvoidingView>

        )
    }
}

export const StokSelect = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            StokSelectActions: bindActionCreators({ ...StokActions }, dispatch),
        };
    }
)(StokSelectInfoComp)) as any;

const styles = StyleSheet.create({

    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: 5,
        margin: 2,
        height: 150,
    }
});