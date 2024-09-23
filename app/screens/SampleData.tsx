import React, {useRef} from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import {
  usePrintersDiscovery,
  Printer,
  PrinterConstants,
} from 'react-native-esc-pos-printer';
import {useSavePrinter} from '../api/useSavePrinter';
import {useNotification} from '../context/NotificationContext';
import ViewShot from 'react-native-view-shot';

const RESTAURANT_CODE = `FNB001`;

const App = () => {
  const {start, isDiscovering, printers} = usePrintersDiscovery();
  const [printersData, setPrinterData] = React.useState<any>([]);
  const {token} = useNotification();
  const ref = useRef<ViewShot>(null);

  const {savePrinter} = useSavePrinter();

  React.useEffect(() => {
    if (printers && printers?.length > 0) {
      const printer = printers?.[0];
      if (printer && token) {
        savePrinter({
          code: RESTAURANT_CODE,
          printer_name: printer?.deviceName,
          fcm_token: token,
        });
      }
      setPrinterData(printers?.[0]);
    }
  }, [printers]);

  const print = async () => {
    const printerInstance = new Printer({
      target: printersData.target,
      deviceName: printersData.deviceName,
    });

    try {
      const result = await Promise.race([
        printerInstance.addQueueTask(async () => {
          await Printer.tryToConnectUntil(
            printerInstance,
            status => status.online.statusCode === PrinterConstants.TRUE,
          );

          await printerInstance.addFeedLine();
          await Printer.addViewShot(printerInstance, {
            viewNode: ref.current as any,
          });

          await printerInstance.addCut();

          const result = await printerInstance.sendData(60000);
          await printerInstance.disconnect();
          return result;
        }),
      ]);
    } catch (err) {
      console.log({err});
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text>test</Text>
      <Button title="Search" onPress={() => start()} />
      {printers.length ? (
        <Button title="Print" onPress={() => print()} />
      ) : null}
      <View style={styles.scrollContainer} collapsable={false}>
        <ScrollView contentContainerStyle={styles.container}>
          <ViewShot ref={ref} captureMode="mount">
            <View style={styles.centered}>
              <Text style={styles.headerText}>Epicurean Delights</Text>
              <Text style={styles.infoText}>
                2419 Frederick Rd, Opelika, Alabama
              </Text>
              <Text style={styles.infoText}>Hotline: 334 705-0055</Text>
            </View>

            <View style={styles.centered}>
              <Text style={styles.headerText}>RECEIPT</Text>

              <View style={styles.rowContainer}>
                <View style={styles.row}>
                  <Text style={styles.boldText}>Date</Text>
                  <Text style={styles.infoText}>09-04-2024</Text>
                </View>
                <View style={styles.rowRight}>
                  <Text style={styles.boldText}>Time:</Text>
                  <Text style={styles.infoText}>04:06:17</Text>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.row}>
                  <Text style={styles.boldText}>DINNING</Text>
                </View>
                <View style={styles.rowRight}>
                  <Text style={styles.boldText}>Bill:</Text>
                  <Text style={styles.infoText}>90000076787</Text>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.row}>
                  <Text style={styles.boldText}>Table:</Text>
                  <Text style={styles.infoText}>G003</Text>
                </View>
                <View style={styles.rowRight}>
                  <Text style={styles.boldText}>Server:</Text>
                  <Text style={styles.infoText}>Kay Kim</Text>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.row}>
                  <Text style={styles.boldText}>Customer:</Text>
                  <Text style={styles.infoText}>tho fnb</Text>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.row}>
                  <Text style={styles.infoText}>1</Text>
                  <Text style={styles.infoText}>Chicken wings</Text>
                </View>
                <View style={styles.rowRight}>
                  <Text style={styles.infoText}>$11.00</Text>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.row}>
                  <Text style={styles.infoText}>1</Text>
                  <Text style={styles.infoText}>Shrim cocktails</Text>
                </View>
                <View style={styles.rowRight}>
                  <Text style={styles.infoText}>$10.00</Text>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.row}>
                  <Text style={styles.boldText}>Subtotal:</Text>
                </View>
                <View style={styles.rowRight}>
                  <Text style={styles.infoText}>$21.00</Text>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.row}>
                  <Text style={styles.boldText}>Discount:</Text>
                </View>
                <View style={styles.rowRight}>
                  <Text style={styles.infoText}>$0.00</Text>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.row}>
                  <Text style={styles.boldText}>Tax:</Text>
                </View>
                <View style={styles.rowRight}>
                  <Text style={styles.infoText}>$2.14</Text>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.row}>
                  <Text style={styles.boldText}>Tip:</Text>
                </View>
                <View style={styles.rowRight}>
                  <Text style={styles.infoText}>$2.14</Text>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.row}>
                  <Text style={styles.boldText}>Total:</Text>
                </View>
                <View style={styles.rowRight}>
                  <Text style={styles.infoText}>$25.68</Text>
                </View>
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.row}>
                  <Text style={styles.boldText}>Payment method:</Text>
                </View>
                <View style={styles.rowRight}>
                  <Text style={styles.infoText}>Cash on delivery</Text>
                </View>
              </View>

              <View style={styles.centered}>
                <Text style={styles.boldText}>Customer copy</Text>
              </View>
              <Text style={styles.infoText}>Thank you for dining with us!</Text>
              <Text style={styles.infoText}>Feedback / Contact us:</Text>
              <Text style={styles.infoText}>Thank you for dining with us!</Text>
              <Text style={styles.infoText}>
                https://staging-api.eatrightpos.com
              </Text>
            </View>
          </ViewShot>

          <View style={styles.contentContainer}>
            <Button title="Test print" onPress={print} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: '900',
    fontSize: 30,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    width: '50%',
  },
  rowRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '50%',
  },
  boldText: {
    fontWeight: '900',
    fontSize: 20,
    marginBottom: 24,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
