import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MoreOptionsModal, {
  MoreOption,
} from "../../components/MoreOptionsModal";
import Text from "../../components/Text";
import { OnboardingBackground } from "../../components/UniversalBackground";
import { UserHeader } from "../../components/UserHeader";
import { useAlert } from "../../context/AlertContext";
import { Card, useUser } from "../../context/UserContext";
import { RootStackParamList } from "../../types";

const { width: screenWidth } = Dimensions.get("window");

// Transaction interface for future use
interface Transaction {
  id: string;
  amount: string;
  date: string;
  description: string;
}

// Global Map to store individual card animations
const flipAnimations = new Map<string, Animated.Value>();

interface GetCardOption {
  id: string;
  type: "get-card";
}

type CardOrGetCard = Card | GetCardOption;

interface Transaction {
  id: string;
  title: string;
  description: string;
  amount: string;
  date: string;
  time: string;
}

function CardsScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { cards, updateCard, deleteCard, isProfileComplete } = useUser();

  // Custom alert hook
  const { showSuccess, showError, showInfo, showDestructiveConfirm } =
    useAlert();

  // State for managing cards and UI
  const [selectedCardId, setSelectedCardId] = useState<string>(
    cards.length > 0 ? cards[0].id : "1"
  ); // Default to first card

  // State for limit modal
  const [limitModalVisible, setLimitModalVisible] = useState(false);
  const [newLimit, setNewLimit] = useState("");

  // State for more actions modal
  const [moreModalVisible, setMoreModalVisible] = useState(false);
  const [changeNameModalVisible, setChangeNameModalVisible] = useState(false);
  const [newCardName, setNewCardName] = useState("");

  // Animation state for card flip - individual animations per card
  const [flippingCards, setFlippingCards] = useState(new Set());

  // Helper function to get or create flip animation for a specific card
  const getFlipAnimation = useCallback(
    (cardId: string): Animated.Value => {
      if (!flipAnimations.has(cardId)) {
        // Initialize animation value based on card's current state
        const card = cards.find((c) => c.id === cardId);
        const initialValue = card && !card.isInfoHidden ? 1 : 0; // 0 = front (hidden), 1 = back (visible)
        flipAnimations.set(cardId, new Animated.Value(initialValue));
      }
      return flipAnimations.get(cardId)!; // Non-null assertion since we just set it if it didn't exist
    },
    [cards]
  );

  // Get selected card - memoized for performance
  const selectedCard = useMemo(
    () => cards.find((card) => card.id === selectedCardId),
    [cards, selectedCardId]
  );

  // Combine cards with get card option - memoized for performance
  const cardsWithGetCardOption: CardOrGetCard[] = useMemo(
    () => [...cards, { id: "get-card", type: "get-card" } as GetCardOption],
    [cards]
  );

  // Card action functions
  const handleFreezeCard = useCallback(() => {
    if (selectedCard && !flippingCards.has(selectedCardId)) {
      // If card is currently showing back side (details visible), flip to front and freeze
      if (!selectedCard.isInfoHidden) {
        setFlippingCards((prev) => new Set(prev).add(selectedCardId));

        // Update states: hide details (flip to front) and freeze
        updateCard(selectedCardId, {
          isFrozen: true,
          isInfoHidden: true, // Show front side (no expiry date)
        });

        const cardFlipAnimation = getFlipAnimation(selectedCardId);

        // Smooth spring animation (same as your example)
        Animated.spring(cardFlipAnimation, {
          toValue: 0, // Flip to front
          friction: 8,
          tension: 10,
          useNativeDriver: true,
        }).start(() => {
          // Keep animation value at 0 for front side
          cardFlipAnimation.setValue(0);
          setFlippingCards((prev) => {
            const newSet = new Set(prev);
            newSet.delete(selectedCardId);
            return newSet;
          });
          showSuccess("Card Frozen", "Card has been frozen", 3000);
        });
      } else {
        // If card is already showing front side, just toggle freeze status
        updateCard(selectedCardId, { isFrozen: !selectedCard.isFrozen });
        const action = selectedCard.isFrozen ? "unfrozen" : "frozen";
        showSuccess("Card Updated", `Card has been ${action}`, 3000);
      }
    }
  }, [
    selectedCard,
    selectedCardId,
    updateCard,
    showSuccess,
    flippingCards,
    getFlipAnimation,
  ]);

  const handleToggleSensitiveInfo = useCallback(() => {
    if (selectedCard && !flippingCards.has(selectedCardId)) {
      // Prevent flipping if card is frozen
      if (selectedCard.isFrozen) {
        showError(
          "Card Frozen",
          "Please unfreeze the card first to view details"
        );
        return;
      }

      setFlippingCards((prev) => new Set(prev).add(selectedCardId));

      // Update the card state immediately before animation
      updateCard(selectedCardId, {
        isInfoHidden: !selectedCard.isInfoHidden,
      });

      const cardFlipAnimation = getFlipAnimation(selectedCardId);

      // Smooth spring animation (same as your example)
      Animated.spring(cardFlipAnimation, {
        toValue: selectedCard.isInfoHidden ? 1 : 0, // Flip to back if hidden, to front if shown
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start(() => {
        // Reset animation value and finish
        cardFlipAnimation.setValue(selectedCard.isInfoHidden ? 1 : 0);
        setFlippingCards((prev) => {
          const newSet = new Set(prev);
          newSet.delete(selectedCardId);
          return newSet;
        });
      });
    }
  }, [
    selectedCard,
    selectedCardId,
    updateCard,
    flippingCards,
    showError,
    getFlipAnimation,
  ]);

  // Handle auto-selection based on scroll position
  const handleScrollEnd = useCallback(
    (event: any) => {
      const contentOffset = event.nativeEvent.contentOffset.x;
      const cardWidth = screenWidth - 60; // Card width + margin
      const cardSpacing = 16; // Space between cards
      const totalCardWidth = cardWidth + cardSpacing;

      // Calculate which card is in the center
      const centerIndex = Math.round(contentOffset / totalCardWidth);

      // Only select if it's a valid card (not the "get card" option)
      if (centerIndex >= 0 && centerIndex < cards.length) {
        const newSelectedCardId = cards[centerIndex].id;
        if (newSelectedCardId !== selectedCardId) {
          setSelectedCardId(newSelectedCardId);
        }
      }
    },
    [cards, selectedCardId]
  );

  const handleOpenLimitModal = () => {
    setNewLimit(selectedCard?.limit?.toString() || "");
    setLimitModalVisible(true);
  };

  const handleSetLimit = useCallback(() => {
    const limitValue = parseFloat(newLimit);
    if (isNaN(limitValue) || limitValue <= 0) {
      showError("Invalid Limit", "Please enter a valid positive number");
      return;
    }

    updateCard(selectedCardId, { limit: limitValue });

    setLimitModalVisible(false);
    showSuccess(
      "Limit Updated",
      `Card limit set to $${limitValue.toFixed(2)}`,
      3000
    );
  }, [newLimit, selectedCardId, updateCard, showError, showSuccess]);

  // More button actions
  const handleMoreButton = () => {
    setMoreModalVisible(true);
  };

  const handleChangeName = useCallback(() => {
    setNewCardName(selectedCard?.name || selectedCard?.type || "");
    setChangeNameModalVisible(true);
  }, [selectedCard]);

  const handleConfirmChangeName = useCallback(() => {
    if (!newCardName.trim()) {
      showError("Invalid Name", "Please enter a valid card name");
      return;
    }

    updateCard(selectedCardId, { name: newCardName.trim() });

    setChangeNameModalVisible(false);
    showSuccess("Name Updated", `Changed to "${newCardName.trim()}"`, 3000);
  }, [newCardName, selectedCardId, updateCard, showError, showSuccess]);

  const handleEditCardDesign = useCallback(() => {
    showInfo("Edit Design", "Card design editor coming soon!");
  }, [showInfo]);

  const handleDeleteCard = useCallback(() => {
    showDestructiveConfirm(
      "Delete Card",
      "Are you sure you want to delete this card? This action cannot be undone.",
      () => {
        deleteCard(selectedCardId);

        // Select the first remaining card or reset if no cards left
        const remainingCards = cards.filter(
          (card) => card.id !== selectedCardId
        );
        if (remainingCards.length > 0) {
          setSelectedCardId(remainingCards[0].id);
        } else {
          setSelectedCardId("");
        }

        showSuccess("Card Deleted", "Card successfully deleted", 3000);
      }
    );
  }, [selectedCardId, cards, deleteCard, showDestructiveConfirm, showSuccess]);

  // Card more options configuration
  const cardMoreOptions: MoreOption[] = [
    {
      id: "change-name",
      title: "Change Name",
      description: "Customize your card display name",
      icon: "create-outline",
      gradient: ["rgba(29, 36, 45, 1)", "rgba(29, 36, 45, 0.5)"],
      onPress: handleChangeName,
    },
    {
      id: "edit-design",
      title: "Edit Card Design",
      description: "Personalize your card appearance",
      icon: "color-palette-outline",
      gradient: ["rgba(29, 36, 45, 1)", "rgba(29, 36, 45, 0.5)"],
      onPress: handleEditCardDesign,
    },
    {
      id: "delete-card",
      title: "Delete Card",
      description: "Permanently remove this card",
      icon: "trash-outline",
      gradient: ["rgba(29, 36, 45, 1)", "rgba(29, 36, 45, 0.5)"],
      onPress: handleDeleteCard,
      isDanger: true,
    },
  ];

  // Handle crypto navigation with profile completion check
  const handleCryptoNavigation = useCallback(
    (coinType: string) => {
      if (!isProfileComplete()) {
        // Navigate to profile completion if profile is not complete
        navigation.navigate("PersonalInformation");
      } else {
        // Navigate to coin wallet if profile is complete
        navigation.navigate("CoinWalletScreen", { coinType });
      }
    },
    [isProfileComplete, navigation]
  );

  // Empty transactions array
  const transactions: Transaction[] = [];

  const renderCard = ({ item, index }: { item: Card; index: number }) => {
    const isSelected = selectedCardId === item.id;
    const cardFlipAnimation = getFlipAnimation(item.id);
    const isFlipping = flippingCards.has(item.id);

    // Front card rotation (same as your example)
    const frontInterpolate = cardFlipAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"],
    });

    const flipToFrontStyle = {
      transform: [{ perspective: 1200 }, { rotateY: frontInterpolate }],
    };

    // Back card rotation (same as your example)
    const backInterpolate = cardFlipAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ["180deg", "360deg"],
    });

    const flipToBackStyle = {
      transform: [{ perspective: 1200 }, { rotateY: backInterpolate }],
    };

    // Enhanced scaling with subtle bounce effect
    const cardScale =
      isSelected && isFlipping
        ? cardFlipAnimation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0.96, 1],
            extrapolate: "clamp",
          })
        : 1;

    // Add subtle shadow animation
    const shadowOpacity =
      isSelected && isFlipping
        ? cardFlipAnimation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.25, 0.4, 0.25],
            extrapolate: "clamp",
          })
        : 0.25;

    return (
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => setSelectedCardId(item.id)}
        activeOpacity={0.95}
      >
        <Animated.View
          style={[
            styles.cardWrapper,
            {
              transform: [{ scale: cardScale }],
              shadowOpacity,
            },
          ]}
        >
          {/* Front side of the card (hidden details) */}
          <Animated.View
            style={[
              styles.card,
              styles.cardFront,
              flipToFrontStyle,
              {
                backgroundColor: item.gradient[0],
                backfaceVisibility: "hidden",
              },
            ]}
          >
            {/* Top row: Balance on the left */}
            <View style={styles.cardTopRow}>
              <View style={styles.cardTopLeft}>
                <Text style={styles.cardBalance}>Balance: €55.24</Text>
              </View>
              <View style={styles.cardTopRight}>
                {/* Empty space for spacing */}
              </View>
            </View>

            {/* Bottom row: Card number on left, VISA brand on right */}
            <View style={styles.cardBottomRowNew}>
              <View style={styles.cardBottomLeft}>
                <Text style={styles.cardNumberPartial}>
                  **** **** **** 7659
                </Text>
              </View>
              <View style={styles.cardBottomRight}>
                <Text style={styles.cardBrand}>VISA</Text>
                <Text style={styles.cardBrandSub}>Business</Text>
              </View>
            </View>
          </Animated.View>

          {/* Back side of the card (visible details) */}
          <Animated.View
            style={[
              styles.card,
              styles.cardBack,
              flipToBackStyle,
              {
                backgroundColor: item.gradient[0],
                backfaceVisibility: "hidden",
              },
            ]}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardBalance}>Balance: €55.24</Text>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.cardNumberSection}>
                <Text style={styles.cardNumberLabel}>Card Number</Text>
                <Text style={styles.cardNumber}>{item.cardNumber}</Text>
              </View>
              <View style={styles.cardBottomRow}>
                <View style={styles.expirySection}>
                  <Text style={styles.cardLabel}>Expiry date</Text>
                  <Text style={styles.cardValue}>06/30</Text>
                </View>
                <View style={styles.cvvSection}>
                  <Text style={styles.cardLabel}>CVV</Text>
                  <Text style={styles.cardValue}>333</Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Freeze Image Overlay */}
          {item.isFrozen && (
            <View style={styles.freezeOverlay}>
              <Image
                source={require("../assets/Icons/Freezing.png")}
                style={styles.freezeOverlayImage}
                resizeMode="cover"
              />
              {/* Centered freeze icon on top */}
              <View style={styles.freezeIconContainer}>
                <Image
                  source={require("../assets/Icons/Freeze.png")}
                  style={styles.freezeIcon}
                  resizeMode="contain"
                />
              </View>
            </View>
          )}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderGetCard = () => (
    <TouchableOpacity
      style={styles.getCardContainer}
      onPress={() => navigation.navigate("CardTypes")}
    >
      <View style={styles.getCardContent}>
        <View style={styles.getCardButton}>
          <Text style={styles.getCardText}>+ Get Card</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderCardOrGetCard = ({ item }: { item: CardOrGetCard }) => {
    if (item.type === "get-card") {
      return renderGetCard();
    }
    return renderCard({ item: item as Card, index: 0 });
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <View style={styles.transactionIconContainer}>
          <Ionicons name="card-outline" size={20} color="#3B82F6" />
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionDescription}>{item.description}</Text>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <Text style={styles.transactionAmount}>{item.amount}</Text>
        <Text style={styles.transactionTime}>
          {item.date} {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <OnboardingBackground style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="#002657" />
      {/* Status bar background overlay */}
      <View style={[styles.statusBarBackground, { height: insets.top }]} />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingTop: insets.top + 1 }}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        keyboardShouldPersistTaps="handled"
        scrollEventThrottle={16}
      >
        {/* Header - Same as HomePage */}
        <View style={styles.header}>
          <UserHeader
            greetingText="Good Day 👋"
            useProfileImage={true}
            avatarSize={65}
            onProfilePress={() => navigation.navigate("ProfileScreen")}
          />
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => navigation.navigate("Notifications")}
            >
              <Image
                source={require("@/assets/Icons/Notification.png")}
                style={styles.notificationIcon}
                resizeMode="contain"
              />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationCount}>5</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* My Cards Section */}
        <View style={styles.cardsSection}>
          <View style={styles.cardsSectionHeader}>
            <Text style={styles.sectionTitle}>My Cards</Text>
          </View>
          <FlatList
            data={cardsWithGetCardOption}
            renderItem={renderCardOrGetCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            snapToInterval={screenWidth - 60}
            decelerationRate="fast"
            bounces={false}
            onMomentumScrollEnd={handleScrollEnd}
            // Performance optimizations
            removeClippedSubviews={true}
            initialNumToRender={3}
            maxToRenderPerBatch={3}
            windowSize={5}
            getItemLayout={(data, index) => ({
              length: screenWidth - 60,
              offset: (screenWidth - 60 + 16) * index,
              index,
            })}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleFreezeCard}
          >
            <LinearGradient
              colors={["rgba(196, 208, 224, 1)", "rgba(196, 208, 224, 0.6)"]}
              style={styles.actionIconContainer}
            >
              <Image
                source={require("../assets/Icons/Freeze.png")}
                style={styles.actionIcon}
                resizeMode="contain"
              />
            </LinearGradient>
            <Text style={styles.actionButtonText}>
              {selectedCard?.isFrozen ? "Unfreeze" : "Freeze"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              selectedCard?.isFrozen && styles.disabledButton,
            ]}
            onPress={
              selectedCard?.isFrozen ? undefined : handleToggleSensitiveInfo
            }
            disabled={selectedCard?.isFrozen}
          >
            <LinearGradient
              colors={
                selectedCard?.isFrozen
                  ? ["rgba(196, 208, 224, 0.3)", "rgba(196, 208, 224, 0.2)"]
                  : ["rgba(196, 208, 224, 1)", "rgba(196, 208, 224, 0.6)"]
              }
              style={styles.actionIconContainer}
            >
              <Image
                source={require("../assets/Icons/Info.png")}
                style={styles.actionIcon}
                resizeMode="contain"
              />
            </LinearGradient>
            <Text
              style={[
                styles.actionButtonText,
                selectedCard?.isFrozen && styles.disabledButtonText,
              ]}
            >
              {selectedCard?.isInfoHidden ? "Show Details" : "Hide Details"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleOpenLimitModal}
          >
            <LinearGradient
              colors={["rgba(196, 208, 224, 1)", "rgba(196, 208, 224, 0.6)"]}
              style={styles.actionIconContainer}
            >
              <Image
                source={require("../assets/Icons/Limit.png")}
                style={styles.actionIcon}
                resizeMode="contain"
              />
            </LinearGradient>
            <Text style={styles.actionButtonText}>Limit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleMoreButton}
          >
            <LinearGradient
              colors={["rgba(196, 208, 224, 1)", "rgba(196, 208, 224, 0.6)"]}
              style={styles.actionIconContainer}
            >
              <Image
                source={require("../assets/Icons/More.png")}
                style={styles.actionIcon}
                resizeMode="contain"
              />
            </LinearGradient>
            <Text style={styles.actionButtonText}>More</Text>
          </TouchableOpacity>
        </View>

        {/* Latest Transactions Section */}
        <View style={styles.transactionsSection}>
          <View style={styles.transactionHeader}>
            <Text style={styles.sectionTitle}>Latest Transactions</Text>
            <Text style={styles.sectionSubtitle}>All Cards History</Text>
          </View>

          {/* Empty state when no transactions */}
          {transactions.length === 0 ? (
            <View style={styles.emptyTransactionsContainer}>
              <View style={styles.emptyTransactionCard}>
                <Text style={styles.emptyTransactionText}>
                  No transactions yet
                </Text>
                <Text style={styles.emptyTransactionSubtext}>
                  Your recent transactions will appear here
                </Text>
              </View>
            </View>
          ) : (
            <FlatList
              data={transactions}
              renderItem={renderTransaction}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              ItemSeparatorComponent={() => (
                <View style={styles.transactionSeparator} />
              )}
              // Performance optimizations
              removeClippedSubviews={false} // Keep false for scrollEnabled={false}
              initialNumToRender={10}
              maxToRenderPerBatch={5}
              windowSize={10}
            />
          )}
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Limit Modal */}
      <Modal
        visible={limitModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setLimitModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Card Limit</Text>
            <Text style={styles.modalSubtitle}>
              Current limit: ${selectedCard?.limit?.toFixed(2) || "0.00"}
            </Text>
            <TextInput
              style={styles.limitInput}
              value={newLimit}
              onChangeText={setNewLimit}
              placeholder="Enter new limit"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              keyboardType="numeric"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setLimitModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleSetLimit}
              >
                <Text style={styles.confirmButtonText}>Set Limit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* More Actions Modal */}
      <MoreOptionsModal
        visible={moreModalVisible}
        onClose={() => setMoreModalVisible(false)}
        options={cardMoreOptions}
        title="Card Options"
        subtitle="Manage your card settings"
        headerIcon="card"
        headerIconColor="#3B82F6"
      />

      {/* Change Name Modal */}
      <Modal
        visible={changeNameModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setChangeNameModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Card Name</Text>
            <Text style={styles.modalSubtitle}>
              Current name: {selectedCard?.name || selectedCard?.type || "Card"}
            </Text>
            <TextInput
              style={styles.limitInput}
              value={newCardName}
              onChangeText={setNewCardName}
              placeholder="Enter new card name"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setChangeNameModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleConfirmChangeName}
              >
                <Text style={styles.confirmButtonText}>Change Name</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </OnboardingBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBarBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    zIndex: 1000,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationButton: {
    position: "relative",
    padding: 8,
  },
  notificationIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF",
  },
  notificationBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#FF6B6B",
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationCount: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },
  cardsSection: {
    paddingVertical: 20,
  },
  cardsSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  addCardButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  cardsContainer: {
    paddingHorizontal: 20,
  },
  cardContainer: {
    width: screenWidth - 80,
    height: 200,
    marginRight: 20,
  },
  cardWrapper: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 16,
    padding: 20,
    justifyContent: "space-between",
    backfaceVisibility: "hidden",
  },
  cardFront: {
    // Front side of the card (hidden details)
  },
  cardBack: {
    // Back side of the card (visible details)
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardChip: {
    width: 40,
    height: 28,
    borderRadius: 6,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "right",
    flex: 1,
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  cardNumberSection: {
    marginTop: 60,
  },
  cardNumberLabel: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 8,
  },
  cardNumber: {
    fontSize: 12,
    color: "#FFFFFF",
    fontFamily: "monospace",
    fontWeight: "600",
  },
  cardBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expirySection: {
    flex: 1,
  },
  cvvSection: {
    flex: 1,
    alignItems: "flex-end",
  },
  cardLabel: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 13,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  // New card layout styles
  cardBalance: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
    textAlign: "left",
  },
  cardCenterContent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 20,
  },
  cardBrand: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "serif",
    textAlign: "right",
  },
  cardBrandSub: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "400",
    marginTop: 2,
    textAlign: "right",
  },
  cardNumberPartial: {
    fontSize: 18,
    color: "#FFFFFF",
    fontFamily: "monospace",
    fontWeight: "600",
    textAlign: "left",
  },
  // New card layout styles for reorganized front side
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  cardTopLeft: {
    flex: 1,
    alignItems: "flex-start",
  },
  cardTopRight: {
    alignItems: "flex-end",
  },
  cardBottomRowNew: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: "auto",
  },
  cardBottomLeft: {
    flex: 1,
    alignItems: "flex-start",
  },
  cardBottomRight: {
    alignItems: "flex-end",
  },
  // Light theme styles for white card (show details)
  cardChipLight: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  cardTitleLight: {
    color: "#000000",
  },
  cardNumberLabelLight: {
    color: "rgba(0, 0, 0, 0.6)",
  },
  cardNumberLight: {
    color: "#000000",
  },
  cardLabelLight: {
    color: "rgba(0, 0, 0, 0.6)",
  },
  cardValueLight: {
    color: "#000000",
  },
  // Get Card Styles
  getCardContainer: {
    width: screenWidth - 80,
    height: 200,
    borderRadius: 16,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#3B82F6",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  getCardContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  getCardButton: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 40,
  },
  getCardText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  actionButton: {
    alignItems: "center",
    flex: 1,
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF",
  },
  actionButtonText: {
    fontSize: 12,
    color: "#FFFFFF",
    textAlign: "center",
  },
  disabledButton: {
    opacity: 0.3,
  },
  disabledButtonText: {
    opacity: 0.5,
  },
  transactionsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  transactionHeader: {
    marginBottom: 20,
  },
  emptyTransactionsContainer: {
    paddingVertical: 20,
  },
  emptyTransactionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
  },
  emptyTransactionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyTransactionSubtext: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
    lineHeight: 20,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 4,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#3B82F6",
    marginBottom: 4,
  },
  transactionDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
    marginBottom: 4,
  },
  transactionTime: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
  },
  transactionSeparator: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 8,
  },
  frozenBadge: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -40 }, { translateY: -14 }],
    backgroundColor: "rgba(217, 217, 217, 0.2)",
    paddingHorizontal: 19,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 10,
  },
  freezeOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Light overlay background
    borderRadius: 16, // Match card border radius
    zIndex: 50, // Higher than card content to appear in the middle
  },
  freezeOverlayImage: {
    width: "100%",
    height: "100%",
    tintColor: "rgba(255, 255, 255, 0.6)",
  },
  freezeIconContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }], // Center the 40x40 icon
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100, // Higher than the background freeze image
  },
  freezeIcon: {
    width: 40,
    height: 40,
    tintColor: "#FFFFFF",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "rgba(30, 41, 59, 0.95)",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    maxWidth: 320,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 6,
  },
  modalSubtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    marginBottom: 16,
  },
  limitInput: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: "#FFFFFF",
    marginBottom: 16,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  confirmButton: {
    backgroundColor: "#3B82F6",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cancelButtonText: {
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14,
  },
});

// Export with React.memo for performance optimization
export default React.memo(CardsScreen);
