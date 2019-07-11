import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Downshift from 'downshift';
import {connect} from 'react-redux';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    tag: {
        display: 'flex',
    },
    with: {
        background: '#e9eaed',
        textAlign:'center',
        padding:'8px 6px 6px 8px'
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },
})
)

const suggestions = [
    { label: 'Afghanistan' },
    { label: 'Aland Islands' },
    { label: 'Albania' },
    { label: 'Algeria' },
    { label: 'American Samoa' },
    { label: 'Andorra' },
    { label: 'Angola' },
    { label: 'Anguilla' },
    { label: 'Antarctica' },
    { label: 'Antigua and Barbuda' },
];

function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;
  
    return (
      <TextField
        InputProps={{
          inputRef: ref,
          classes: {
            root: classes.inputRoot,
            input: classes.inputInput,
          },
          ...InputProps,
        }}
        {...other}
      />
    );
  }

  function renderSuggestion(suggestionProps) {
    const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.user._id) > -1;
  
    return (
      <MenuItem
        {...itemProps}
        key={suggestion.user._id}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
        value={suggestion.user._id}
      >
        {suggestion.user.name}
      </MenuItem>
    );
  }
  
  function getSuggestions(value,friendSuggestions, { showEmpty = false } = {}) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

  
    return inputLength === 0 && !showEmpty
      ? []
      : friendSuggestions.filter(suggestion => {
          const keep =
            count < 5 && suggestion.user.name.slice(0, inputLength).toLowerCase() === inputValue;
  
          if (keep) {
            count += 1;
          }
  
          return keep;
        });
  }

  function DownshiftMultiple(props) {
    const { classes } = props;
    const [inputValue, setInputValue] = React.useState('');
    const [selectedItem, setSelectedItem] = React.useState([]);
    const [friendSuggestions,setFriendSuggestions]=React.useState([]);
  
    function handleKeyDown(event) {
      if (selectedItem.length && !inputValue.length && event.key === 'Backspace') {
        setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
      }
    }
  
    function handleInputChange(event) {
      const {user} = props.auth;
      setInputValue(event.target.value);
      const searchFriends={
        userId:user.id,
        searchText:event.target.value
      };
      axios.post('http://localhost:8080/getfriends',searchFriends)
      .then(result=>{
        setFriendSuggestions(result.data);
      })
      .catch(err=>{
        console.log(err)
      })

    }
  
    function handleChange(item) {
      let newSelectedItem = [...selectedItem];
      if (newSelectedItem.indexOf(item.id) === -1) {
        newSelectedItem = [...newSelectedItem, item];
      }
      setInputValue('');
      setSelectedItem(newSelectedItem);
    }

  
    const handleDelete = item => () => {
      const newSelectedItem = [...selectedItem];
      newSelectedItem.splice(newSelectedItem.indexOf(item.id), 1);
      setSelectedItem(newSelectedItem);
    };

    props.selected(selectedItem);
  
    return (
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={handleChange}
        selectedItem={selectedItem}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          isOpen,
          inputValue: inputValue2,
          selectedItem: selectedItem2,
          highlightedIndex,
        }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder: 'Who are you with?',
          });
  
          return (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                InputLabelProps: getLabelProps(),
                InputProps: {
                  startAdornment: selectedItem.map(item => (
                    <Chip
                      key={item.id}
                      tabIndex={-1}
                      label={item.name}
                      className={classes.chip}
                      onDelete={handleDelete(item)}
                    />
                  )),
                  onBlur,
                  onChange: event => {
                    handleInputChange(event);
                    onChange(event);
                  },
                  onFocus,
                },
                inputProps,
              })}
  
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions(inputValue2,friendSuggestions).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: {name:suggestion.user.name,id:suggestion.user._id} }),
                      highlightedIndex,
                      selectedItem: selectedItem2,
                    }),
                  )}
                </Paper>
              ) : null}
            </div>
          );
        }}
      </Downshift>
    );
  }




function TagFriends(props) {
    const classes = useStyles();
    return (
        <div className={classes.tag}>
            <div className={classes.with}>
                With
            </div>
            <div>
                <DownshiftMultiple selected={props.taggedFriends} auth={props.auth} classes={classes} />
            </div>
        </div>
    )
}

const mapStateToProps=state=>({
  auth:state.auth
})

export default connect(mapStateToProps)(TagFriends);