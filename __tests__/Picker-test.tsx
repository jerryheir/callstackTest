/**
 * @format
 */

import 'react-native';
import React from 'react';
import PickerAtom from '../src/Atoms/PickerAtom';
import { Text } from "react-native";

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('picker correctly', () => {
    renderer.create(<PickerAtom list={["Hello"]} onPress={() => { }}>
      <Text>Hello</Text>
  </PickerAtom>);
});

test('picker correctly', () => {
    const tree = renderer.create(<PickerAtom list={["Hello"]} onPress={() => { }}>
      <Text>Hello</Text>
    </PickerAtom>).toJSON();
    expect(tree).toMatchSnapshot();
});