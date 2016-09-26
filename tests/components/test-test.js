describe('components', () => {
  describe('Test', () => {
    let target;

    beforeEach(() => {
      target = new Test();
    });

    describe('#componentDidMount', () => {
      it('should append the section', () => {
        let append = sinon.stub($.fn, 'append');

        target.componentDidMount();

        expect(append.callCount).toEqual(1);
        expect(append.thisValues[0].attr('id')).toEqual('test');
      });
    });

    describe('#render', () => {
      it('should return null', () => {
        expect(target.render()).toBeNull();
      });
    });
  });
});
