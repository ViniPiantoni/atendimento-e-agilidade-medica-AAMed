import React from 'react';
import { ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';

export default function Loading() {
  return (
    <ActivityIndicator size="large" color="#52c8fa" style={styles.container} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
