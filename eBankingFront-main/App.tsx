import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { enableScreens } from "react-native-screens";
import SecurityVerificationScreen from "./components/SecurityVerificationScreen";
import { AlertProvider } from "./context/AlertContext";
import { UserProvider } from "./context/UserContext";
import AppNavigator from "./navigator/AppNavigator";
import AccountCreationSuccessScreen from "./screens/Auth/AccountCreationSuccessScreen";
import AddressInformationScreen from "./screens/Onboarding/AddressInformationScreen";
import AnnouncesScreen from "./screens/Notifications/AnnouncesScreen";
import AuthTester from "./screens/Auth/AuthTester";
import BankTransferDetailsScreen from "./screens/Transactions/BankTransferDetailsScreen";
import BankTransferScreen from "./screens/Transactions/BankTransferScreen";
import BinancePayScreen from "./screens/QuickActions/BinancePayScreen";
import CardCustomizationScreen from "./screens/Cards/CardCustomizationScreen";
import CardTypesScreen from "./screens/Cards/CardTypesScreen";
import ChangeEmailScreen from "./screens/Auth/ChangeEmailScreen";
import ChangePasswordScreen from "./screens/Auth/ChangePasswordScreen";
import ChooseCardScreen from "./screens/Cards/ChooseCardScreen";
import CodeConfirmationScreen from "./screens/Auth/CodeConfirmationScreen";
import CoinWalletScreen from "./screens/Dashboard/CoinWalletScreen";
import ConvertScreen from "./screens/QuickActions/ConvertScreen";
import DepositScreen from "./screens/QuickActions/DepositScreen";
import DevicesScreen from "./screens/QuickActions/DevicesScreen";
import DocumentUploadScreen from "./screens/Profile/DocumentUploadScreen";
import EmailVerificationScreen from "./screens/Auth/EmailVerificationScreen";
import ForgotPasswordScreen from "./screens/Auth/ForgotPasswordScreen";
import HelpScreen from "./screens/QuickActions/HelpScreen";
import IdentityVerificationScreen from "./screens/Auth/IdentityVerificationScreen";
import InviteFriendsScreen from "./screens/Referral/InviteFriendsScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import LowBalanceScreen from "./screens/Notifications/LowBalanceScreen";
import NotificationsScreen from "./screens/Notifications/NotificationsScreen";
import OnBoardingScreen from "./screens/Onboarding/OnBoardingScreen";
import PersonalInformationScreen from "./screens/Profile/PersonalInformationScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import QuickActionScreen from "./screens/QuickActions/QuickActionScreen";
import SecurityScreen from "./screens/Profile/SecurityScreen";
import SelectCurrencyScreen from "./screens/QuickActions/SelectCurrencyScreen";
import SelectMethodScreen from "./screens/QuickActions/SelectMethodScreen";
import SendScreen from "./screens/Transactions/SendScreen";
import SetPasswordScreen from "./screens/Auth/SetPasswordScreen";
import SettingsScreen from "./screens/Profile/SettingsScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen";
import SystemNotificationsScreen from "./screens/Notifications/SystemNotificationsScreen";
import TransactionsNotificationsScreen from "./screens/Notifications/TransactionsNotificationsScreen";
import TransferAmountScreen from "./screens/Transactions/TransferAmountScreen";
import VerifyPhoneScreen from "./screens/Auth/VerifyPhoneScreen";
import WithdrawScreen from "./screens/QuickActions/WithdrawScreen";

// Enable react-native-screens for better performance
enableScreens();

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <AlertProvider>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                gestureEnabled: true,
                gestureDirection: "horizontal",
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                transitionSpec: {
                  open: {
                    animation: "timing",
                    config: {
                      duration: 300,
                    },
                  },
                  close: {
                    animation: "timing",
                    config: {
                      duration: 250,
                    },
                  },
                },
              }}
            >
              <Stack.Screen
                name="AuthTester"
                component={AuthTester}
                options={{
                  headerShown: true,
                  title: "Authentication Tester",
                }}
              />
              <Stack.Screen
                name="OnBoardingScreen"
                component={OnBoardingScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CodeConfirmation"
                component={CodeConfirmationScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SetPassword"
                component={SetPasswordScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="VerifyPhone"
                component={VerifyPhoneScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MainApp"
                component={AppNavigator}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                  gestureEnabled: false, // Disable gesture for main tab navigator
                }}
              />
              <Stack.Screen
                name="PersonalInformation"
                component={PersonalInformationScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="AddressInformation"
                component={AddressInformationScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="IdentityVerification"
                component={IdentityVerificationScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="DocumentUpload"
                component={DocumentUploadScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="SecurityVerification"
                component={SecurityVerificationScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SelectCurrency"
                component={SelectCurrencyScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SelectMethod"
                component={SelectMethodScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Deposit"
                component={DepositScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.ModalPresentationIOS,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="BankTransfer"
                component={BankTransferScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="BankTransferDetails"
                component={BankTransferDetailsScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="BinancePay"
                component={BinancePayScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="Withdraw"
                component={WithdrawScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.ModalPresentationIOS,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="CardTypes"
                component={CardTypesScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="ChooseCard"
                component={ChooseCardScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="CardCustomization"
                component={CardCustomizationScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="Security"
                component={SecurityScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="Devices"
                component={DevicesScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="ChangeEmail"
                component={ChangeEmailScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="EmailVerification"
                component={EmailVerificationScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="AccountCreationSuccess"
                component={AccountCreationSuccessScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Help"
                component={HelpScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="Send"
                component={SendScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.ModalPresentationIOS,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="TransferAmount"
                component={TransferAmountScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                  gestureEnabled: true,
                }}
              />
              {/* Notification Screens */}
              <Stack.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="AnnouncesScreen"
                component={AnnouncesScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="TransactionsNotificationsScreen"
                component={TransactionsNotificationsScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="LowBalanceScreen"
                component={LowBalanceScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="SystemNotificationsScreen"
                component={SystemNotificationsScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="QuickActionScreen"
                component={QuickActionScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="Convert"
                component={ConvertScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="InviteFriendsScreen"
                component={InviteFriendsScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="CoinWalletScreen"
                component={CoinWalletScreen}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                  gestureEnabled: true,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </AlertProvider>
    </UserProvider>
  );
}
