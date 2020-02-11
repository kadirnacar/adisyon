import { colors, LoaderSpinner } from '@components';
import { ITable } from '@models';
import { TableActions, CustomerActions, AdisyonActions, ActivityOrderActions } from '@reducers';
import { ApplicationState } from '@store';
import ColorScheme from 'color-scheme';
import React, { Component } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import RNMaterialLetterIcon from 'react-native-material-letter-icon';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FlatList, NavigationInjectedProps, withNavigation, NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { height, width } = Dimensions.get("window");

interface TableState {
    selectedItem: ITable;
}

interface TableProps {
    TableActions: typeof TableActions;
    CustomerActions: typeof CustomerActions;
    AdisyonActions: typeof AdisyonActions;
    ActivityOrderActions: typeof ActivityOrderActions;
}

type Props = NavigationInjectedProps & TableProps & ApplicationState;

class TableScreen extends Component<Props, TableState> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Masa Seçimi",
        };
    };
    constructor(props) {
        super(props);
        this.handleComponentMount = this.handleComponentMount.bind(this);
        this.handleComponentUnMount = this.handleComponentUnMount.bind(this);
        this.state = {
            selectedItem: null
        }
    }
    async componentDidMount() {
    }
    async handleComponentMount() {
        await this.props.TableActions.getItems(this.props.Department.current.KODU);
        await this.props.TableActions.setCurrent(null);
        await this.props.CustomerActions.clear();
        await this.props.AdisyonActions.setCurrent(null);
        await this.props.ActivityOrderActions.setCurrent(null);
    }
    async handleComponentUnMount() {
        // NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        // NfcManager.unregisterTagEvent().catch(() => 0);
    }
    render() {
        const { container } = styles;
        return (
            <SafeAreaView style={container}>
                <NavigationEvents
                    onWillBlur={this.handleComponentUnMount}
                    onWillFocus={this.handleComponentMount} />
                <View style={{ width: width }}>
                    <FlatList
                        data={this.props.Table.items ? this.props.Table.items : []}
                        style={{ height: height - 160 }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableHighlight underlayColor="#ffffff00" key={index}
                                    style={{
                                        width: width / 3 - 18,
                                        height: width / 3 - 18,
                                        alignContent: "center",
                                        alignItems: "center",
                                        alignSelf: "center",
                                        justifyContent: "center",
                                        borderColor: this.state.selectedItem == item ? "red" : "#7097c2",//colors.borderColor,
                                        borderWidth: 4,
                                        margin: 5,
                                        borderRadius: (width / 3 - 18) / 2,
                                        backgroundColor: this.state.selectedItem == item ? "#7097c2" : "#70a4db"
                                    }}
                                    onPressIn={() => {
                                        this.setState({ selectedItem: item })
                                    }}>
                                    <View style={{
                                    }}>
                                        <Icon name={"chair"} size={35} color={"#fff"} />
                                        <Text style={{
                                            fontSize: 14,
                                            color: colors.inputTextColor,
                                            marginTop: 6,
                                            flexWrap: "nowrap",
                                            textAlignVertical: "center",
                                            textAlign: "center"
                                        }}>{item.MASANO}</Text>
                                        {this.state.selectedItem == item ?
                                            <View style={{
                                                position: "absolute",
                                                borderWidth: 2,
                                                borderColor: "#ff5555",
                                                marginTop: 10,
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
                    <TouchableHighlight underlayColor="#ffffff00"
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
                        onPressIn={async () => {
                            await this.props.TableActions.setCurrent(this.state.selectedItem);
                            this.props.navigation.navigate("Adisyon");
                        }}
                    >
                        <Text style={{ color: colors.buttonTextColor, fontSize: 18, fontWeight: "bold" }}>Devam</Text>
                    </TouchableHighlight>
                </View>
            </SafeAreaView>
        )
    }
}

export const TableSelect = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            TableActions: bindActionCreators({ ...TableActions }, dispatch),
            CustomerActions: bindActionCreators({ ...CustomerActions }, dispatch),
            AdisyonActions: bindActionCreators({ ...AdisyonActions }, dispatch),
            ActivityOrderActions: bindActionCreators({ ...ActivityOrderActions }, dispatch),
        };
    }
)(TableScreen));

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