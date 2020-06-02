import {IActivity, ISeance} from '@models';
import {ActivityActions} from '@reducers';
import {ApplicationState} from '@store';
import fuzzysort from 'fuzzysort';
import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  StyleProp,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {NavigationInjectedProps, withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {colors} from '../colors';
import {CheckSelectItem} from './CheckSelectItem';

const {width, scale, height} = Dimensions.get('window');

interface ActivityCheckSelectState {
  search?: string;
  source?: IActivity[];
  scrollIndex: number;
}

interface ActivityCheckSelectProps {
  style?: StyleProp<ViewStyle>;
  onPress?: (adisyon: IActivity, seance: ISeance) => void;
}
type Props = NavigationInjectedProps &
  ActivityCheckSelectProps &
  ApplicationState;

class ActivityCheckSelectInfoComp extends Component<
  Props,
  ActivityCheckSelectState
> {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      source: [],
      scrollIndex: 0,
    };
  }

  componentDidMount() {
    const source = this.props.Activity.items;
    this.setState({
      source,
    });
  }

  searchData(search: string) {
    return fuzzysort
      .go(search, this.state.source, {
        limit: 20,
        allowTypo: true,
        threshold: -50000,
        key: 'NAME',
      })
      .map(i => i.obj);
  }
  render() {
    return (
      <View
        style={{
          width: width,
          height: height - 70,
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            width: width - 5,
            height: height,
            flexDirection: 'row',
            marginBottom: 0,
            padding: 5,
            paddingBottom: 0,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: colors.borderColor,
              flexDirection: 'column',
              width: '100%',
              marginRight: 5,
            }}>
            <FlatList
              keyboardDismissMode="on-drag"
              style={{flex: 1}}
              keyboardShouldPersistTaps="always"
              updateCellsBatchingPeriod={10}
              windowSize={10}
              maxToRenderPerBatch={10}
              initialNumToRender={10}
              removeClippedSubviews={false}
              data={
                this.state.source && this.state.search
                  ? this.searchData(this.state.search)
                  : this.state.source
                  ? this.state.source
                  : []
              }
              renderItem={({item, index}) => {
                return (
                  <CheckSelectItem
                    activity={item}
                    onSelect={(itm, seance) => {
                      if (this.props.onPress) this.props.onPress(item, seance);
                    }}
                  />
                );
              }}
              numColumns={1}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>

        <TextInput
          placeholder="Tüm ürünlerde ara"
          autoFocus={true}
          clearButtonMode="always"
          clearTextOnFocus
          onChangeText={text => {
            this.setState({search: text});
          }}
          style={{
            color: colors.inputTextColor,
            backgroundColor: '#fff',
            borderColor: colors.borderColor,
            borderWidth: 1,
            paddingVertical: 5,
            marginHorizontal: 5,
            marginTop: 5,
            paddingHorizontal: 15,
            textAlign: 'left',
            fontSize: 20,
            borderRadius: 0,
          }}
        />
      </View>
    );
  }
}

export const ActivityCheckSelect = withNavigation(
  connect(
    (state: ApplicationState) => state,
    dispatch => {
      return {
        ActivityCheckSelectActions: bindActionCreators(
          {...ActivityActions},
          dispatch,
        ),
      };
    },
  )(ActivityCheckSelectInfoComp),
) as any;
