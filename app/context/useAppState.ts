import {useState, useEffect} from 'react';
import {AppState, AppStateStatus} from 'react-native';

interface Settings {
  onChange?: (nextAppState: AppStateStatus) => void;
  onForeground?: () => void;
  onBackground?: () => void;
  onBackForeground?: () => void;
  onBackToActive?: () => void;
}

export function useAppState(settings?: Settings): AppStateStatus {
  const {
    onChange,
    onForeground,
    onBackground,
    onBackForeground = () => {},
    onBackToActive = () => {},
  } = settings || {};

  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState,
  );
  const [countAppState, setCountAppState] = useState<number>(0);

  useEffect(() => {
    function handleAppStateChange(nextAppState: AppStateStatus) {
      if (appState === 'inactive' && nextAppState === 'active') {
        if (countAppState > 0) {
          onBackForeground();
        }
      } else if (nextAppState === 'active' && appState !== 'active') {
        onForeground && onForeground();
        if (countAppState > 0) {
          onBackToActive();
        }
      } else if (
        appState === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        onBackground && onBackground();
      }

      setAppState(nextAppState);
      if (countAppState === 0) {
        setCountAppState(count => count + 1);
      }
      onChange && onChange(nextAppState);
    }

    const appStateChangeListener = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      appStateChangeListener.remove();
    };
  }, [
    onChange,
    onForeground,
    onBackground,
    appState,
    countAppState,
    onBackForeground,
    onBackToActive,
  ]);

  return appState;
}
