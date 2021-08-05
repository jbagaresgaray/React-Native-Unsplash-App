import React from 'react';
import {
  StyleSheet,
  StatusBar,
  Platform,
  Dimensions,
  View,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { COLORS } from '../../constants/Colors';

interface Props {
  onSearching: (value: string) => void | any;
  value?: string;
}

const AppSearchHeaderBar: React.FC<Props> = ({ onSearching, value }) => {
  return (
    <View style={{ width: Dimensions.get('window').width }}>
      <SearchBar
        platform={Platform.OS === 'ios' ? 'ios' : 'android'}
        style={styles.searchBar}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
        cancelButtonProps={{
          buttonTextStyle: styles.searchBarInput,
        }}
        placeholder="Search photos"
        onChangeText={onSearching}
        value={String(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarInputContainer: {
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: COLORS.white,
    ...Platform.select({
      ios: {
        height: 30,
        borderWidth: 0.5,
        borderColor: '#ddd',
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5,
      },
      android: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.5,
      },
    }),
  },
  searchBarInput: {
    fontSize: 14,
  },
  searchBarContainer: {
    paddingTop: 0,
    paddingBottom: 0,
    ...Platform.select({
      ios: {
        marginStart: 8,
        marginEnd: 8,
      },
    }),
  },
  searchBar: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});

export default AppSearchHeaderBar;
