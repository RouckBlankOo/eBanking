# Navigate to the source repository to extract files from yesterday's commit
cd c:\Users\Sam\eBanking\eBankingFront

# Create target directories if they don't exist
if (!(Test-Path "c:\Users\Sam\eBanking\eBankingFront-main\screens\Dashboard")) { New-Item -ItemType Directory -Path "c:\Users\Sam\eBanking\eBankingFront-main\screens\Dashboard" -Force }
if (!(Test-Path "c:\Users\Sam\eBanking\eBankingFront-main\screens\Profile")) { New-Item -ItemType Directory -Path "c:\Users\Sam\eBanking\eBankingFront-main\screens\Profile" -Force }
if (!(Test-Path "c:\Users\Sam\eBanking\eBankingFront-main\screens\Auth")) { New-Item -ItemType Directory -Path "c:\Users\Sam\eBanking\eBankingFront-main\screens\Auth" -Force }
if (!(Test-Path "c:\Users\Sam\eBanking\eBankingFront-main\screens\Cards")) { New-Item -ItemType Directory -Path "c:\Users\Sam\eBanking\eBankingFront-main\screens\Cards" -Force }
if (!(Test-Path "c:\Users\Sam\eBanking\eBankingFront-main\screens\Notifications")) { New-Item -ItemType Directory -Path "c:\Users\Sam\eBanking\eBankingFront-main\screens\Notifications" -Force }
if (!(Test-Path "c:\Users\Sam\eBanking\eBankingFront-main\screens\Transactions")) { New-Item -ItemType Directory -Path "c:\Users\Sam\eBanking\eBankingFront-main\screens\Transactions" -Force }
if (!(Test-Path "c:\Users\Sam\eBanking\eBankingFront-main\screens\QuickActions")) { New-Item -ItemType Directory -Path "c:\Users\Sam\eBanking\eBankingFront-main\screens\QuickActions" -Force }
if (!(Test-Path "c:\Users\Sam\eBanking\eBankingFront-main\screens\Referral")) { New-Item -ItemType Directory -Path "c:\Users\Sam\eBanking\eBankingFront-main\screens\Referral" -Force }
if (!(Test-Path "c:\Users\Sam\eBanking\eBankingFront-main\screens\Onboarding")) { New-Item -ItemType Directory -Path "c:\Users\Sam\eBanking\eBankingFront-main\screens\Onboarding" -Force }
if (!(Test-Path "c:\Users\Sam\eBanking\eBankingFront-main\screens\Achievements")) { New-Item -ItemType Directory -Path "c:\Users\Sam\eBanking\eBankingFront-main\screens\Achievements" -Force }

# Restore Dashboard screens
git show f39026f:screens/Dashboard/DashboardScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Dashboard\DashboardScreen.tsx"
git show f39026f:screens/Dashboard/HomeScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Dashboard\HomeScreen.tsx"
git show f39026f:screens/Dashboard/AccountsScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Dashboard\AccountsScreen.tsx"

# Restore Profile screens
git show f39026f:screens/Profile/ProfileScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Profile\ProfileScreen.tsx"
git show f39026f:screens/Profile/AddressInformationScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Profile\AddressInformationScreen.tsx"
git show f39026f:screens/Profile/DocumentUploadScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Profile\DocumentUploadScreen.tsx"
git show f39026f:screens/Profile/IdentityVerificationScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Profile\IdentityVerificationScreen.tsx"
git show f39026f:screens/Profile/PersonalInformationScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Profile\PersonalInformationScreen.tsx"

# Restore Auth screens
git show f39026f:screens/Auth/LoginScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Auth\LoginScreen.tsx"
git show f39026f:screens/Auth/SignUpScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Auth\SignUpScreen.tsx"
git show f39026f:screens/Auth/ForgotPasswordScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Auth\ForgotPasswordScreen.tsx"
git show f39026f:screens/Auth/ForgotPasswordScreenThemed.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Auth\ForgotPasswordScreenThemed.tsx"
git show f39026f:screens/Auth/SetPasswordScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Auth\SetPasswordScreen.tsx"
git show f39026f:screens/Auth/VerifyPhoneScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Auth\VerifyPhoneScreen.tsx"
git show f39026f:screens/Auth/CodeConfirmationScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Auth\CodeConfirmationScreen.tsx"

