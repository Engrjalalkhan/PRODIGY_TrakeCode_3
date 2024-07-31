import React from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';
import AnalogClock from '../components/AnalogClock';

const ClockScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AnalogClock/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClockScreen;
