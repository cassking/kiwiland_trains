/**
 * Represents the test section.
 */
let Test = React.createClass({
  componentDidMount: function() {
    let jasmine = $('.jasmine_html-reporter');
    let testSection = $('#test');
    testSection.append(jasmine);
  },

  render: function() {
    return null;
  }
});
