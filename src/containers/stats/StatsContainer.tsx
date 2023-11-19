import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import isEmpty from 'lodash/isEmpty';

import { Button, Text, Divider, Dropdown, Typewritter } from '@src/components';
import { useStyles } from '@core/Theme';
import { scale } from 'react-native-size-matters';
import { PlayDifficulty, PlayScene } from '@src/types';
import { NumbersUtils, DateUtils } from '@utils';
import styleSheet from './StatsContainer.styles';

const ITEMS = [
  {
    disabled: false,
    label: PlayDifficulty.NOVICE,
    value: PlayDifficulty.NOVICE,
  },
  {
    disabled: false,
    label: PlayDifficulty.ADVANCED,
    value: PlayDifficulty.ADVANCED,
  },
  {
    disabled: false,
    label: PlayDifficulty.EXPERT,
    value: PlayDifficulty.EXPERT,
  },
];

type StatsContainerProps = {
  playHistory: PlayScene[];
  totalAverageTime: string;
  totalLocksUnlocked: string;
  difficultySelected: PlayDifficulty;
  onPlayPress: () => void;
  onSelectDifficultyToDisplay: (difficulty: PlayDifficulty) => void;
};
const StatsContainer: React.FC<StatsContainerProps> = props => {
  const {
    difficultySelected,
    playHistory,
    onSelectDifficultyToDisplay,
    totalAverageTime,
    totalLocksUnlocked,
    onPlayPress,
  } = props;
  const { styles, theme } = useStyles(styleSheet);
  const [isPickerVisible, setIsOpen] = useState(false);

  const renderEmptyStats = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text type="subTitle">
          Play more on{' '}
          <Text
            type="subTitle"
            weight="bold"
            style={{
              color: theme.colors.highlight,
              textDecorationLine: 'underline',
              textDecorationColor: theme.colors.highlight,
            }}
          >
            {difficultySelected}
          </Text>
        </Text>
        <Text type="callout">Start playing to track your progress</Text>
        <Divider spacing="md" />

        <Button label="PLAY" onPress={onPlayPress} />
      </View>
    );
  };

  const renderHeaderStats = () => {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ alignSelf: 'flex-end' }}>
            <Text>Total Locks Unlocked:</Text>
            <Text weight="bold">
              {NumbersUtils.formatNumberWithCommas(totalLocksUnlocked || 0)}
            </Text>
            <Divider />
            <View style={{ width: scale(160) }}>
              <Dropdown
                isVisible={isPickerVisible}
                items={ITEMS}
                onPickerPress={isOpen => setIsOpen(isOpen)}
                onChange={v => onSelectDifficultyToDisplay(v)}
                value={difficultySelected}
              />
            </View>
          </View>
          <View style={{ alignSelf: 'flex-end' }}>
            <Text
              type="title"
              style={{
                textDecorationLine: 'underline',
                textDecorationColor: 'orange',
              }}
            >
              Average
            </Text>
            <Text type="title" weight="bold">
              {totalAverageTime || '--:--:--'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderStatItem = ({ item }: { item: PlayScene }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,

          elevation: 6,
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text type="body" weight="medium">
              Mode
            </Text>
            <Text type="body" weight="bold">
              {item.gameMode}
            </Text>
          </View>
          <Divider spacing="sm" />
          <View style={{ flex: 1 }}>
            <Text type="body" weight="medium">
              Code
            </Text>
            <Text type="body" weight="bold">
              {item.meta.answer}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text type="body" weight="medium">
              Attemps
            </Text>
            <Text type="body" weight="bold">
              {item.meta.attemps}
            </Text>
          </View>
          <Divider spacing="sm" />
          <View style={{ flex: 1 }}>
            <Text type="body" weight="medium">
              When
            </Text>
            <Text type="body" weight="bold">
              {DateUtils.formatDate(item.meta.endPlayTime)}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, alignSelf: 'flex-end' }}>
          <Text type="body" weight="medium">
            Time
          </Text>
          <Text type="body" weight="bold">
            {item.meta.timeLapsed}
          </Text>
        </View>
      </View>
    );
  };

  const renderStatsList = () => {
    return (
      <FlatList
        data={playHistory}
        renderItem={renderStatItem}
        ItemSeparatorComponent={
          <Divider dividerColor="white" isTransparent={false} spacing="md" />
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Divider spacing="sm" />
      <View
        style={{
          flex: 10,
          // marginTop: top,
          paddingHorizontal: theme.spacing.sm,
        }}
      >
        {isEmpty(playHistory) ? renderEmptyStats() : renderStatsList()}
        <Typewritter
          textArray={[`SANDBOX mode doesn't impact average stats.`]}
          isOverlayText
          type="callout"
          weight="bold"
          speed={150}
          delay={500}
          withLeftCursor
        />
      </View>

      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
          backgroundColor: theme.colors.secondaryBackground,
          flex: 3,
          paddingHorizontal: theme.spacing.sm,
          paddingBottom: theme.spacing.md,
        }}
      >
        {renderHeaderStats()}
        <Divider spacing="xs" />

        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
          }}
        >
          <Typewritter
            textArray={['Swipe down to close']}
            withAnimation={false}
            isOverlayText
            type="callout"
            weight="bold"
            speed={100}
            delay={500}
            withLeftCursor
            preText="Tip: "
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StatsContainer;
