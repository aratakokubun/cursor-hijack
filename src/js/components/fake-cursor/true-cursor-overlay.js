import { React, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as MouseActionCreators from '../../action/cursor-action-creator'

class TrueCursorOverlay extends React.Component {

  static propTypes = {
    pos: PropTypes.shape({
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
      widthPercent: PropTypes.number.isRequired,
      heightPercent: PropTypes.number.isRequired,
      zIndex: PropTypes.number.isRequired,
    }),
    createMouseMoveAction: PropTypes.func,
    createMouseClickAction: PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      "position": "fixed",
      "top": this.props.pos.top,
      "left": this.props.pos.left,
      "width": this.props.pos.widthPercent + "%",
      "height": this.props.pos.heightPercent + "%",
      "background": "transparent",
      "zIndex": this.props.pos.zIndex
    }
    return <div style={style} 
                createMouseMoveAction={event => this._onMouseMove(event)}
                onClick={event => this._onMouseClick(event)}>
    </div>
  }

  _onMouseMove = (event) => {
    this.props.createMouseMoveAction(event);
  }

  _onMouseClick = (event) => {
    this.props.createMouseClickAction(event);
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators()
}

export default connect(null, mapDispatchToProps)(TrueCursorOverlay);