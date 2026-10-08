import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import ThemeToggleSwitch from '../components/ThemeToggleSwitch';

const SettingsScreen = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      <ThemeToggleSwitch />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SettingsScreen;
