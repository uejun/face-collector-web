import { FaceCollectorWebPage } from './app.po';

describe('face-collector-web App', () => {
  let page: FaceCollectorWebPage;

  beforeEach(() => {
    page = new FaceCollectorWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
