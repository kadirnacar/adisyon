import { colors } from '@components';
import { IDepartment } from '@models';
import { DepartmentActions } from '@reducers';
import { ApplicationState } from '@store';
import React, { Component } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const { height } = Dimensions.get("window");

interface DepartmentState {
    selectedItem: IDepartment;
}

interface DepartmentProps {
    DepartmentActions: typeof DepartmentActions
}

type Props = NavigationInjectedProps & DepartmentProps & ApplicationState;

class DepartmentScreen extends Component<Props, DepartmentState> {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null
        }
    }

    render() {
        const { container } = styles;
        return (
            <SafeAreaView style={container}>
                <View style={{}}>
                    <Text style={{ color: colors.inputTextColor, textAlign: "center", padding: 7, fontSize: 25 }}>Departman Seçiniz</Text>
                    <FlatList
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
                    />
                </View>
                <View style={{ flex: 1, height: 50 }}>
                    <TouchableOpacity
                        disabled={this.state.selectedItem == null}
                        style={{
                            width: "100%",
                            alignItems: "center",
                            paddingVertical: 20,
                            marginTop: 10,
                            borderColor: colors.borderColor,
                            borderWidth: 1,
                            backgroundColor: this.state.selectedItem == null ? "gray" : colors.buttonBackColor,
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
        backgroundColor: "transparent",
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