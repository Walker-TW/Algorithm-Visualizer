import { recursiveDivision, getOrientation } from './RecursiveDivision';

describe('recursiveDivision', () => {
  it('gets orientation', () => {
    let [width, height] = [200, 400];
    expect(getOrientation(width, height)).toEqual('horizontal');
    expect(getOrientation(height, width)).toEqual('vertical');
  });
});
