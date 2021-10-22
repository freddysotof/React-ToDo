import React from 'react';
import { observer } from 'mobx-react';

import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import { pinkA200, grey100, grey500, grey700, red200, red100, red500,
          blueGrey800, blueGrey500, blueGrey900 } from 'material-ui/styles/colors';
          import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
          import getMuiTheme from 'material-ui/styles/getMuiTheme';

const showAllIcon = <FontIcon className="material-icons">description</FontIcon>;
const showActiveIcon = <FontIcon className="material-icons">flip_to_front</FontIcon>;
const showCompletedIcon = <FontIcon className="material-icons">done_all</FontIcon>;


@observer class Footer extends React.Component {

  
  render() {
    const { store } = this.props;
    const muiTheme = getMuiTheme({
      palette: {
        // primary1Color: '#23afff',
        // textColor: grey700,
        // primary1Color:'#000000', 
        // textColor:  '#FFFFFF',
        primary1Color:'#FFFFFF', 
        textColor:  '#000000',
      },
    });
    return (
      <MuiThemeProvider muiTheme={muiTheme} >
      <BottomNavigation
        style={{
          backgroundColor: "#90BE6D",
        }}
        selectedIndex={{
          SHOW_ALL: 0,
          SHOW_ACTIVE: 1,
          SHOW_COMPLETED: 2,
        }[store.visibilityFilter]}
      >
        <BottomNavigationItem
          label="Todos"
          icon={showAllIcon}
          
          onTouchTap={() =>
              store.visibilityFilter = 'SHOW_ALL'
            }
        />
        <BottomNavigationItem
          label="Activos"
          icon={showActiveIcon}
          onTouchTap={() =>
              store.visibilityFilter = 'SHOW_ACTIVE'
            }
        />
        <BottomNavigationItem
          label="Completados"
          icon={showCompletedIcon}
          onTouchTap={() =>
              store.visibilityFilter = 'SHOW_COMPLETED'
            }
        />
      </BottomNavigation>
      </MuiThemeProvider>
    );
  }
}


export default Footer;
