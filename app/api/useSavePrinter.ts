import {useMutation} from '@apollo/client';
import {useRef, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SAVE_PRINTER} from './gql';

export const useSavePrinter = () => {
  const [save_printer] = useMutation(SAVE_PRINTER);

  const savePrinter = ({
    code,
    fcm_token,
    printer_name,
    status,
  }: {
    code: string;
    fcm_token: string;
    printer_name: string;
    status: number;
  }) => {
    save_printer({
      variables: {
        code,
        fcm_token,
        printer_name,
        status,
      },
    })
      .then((res: any) => {
        console.log('response save printer : ', res);
      })
      .catch(e => {
        console.log('error save printer : ', e);
      })
      .finally(() => {});
  };

  return {
    savePrinter,
  };
};
