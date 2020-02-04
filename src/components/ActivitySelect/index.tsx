import { colors } from '@components';
import { IActivityOrder, IActivity, ICustomer } from '@models';
import { ActivityActions, CustomerActions, AdisyonActions } from '@reducers';
import { ApplicationState } from '@store';
import Fuse, { FuseOptions } from 'fuse.js';
import React, { Component } from 'react';
import { Dimensions, FlatList, StyleProp, TextInput, View, ViewStyle, Alert } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OrderItem } from './OrderItem';

const { width, scale, height } = Dimensions.get("window");

interface ActivitySelectState {
    search?: string;
    source?: IActivity[];
    scrollIndex: number;
    searchOptions?: Fuse.FuseOptions<IActivity>;
    data?: Fuse<IActivity, FuseOptions<IActivity>>;
}

interface ActivitySelectProps {
    style?: StyleProp<ViewStyle>;
    order: IActivityOrder;
    onPress?: (adisyon: IActivityOrder) => void;
}
type Props = NavigationInjectedProps & ActivitySelectProps & ApplicationState;

class ActivitySelectInfoComp extends Component<Props, ActivitySelectState> {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            source: [],
            scrollIndex: 0,
            searchOptions: {
                keys: ['ADI'],
                shouldSort: true,
                threshold: 1,
            }
        };
    }

    componentDidMount() {
        const source = this.props.Activity.items;
        this.setState({
            source,
            data: new Fuse(source, this.state.searchOptions)
        });
    }

    render() {
        return (
            <View style={{
                width: width,
                height: height - 70,
                flex: 1
            }}>
                <View style={{
                    flex: 1,
                    width: width - 5,
                    height: height,
                    flexDirection: "row",
                    marginBottom: 0,
                    padding: 5,
                    paddingBottom: 0
                }}>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: colors.borderColor,
                            flexDirection: "column",
                            width: "100%",
                            marginRight: 5
                        }}>
                        {this.props.order ?
                            <FlatList
                                keyboardDismissMode="on-drag"
                                style={{ flex: 1 }}
                                keyboardShouldPersistTaps="always"
                                updateCellsBatchingPeriod={10}
                                windowSize={10}
                                maxToRenderPerBatch={10}
                                initialNumToRender={10}
                                removeClippedSubviews={false}
                                data={this.state.data && this.state.search ? this.state.data.search(this.state.search) as IActivity[] : (this.state.source ? this.state.source : [])}
                                renderItem={({ item, index }) => {
                                    let adisyonItem = this.props.order.ITEMS ? this.props.order.ITEMS.find(itm => itm.ID == item.ID) : null;
                                    let discountRate = this.props.Customer.current.DISCOUNT_RATE
                                    if (!adisyonItem)
                                        adisyonItem = { ID: item.ID, QUANTITY: 0 };
                                    return (
                                        <OrderItem
                                            discountRate={discountRate}
                                            activity={item}
                                            item={adisyonItem}
                                            onTextActive={(item) => {
                                                this.setState({ scrollIndex: index });
                                            }}
                                            onAddPress={(itm) => {
                                                const { order } = this.props;

                                                let currentTotal = 0;

                                                order.ITEMS.forEach(i => {
                                                    const stokItem = this.props.Activity.items.find(t => t.ID == i.ID);
                                                    currentTotal += i.QUANTITY * stokItem.ADULTPRICE
                                                });

                                                if (currentTotal > this.props.Customer.current.BALANCE) {
                                                    Alert.alert("Uyarı", "Yeterli bakiye yok");
                                                    return;
                                                }

                                                const adisyonIndex = order.ITEMS.findIndex(i => i.ID == itm.ID);
                                                if (adisyonIndex < 0)
                                                    order.ITEMS.push(itm);
                                                itm.QUANTITY = itm.QUANTITY + 1;
                                                if (this.props.onPress)
                                                    this.props.onPress(order);
                                                this.setState({});
                                            }}
                                            onRemovePress={(itm) => {
                                                const { order } = this.props;
                                                const adisyonIndex = order.ITEMS.findIndex(i => i.ID == itm.ID);
                                                if (itm.QUANTITY - 1 > 0) {
                                                    itm.QUANTITY = itm.QUANTITY - 1;
                                                } else if (adisyonIndex >= 0) {
                                                    order.ITEMS.splice(adisyonIndex, 1);
                                                }
                                                if (this.props.onPress)
                                                    this.props.onPress(order);
                                            }}
                                        />
                                    )
                                }}
                                numColumns={1}
                                keyExtractor={(item, index) => index.toString()}
                            /> : null}
                    </View>
                   
                </View>

                <TextInput
                    placeholder="Tüm ürünlerde ara"
                    autoFocus={true}
                    clearButtonMode="always"
                    clearTextOnFocus
                    onChangeText={text => {
                        this.setState({ search: text })
                    }}
                    style={{
                        color: colors.inputTextColor,
                        backgroundColor: "#fff",
                        borderColor: colors.borderColor,
                        borderWidth: 1,
                        paddingVertical: 5,
                        marginHorizontal: 5,
                        marginTop: 5,
                        paddingHorizontal: 15,
                        textAlign: "left",
                        fontSize: 20,
                        borderRadius: 0
                    }} />
            </View>

        )
    }
}

export const ActivitySelect = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            ActivitySelectActions: bindActionCreators({ ...ActivityActions }, dispatch)
        };
    }
)(ActivitySelectInfoComp)) as any;
