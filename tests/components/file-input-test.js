describe('components', () => {
  describe('FileInput', () => {
    let target;

    beforeEach(() => {
      target = new FileInput();
    });

    describe('#onChange', () => {
      it('should call onReadFile function', (done) => {
        let event = {
          target: {
            files: [
              new Blob(['foo', 'bar'])
            ]
          }
        };

        let input = {
          value: null
        };

        let onReadFile = (contents) => {
          expect(contents).toEqual('foobar');
          done();
        };

        target = new FileInput({onReadFile}, {});
        target.refs.input = input;

        target.onChange(event);
      });

      it('should set input file to ""', (done) => {
        let event = {
          target: {
            files: [
              new Blob(['foo', 'bar'])
            ]
          }
        };

        let input = {
          value: null
        };

        let onReadFile = (contents) => {
          expect(target.refs.input.value).toEqual('');
          done();
        };

        target = new FileInput({onReadFile}, {});
        target.refs.input = input;

        target.onChange(event);
      });
    });

    describe('#render', () => {
      it('should return a render object', () => {
        expect(target.render()).not.toBeNull();
      });
    });
  });
});
