import React from 'react';
import {WebView} from 'react-native-webview';
import BaseContainer from '../components/BaseContainer';
import {useConnectPrinter} from '../api/useConnectPrinter';

const HomeScreen = () => {
  const {selectMethod} = useConnectPrinter();

  React.useEffect(() => {
    selectMethod('Bluetooth');
  }, []);

  return (
    <BaseContainer title="Home" isBack={false} backgroundColor="#F8F9FC">
      <WebView
        originWhitelist={['*']}
        source={{uri: 'https://staging-kitchen.eatrightpos.com'}}
        style={{flex: 1, width: '100%'}}
      />
    </BaseContainer>
  );
};

export default HomeScreen;
