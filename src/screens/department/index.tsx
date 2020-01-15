import { colors } from '@components';
import { IDepartment } from '@models';
import { DepartmentActions } from '@reducers';
import { ApplicationState } from '@store';
import React, { Component } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TouchableHighlight, Image } from 'react-native';
import { FlatList, NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ColorScheme from 'color-scheme';
import RNMaterialLetterIcon from 'react-native-material-letter-icon';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { height, width } = Dimensions.get("window");

interface DepartmentState {
    selectedItem: IDepartment;
}

interface DepartmentProps {
    DepartmentActions: typeof DepartmentActions
}

type Props = NavigationInjectedProps & DepartmentProps & ApplicationState;

class DepartmentScreen extends Component<Props, DepartmentState> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Departman Seçimi",
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null
        }
        this.scheme = new ColorScheme();
        this.scheme.from_hue(10)
            .scheme('triade')
            .variation('pastel');
    }
    scheme;
    render() {
        const { container } = styles;
        let clrs = this.scheme.colors();
        // const l = this.props.Department.items.length;
        // for (var i = 0; i < l; i++) {
        //     this.props.Department.items.push(this.props.Department.items[i])

        // }
        return (
            <SafeAreaView style={container}>
                <View style={{ width: width }}>
                    {/* <FlatList
                        data={this.props.Department.items}
                        style={{ height: height - 160 }}
                        renderItem={({ item }) => (
                            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                                <TouchableOpacity style={[styles.imageThumbnail, this.state.selectedItem == item ? { borderColor: "red" } : {}]}
                                    onPress={() => {
                                        this.setState({ selectedItem: item })
                                    }}>
                                    <Text style={{ color: colors.inputTextColor, fontSize: 14, fontWeight: this.state.selectedItem == item ? "bold" : "normal" }}>{item.ADI}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                    /> */}
                    <FlatList
                        data={this.props.Department.items}
                        style={{ height: height - 160 }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableHighlight underlayColor="#ffffff00" key={index}
                                    style={{
                                        width: width / 3 - 18,
                                        height: 150,
                                        alignContent: "center",
                                        alignItems: "center",
                                        alignSelf: "center",
                                        justifyContent: "center",
                                        borderColor: this.state.selectedItem == item ? "red" : "transparent",//colors.borderColor,
                                        borderWidth: 4,
                                        margin: 5,
                                        borderRadius: 25,
                                        backgroundColor: this.state.selectedItem == item ? colors.transparentBackColor : "#ffffff"
                                    }}
                                    onPress={() => {
                                        this.setState({ selectedItem: item })
                                    }}>
                                    <View style={{ width: '100%', alignItems: "center" }}>
                                        <RNMaterialLetterIcon
                                            size={80}
                                            border={true}
                                            shapeColor={'#' + clrs[index % clrs.length]}
                                            letterColor={"#ffffff"}
                                            borderColor={this.state.selectedItem == item ? "red" : "#ffffff"}
                                            borderSize={2}
                                            lettersNumber={3}
                                            initialsNumber={3}
                                            letterSize={36}
                                            bold
                                            letter={item.ADI}
                                        />
                                        <Text style={{
                                            fontSize: 14,
                                            color: colors.inputTextColor,
                                            marginTop: 6,
                                            flexWrap: "nowrap",
                                            textAlignVertical: "center",
                                            textAlign: "center"
                                        }}>{item.ADI}</Text>
                                        {this.state.selectedItem == item ?
                                            <View style={{
                                                position: "absolute",
                                                borderWidth: 2,
                                                borderColor: "#ff5555",
                                                marginTop: 22,
                                                borderRadius: 20,
                                                padding: 2
                                            }}>
                                                <Icon name={"check"} size={25} color={"#ff5555"} />
                                            </View> : null}
                                    </View>

                                </TouchableHighlight>
                            )
                        }}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={{ position: "absolute", bottom: 10, width: width }}>
                    <TouchableOpacity
                        disabled={this.state.selectedItem == null}
                        style={{
                            width: width - 20,
                            alignItems: "center",
                            alignSelf: "center",
                            alignContent: "center",
                            justifyContent: "center",
                            marginHorizontal: 10,
                            height: 50,
                            borderColor: colors.borderColor,
                            backgroundColor: this.state.selectedItem == null ? "gray" : "#51bdec",
                            borderRadius: 25
                        }}
                        onPress={async () => {
                            await this.props.DepartmentActions.setCurrent(this.state.selectedItem);
                            this.props.navigation.navigate("Login");
                        }}
                    >
                        <Text style={{ color: colors.buttonTextColor, fontSize: 18, fontWeight: "bold" }}>Giriş</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

export const Department = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            DepartmentActions: bindActionCreators({ ...DepartmentActions }, dispatch),
        };
    }
)(DepartmentScreen));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    content: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: 5,
        backgroundColor: colors.transparentBackColor,
        margin: 2,
        height: 100,
    },
    formContainer: {
        flex: 1,
        marginBottom: 5,
        justifyContent: 'flex-end',
    }
});