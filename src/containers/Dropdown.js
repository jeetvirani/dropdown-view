import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import matchSorter from 'match-sorter';
import InputBox from '../components/InputBox';
import { SuggestionsList, Text } from '../styles';
import NoResults from '../components/NoResults';

const propTypes = {
  dataItems: PropTypes.array
};

const defaultProps = {
  dataItems: []
};

const itemToString = item => (item ? item.name : '');

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
 
  getItems = value =>
    value
      ? matchSorter(this.props.dataItems, value, { keys: ['Rank', 'Grade', 'Channel_name', 'Video_Uploads'] })
      : this.props.dataItems;

  render() {
    return (
      <React.Fragment>
        <Downshift itemToString={itemToString} defaultIsOpen>
          {({
            getInputProps,
            getMenuProps,
            getItemProps,
            highlightedIndex,
            isOpen,
            inputValue
          }) => (
            <div>
              <InputBox {...getInputProps()} />
              <SuggestionsList {...getMenuProps({ refKey: 'innerRef' })}>
                {isOpen ? (
                  this.getItems(inputValue).length === 0 ? (
                    <NoResults />
                  ) : (
                    this.getItems(inputValue).map((item, index) => (
                      <li
                        {...getItemProps({
                          item,
                          key: item.Rank,
                          style: {
                            backgroundColor: index === highlightedIndex ? 'lightgray' : ''
                          }
                        })}
                      >
                        <Text weight="600" color="black" >
                          {item.Rank}
                        </Text>
                        <Text weight="400" color="gray">
                          {item.Grade}
                        </Text>
                        <Text weight="300" color="gray" truncate>
                          {item.Channel_name}
                        </Text>
                      </li>
                    ))
                  )
                ) : null}
              </SuggestionsList>
            </div>
          )}
        </Downshift>
      </React.Fragment>
    );
  }
}

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;
