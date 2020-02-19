import { colors } from '@components';
import { IStokGrup } from '@models';
import React, { Component } from 'react';
import { Dimensions, Text, TouchableHighlight, View } from 'react-native';
import RNMaterialLetterIcon from 'react-native-material-letter-icon';
import { invertColor } from '@utils';

const { width, scale, height } = Dimensions.get("window");

interface GroupItemState {
}

interface GroupItemProps {
    selected?: boolean;
    group: IStokGrup;
    index?: number;
    onPress?: (group: IStokGrup) => void;
}

type Props = GroupItemProps;

export class GroupItem extends Component<Props, GroupItemState> {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

 

    render() {
        return (
            <TouchableHighlight underlayColor="#ffffff00"
                style={{
                    width: "100%",
                    borderBottomColor: colors.borderColor,
                    borderBottomWidth: 1,
                    paddingVertical: 2,
                    backgroundColor: this.props.selected ? colors.buttonBackColor : "#ffffff"
                }}
                onPressIn={() => {
                    if (this.props.onPress)
                        this.props.onPress(this.props.group)
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
                            shapeColor={this.props.group.color}
                            letterColor={invertColor(this.props.group.color)}
                            shapeType={"round"}
                            borderRy={6}
                            borderRx={6}
                            borderSize={1}
                            lettersNumber={1}
                            initialsNumber={1}
                            letterSize={20}
                            letter={this.props.group.ADI}
                        />
                    </View>
                    <View style={{
                        flexDirection: "column",
                        flex: 1,
                        alignSelf: "center"
                    }}>
                        <Text style={{
                            fontWeight: this.props.selected ? "bold" : "normal",
                            fontSize: 12,
                            color: this.props.selected ? "#ffffff" : colors.inputTextColor,
                            flexWrap: "wrap",
                            overflow: "hidden",
                            textAlignVertical: "center",
                            textAlign: "left"
                        }}>{this.props.group.ADI}</Text>

                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}
