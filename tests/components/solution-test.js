describe('components', () => {
  describe('Solution', () => {
    let target;

    beforeEach(() => {
      target = new Solution();
    });

    describe('#getInitialState', () => {
      it('returns the initial state', () => {
        let state = target.getInitialState();

        expect(state.network).not.toBeNull();
        expect(state.items).toEqual([
          [ 'Total distance A-B-C', 'WeightEvaluate', 'A', 'B', 'C' ],
          [ 'Total distance A-D', 'WeightEvaluate', 'A', 'D' ],
          [ 'Total distance A-D-C', 'WeightEvaluate', 'A', 'D', 'C' ],
          [ 'Total distance A-E-B-C-D', 'WeightEvaluate', 'A', 'E', 'B', 'C', 'D' ],
          [ 'Total distance A-E-D', 'WeightEvaluate', 'A', 'E', 'D' ],
          [ 'Count trips C-C (maximum 3 stops)', 'MaxHopsEvaluate', 'C', 'C', 3 ],
          [ 'Count trips A-C (exactly 4 stops)', 'ExactlyHopsEvaluate', 'A', 'C', 4 ],
          [ 'Shortest trip length A-C', 'ShortestWeightEvaluate', 'A', 'C' ],
          [ 'Shortest trip length B-B', 'ShortestWeightEvaluate', 'B', 'B' ],
          [ 'Count trips C-C (less than 30 distance)', 'MaxWeightEvaluate', 'C', 'C', 30 ]
        ]);
      });
    });

    describe('#onReadFile', () => {
      it('sets the input', () => {
        let input = {
          value: null
        };

        target.refs.input = input;
        let state = target.onReadFile('Graph: AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE50');

        expect(input.value).toEqual('Graph: AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE50');
      });
    });

    describe('#render', () => {
      it('should return a render object', () => {
        expect(target.render()).not.toBeNull();
      });
    });
  });
});
