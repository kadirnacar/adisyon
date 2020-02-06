import React, { Component } from 'react';
import { Button, Dimensions, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { colors } from '../colors';

const { width, scale, height } = Dimensions.get("window");

interface Props {
    onBarcodePress?: (barcode: string) => void;
    onClose?: () => void;
}

export class BarcodeReader extends Component<Props, any> {
    constructor(props) {
        super(props);
        this.state = {
            barcode: null
        };
    }

    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <View style={{
                    position: "absolute",
                    zIndex: 999,
                    width: 50,
                    right: 5,
                    top: 5
                }}>
                    <Button title="X"
                        onPress={() => {
                            if (this.props.onClose) {
                                this.props.onClose();
                            }
                        }}></Button>
                </View>
                <RNCamera
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                    captureAudio={false}
                    type={RNCamera.Constants.Type.back}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onBarCodeRead={(evt) => {
                        this.setState({ barcode: evt.data })
                    }}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        this.setState({ barcode: barcodes && barcodes.length > 0 ? barcodes[0].data : null })
                    }}
                />
                <View style={{
                    backgroundColor: this.state.barcode ? colors.buttonBackColor : "#fff",
                    width: "100%",
                    position: "absolute",
                    zIndex: 2,
                    bottom: 0,
                    height: 50,
                    alignSelf: "center",
                    alignContent: "center",
                    alignItems: "center"
                }}>
                    {this.state.barcode ?
                        <Button
                            title={this.state.barcode ? this.state.barcode : ""}
                            onPress={() => {
                                if (this.props.onBarcodePress)
                                    this.props.onBarcodePress(this.state.barcode);
                            }}></Button>
                        : null}
                </View>
            </View >
        )
    }
}


