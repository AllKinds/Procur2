import { ProcPage } from './app.po';

describe('proc App', function() {
  let page: ProcPage;

  beforeEach(() => {
    page = new ProcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
