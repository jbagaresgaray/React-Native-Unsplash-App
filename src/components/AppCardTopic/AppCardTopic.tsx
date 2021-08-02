import React from 'react';
import {View, Text} from 'react-native';
import {Card, Button, Icon} from 'react-native-elements';

interface Props {
  title?: string;
  description?: string;
  cover_photo: {
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
    };
  };
  user: {
    name: string;
    username: string;
    profile_image: {
      small: string;
      medium: string;
      larget: string;
    };
  };
  onUserPress?: () => void;
  onMorePress?: () => void;
  onImagePress?: () => void;
}

const AppCardTopic = () => {
  return (
    <Card>
      <Card.Title>CARD WITH DIVIDER</Card.Title>
      <Card.Image source={require('../images/pic2.jpg')}>
        <Text style={{marginBottom: 10}}>
          The idea with React Native Elements is more about component structure
          than actual design.
        </Text>
        <Button
          icon={<Icon name="code" color="#ffffff" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="VIEW NOW"
        />
      </Card.Image>
    </Card>
  );
};

export default AppCardTopic;
