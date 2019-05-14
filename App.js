import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { WebBrowser } from 'expo';
import { WebView } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import AWSConfig from './aws-exports';
Amplify.configure(AWSConfig);

import Tabs from './Tabs';

export default class App extends React.Component {
  state = {
    isAuthenticated: false,
  };
  authenticate = isAuthenticated => {
    this.setState({ isAuthenticated });
  };
  render() {
    if (this.state.isAuthenticated) {
      console.log('Auth: ', Auth);
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginTop: 110 }}
        >
          <Text>Hello {Auth.user.username}!</Text>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

            <View style={styles.logContainer}>
              <TouchableOpacity onPress={this._handleLogPress} style={styles.logLink}>
                <Text style={styles.logLinkText}>Click here to see your Home weather data!</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Tabs
          screenProps={{
            authenticate: this.authenticate,
          }}
        />
      </View>
    );
  }

  _handleLogPress = () => {
   WebBrowser.openBrowserAsync(
     'https://go.init.st/jzo6438'
   );
};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 30,
  },


logContainer: {
    marginTop: 90,
    alignItems: 'center',
  },
logLink: {
    paddingVertical: 50,
  },
logLinkText: {
    fontSize: 14,
    color: 'coral',
  },
});
