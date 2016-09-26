describe('components', () => {
  describe('Problem', () => {
    let target;

    beforeEach(() => {
      target = new Problem();
    });

    describe('#render', () => {
      it('should retorn a render object', () => {
        expect(target.render()).not.toBeNull();
      });
    });
  });
});
