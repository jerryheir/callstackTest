/**
 * @format
 */

import 'react-native';
import React from 'react';
import ListEmptyAtom from '../src/Atoms/ListEmptyAtom';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('emptylist correctly', () => {
    renderer.create(<ListEmptyAtom loading={true} />);
});

test('emptylist correctly', () => {
    const tree = renderer.create(<ListEmptyAtom loading={true} />).toJSON();
    expect(tree).toMatchSnapshot();
});