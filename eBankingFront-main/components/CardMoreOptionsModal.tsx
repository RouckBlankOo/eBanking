import React, { useRef, useEffect } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import Text from "./Text";

const { height: screenHeight } = Dimensions.get("window");

interface CardMoreOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  onChangeName: () => void;
  onEditCardDesign: () => void;
  onDeleteCard: () => void;
}

export default function CardMoreOptionsModal({
  visible,
  onClose,
  onChangeName,
  onEditCardDesign,
  onDeleteCard,
}: CardMoreOptionsModalProps) {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: screenHeight,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, fadeAnim]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only respond to vertical swipes
        return (
          Math.abs(gestureState.dy) > Math.abs(gestureState.dx) &&
          Math.abs(gestureState.dy) > 10
        );
      },
      onPanResponderGrant: () => {
        // Extract the current value without using private _value property
        slideAnim.extractOffset();
      },
      onPanResponderMove: (evt, gestureState) => {
        // Only allow downward swipes
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        slideAnim.flattenOffset();

        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          // Close the modal if swiped down enough
          handleClose();
        } else {
          // Snap back to original position
          Animated.spring(slideAnim, {
            toValue: 0,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const handleAction = (action: () => void) => {
    action();
    handleClose();
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={handleClose}
    >
      <BlurView intensity={20} style={styles.container}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.backdropTouchable}
            activeOpacity={1}
            onPress={handleClose}
          />
        </Animated.View>

        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <LinearGradient
            colors={["rgba(30, 41, 59, 0.95)", "rgba(15, 23, 42, 0.98)"]}
            style={styles.modalContent}
          >
            {/* Drag Handle */}
            <View style={styles.dragHandle} />

            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <View style={styles.iconContainer}>
                  <Ionicons name="card" size={24} color="#3B82F6" />
                </View>
                <View>
                  <Text style={styles.headerTitle}>Card Options</Text>
                  <Text style={styles.headerSubtitle}>
                    Manage your card settings
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleClose}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Actions List */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                style={styles.actionItem}
                onPress={() => handleAction(onChangeName)}
                activeOpacity={0.7}
              >
                <View style={styles.actionLeft}>
                  <LinearGradient
                    colors={["#3B82F6", "#1D4ED8"]}
                    style={styles.actionIconContainer}
                  >
                    <Ionicons name="create-outline" size={22} color="#FFFFFF" />
                  </LinearGradient>
                  <View style={styles.actionTextContainer}>
                    <Text style={styles.actionTitle}>Change Name</Text>
                    <Text style={styles.actionDescription}>
                      Customize your card display name
                    </Text>
                  </View>
                </View>
                <View style={styles.actionRight}>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="rgba(255, 255, 255, 0.4)"
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionItem}
                onPress={() => handleAction(onEditCardDesign)}
                activeOpacity={0.7}
              >
                <View style={styles.actionLeft}>
                  <LinearGradient
                    colors={["#8B5CF6", "#7C3AED"]}
                    style={styles.actionIconContainer}
                  >
                    <Ionicons
                      name="color-palette-outline"
                      size={22}
                      color="#FFFFFF"
                    />
                  </LinearGradient>
                  <View style={styles.actionTextContainer}>
                    <Text style={styles.actionTitle}>Edit Card Design</Text>
                    <Text style={styles.actionDescription}>
                      Personalize your card appearance
                    </Text>
                  </View>
                </View>
                <View style={styles.actionRight}>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="rgba(255, 255, 255, 0.4)"
                  />
                </View>
              </TouchableOpacity>

              <View style={styles.separator} />

              <TouchableOpacity
                style={[styles.actionItem, styles.dangerAction]}
                onPress={() => handleAction(onDeleteCard)}
                activeOpacity={0.7}
              >
                <View style={styles.actionLeft}>
                  <LinearGradient
                    colors={["#EF4444", "#DC2626"]}
                    style={styles.actionIconContainer}
                  >
                    <Ionicons name="trash-outline" size={22} color="#FFFFFF" />
                  </LinearGradient>
                  <View style={styles.actionTextContainer}>
                    <Text style={[styles.actionTitle, styles.dangerText]}>
                      Delete Card
                    </Text>
                    <Text style={styles.actionDescription}>
                      Permanently remove this card
                    </Text>
                  </View>
                </View>
                <View style={styles.actionRight}>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="rgba(239, 68, 68, 0.6)"
                  />
                </View>
              </TouchableOpacity>
            </View>

            {/* Bottom padding for safe area */}
            <View style={styles.bottomPadding} />
          </LinearGradient>
        </Animated.View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  backdropTouchable: {
    flex: 1,
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    minHeight: 320,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.3)",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.6)",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  actionsContainer: {
    paddingHorizontal: 24,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    minHeight: 72,
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.6)",
    lineHeight: 18,
  },
  actionRight: {
    marginLeft: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 8,
  },
  dangerAction: {
    // Additional styling for dangerous actions
  },
  dangerText: {
    color: "#EF4444",
  },
  bottomPadding: {
    height: 34, // Safe area bottom padding
  },
});
