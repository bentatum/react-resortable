
import { default as React } from 'react'
import { default as swapArrayElements } from './swapArrayElements'
import { default as isMouseBeyond } from './isMouseBeyond'

export default (Component) => {
  let elementEdge = 0
  let updateEdge = true

  return React.createClass({

    proptypes: {
      items: React.PropTypes.array.isRequired,
      updateState: React.PropTypes.func.isRequired,
      sortId: React.PropTypes.number,
      outline: React.PropTypes.string.isRequired, // row | column
      draggingIndex: React.PropTypes.number
    },

    getInitialState () {
      return {
        draggingIndex: null
      }
    },

    componentWillReceiveProps (next) {
      this.setState({
        draggingIndex: next.draggingIndex
      })
    },

    sortEnd () {
      this.props.updateState({
        draggingIndex: null
      })
    },

    sortStart (e) {
      const draggingIndex = e.currentTarget.dataset.id
      this.props.updateState({
        draggingIndex: draggingIndex
      })
      this.setState({
        draggingIndex: draggingIndex
      })
      if (e.dataTransfer !== undefined) {
        e.dataTransfer.setData('text', e.target)
      }
      updateEdge = true
    },

    dragOver ({ clientX, clientY, type, currentTarget }) {
      let mouseBeyond
      let positionX, positionY
      let height, topOffset
      let items = this.props.items
      const indexDragged = Number(currentTarget.dataset.id) // index of underlying element in the set DOM elements
      const indexFrom = Number(this.state.draggingIndex)

      height = currentTarget.getBoundingClientRect().height

      if (type === 'dragover') {
        positionX = clientX
        positionY = clientY
        topOffset = currentTarget.getBoundingClientRect().top
      }

      if (type === 'touchmove') {
        positionX = touches[0].pageX
        positionY = touches[0].pageY

        if (updateEdge) {
          elementEdge = currentTarget.getBoundingClientRect().top
          updateEdge = false
        }
        // bad, I need to copy and then move
        // e.currentTarget.style.top = (positionY - elementEdge) + 'px'
        topOffset = elementEdge
      }

      if (this.props.outline === 'list') {
        mouseBeyond = isMouseBeyond(positionY, topOffset, height)
      }

      if (this.props.outline === 'column') {
        mouseBeyond = isMouseBeyond(
          positionX,
          currentTarget.getBoundingClientRect().left,
          currentTarget.getBoundingClientRect().width
        )
      }

      if (indexDragged !== indexFrom && mouseBeyond) {
        items = swapArrayElements(items, indexFrom, indexDragged)
        this.props.updateState({
          items: items, draggingIndex: indexDragged
        })
      }
    },

    isDragging () {
      return this.props.draggingIndex === this.props.sortId
    },

    render () {
      const draggingClassName = Component.displayName + '-dragging'
      const { sortId, ...props } = this.props
      return (
        <Component
          draggable
          className={this.isDragging() ? draggingClassName : ''}
          onDragOver={this.dragOver}
          onDragStart={this.sortStart}
          onDragEnd={this.sortEnd}
          onTouchStart={this.sortStart}
          onTouchMove={this.dragOver}
          onTouchEnd={this.sortEnd}
          data-id={sortId}
          {...props}
        />
      )
    }

  })
}

