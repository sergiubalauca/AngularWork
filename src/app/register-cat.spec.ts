import { RegisterCat } from './register-cat';

describe('RegisterCat', () => {
  it('should create an instance', () => {
    expect(new RegisterCat("testName","testColour",11,"morning",true)).toBeTruthy();
  });
});
