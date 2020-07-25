import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useAuth } from '../utils/auth';
import { Feather } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';

export default function CustomDrawerContent(props) {
  const [, { logout }] = useAuth();
  const [user, setUser] = useState(null || '');

  // A função getUserLogged recupera os dados do usuário por meio de uma Promise
  // que é executada assim que o componente e montado
  useEffect(() => {
    function getUserLogged() {
      // O uso da Promise + setTmeout foi necessário pois leva um tempo até os dados do AsyncStorage sejam recuperados
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // A função resolve() irá conter os dados do usuário após 2s definidos no setTimeout()
          resolve(AsyncStorage.getItem('store'));
        }, 2000);
      });
    }
    getUserLogged()
      .then(data => {
        // Para acessar os dados recuperados é usado o .then()
        // Como os dados armazenados estão em formato de string, é utilizado o JSON.parse() para tranforma-los em objeto
        const dataParse = JSON.parse(data);
        // Após esse processo teremos um objeto que terá dentro outro objeto "auth", nele está os dados do usuário além do token
        // Como só é necessário apenas o usuário, o estado é setado apenas com os dados do mesmo (id, nome, bio, etc.)
        setUser(dataParse.auth.user);
      })
      .catch(err => console.log(err)); // Por fim é usado um .catch() para tratar algum erro
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.topDrawer}>
        <View style={styles.viewAvatar}>
          <Avatar
            avatarStyle={styles.avatarStyle}
            containerStyle={styles.avatarContainerStyle}
            onPress={() => props.navigation.navigate('EditProfile')}
            activeOpacity={0.7}
            size="medium"
            rounded
            title={user ? JSON.stringify(user.name[0]) : 'a'}
          />
        </View>
        <View style={styles.viewDados}>
          <Text style={styles.nameUser}>{user.name}</Text>
          <Text style={styles.bioUser}>{user.bio}</Text>
        </View>
      </View>

      <DrawerItemList {...props} />
      <View style={styles.separator} />
      <DrawerItem
        onPress={logout}
        label="SAIR"
        style={styles.drawerItem}
        labelStyle={styles.drawerItemLabel}
        icon={() => <Feather name="log-out" size={20} color="#E53935" />}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  topDrawer: {
    flex: 1,
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1,
  },
  viewAvatar: {
    flex: 1,
    alignItems: 'center',
  },
  viewDados: {
    flex: 3,
    alignItems: 'flex-start',
    marginLeft: 4,
  },
  nameUser: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  bioUser: {
    fontSize: 12,
    color: '#878787',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#e2e2e2',
  },
  drawerItem: {
    marginTop: 130,
    borderWidth: 1,
    borderColor: '#E53935',
    backgroundColor: '#fff',
  },
  drawerItemLabel: {
    fontWeight: 'bold',
    padding: 7,
    color: '#E53935',
  },
});
