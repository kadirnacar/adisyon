import { colors } from '@components';
import { IStokGrup } from '@models';
import ColorScheme from 'color-scheme';
import colorPalette from 'nice-color-palettes';
import React, { Component } from 'react';
import { Dimensions, Text, TouchableHighlight, View } from 'react-native';
import RNMaterialLetterIcon from 'react-native-material-letter-icon';

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

        this.scheme = new ColorScheme();
        this.scheme.from_hue(10)
            .scheme('triade')
            .variation('pastel');
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
            <TouchableHighlight underlayColor="#ffffff00"
                style={{
                    width: "100%",
                    borderBottomColor: colors.borderColor,
                    borderBottomWidth: 1,
                    paddingVertical: 2,
                    backgroundColor: this.props.selected ? colors.buttonBackColor : "#ffffff"
                }}
                onPressIn={() => {

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
                            shapeColor={colorPalette[this.props.index % colorPalette.length][0]}
                            letterColor={this.invertColor(colorPalette[this.props.index % colorPalette.length][0])}
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
