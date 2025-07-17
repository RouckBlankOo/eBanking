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

interface HomeAction {
  id: string;
  title: string;
  iconSource: ImageSourcePropType;
  onPress: () => void;
}

interface HomeMoreOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  actions: HomeAction[];
}

export default function HomeMoreOptionsModal({
  visible,
  onClose,
  actions,
}: HomeMoreOptionsModalProps) {
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

  // Pan responder for swipe to dismiss
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 20 && gestureState.dy > 0;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 150 || gestureState.vy > 0.5) {
          handleClose();
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={StyleSheet.absoluteFillObject}
            onPress={handleClose}
            activeOpacity={1}
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
          <BlurView intensity={20} style={styles.blurContainer}>
            <LinearGradient
              colors={[
                "rgba(30, 41, 59, 0.95)",
                "rgba(30, 41, 59, 0.98)",
                "rgba(15, 23, 42, 0.98)",
              ]}
              style={styles.gradientContainer}
            >
              {/* Drag indicator */}
              <View style={styles.dragIndicator} />

              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <View style={styles.iconContainer}>
                    <Ionicons name="options" size={24} color="#3B82F6" />
                  </View>
                  <View style={styles.headerTextContainer}>
                    <Text style={styles.headerTitle}>More Options</Text>
                    <Text style={styles.headerSubtitle}>
                      Additional actions for your account
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleClose}
                >
                  <Ionicons name="close" size={20} color="#94A3B8" />
                </TouchableOpacity>
              </View>

              {/* Actions Grid */}
              <View style={styles.actionsContainer}>
                {actions.map((action, index) => (
                  <TouchableOpacity
                    key={action.id}
                    style={[
                      index === actions.length - 1 && styles.lastActionItem,
                    ]}
                    onPress={() => {
                      action.onPress();
                      handleClose();
                    }}
                    activeOpacity={0.7}
                  >
                    <LinearGradient
                      colors={["rgba(29, 36, 45, 1)", "rgba(29, 36, 45, 0.5)"]}
                      style={styles.actionItem}
                    >
                      <View style={styles.actionContent}>
                        <View style={styles.actionIconContainer}>
                          <Image
                            source={action.iconSource}
                            style={styles.actionIcon}
                            resizeMode="contain"
                          />
                        </View>
                        <View style={styles.actionTextContainer}>
                          <Text style={styles.actionTitle}>{action.title}</Text>
                        </View>
                        <View style={styles.actionArrow}>
                          <Ionicons
                            name="chevron-forward"
                            size={18}
                            color="#64748B"
                          />
                        </View>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleClose}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </BlurView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContainer: {
    maxHeight: screenHeight * 0.7,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 25,
  },
  blurContainer: {
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 34,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: "rgba(148, 163, 184, 0.5)",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.3)",
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "400",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(148, 163, 184, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  actionsContainer: {
    paddingTop: 24,
  },
  actionItem: {
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
  },
  lastActionItem: {
    marginBottom: 24,
  },
  actionContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  actionIconContainer: {
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
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: "#3B82F6",
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  actionArrow: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  cancelButton: {
    backgroundColor: "rgba(148, 163, 184, 0.15)",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(148, 163, 184, 0.3)",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#94A3B8",
  },
});
