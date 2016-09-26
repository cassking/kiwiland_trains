describe('core', () => {
  describe('evaluates', () => {
    describe('MaxHopsEvaluate', () => {
      let target;
      let graph;

      beforeEach(() => {
        let network = new RailsNetwork('Graph: AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');
        graph = network.toGraph();
      });

      describe('#constructor', () => {
        it('sets the to, from, and max', () => {
          target = new MaxHopsEvaluate(graph, 'C', 'C', 3);
          expect(target.to).toEqual('C');
          expect(target.from).toEqual('C');
          expect(target.max).toEqual(3);
        });
      });

      describe('#evaluate', () => {
        it('returns the steps and the result', () => {
          target = new MaxHopsEvaluate(graph, 'C', 'C', 3);
          let output = target.evaluate();
          expect(output.steps.length).not.toEqual(0);
          expect(output.result).toEqual(2);
        });
      });
    });
  });
});
