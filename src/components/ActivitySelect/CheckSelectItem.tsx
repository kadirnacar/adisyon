import { colors } from '@components';
import { IActivity, IActivityProduct, ISeance } from '@models';
import moment from 'moment';
import React, { Component } from 'react';
import { Dimensions, Text, TextInput, TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width, scale, height } = Dimensions.get("window");

interface Props {
    activity: IActivity;
    onSelect?: (item: IActivity, seance: ISeance) => void;
}

export class CheckSelectItem extends Component<Props, any> {
    constructor(props) {
        super(props);
        this.state = {
            selectedSeance: null
        };
    }

    render() {
        const { activity } = this.props;

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
                        width: "60%"
                    }}>
                        <Text style={{
                            color: colors.inputTextColor,
                            fontWeight: "bold",
                            fontSize: 16
                        }}>{activity.NAME}</Text>
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    width: "100%",
                    flexWrap: "wrap"
                }}>

                    {activity.Seances.sort((a, b) => {
                        if (a.SEANCESTART > b.SEANCESTART)
                            return 1;
                        else if (a.SEANCESTART < b.SEANCESTART)
                            return -1
                        else
                            return 0;
                    }).map((act, index) => {
                        return <TouchableHighlight key={index}
                            onPress={() => {
                                if (this.props.onSelect)
                                    this.props.onSelect(activity, act);
                            }}
                            style={{
                                margin: 3,
                                width: 70,
                                alignContent: "center",
                                alignItems: "center",
                                paddingHorizontal: 5,
                                paddingVertical: 3,
                                borderWidth: 1,
                                borderRadius: 6
                            }}>
                            <Text>{moment(act.SEANCESTART).format("HH:mm")}</Text>
                        </TouchableHighlight>
                    })}
                </View>
            </View>
        )
    }
}


