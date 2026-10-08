import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import ProfileCard from '../components/ProfileCard';

const ProfileScreen = ({ navigation, user }) => {
  const { colors } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ProfileCard 
        user={user} 
        onEditPress={() => navigation.navigate('EditProfile')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});

export default ProfileScreen;
