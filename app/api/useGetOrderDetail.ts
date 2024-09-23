import {useLazyQuery} from '@apollo/client';
import {GET_ORDER_DETAIL} from './gql';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {showLoader, hideLoader} from '../store/globalSlice';

export const useGetOrderDetail = () => {
  const [get_order_detail] = useLazyQuery(GET_ORDER_DETAIL);
  const [detail, setDetail] = useState(null);
  const dispatch = useDispatch();

  const getOrderDetail = ({id}: {id: number}) => {
    dispatch(showLoader());
    get_order_detail({
      variables: {
        id,
      },
    })
      .then((res: any) => {
        setDetail(res?.data?.orderDetail);
      })
      .catch(e => {
        console.log('error get list receipt : ', e);
      })
      .finally(() => {
        dispatch(hideLoader());
      });
  };

  return {
    getOrderDetail,
    detail,
  };
};
