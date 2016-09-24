/**
 * Represents a file input.
 */
let FileInput = React.createClass({
  onChange: function(event) {
    let file = event.target.files[0];

    if (!file) {
      return;
    }

    let reader = new FileReader();

    reader.onload = (e) => {
      let contents = e.target.result;
      this.props.onReadFile(contents);
      this.refs.input.value = '';
    };

    reader.readAsText(file);
  },

  render: function() {
    return (
      <input type='file' onChange={this.onChange} ref='input'/>
    );
  }
});
