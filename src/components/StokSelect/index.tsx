import { colors } from '@components';
import { IAdisyon, IStok, IStokGrup } from '@models';
import { StokActions } from '@reducers';
import { ApplicationState } from '@store';
import fuzzysort from 'fuzzysort';
import React, { Component } from 'react';
import { Alert, Dimensions, FlatList, StyleProp, TextInput, View, ViewStyle } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GroupItem } from './GroupItem';
import { StokItem } from './StokItem';

const { width, scale, height } = Dimensions.get("window");

interface StokSelectState {
    selectedGrup?: IStokGrup;
    search?: string;
    source?: IStok[];
    scrollIndex: number;
}

interface StokSelectProps {
    style?: StyleProp<ViewStyle>;
    adisyon: IAdisyon;
    isSelected?: boolean;
    onPress?: (adisyon: IAdisyon) => void;
}
type Props = NavigationInjectedProps & StokSelectProps & ApplicationState;

class StokSelectInfoComp extends Component<Props, StokSelectState> {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            source: [],
            scrollIndex: 0,
        };
    }

    componentDidMount() {
        const source = this.props.Stok.items.filter(t => t.departments ? t.departments.indexOf(this.props.Department.current.KODU) > -1 : false);
        this.setState({
            source,
        });
    }
    searchData(search: string) {
        return fuzzysort.go(search, this.state.source, {
            limit: 20,
            allowTypo: true,
            threshold: -50000,
            key: 'ADI'
        }).map(i => i.obj)
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
                            width: "65%",
                            marginRight: 5
                        }}>
                        {this.props.adisyon ?
                            <FlatList
                                keyboardDismissMode="on-drag"
                                style={{ flex: 1 }}
                                keyboardShouldPersistTaps="always"
                                updateCellsBatchingPeriod={10}
                                windowSize={10}
                                maxToRenderPerBatch={10}
                                initialNumToRender={10}
                                removeClippedSubviews={false}
                                data={(this.state.source && this.state.search ? this.searchData(this.state.search) : (this.state.source ? this.state.source : [])).filter(stk => (this.state.selectedGrup && this.state.selectedGrup.STOKGRUPID ? stk.STOKGRUPID == this.state.selectedGrup.STOKGRUPID : true))}
                                renderItem={({ item, index }) => {
                                    let adisyonItem = this.props.adisyon.ITEMS ? this.props.adisyon.ITEMS.find(itm => itm.ID == item.STOKID) : null;
                                    let discountRate = this.props.Customer.current ? this.props.Customer.current.DISCOUNT_RATE : 0;
                                    if (!adisyonItem)
                                        adisyonItem = { ID: item.STOKID, QUANTITY: 0 };
                                    return (
                                        <StokItem
                                            discountRate={discountRate}
                                            stok={item}
                                            item={adisyonItem}
                                            onTextActive={(item) => {
                                                this.setState({ scrollIndex: index });
                                            }}
                                            onAddPress={(itm) => {
                                                const { adisyon } = this.props;

                                                let currentTotal = 0;

                                                adisyon.ITEMS.forEach(i => {
                                                    const stokItem = this.props.Stok.items.find(t => t.STOKID == i.ID);
                                                    currentTotal += i.QUANTITY * stokItem.SFIYAT1
                                                });

                                                const stokItem = this.props.Stok.items.find(t => t.STOKID == itm.ID);
                                                if (this.props.Customer.current && (currentTotal + stokItem.SFIYAT1) > this.props.Customer.current.BALANCE) {
                                                    Alert.alert("Uyarı", "Yeterli bakiye yok");
                                                    return;
                                                }

                                                const adisyonIndex = adisyon.ITEMS.findIndex(i => i.ID == itm.ID);
                                                if (adisyonIndex < 0)
                                                    adisyon.ITEMS.push(itm);
                                                itm.QUANTITY = itm.QUANTITY + 1;
                                                if (this.props.onPress)
                                                    this.props.onPress(adisyon);
                                                this.setState({});
                                            }}
                                            onRemovePress={(itm) => {
                                                const { adisyon } = this.props;
                                                const adisyonIndex = adisyon.ITEMS.findIndex(i => i.ID == itm.ID);
                                                if (itm.QUANTITY - 1 > 0) {
                                                    itm.QUANTITY = itm.QUANTITY - 1;
                                                } else if (adisyonIndex >= 0) {
                                                    adisyon.ITEMS.splice(adisyonIndex, 1);
                                                }
                                                if (this.props.onPress)
                                                    this.props.onPress(adisyon);
                                            }}
                                        />
                                    )
                                }}
                                numColumns={1}
                                keyExtractor={(item, index) => index.toString()}
                            /> : null}
                    </View>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: colors.borderColor,
                            flexDirection: "column",
                            width: "35%",
                        }}>
                        <FlatList
                            ListHeaderComponent={<GroupItem selected={!this.state.selectedGrup || this.state.selectedGrup.STOKGRUPID == 0}
                                group={{ ADI: "Hepsi", KODU: null, STOKGRUPID: 0 }}
                                onPress={(group) => {
                                    this.setState({ selectedGrup: group });
                                }} />}
                            keyboardDismissMode="on-drag" style={{ flex: 1 }} keyboardShouldPersistTaps="always"
                            data={this.props.StokGrup.items}
                            updateCellsBatchingPeriod={10}
                            windowSize={10}
                            maxToRenderPerBatch={10}
                            initialNumToRender={10}
                            renderItem={({ item, index }) => {
                                return (
                                    <GroupItem key={index} group={item} selected={this.state.selectedGrup == item} index={index} onPress={(group) => {
                                        this.setState({ selectedGrup: group });
                                    }} />
                                )
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

export const StokSelect = withNavigation(connect(
    (state: ApplicationState) => state,
    dispatch => {
        return {
            StokSelectActions: bindActionCreators({ ...StokActions }, dispatch)
        };
    }
)(StokSelectInfoComp)) as any;
