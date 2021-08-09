import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  followers_count?: number;
  following_count?: number;
}

const AppUserProfileFollowerFollowing: React.FC<Props> = ({
  followers_count,
  following_count,
}) => {
  return (
    <View style={styles.followerFollowingWrapper}>
      <View style={styles.followerFollowingView}>
        <Text style={styles.followerFollowingCount}>{followers_count}</Text>
        <Text style={styles.followerFollowingText}>Followers</Text>
      </View>
      <View style={styles.followerFollowingView}>
        <Text style={styles.followerFollowingCount}>{following_count}</Text>
        <Text style={styles.followerFollowingText}>Following</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  followerFollowingWrapper: {
    flexDirection: 'row',
  },
  followerFollowingView: {
    padding: 4,
    alignItems: 'center',
  },
  followerFollowingCount: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111',
  },
  followerFollowingText: {
    fontSize: 13,
  },
});

export default AppUserProfileFollowerFollowing;
