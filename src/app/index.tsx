import { useState, useEffect, useRef } from 'react';
import SplashScreen from '../Screen/SplashScreen';
import LoginScreen from '../Screen/LoginScreen';
import QuestListScreen from '../Screen/QuestListScreen';
import ChildProfileScreen from '../Screen/ChildProfileScreen';
import NotificationScreen from '../Screen/NotificationScreen';

// ── Parent Screens ──
import ParentLoginScreen from '../Screen/ParentLoginScreen';
import ParentDashboardScreen from '../Screen/ParentDashboardScreen';
import ParentQuestApprovalScreen from '../Screen/ParentQuestApproval';
import ParentMapScreen from '../Screen/ParentMapScreen';
import ParentQuestTrackerScreen from '../Screen/ParentQuestTrackScreen';

type ScreenName =
  | 'Splash'
  | 'Login'
  | 'QuestList'
  | 'ChildProfile'
  | 'Notifications'
  // Parent screens
  | 'ParentLogin'
  | 'ParentDashboard'
  | 'ParentQuestApproval'
  | 'ParentMap'
  | 'ParentQuestTracker';

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('Splash');
  const [splashDone, setSplashDone] = useState(false);
  const [screenHistory, setScreenHistory] = useState<ScreenName[]>([]);
  const hasShownSplash = useRef(false);

  useEffect(() => {
    if (!hasShownSplash.current) {
      hasShownSplash.current = true;
      setCurrentScreen('Splash');
    }
  }, []);

  const handleSplashFinish = () => {
    setSplashDone(true);
    setCurrentScreen('Login');
  };

  const navigation = {
    navigate: (screen: string) => {
      setScreenHistory((prev) => [...prev, currentScreen]);
      setCurrentScreen(screen as ScreenName);
    },
    push: (screen: string) => {
      setScreenHistory((prev) => [...prev, currentScreen]);
      setCurrentScreen(screen as ScreenName);
    },
    back: () => {
      setScreenHistory((prev) => {
        const newHistory = [...prev];
        const last = newHistory.pop();
        if (last) setCurrentScreen(last);
        return newHistory;
      });
    },
  };

  // ── Splash ──
  if (currentScreen === 'Splash' && !splashDone) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  // ── Child Screens ──
  if (currentScreen === 'Login') return <LoginScreen navigation={navigation} />;
  if (currentScreen === 'QuestList') return <QuestListScreen navigation={navigation} />;
  if (currentScreen === 'ChildProfile') return <ChildProfileScreen navigation={navigation} />;
  if (currentScreen === 'Notifications') return <NotificationScreen navigation={navigation} />;

  // ── Parent Screens ──
  if (currentScreen === 'ParentLogin') return <ParentLoginScreen navigation={navigation} />;
  if (currentScreen === 'ParentDashboard') return <ParentDashboardScreen navigation={navigation} />;
  if (currentScreen === 'ParentQuestApproval') return <ParentQuestApprovalScreen navigation={navigation} />;
  if (currentScreen === 'ParentMap') return <ParentMapScreen navigation={navigation} />;
  if (currentScreen === 'ParentQuestTracker') return <ParentQuestTrackerScreen navigation={navigation} />;

  return <LoginScreen navigation={navigation} />;
}