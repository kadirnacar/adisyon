import {colors} from '@components';
import config from '@config';
import {IDepartment} from '@models';
import {
  ApplicationActions,
  Applications,
  DepartmentActions,
  TableActions,
} from '@reducers';
import {ApplicationState} from '@store';
import ColorScheme from 'color-scheme';
import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import RNMaterialLetterIcon from 'react-native-material-letter-icon';
import SafeAreaView from 'react-native-safe-area-view';
import {
  default as FontAwesome5Icon,
  default as Icon,
} from 'react-native-vector-icons/FontAwesome5';
import {
  FlatList,
  NavigationInjectedProps,
  withNavigation,
} from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const {height, width} = Dimensions.get('window');

interface DepartmentState {
  selectedItem: IDepartment;
}

interface DepartmentProps {
  DepartmentActions: typeof DepartmentActions;
  TableActions: typeof TableActions;
  ApplicationActions: typeof ApplicationActions;
}

type Props = NavigationInjectedProps & DepartmentProps & ApplicationState;

class DepartmentScreen extends Component<Props, DepartmentState> {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Departman Seçimi',
      headerRight: props => {
        return (
          <TouchableHighlight
            underlayColor="#ffffff00"
            style={{
              borderRadius: 40,
              borderColor: colors.borderColor,
              borderWidth: 2,
              padding: 5,
              marginRight: 5,
            }}
            onPressIn={() => {
              navigation.navigate('CustomerTrans', {current: true});
            }}>
            <FontAwesome5Icon name="user" size={25} color={'#fff'} />
          </TouchableHighlight>
        );
      },
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
    };
    this.scheme = new ColorScheme();
    this.scheme
      .from_hue(10)
      .scheme('triade')
      .variation('pastel');
  }
  scheme;
  render() {
    const {container} = styles;
    let clrs = this.scheme.colors();
    return (
      <SafeAreaView style={container}>
        <View style={{width: width}}>
          <FlatList
            data={
              this.props.Garson.current
                ? this.props.Department.items.filter(itm => {
                    return (
                      this.props.Garson.current.STAFFDEPS.findIndex(
                        i => i.DEPID == itm.ID,
                      ) > -1
                    );
                  })
                : []
            }
            style={{height: height - 160}}
            renderItem={({item, index}) => {
              return (
                <TouchableHighlight
                  underlayColor="#ffffff00"
                  key={index}
                  style={{
                    width: width / 3 - 18,
                    height: 150,
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    borderColor:
                      this.state.selectedItem == item ? 'red' : 'transparent', //colors.borderColor,
                    borderWidth: 4,
                    margin: 5,
                    borderRadius: 25,
                    backgroundColor:
                      this.state.selectedItem == item
                        ? colors.transparentBackColor
                        : '#ffffff',
                  }}
                  onPressIn={() => {
                    this.setState({selectedItem: item});
                  }}>
                  <View style={{width: '100%', alignItems: 'center'}}>
                    <RNMaterialLetterIcon
                      size={80}
                      border={true}
                      shapeColor={'#' + clrs[index % clrs.length]}
                      letterColor={'#ffffff'}
                      borderColor={
                        this.state.selectedItem == item ? 'red' : '#ffffff'
                      }
                      borderSize={2}
                      lettersNumber={3}
                      initialsNumber={3}
                      letterSize={36}
                      bold
                      letter={item.ADI}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: colors.inputTextColor,
                        marginTop: 6,
                        flexWrap: 'nowrap',
                        textAlignVertical: 'center',
                        textAlign: 'center',
                      }}>
                      {item.ADI}
                    </Text>
                    {this.state.selectedItem == item ? (
                      <View
                        style={{
                          position: 'absolute',
                          borderWidth: 2,
                          borderColor: '#ff5555',
                          marginTop: 22,
                          borderRadius: 20,
                          padding: 2,
                        }}>
                        <Icon name={'check'} size={25} color={'#ff5555'} />
                      </View>
                    ) : null}
                  </View>
                </TouchableHighlight>
              );
            }}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={{position: 'absolute', bottom: 10, width: width}}>
          <TouchableHighlight
            underlayColor="#ffffff00"
            disabled={this.state.selectedItem == null}
            style={{
              width: width - 20,
              alignItems: 'center',
              alignSelf: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              marginHorizontal: 10,
              height: 50,
              borderColor: colors.borderColor,
              backgroundColor:
                this.state.selectedItem == null ? 'gray' : '#51bdec',
              borderRadius: 25,
            }}
            onPressIn={async () => {
              await this.props.TableActions.clear();
              await this.props.DepartmentActions.setCurrent(
                this.state.selectedItem,
              );
              if (config.useAlagart && this.props.Department.useTable) {
                this.props.navigation.navigate('TableSelect');
              } else {
                await this.props.ApplicationActions.setCurrent(
                  Applications.Siparis,
                );
                await this.props.ApplicationActions.setNfcTitle('F&B');
                this.props.navigation.navigate('Nfc');
              }
            }}>
            <Text
              style={{
                color: colors.buttonTextColor,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Giriş
            </Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }
}

export const Department = withNavigation(
  connect(
    (state: ApplicationState) => state,
    dispatch => {
      return {
        DepartmentActions: bindActionCreators({...DepartmentActions}, dispatch),
        TableActions: bindActionCreators({...TableActions}, dispatch),
        ApplicationActions: bindActionCreators(
          {...ApplicationActions},
          dispatch,
        ),
      };
    },
  )(DepartmentScreen),
);

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
  },
});
