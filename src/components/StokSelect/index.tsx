import { colors } from '@components';
import { IStokGrup, IStok } from '@models';
import { StokActions } from '@reducers';
import { ApplicationState } from '@store';
import ColorScheme from 'color-scheme';
import colorPalette from 'nice-color-palettes';
import React, { Component } from 'react';
import { Dimensions, GestureResponderEvent, KeyboardAvoidingView, StyleProp, StyleSheet, Text, TextInput, TouchableHighlight, View, ViewStyle } from 'react-native';
import RNMaterialLetterIcon from 'react-native-material-letter-icon';
import { FlatList, NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Fuse, { FuseResultWithMatches, FuseOptions } from 'fuse.js';

const { width, scale, height } = Dimensions.get("window");

interface StokSelectState {
    selectedGrup?: IStokGrup;
    search?: string;
    searchOptions?: Fuse.FuseOptions<IStok>;
    data?: Fuse<IStok, FuseOptions<IStok>>;
}

interface StokSelectProps {
    style?: StyleProp<ViewStyle>;
    selectedStoks?: { [key: number]: number };
    onPress?: (data: { [key: number]: number }) => void;
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
                    width: width,
                    height: height,
                    flexDirection: "row",
                    marginBottom: 0,
                    padding: 5,
                    paddingBottom: 0
                }}>
                    <View
                        style={{
                            borderColor: colors.borderColor,
                            flexDirection: "column",
                            width: "65%",
                            paddingRight: 10
                        }}>
                        <FlatList
                            data={this.state.data && this.state.search ? this.state.data.search(this.state.search) as IStok[] : this.props.Stok.items}
                            renderItem={({ item, index }) => {
                                const stok = this.props.selectedStoks[item.STOKID];
                                return (
                                    <TouchableHighlight underlayColor="#ffffff00" key={index}
                                        style={{
                                            flex: 1,
                                            borderColor: colors.borderColor,
                                            borderWidth: 3,
                                            margin: 2,
                                            borderRadius: 10,
                                            padding: 0,
                                            backgroundColor: this.state.selectedGrup == item ? colors.buttonBackColor : "#ffffff"
                                        }}
                                        onPress={() => {
                                            const { selectedStoks } = this.props;
                                            selectedStoks[item.STOKID] = selectedStoks[item.STOKID] ? selectedStoks[item.STOKID] + 1 : 1;
                                            if (this.props.onPress)
                                                this.props.onPress(selectedStoks);

                                        }}>
                                        <View style={{ width: "100%", overflow: "hidden", alignItems: "center", alignSelf: "center" }}>
                                            <View style={{ alignItems: "center", marginRight: 3, alignSelf: "center" }}>
                                                <RNMaterialLetterIcon
                                                    size={50}
                                                    border={false}
                                                    shapeColor={colorPalette[(colorPalette.length - index) % colorPalette.length][0]}
                                                    letterColor={this.invertColor(colorPalette[index % colorPalette.length][0])}
                                                    shapeType={"circle"}
                                                    borderRy={6}
                                                    borderRx={6}
                                                    borderSize={2}
                                                    lettersNumber={4}
                                                    initialsNumber={4}
                                                    letterSize={20}
                                                    letter={(stok ? stok : 0).toString()}
                                                />
                                            </View>
                                            <View style={{ flex: 1, alignContent: "center", alignSelf: "center" }}>
                                                <Text style={{
                                                    fontWeight: this.state.selectedGrup == item ? "bold" : "normal",
                                                    fontSize: 14,
                                                    color: colors.inputTextColor,
                                                    flexWrap: "wrap",
                                                    overflow: "hidden",
                                                    textAlignVertical: "center",
                                                    textAlign: "center"
                                                }}>{item.ADI}</Text>

                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                )
                            }}
                            numColumns={2}
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
                                            borderColor: colors.borderColor,
                                            borderWidth: 3,
                                            margin: 2,
                                            borderRadius: 10,
                                            padding: 0,
                                            backgroundColor: this.state.selectedGrup == item ? colors.buttonBackColor : "#ffffff"
                                        }}
                                        onPress={() => {
                                            this.setState({ selectedGrup: item })
                                        }}>
                                        <View style={{ flexDirection: "row", width: "100%", overflow: "hidden", alignItems: "flex-start", alignSelf: "flex-start" }}>
                                            <View style={{ flexDirection: "column", alignItems: "flex-start", marginRight: 3, alignSelf: "flex-start" }}>
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
                                            <View style={{ flexDirection: "column", flex: 1, alignContent: "flex-start", alignSelf: "center" }}>
                                                <Text style={{
                                                    fontWeight: this.state.selectedGrup == item ? "bold" : "normal",
                                                    fontSize: 12,
                                                    color: colors.inputTextColor,
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
                    placeholder="Ara"
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