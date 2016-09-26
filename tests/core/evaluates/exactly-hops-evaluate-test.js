describe('core', () => {
  describe('evaluates', () => {
    describe('ExactlyHopsEvaluate', () => {
      let target;
      let graph;

      beforeEach(() => {
        let network = new RailsNetwork('Graph: AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');
        graph = network.toGraph();
      });

      describe('#evaluate', () => {
        it('returns the steps and the result', () => {
          target = new ExactlyHopsEvaluate(graph, 'A', 'C', 4);
          let output = target.evaluate();
          expect(output.steps.length).not.toEqual(0);
          expect(output.result).toEqual(3);
        });
      });
    });
  });
});
