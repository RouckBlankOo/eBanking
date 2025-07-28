import React, { useState } from "react";
import { Button, View } from "react-native";
import CardMoreOptionsModal from "../../components/CardMoreOptionsModal";

export default function CardManagerScreen({ navigation }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [card, setCard] = useState({ name: "My Card" }); // Example card data
  const [queuedAction, setQueuedAction] = useState<
    null | "changeName" | "editDesign" | "deleteCard"
  >(null);

  const handleModalClose = () => {
    setModalVisible(false);
    if (queuedAction) {
      navigation.navigate("EmptyPageScreen");
      setQueuedAction(null);
    }
  };

  const handleChangeName = () => {
    setQueuedAction("changeName");
    setModalVisible(false);
  };

  const handleEditCardDesign = () => {
    setQueuedAction("editDesign");
    setModalVisible(false);
  };

  const handleDeleteCard = () => {
    setQueuedAction("deleteCard");
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Open Card Options" onPress={() => setModalVisible(true)} />
      <CardMoreOptionsModal
        visible={modalVisible}
        onClose={handleModalClose}
        onChangeName={handleChangeName}
        onEditCardDesign={handleEditCardDesign}
        onDeleteCard={handleDeleteCard}
      />
    </View>
  );
}
