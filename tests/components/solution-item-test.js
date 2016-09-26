describe('components', () => {
  describe('SolutionItem', () => {
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
