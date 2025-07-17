import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import Text from "./Text";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

interface CardAction {
  id: string;
  title: string;
  iconSource: ImageSourcePropType;
  onPress: () => void;
}

interface CardActionsModalProps {
  visible: boolean;
  onClose: () => void;
  actions: CardAction[];
}

const CardActionsModal: React.FC<CardActionsModalProps> = ({
  visible,
  onClose,
  actions,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <BlurView intensity={20} style={styles.modalBlurView}>
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={onClose}
          />

          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <View style={styles.headerLeft}></View>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Actions List */}
            <View style={styles.actionsContainer}>
              {actions.map((action, index) => (
                <TouchableOpacity
                  key={action.id}
                  style={[
                    styles.actionItem,
                    index === actions.length - 1 && styles.lastActionItem,
                  ]}
                  onPress={() => {
                    action.onPress();
                    onClose();
                  }}
                >
                  <View style={styles.actionLeft}>
                    <View style={styles.actionIconContainer}>
                      <Image
                        source={action.iconSource}
                        style={styles.actionIcon}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.actionTitle}>{action.title}</Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color="rgba(255, 255, 255, 0.6)"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </BlurView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBlurView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "rgba(29, 36, 45, 0.8)",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingBottom: 34, // Account for safe area
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderBottomWidth: 0,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  actionsContainer: {
    paddingTop: 20,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  lastActionItem: {
    borderBottomWidth: 0,
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#C4D0E099",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 1,
    shadowColor: "rgba(59, 130, 246, 255)",
    shadowOffset: { width: 0, height: 2 },
  },
  actionIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF",
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
});

export default CardActionsModal;
