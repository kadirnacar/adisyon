import {ActivityOrderActions, AdisyonActions, CustomerActions} from '@reducers';
import {ApplicationState} from '@store';
import 'intl';
import 'intl/locale-data/jsonp/tr';
import LottieView from 'lottie-react-native';
import React, {Component} from 'react';
import {
  Dimensions,
  Text,
  TouchableHighlight,
  View,
  Modal,
  TextInput,
} from 'react-native';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {colors} from '../colors';
import {LoaderSpinner} from '../LoaderSpinner';
import config from '@config';
const {width, scale, height} = Dimensions.get('window');

interface NfcReaderState {
  showGuestNo?: boolean;
  guestNo?: string;
}

interface NfcReaderProps {
  onReadTag?: (tagId: string) => void;
  CustomerActions: typeof CustomerActions;
  AdisyonActions: typeof AdisyonActions;
  ActivityOrderActions: typeof ActivityOrderActions;
}

type Props = NavigationInjectedProps & NfcReaderProps & ApplicationState;

class NfcReaderComp extends Component<Props, NfcReaderState> {
  constructor(props) {
    super(props);
    this.state = {
      showGuestNo: false,
      guestNo: '',
    };
  }
  componentWillUnmount() {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    NfcManager.unregisterTagEvent().catch(() => 0);
  }
  async componentDidMount() {
    NfcManager.isEnabled().then(enabled => {
      NfcManager.start()
        .then(() => {
          if (enabled) {
            NfcManager.setEventListener(NfcEvents.DiscoverTag, async tag => {
              if (this.props.onReadTag) this.props.onReadTag(tag.id);
            });
            NfcManager.registerTagEvent();
          } else {
          }
        })
        .catch(ex => {
          console.warn('ex', ex);
        });
    });
  }
  render() {
    return (
      <React.Fragment>
        <Modal
          visible={this.state.showGuestNo || false}
          transparent={true}
          onRequestClose={() => {
            this.setState({showGuestNo: false, guestNo: ''});
          }}>
          <View
            style={{
              flex: 1,
              width: '100%',
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: 'rgba(255,255,255,0.7)',
            }}>
            <View
              style={{
                flex: 1,
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                width: '80%',
                marginHorizontal: 20,
                borderRadius: 10,
                backgroundColor: '#fff',
                borderColor: colors.borderColor,
                borderWidth: 2,
              }}>
              <TextInput
                placeholder="Bileklik No"
                value={this.state.guestNo}
                style={{
                  backgroundColor: colors.buttonBackColor,
                  color: colors.inputTextColor,
                  width: '100%',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginVertical: 10,
                  marginHorizontal: 10,
                  textAlign: 'center',
                }}
                onChangeText={text => {
                  this.setState({guestNo: text});
                }}
              />
              <TouchableHighlight
                underlayColor="#ffffff00"
                style={{
                  backgroundColor: '#b329de',
                  marginVertical: 10,
                  borderRadius: 50,
                  height: 50,

                  justifyContent: 'center',
                  flexDirection: 'row',
                  borderColor: '#b329de',
                  borderWidth: 2,
                  paddingVertical: 10,
                  marginHorizontal: 5,
                  padding: 10,
                }}
                onPress={async () => {
                  if (this.props.onReadTag)
                    this.props.onReadTag(this.state.guestNo);

                  this.setState({showGuestNo: false, guestNo: ''});
                }}>
                <Text
                  style={{color: '#ffffff', fontWeight: 'bold', fontSize: 18}}>
                  Tamam
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <LoaderSpinner
          showLoader={this.props.Customer.isRequest}
          onCloseModal={async () => {
            await this.props.CustomerActions.clear();
          }}
        />
        <TouchableHighlight
          underlayColor="#ffffff00"
          style={{
            zIndex: 2,
            position: 'absolute',
            flex: 1,
            top: 50,
            right: 20,
            backgroundColor: colors.transparentBackColor,
            borderRadius: 40,
            borderColor: colors.borderColor,
            borderWidth: 2,
            padding: 10,
          }}
          onPressIn={() => {
            NfcManager.goToNfcSetting();
          }}>
          <Icon name="wrench" size={35} color={colors.inputTextColor} />
        </TouchableHighlight>
        {config.isTest ? (
          <TouchableHighlight
            underlayColor="#ffffff00"
            style={{
              zIndex: 2,
              position: 'absolute',
              flex: 1,
              top: 150,
              right: 20,
              backgroundColor: colors.transparentBackColor,
              borderRadius: 40,
              borderColor: colors.borderColor,
              borderWidth: 2,
              padding: 10,
            }}
            onPressIn={() => {
              this.setState({showGuestNo: true});
            }}>
            <Icon name="readme" size={35} color={colors.inputTextColor} />
          </TouchableHighlight>
        ) : null}
        <View
          style={{
            alignContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <Text style={{fontSize: 20}}>
            {this.props.Application.nfcScreenTitle}
          </Text>
        </View>
        <View
          style={{flex: 1, width: width, height: 500, flexDirection: 'row'}}>
          <LottieView
            source={require('../../../assets/animation.json')}
            autoPlay
            loop
          />
        </View>
      </React.Fragment>
    );
  }
}

export const NfcReader = withNavigation(
  connect(
    (state: ApplicationState) => state,
    dispatch => {
      return {
        CustomerActions: bindActionCreators({...CustomerActions}, dispatch),
        AdisyonActions: bindActionCreators({...AdisyonActions}, dispatch),
        ActivityOrderActions: bindActionCreators(
          {...ActivityOrderActions},
          dispatch,
        ),
      };
    },
  )(NfcReaderComp),
) as any;
