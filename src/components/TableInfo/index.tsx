import { colors } from '@components';
import { TableActions } from '@reducers';
import { ApplicationState } from '@store';
import React, { Component } from 'react';
import { Dimensions, GestureResponderEvent, StyleProp, Text, TouchableHighlight, View, ViewStyle } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const { width, scale, height } = Dimensions.get("window");

interface TableState {
}

interface TableProps {
    style?: StyleProp<ViewStyle>;
    total?: number;
    onPress?: (event: GestureResponderEvent) => void;
}

type Props = NavigationInjectedProps & TableProps & ApplicationState;

class TableInfoComp extends Component<Props, TableState> {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <TouchableHighlight underlayColor="#ffffff00"
                disabled={this.props.Table.current == null}
                onPressIn={this.props.onPress ? this.props.onPress.bind(this) : null}
                style={[{
                    flex: 0,
                    width: width - 10,
                    height: 150,
                    flexDirection: "row",
                    backgroundColor: colors.transparentBackColor,
                    borderRadius: 10,
                    borderColor: colors.borderColor,
                    borderWidth: 2,
                    padding: 10,
                    marginHorizontal: 5
                }, this.props.style]}>
                <React.Fragment>
                    <View>
                        <Text style={{ color: colors.borderColor }}>Masa Adı</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 18, color: colors.inputTextColor }}>
                            {this.props.Table.current ? this.props.Table.current.MASANO : null}
                        </Text>
                    </View>
                    {this.props.total != null ?
                        <View style={{
                            alignContent: "flex-end",
                            alignItems: "flex-end",
                            alignSelf: "flex-end",
                            flex:1
                        }}>
                            <Text style={{ color: colors.borderColor }}>Toplam Tutar</Text>
                            <Text style={{ color: colors.inputTextColor }}>{Intl.NumberFormat("TR", {
                                style: "currency",
                                currency: "TRL"
                            }).format((this.props.total ? this.props.total : 0))}</Text>
                        </View> : null}
                </React.Fragment>
            </TouchableHighlight>
        )
    }
}

export const TableInfo = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            TableActions: bindActionCreators({ ...TableActions }, dispatch),
        };
    }
)(TableInfoComp)) as any;