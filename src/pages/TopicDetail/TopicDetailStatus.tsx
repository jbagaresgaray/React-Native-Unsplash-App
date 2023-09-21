import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, Icon, Avatar } from 'react-native-elements';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AppStatus from '../../components/AppStatus/AppStatus';
import { ITopic } from '../../interfaces/topic';

interface Props {
  topic?: ITopic | null;
  showLoading?: boolean;
  onUserPress: (ev: any) => void;
}

const TopicDetailStatus: React.FC<Props> = ({
  topic,
  showLoading,
  onUserPress,
}) => {
  const showLoadingSkeleton = () => (
    <View style={styles.listView}>
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between">
          <SkeletonPlaceholder.Item flexDirection="row">
            <SkeletonPlaceholder.Item
              width={18}
              height={18}
              borderRadius={999}
            />
            <SkeletonPlaceholder.Item marginLeft={12} width={60} height={16} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={80} height={18} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <View
        style={{
          borderBottomColor: '#ddd',
          borderBottomWidth: 1,
          paddingTop: 16,
          marginBottom: 16,
        }}
      />
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between">
          <SkeletonPlaceholder.Item flexDirection="row">
            <SkeletonPlaceholder.Item
              width={18}
              height={18}
              borderRadius={999}
            />
            <SkeletonPlaceholder.Item marginLeft={12} width={60} height={16} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={28} height={28} borderRadius={999} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <View
        style={{
          borderBottomColor: '#ddd',
          borderBottomWidth: 1,
          paddingTop: 16,
          marginBottom: 16,
        }}
      />
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between">
          <SkeletonPlaceholder.Item flexDirection="row">
            <SkeletonPlaceholder.Item
              width={18}
              height={18}
              borderRadius={999}
            />
            <SkeletonPlaceholder.Item marginLeft={12} width={60} height={16} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={80} height={18} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <View
        style={{
          borderBottomColor: '#ddd',
          borderBottomWidth: 1,
          paddingTop: 16,
          marginBottom: 16,
        }}
      />
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between">
          <SkeletonPlaceholder.Item flexDirection="row">
            <SkeletonPlaceholder.Item
              width={18}
              height={18}
              borderRadius={999}
            />
            <SkeletonPlaceholder.Item marginLeft={12} width={60} height={16} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item flexDirection="row">
            <SkeletonPlaceholder.Item
              width={18}
              height={18}
              borderRadius={999}
            />
            <SkeletonPlaceholder.Item
              width={18}
              height={18}
              borderRadius={999}
            />
            <SkeletonPlaceholder.Item
              width={18}
              height={18}
              borderRadius={999}
            />
            <SkeletonPlaceholder.Item
              width={18}
              height={18}
              borderRadius={999}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <View
        style={{
          borderBottomColor: '#ddd',
          borderBottomWidth: 1,
          paddingTop: 16,
          marginBottom: 16,
        }}
      />
    </View>
  );

  const renderTopicStatusItems = () => (
    <View style={styles.listView}>
      <ListItem bottomDivider>
        <Icon
          name="offline-bolt"
          type="materialicons"
          color="#d1d1d1"
          size={18}
        />
        <ListItem.Content style={styles.listContent}>
          <ListItem.Title style={styles.listLabel}>Status</ListItem.Title>
          <ListItem.Subtitle>
            {topic?.status === 'open' && <AppStatus />}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      {topic && topic?.owners && (
        <ListItem bottomDivider>
          <Icon
            name="account-circle"
            type="material-community"
            color="#d1d1d1"
            size={18}
          />
          <ListItem.Content style={styles.listContent}>
            <ListItem.Title style={styles.listLabel}>Curator</ListItem.Title>
            <ListItem.Subtitle>
              <Avatar
                rounded
                source={{
                  uri: topic?.owners[0]?.profile_image?.small,
                }}
                size={28}
                containerStyle={styles.topicAvatar}
                onPress={() => onUserPress(String(topic?.owners[0]?.username))}
              />
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      )}

      <ListItem bottomDivider>
        <Icon
          name="image"
          type="material-community"
          color="#d1d1d1"
          size={18}
        />
        <ListItem.Content style={styles.listContent}>
          <ListItem.Title style={styles.listLabel}>
            Contributions
          </ListItem.Title>
          <ListItem.Subtitle style={styles.textContribution}>
            {topic?.total_photos}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider>
        <Icon
          name="account-group"
          type="material-community"
          color="#d1d1d1"
          size={18}
        />
        <ListItem.Content style={styles.listContent}>
          <ListItem.Title style={styles.listLabel}>
            Top contributors
          </ListItem.Title>
          <ListItem.Subtitle>
            {topic?.top_contributors &&
              topic?.top_contributors.map((item: any, index: number) => (
                <Avatar
                  rounded
                  source={{
                    uri: item.profile_image?.small,
                  }}
                  key={index}
                  containerStyle={styles.topicContributor}
                  size={18}
                  onPress={() => onUserPress(String(item?.username))}
                />
              ))}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  );

  return showLoading ? showLoadingSkeleton() : renderTopicStatusItems();
};

const styles = StyleSheet.create({
  listView: {
    marginTop: 40,
  },
  listContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listLabel: {
    fontSize: 14,
    color: '#111',
  },
  topicContributor: {
    borderColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: 999,
  },
  textContribution: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
  topicAvatar: {
    borderColor: '#ddd',
    borderWidth: 0.5,
  },
});

export default TopicDetailStatus;
