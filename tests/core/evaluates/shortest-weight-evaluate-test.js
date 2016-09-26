describe('core', () => {
  describe('evaluates', () => {
    describe('ShortestWeightEvaluate', () => {
      let target;
      let graph;

      beforeEach(() => {
        let network = new RailsNetwork('Graph: AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');
        graph = network.toGraph();
      });

      describe('#constructor', () => {
        it('sets the to, from, and max', () => {
          target = new ShortestWeightEvaluate(graph, 'A', 'C');
          expect(target.to).toEqual('C');
          expect(target.from).toEqual('A');
        });
      });

      describe('#evaluate', () => {
        it('returns the steps and the result', () => {
          target = new ShortestWeightEvaluate(graph, 'A', 'C');
          let output = target.evaluate();
          expect(output.steps.length).not.toEqual(0);
          expect(output.result).toEqual(9);
        });

        it('returns the steps and the result', () => {
          target = new ShortestWeightEvaluate(graph, 'B', 'B');
          let output = target.evaluate();
          expect(output.steps.length).not.toEqual(0);
          expect(output.result).toEqual(9);
        });
      });
    });
  });
});
