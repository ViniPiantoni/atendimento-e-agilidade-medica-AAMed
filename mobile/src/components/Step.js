import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

class Step extends PureComponent {
  render() {
    const {
      children,
      currentIndex,
      nextStep,
      prevStep,
      isLast,
      onSubmit,
    } = this.props;
    return (
      <>
        {children}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            disabled={currentIndex === 0}
            onPress={prevStep}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Anterior</Text>
          </TouchableOpacity>
          {isLast ? (
            <TouchableOpacity onPress={onSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={nextStep} style={styles.button}>
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
          )}
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#24292e',
  },
  buttonWrapper: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    // backgroundColor: '#fff',
    padding: 10,
  },
  buttonText: {
    color: '#fff',
  },
});

export default Step;
