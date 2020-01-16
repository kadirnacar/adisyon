import { colors } from '@components';
import { StokActions } from '@reducers';
import { ApplicationState } from '@store';
import React, { Component } from 'react';
import { Dimensions, GestureResponderEvent, StyleProp, Text, TouchableOpacity, View, ViewStyle, Picker, TextInput, StyleSheet, Image } from 'react-native';
import { NavigationInjectedProps, withNavigation, FlatList } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
const { width, scale, height } = Dimensions.get("window");

interface StokSelectState {
    selectedGrup?: any;
    search?: string;
    selectedStoks?: { [key: number]: number };
}

interface StokSelectProps {
    style?: StyleProp<ViewStyle>;
    onPress?: (event: GestureResponderEvent) => void;
}

type Props = NavigationInjectedProps & StokSelectProps & ApplicationState;

class StokSelectInfoComp extends Component<Props, StokSelectState> {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            selectedStoks: {}
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                padding: 5,
                borderRadius: 20,
                borderColor: colors.borderColor,
                borderWidth: 1,
                marginHorizontal: 10,
                marginVertical: 10,
                backgroundColor: 'rgba(0,0,0,0.8)'
            }}>

                <View style={{ flex: 1 }}>
                    <View style={{
                        flexDirection: "column",
                        height: 50,
                        alignSelf: "center",
                        alignContent: "center",
                        width: "100%",
                        borderRadius: 10,
                        padding: 3,
                        backgroundColor: colors.inputTextColor
                    }}>
                        <Picker
                            selectedValue={this.state.selectedGrup}
                            mode="dropdown"
                            style={{ height: 40, backgroundColor: colors.inputTextColor, borderRadius: 10 }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ selectedGrup: itemValue })
                            }>
                            <Picker.Item label={"Tümü"} value={null} />
                            {this.props.StokGrup.items ? this.props.StokGrup.items.map((grp, index) => {
                                return <Picker.Item key={index} label={grp.ADI} value={grp.STOKGRUPID} />
                            }) : null}
                        </Picker>

                    </View>
                    <View style={{
                        flexDirection: "column",
                        height: 50,
                        alignSelf: "center",
                        alignContent: "center",
                        width: "100%",
                        borderRadius: 10,
                        marginTop: 5,
                        padding: 3,
                        backgroundColor: colors.inputTextColor
                    }}>
                        <TextInput
                            style={{ backgroundColor: colors.inputTextColor }}
                            placeholder="Ürün Ara"
                            value={this.state.search}
                            onChangeText={text => { this.setState({ search: text }) }} />
                    </View>
                    <View style={{ flex: 1, marginTop: 10 }}>
                        {this.props.Stok.items ?
                            <FlatList
                                data={this.props.Stok.items.filter(itm => (this.state.selectedGrup ? itm.STOKGRUPID == this.state.selectedGrup : true) && (this.state.search ? itm.ADI.indexOf(this.state.search) > -1 : true))}
                                numColumns={1}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    return <View style={[styles.imageThumbnail, { height: 60, flexDirection: "row", width: "100%", justifyContent: "flex-start" }]}>
                                        <View style={{ flexDirection: "column" }}>
                                            <Image style={{
                                                width: 40,
                                                height: 40,
                                                resizeMode: "cover",
                                                borderRadius: 2,
                                                marginRight: 5
                                            }} source={{ uri: item.FOTO, cache: 'force-cache' }} />
                                        </View>
                                        <View style={{ flexDirection: "column" }}>
                                            <Text style={{
                                                color: colors.inputTextColor,
                                                fontSize: 14,
                                            }}>{item.ADI}</Text>
                                        </View>
                                        <View style={{ flexDirection: "column" }}>
                                            <Text style={{
                                                color: colors.inputTextColor,
                                                fontSize: 12,
                                            }}>{item.SFIYAT1}</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: "column", alignItems: "flex-end" }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <View style={{ flexDirection: "column", marginRight: 5 }}>
                                                    <TouchableOpacity
                                                        style={{
                                                            alignItems: "center",
                                                            alignSelf: "center",
                                                            alignContent: "center",
                                                            borderRadius: 4,
                                                            height: 40,
                                                            backgroundColor: 'rgba(255,255,255,0.5)',
                                                            width: 40
                                                        }}
                                                        onPress={() => {
                                                            const { selectedStoks } = this.state;
                                                            selectedStoks[item.STOKID] = selectedStoks[item.STOKID] ? selectedStoks[item.STOKID] - 1 : 0;
                                                            if (selectedStoks[item.STOKID] < 0)
                                                                delete selectedStoks[item.STOKID];
                                                            this.setState({ selectedStoks: selectedStoks });
                                                        }}>
                                                        <Icon name="minus" size={35} color={colors.inputBackColor} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ flexDirection: "column", marginHorizontal: 3 }}>
                                                    <Text style={{ color: colors.inputTextColor, fontSize: 18 }}>
                                                        {this.state.selectedStoks[item.STOKID] || 0}
                                                    </Text>
                                                </View>
                                                <View style={{ flexDirection: "column" }}>
                                                    <TouchableOpacity
                                                        style={{
                                                            alignItems: "center",
                                                            alignSelf: "center",
                                                            alignContent: "center",
                                                            borderRadius: 4,
                                                            height: 40,
                                                            backgroundColor: 'rgba(255,255,255,0.5)',
                                                            width: 40
                                                        }}
                                                        onPress={() => {
                                                            const { selectedStoks } = this.state;
                                                            selectedStoks[item.STOKID] = selectedStoks[item.STOKID] ? selectedStoks[item.STOKID] + 1 : 1;
                                                            this.setState({ selectedStoks: selectedStoks });
                                                        }}>
                                                        <Icon name="plus" size={35} color={colors.inputBackColor} />
                                                    </TouchableOpacity>
                                                </View>

                                            </View>
                                        </View>
                                    </View>
                                }}
                            /> : null}
                        {/* {this.props.Stok.items ?
                        <FlatList
                            data={this.props.Stok.items.filter(itm => (this.state.selectedGrup ? itm.STOKGRUPID == this.state.selectedGrup : true) && (this.state.search ? itm.ADI.indexOf(this.state.search) > -1 : true))}
                            numColumns={2}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                                    <View style={styles.imageThumbnail}>
                                        <TouchableOpacity style={{
                                            alignItems: "center",
                                            alignSelf: "center",
                                            alignContent: "center",
                                            position: "absolute",
                                            height: 45,
                                            zIndex: 2,
                                            top: 0,
                                            backgroundColor: 'rgba(255,255,255,0.5)',
                                            width: "100%"
                                        }}
                                            onPress={() => {
                                                const { selectedStoks } = this.state;
                                                selectedStoks[item.STOKID] = selectedStoks[item.STOKID] ? selectedStoks[item.STOKID] + 1 : 1;
                                                this.setState({ selectedStoks: selectedStoks });
                                            }}>
                                            <Icon name="plus" size={35} color={colors.inputBackColor} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{
                                            alignItems: "center",
                                            alignSelf: "center",
                                            alignContent: "center",
                                            position: "absolute",
                                            height: 45,
                                            zIndex: 2,
                                            top: 45,
                                            backgroundColor: 'rgba(255,255,255,0.5)',
                                            width: "100%"
                                        }}
                                            onPress={() => {
                                                const { selectedStoks } = this.state;
                                                selectedStoks[item.STOKID] = selectedStoks[item.STOKID] ? selectedStoks[item.STOKID] - 1 : 0;
                                                if (selectedStoks[item.STOKID] < 0)
                                                    delete selectedStoks[item.STOKID];
                                                this.setState({ selectedStoks: selectedStoks });
                                            }}>
                                            <Icon name="minus" size={35} color={colors.buttonBackColor} />
                                        </TouchableOpacity>
                                        <Image style={{
                                            width: '100%',
                                            height: 80,
                                            top: 5,
                                            position: "absolute",
                                            resizeMode: "cover",
                                            borderRadius: 10
                                        }} source={{ uri: item.FOTO, cache: 'force-cache' }} />
                                        <Text style={{
                                            position: "absolute",
                                            fontWeight: "bold",
                                            color: colors.buttonBackColor,
                                            fontSize: 16,
                                            top: 85
                                        }}>{this.state.selectedStoks[item.STOKID]}</Text>
                                        <Text style={{
                                            position: "absolute",
                                            color: colors.inputTextColor,
                                            fontSize: 14,
                                            bottom: 0
                                        }}>{item.ADI}</Text>
                                    </View>
                                </View>
                            }}
                        /> : null} */}
                    </View>
                </View>
               
            </View>
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
        backgroundColor: "rgba(27,27,27,0.8)",
        margin: 2,
        height: 150,
    }
});