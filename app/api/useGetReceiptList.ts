import {useLazyQuery} from '@apollo/client';
import {GET_LIST_RECEIPT} from './gql';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {showLoader, hideLoader} from '../store/globalSlice';

export const useGetReceiptList = () => {
  const [get_lilst_receipt] = useLazyQuery(GET_LIST_RECEIPT);
  const [receipList, setReceipList] = useState([]);
  const [total_page, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getListReceipt = ({
    currentPage = 1,
    code,
  }: {
    currentPage: number;
    code: string;
  }) => {
    dispatch(showLoader());
    get_lilst_receipt({
      variables: {
        currentPage,
        code,
      },
    })
      .then((res: any) => {
        setReceipList(res?.data?.getListReceiptByPrinter?.items);
        setTotalPage(
          res?.data?.getListReceiptByPrinter?.page_info?.total_pages,
        );
        dispatch(hideLoader());
      })
      .catch(e => {
        dispatch(hideLoader());
      })
      .finally(() => {});
  };

  return {
    getListReceipt,
    receipList,
    total_page,
  };
};
