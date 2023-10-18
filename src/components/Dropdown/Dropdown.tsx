/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import { View } from 'react-native';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import filter from 'lodash/filter';

import { useStyles, createStyleSheet } from '@core/Theme';

export type DropDownListItem = {
  disabled?: boolean;
  label: string;
  value: string | number;
};

export type DropDownInputProps = {
  isVisible: boolean;
  items: DropDownListItem[] | [];
  value: ValueType | ValueType[] | null;
  onChange: (value: ValueType | ValueType[] | null) => void;
  onPickerPress: (isOpen: boolean) => void;
};

const stylesheet = createStyleSheet(theme => ({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  dropDownContainer: {
    // maxHeight: '300@s',

    borderWidth: 2,
    borderRadius: 0,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.secondaryBackground,
  },
  separator: {
    backgroundColor: theme.colors.border,
  },
  selectedItemLabel: {
    color: theme.colors.text,
  },
  disabledStyle: {
    opacity: 0.5,
  },
  inputContainer: {
    borderRadius: 0,
    borderWidth: 2,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.secondaryBackground,
  },
  label: {
    color: theme.colors.text,
  },
}));

const Dropdown = (props: DropDownInputProps) => {
  const { styles, theme } = useStyles(stylesheet);
  const {
    items = [],
    value = null,
    isVisible = false,
    onChange,
    onPickerPress,
  } = props;
  const handleOnSelectItem = valueItem => {
    onChange?.(valueItem.value);
    return onPickerPress?.(false);
  };

  const itemsFiltered = useMemo(() => {
    return filter(items, item => item?.value !== null);
  }, []);

  const handleOnPickerPress = (isOpen: boolean) => {
    return onPickerPress?.(isOpen);
  };

  return (
    <View
      style={[
        {
          zIndex: 99999,
        },
        isVisible && styles.shadow,
      ]}
    >
      <DropDownPicker
        placeholder="Select"
        listMode="SCROLLVIEW"
        open={isVisible}
        value={value}
        items={itemsFiltered}
        onSelectItem={handleOnSelectItem}
        onPress={handleOnPickerPress}
        autoScroll
        itemSeparator
        closeOnBackPressed
        TickIconComponent={() => (
          <AntDesign
            name="checksquare"
            size={24}
            color={theme.colors.highlight}
          />
        )}
        ArrowUpIconComponent={() => (
          <MaterialIcon name="keyboard-arrow-down" size={24} color="white" />
        )}
        ArrowDownIconComponent={() => (
          <MaterialIcon name="keyboard-arrow-up" size={24} color="white" />
        )}
        dropDownContainerStyle={styles.dropDownContainer}
        textStyle={{
          color: theme.colors.text,
        }}
        labelStyle={styles.selectedItemLabel}
        placeholderStyle={styles.selectedItemLabel}
        disabledStyle={styles.disabledStyle}
        itemSeparatorStyle={styles.separator}
        selectedItemContainerStyle={{
          backgroundColor: theme.colors.textOverlay,
        }}
        style={styles.inputContainer}
      />
    </View>
  );
};

export default Dropdown;
