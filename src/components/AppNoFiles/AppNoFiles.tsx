import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

import NoFilesImg from '../../assets/svg/undraw_People_search.svg';
import { COLORS } from '../../constants/Colors';

interface Props {
  title?: string;
  subTitle?: string;
}

const AppNoFiles: React.FC<Props> = ({ title, subTitle }) => {
  return (
    <>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardHeader}>
          {title && <Text style={styles.titleStyle}>{title}</Text>}
        </Card.Title>
        <View style={styles.cardContent}>
          <NoFilesImg height={200} width={200} />
        </View>
        <View style={styles.cardContent}>
          <Text>
            {subTitle && <Text style={styles.subTitleStyle}>{subTitle}</Text>}
          </Text>
        </View>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 0,
    shadowColor: 'rgba(0,0,0, .2)',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    borderWidth: 0,
    margin: 16,
  },
  cardHeader: {
    justifyContent: 'center',
    padding: 16,
  },
  cardContent: {
    // marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 21,
    fontWeight: '700',
    color: COLORS.black,
  },
  subTitleStyle: {
    fontSize: 16,
    color: COLORS.black,
    textAlign: 'center',
  },
});

export default AppNoFiles;
