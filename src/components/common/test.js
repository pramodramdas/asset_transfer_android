import { View, Text } from 'react-native';

const Test = ({ children }) => {
  return (
    <View>
        <Text>Nested Children</Text>
        {children}
    </View>
  );
};

export { Test };