# Restore Cards screens
git show f39026f:screens/Cards/CardsScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Cards\CardsScreen.tsx"
git show f39026f:screens/Cards/CardTypesScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Cards\CardTypesScreen.tsx"

# Restore Notifications screens
git show f39026f:screens/Notifications/NotificationsScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Notifications\NotificationsScreen.tsx"
git show f39026f:screens/Notifications/AnnouncesScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Notifications\AnnouncesScreen.tsx"
git show f39026f:screens/Notifications/LowBalanceScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Notifications\LowBalanceScreen.tsx"
git show f39026f:screens/Notifications/SystemNotificationsScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Notifications\SystemNotificationsScreen.tsx"
git show f39026f:screens/Notifications/TransactionsNotificationsScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Notifications\TransactionsNotificationsScreen.tsx"

# Restore Transactions screens
git show f39026f:screens/Transactions/TransfersScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Transactions\TransfersScreen.tsx"
git show f39026f:screens/Transactions/CoinWalletScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Transactions\CoinWalletScreen.tsx"
git show f39026f:screens/Transactions/TransferAmountScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Transactions\TransferAmountScreen.tsx"

# Restore QuickActions and Referral screens
git show f39026f:screens/QuickActions/QuickActionScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\QuickActions\QuickActionScreen.tsx"
git show f39026f:screens/Referral/InviteFriendsScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Referral\InviteFriendsScreen.tsx"

# Restore Onboarding screens
git show f39026f:screens/Onboarding/OnBoardingScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Onboarding\OnBoardingScreen.tsx"

# Restore Achievements screens
git show f39026f:screens/Achievements/TrophiesScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\Achievements\TrophiesScreen.tsx"

# Restore other screens
git show f39026f:screens/SecurityScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\SecurityScreen.tsx"
git show f39026f:screens/SettingsScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\SettingsScreen.tsx"
git show f39026f:screens/HelpScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\HelpScreen.tsx"

# Restore other important screens if they exist
git show f39026f:screens/ChooseCardScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\ChooseCardScreen.tsx"
git show f39026f:screens/BankTransferDetailsScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\BankTransferDetailsScreen.tsx"
git show f39026f:screens/BankTransferScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\BankTransferScreen.tsx"
git show f39026f:screens/BinancePayScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\BinancePayScreen.tsx"
git show f39026f:screens/CardCustomizationScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\CardCustomizationScreen.tsx"
git show f39026f:screens/CreateCardScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\CreateCardScreen.tsx"
git show f39026f:screens/DepositScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\DepositScreen.tsx"
git show f39026f:screens/DevicesScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\DevicesScreen.tsx"
git show f39026f:screens/EmailVerificationScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\EmailVerificationScreen.tsx"
git show f39026f:screens/SelectCurrencyScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\SelectCurrencyScreen.tsx"
git show f39026f:screens/SelectMethodScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\SelectMethodScreen.tsx"
git show f39026f:screens/SendScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\SendScreen.tsx"
git show f39026f:screens/WithdrawScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\WithdrawScreen.tsx"
git show f39026f:screens/AccountCreationSuccessScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\AccountCreationSuccessScreen.tsx"
git show f39026f:screens/AuthTester.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\AuthTester.tsx"
git show f39026f:screens/ChangeEmailScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\ChangeEmailScreen.tsx"
git show f39026f:screens/ChangePasswordScreen.tsx > "c:\Users\Sam\eBanking\eBankingFront-main\screens\ChangePasswordScreen.tsx"

Write-Host "File restoration to eBankingFront-main complete!"
