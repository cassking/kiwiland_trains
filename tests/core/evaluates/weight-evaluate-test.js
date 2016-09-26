describe('core', () => {
  describe('evaluates', () => {
    describe('WeightEvaluate', () => {
      let target;
      let graph;

      beforeEach(() => {
        let network = new RailsNetwork('Graph: AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');
        graph = network.toGraph();
      });

      describe('#constructor', () => {
        it('sets the to, from, and max', () => {
          target = new WeightEvaluate(graph, 'A', 'C');
          expect(target.tos).toEqual(['A', 'C']);
        });
      });

      describe('#evaluate', () => {
        it('returns the steps and the result for A-B-C', () => {
          target = new WeightEvaluate(graph, 'A', 'B', 'C');
          let output = target.evaluate();
          expect(output.steps.length).not.toEqual(0);
          expect(output.result).toEqual(9);
        });

        it('returns the steps and the result for A-D', () => {
          target = new WeightEvaluate(graph, 'A', 'D');
          let output = target.evaluate();
          expect(output.steps.length).not.toEqual(0);
          expect(output.result).toEqual(5);
        });

        it('returns the steps and the result for A-D-C', () => {
          target = new WeightEvaluate(graph, 'A', 'D', 'C');
          let output = target.evaluate();
          expect(output.steps.length).not.toEqual(0);
          expect(output.result).toEqual(13);
        });

        it('returns the steps and the result for A-E-B-C-D', () => {
          target = new WeightEvaluate(graph, 'A', 'E', 'B', 'C', 'D');
          let output = target.evaluate();
          expect(output.steps.length).not.toEqual(0);
          expect(output.result).toEqual(22);
        });

        it('returns the steps, result and error for A-E-D', () => {
          target = new WeightEvaluate(graph, 'A', 'E', 'D');
          let output = target.evaluate();
          expect(output.steps.length).not.toEqual(0);
          expect(output.result).toEqual(null);
          expect(output.error).toEqual('NO SUCH ROUTE');
        });
      });
    });
  });
});
