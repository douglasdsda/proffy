import React from "react";
import { Image, View, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import PageHeader from "../PageHeader";
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import styles from "./styles";

function TeacherItem() {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri: "https://github.com/douglasdsda.png" }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Douglas</Text>
          <Text style={styles.subject}>Ingles</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        Entusiasta das melhores tecnologias de quimica avançada
        {"\n"}
        {"\n"}
        Apaixonado por explodir coisas em labortório e por mudar a vida das
        pessoas atraves de esperiências.
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {"   "}
          <Text style={styles.priceValue}>R$ 20,00</Text>
        </Text>

        <View style={styles.buttonsContainer}>
            <RectButton style={styles.favoriteButton}>
                <Image source={heartOutlineIcon}/>
            </RectButton>

            <RectButton style={styles.contacButton}>
                <Image source={whatsappIcon}/>
          <Text style={styles.contacButtonText}>Entrar em contato</Text>

            </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;
