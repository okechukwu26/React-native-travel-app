import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import reuseable from "./reuseable.Style";
import WidthSpacer from "./WidthSpace";
import ReuseableText from './ReuseableText';

const CountryList = ({ country, select }) => {
  return (
    <View style={styles.container}>
      <SelectDropdown
        data={country}
        onSelect={(selectedItem) => {
          select((prev) => ({
            ...prev,
            country: selectedItem.country,
            region: selectedItem.region,
          }));
        }}
        renderCustomizedRowChild={(item, index) => (
          <View style={reuseable.rowWithSpace("space-between")}>
            {/* Customize the dropdown row content here */}
            <Text style={{ fontSize: TEXT.medium }}>{item.flag}</Text>
            <Text>{item.country}</Text>
          </View>
        )}
        rowTextForSelection={(item) => <MemoizedDropdownRow item={item} />}
        buttonTextAfterSelection={(item, index) => {
          return (
            <View style={reuseable.rowWithSpace("space-between")}>
              <Text style={{ fontSize: TEXT.medium }}>{item.flag}</Text>
              <WidthSpacer width={20} />
              <Text>{item.country}</Text>
            </View>
          ); // Display selected item text
        }}
        buttonStyle={styles.dropdownButton}
        buttonTextStyle={styles.dropdownButtonText}
        dropdownStyle={styles.dropdown}
        rowStyle={styles.dropdownRow}
        rowTextStyle={styles.dropdownRowText}
        search
        defaultButtonText="Select Country"
      />
    </View>
  );
};

export default CountryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownButton: {
    width: SIZES.width - 50,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: COLORS.dark,
    flex: 1,
  },
  dropdown: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: 8,
  
    marginTop: 8,
  },
  dropdownRow: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
  },
  dropdownRowText: {
    fontSize: 16,
    color: COLORS.white,
  },
});


const MemoizedDropdownRow = React.memo(({ item }) => {
  return (
    <View style={reuseable.rowWithSpace("space-between")}>
     <ReuseableText size={TEXT.medium} family={"medium"} text={item.flag} />
     <ReuseableText size={TEXT.medium} family={"medium"} text={item.country} />
      
    </View>
  );
});