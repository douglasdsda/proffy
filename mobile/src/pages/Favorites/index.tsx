import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import PageHeader from "../../components/PageHeader";

import TeacherItem, { Teacher } from "../../components/TeacherItem";
import AsyncStorage from "@react-native-community/async-storage";
import {useFocusEffect} from "@react-navigation/native";

import styles from "./styles";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(() => {
    loadFavorites();
  });

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);

        setFavorites(favoritedTeachers);
      }
    });
  }

  return (
    <View style={styles.container}>
      <PageHeader title="Meus Proffys favoritos" />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
        style={styles.teacherList}
      >
        {favorites.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} favorited />;
        })}
      </ScrollView>
    </View>
  );
}

export default Favorites;
