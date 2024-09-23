import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {scaleWidth, scaleFont} from '../utils/scale';
import {CustomText} from '../components';
import {useGetReceiptList} from '../api/useGetReceiptList';
import {useGetOrderDetail} from '../api/useGetOrderDetail';
import BaseContainer from '../components/BaseContainer';
import {CustomModal} from '../components';
import {useSelector} from 'react-redux';
import {globalStore} from '../store/store';
import {useGetReceiptImage} from '../api/useGetReceiptImage';
const arrow_right = require('../assets/icons/arrow-right.png');

const ReceiptHistoryScreen = () => {
  const {getListReceipt, receipList, total_page} = useGetReceiptList();
  const {getOrderDetail, detail} = useGetOrderDetail();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isShowBill, setShowBill] = React.useState(false);
  const [billDetail, setBillDetail] = React.useState<any>();
  const restaurant_code = useSelector(
    (state: globalStore) => state.info.restaurant_code,
  );

  const onComplete = (image: any) => {
    if (image) {
      setShowBill(true);
      setBillDetail(image);
    }
  };

  const {getReceiptDetail, receiptImage} = useGetReceiptImage({onComplete});

  React.useEffect(() => {
    getListReceipt({code: restaurant_code as string, currentPage});
  }, [currentPage]);

  const back = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const next = () => {
    if (currentPage < total_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const _getReceiptDetail = async (invoice_number: string) => {
    getReceiptDetail({invoice_number});
  };

  const renderItem = ({item}: {item: any}) => (
    <View style={styles.item}>
      <View style={[styles.childItem, {paddingLeft: 8}]}>
        <CustomText
          style={styles.itemText}>{`#${item?.increment_id}`}</CustomText>
      </View>
      <View
        style={[
          styles.childItem,
          {
            justifyContent: 'center',
          },
        ]}>
        <View
          style={
            {
              // backgroundColor: item?.status == 'complete' ? '#389E0E' : '#F0810D',
              // borderRadius: 8,
              // width: scaleWidth(120),
              // height: scaleWidth(40),
              // justifyContent: 'center',
              // alignItems: 'center',
            }
          }>
          <CustomText
            style={[styles.itemText]}>{`${item?.order_type}`}</CustomText>
        </View>
      </View>
      <View style={styles.childItem}>
        <CustomText
          style={styles.itemText}>{`${item?.customer_name}`}</CustomText>
      </View>
      <View style={styles.childItem}>
        <CustomText style={styles.itemText}>{item?.order_date}</CustomText>
      </View>
      <TouchableOpacity
        onPress={() => {
          // getDetail(item?.id);
          _getReceiptDetail(item?.invoices?.[0]?.number);
        }}
        style={[
          styles.childItem,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <CustomText
          style={[
            styles.itemText,
            {
              color: '#0255BF',
              fontSize: scaleFont(7),
              fontWeight: '600',
              textDecorationLine: 'underline',
            },
          ]}>
          VIEW BILL
        </CustomText>
      </TouchableOpacity>
    </View>
  );

  return (
    <BaseContainer title="Receipt" isBack={false} backgroundColor="#F8F9FC">
      <View style={styles.container}>
        <View style={styles.paginationContainer}>
          <CustomText style={styles.pageText} fontWeight="bold">
            Page:
          </CustomText>
          <TouchableOpacity
            disabled={currentPage == 1}
            onPress={back}
            style={[styles.arrowButton, {opacity: currentPage == 1 ? 0.6 : 1}]}>
            <Image
              source={arrow_right}
              style={styles.arrowImageReverse}
              tintColor={'#333'}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.pageNumberContainer}>
            <CustomText style={styles.pageNumberText} fontWeight="bold">
              {`${currentPage}/${total_page}`}
            </CustomText>
          </View>
          <TouchableOpacity
            disabled={currentPage >= total_page}
            onPress={next}
            style={[
              styles.arrowButton,
              {opacity: currentPage >= total_page ? 0.6 : 1},
            ]}>
            <Image
              source={arrow_right}
              style={styles.arrowImage}
              tintColor={'#333'}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.tableHeaderContainer}>
          {['ID', 'TYPE', 'CUSTOMER', 'Date'].map(header => (
            <View style={styles.tableHeader} key={header}>
              <CustomText style={styles.tableHeaderText} fontWeight="bold">
                {header}
              </CustomText>
            </View>
          ))}
        </View>

        <View style={styles.tableBody}>
          <FlatList
            data={receipList}
            renderItem={renderItem}
            keyExtractor={(item: any) => item?.increment_id}
            ItemSeparatorComponent={() => (
              <View
                style={{width: '100%', height: 1, backgroundColor: '#dddddd'}}
              />
            )}
          />
        </View>
      </View>
      <CustomModal
        isModalVisible={isShowBill}
        toggleModal={() => setShowBill(false)}
        data={billDetail}
      />
    </BaseContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: scaleWidth(16),
    marginVertical: scaleWidth(16),
  },
  pageText: {
    color: '#333',
    fontSize: scaleFont(13),
    marginRight: scaleWidth(16),
  },
  arrowButton: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#ddddddd',
    paddingHorizontal: scaleWidth(8),
    height: scaleWidth(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowImageReverse: {
    width: scaleWidth(28),
    height: scaleWidth(28),
    tintColor: '#333',
    transform: [{rotate: '180deg'}],
  },
  arrowImage: {
    width: scaleWidth(28),
    height: scaleWidth(28),
    tintColor: '#333',
  },
  pageNumberContainer: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#ddddddd',
    paddingHorizontal: scaleWidth(16),
    marginHorizontal: scaleWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
    height: scaleWidth(32),
  },
  pageNumberText: {
    color: '#333',
    fontSize: scaleFont(10),
  },
  tableHeaderContainer: {
    borderWidth: 1,
    borderColor: '#dddddd',
    backgroundColor: '#0255BF',
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 8,
  },
  tableHeader: {
    width: '20%',
    height: scaleFont(24),
    justifyContent: 'center',
  },
  tableHeaderText: {
    color: '#fff',
    fontSize: scaleFont(11),
  },
  item: {
    width: '100%',
    flexDirection: 'row',
  },
  itemText: {
    fontSize: scaleFont(8),
    color: '#333',
  },
  childItem: {
    width: '20%',
    paddingVertical: scaleWidth(16),
    justifyContent: 'center',
  },
  tableBody: {},
});

export default ReceiptHistoryScreen;
