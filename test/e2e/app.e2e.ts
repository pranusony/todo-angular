import {browser, by, element} from "protractor";

describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'My Title';
    expect(subject).toEqual(result);
  });

  it('should have app element', () => {
    let subject = element(by.tagName('my-app')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

});
