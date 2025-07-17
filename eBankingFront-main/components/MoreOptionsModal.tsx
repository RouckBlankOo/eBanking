import React, { useRef, useEffect } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import Text from "./Text";

const { height: screenHeight } = Dimensions.get("window");

export interface MoreOption {
  id: string;
  title: string;
  description: string;
  icon: string; // Ionicon name
  iconSource?: ImageSourcePropType; // Alternative: custom image
  gradient: [string, string, ...string[]];
  onPress: () => void;
  isDanger?: boolean;
}

interface MoreOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  options: MoreOption[];
  title?: string;
  subtitle?: string;
  headerIcon?: string;
  headerIconColor?: string;
}

export default function MoreOptionsModal({
  visible,
  onClose,
  options,
  title = "More Options",
  subtitle = "Choose an action",
  headerIcon = "ellipsis-horizontal",
  headerIconColor = "#3B82F6",
}: MoreOptionsModalProps) {
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
                  <Ionicons
                    name={headerIcon as any}
                    size={24}
                    color={headerIconColor}
                  />
                </View>
                <View>
                  <Text style={styles.headerTitle}>{title}</Text>
                  <Text style={styles.headerSubtitle}>{subtitle}</Text>
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
              {options.map((option, index) => {
                const isLastInSection =
                  index === options.length - 1 ||
                  (index < options.length - 1 &&
                    options[index + 1].isDanger &&
                    !option.isDanger);

                return (
                  <React.Fragment key={option.id}>
                    <TouchableOpacity
                      style={[
                        styles.actionItem,
                        option.isDanger && styles.dangerAction,
                      ]}
                      onPress={() => handleAction(option.onPress)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.actionLeft}>
                        <LinearGradient
                          colors={option.gradient}
                          style={styles.actionIconContainer}
                        >
                          {option.iconSource ? (
                            <Image
                              source={option.iconSource}
                              style={styles.customIcon}
                              resizeMode="contain"
                            />
                          ) : (
                            <Ionicons
                              name={option.icon as any}
                              size={22}
                              color="#FFFFFF"
                            />
                          )}
                        </LinearGradient>
                        <View style={styles.actionTextContainer}>
                          <Text
                            style={[
                              styles.actionTitle,
                              option.isDanger && styles.dangerText,
                            ]}
                          >
                            {option.title}
                          </Text>
                          <Text style={styles.actionDescription}>
                            {option.description}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.actionRight}>
                        <Ionicons
                          name="chevron-forward"
                          size={20}
                          color={
                            option.isDanger
                              ? "rgba(239, 68, 68, 0.6)"
                              : "rgba(255, 255, 255, 0.4)"
                          }
                        />
                      </View>
                    </TouchableOpacity>

                    {/* Add separator before danger actions */}
                    {isLastInSection && index < options.length - 1 && (
                      <View style={styles.separator} />
                    )}
                  </React.Fragment>
                );
              })}
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
    maxHeight: screenHeight * 0.8,
  },
  modalContent: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 8,
    minHeight: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    alignItems: "center",
    justifyContent: "center",
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
    fontWeight: "400",
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  actionsContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 0,
    borderRadius: 16,
    marginBottom: 8,
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  dangerAction: {
    backgroundColor: "rgba(239, 68, 68, 0.05)",
    borderColor: "rgba(239, 68, 68, 0.1)",
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingLeft: 16,
  },
  actionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  customIcon: {
    width: 22,
    height: 22,
    tintColor: "#FFFFFF",
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  dangerText: {
    color: "#EF4444",
  },
  actionDescription: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "400",
    lineHeight: 18,
  },
  actionRight: {
    paddingRight: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 12,
    marginHorizontal: 16,
  },
  bottomPadding: {
    height: 34,
  },
});
