describe('components', () => {
  describe('Graph', () => {
    let target;

    beforeEach(() => {
      target = new Solution();
    });

    describe('#render', () => {
      it('should return null', () => {
        expect(target.render()).not.toBeNull();
      });
    });
  });
});
