import React from 'react'
import PropTypes from 'prop-types'

const GroupList = ( {
  item: items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem,
} ) => (
  <ul className="list-group">
    {Object.keys ( items ).map ( item =>
      <li
        key={items[item][valueProperty]}
        className={'list-group-item' + ( items[item] === selectedItem
          ? ' active'
          : '' )}
        onClick={() => onItemSelect ( items[item] )}
        role='button'
      >
        {items[item][contentProperty]}
      </li>,
    )}
  </ul>
)
GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name',
}
GroupList.propTypes = {
  item: PropTypes.oneOfType ( [ PropTypes.object, PropTypes.array ] ),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object,
}

export default GroupList