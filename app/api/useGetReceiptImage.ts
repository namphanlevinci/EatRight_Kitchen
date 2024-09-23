import {useLazyQuery} from '@apollo/client';
import {GET_RECECEIPT_BIILL_IMAGE} from './gql';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {showLoader, hideLoader} from '../store/globalSlice';
import {isEmpty} from 'lodash';
import {Alert} from 'react-native';

export const useGetReceiptImage = ({
  onComplete,
}: {
  onComplete: (image: any) => void;
}) => {
  const [getReceiptImage] = useLazyQuery(GET_RECECEIPT_BIILL_IMAGE);
  const [receiptImage, setReceiptImage] = useState(null);
  const dispatch = useDispatch();

  const getReceiptDetail = ({invoice_number}: {invoice_number: string}) => {
    dispatch(showLoader());
    getReceiptImage({
      variables: {
        invoice_number,
      },
    })
      .then((res: any) => {
        if (isEmpty(res?.data?.getReceiptBillImage)) {
          Alert.alert(
            `Please use the merchant to print the bill ${invoice_number} first.`,
          );
          return;
        }
        setReceiptImage(res?.data?.getReceiptBillImage?.url);
        onComplete(res?.data?.getReceiptBillImage?.url);
      })
      .catch(e => {})
      .finally(() => {
        dispatch(hideLoader());
      });
  };

  return {
    getReceiptDetail,
    receiptImage,
  };
};
