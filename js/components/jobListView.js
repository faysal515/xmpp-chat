import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {connect} from 'react-redux'
import axios from 'axios'



const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#4488A7',
  },
  text: {
    color: '#132d3d',
  }
})

class Job extends React.PureComponent {
  onPress() {
    console.log('hello ', this.props)
    let jobCreator = this.props.job.createdBy.objectId
    console.log('JOB CREATOR ', jobCreator)
    axios.get(`http://api.sendjobs.co:1337/parse/classes/_User/${jobCreator}`,{
      headers: {
        'X-Parse-Application-Id': '1'
      }
      // params: {
      //   'where': {
      //     'objectId': jobCreator
      //   }
      // }
    }).then(user => {
      console.log('USER FOUND ', user.data)
      this.props.xmpp.sendMessage('Hi, I applied for this job!!', `${user.data.username}@sendjob`)
    })
      .catch(err => {console.log('user fetch err ', err)})

  }

  render() {
    return (

        <View style={styles.itemContainer}>
          <Text style={styles.text}>{this.props.job.title}</Text>
          <Button
            title="Apply"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            onPress={() => this.onPress()}
          />
        </View>

    )
  }
}

class JobListView extends Component {
  state = {
    selected: (new Map(): Map<string, boolean>),
    jobs: []
  };

  componentDidMount() {
    //console.log('>> ',this.props)
    axios.get(`http://api.sendjobs.co:1337/parse/classes/job`,{
      headers: {
        'X-Parse-Application-Id': '1'
      }
    }).then(res => {
      console.log('data fetch ', res.data)
      this.setState({jobs: res.data.results.filter(x => x.createdBy)})
    })
      .catch(err => console.log('fetch err ', err))

    /*fetch('http://api.sendjobs.co:1337/parse/classes/job',{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': '1'
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('done ', responseJson)
      })
      .catch((error) => {
        console.log('... ',error);
      });*/

  }

  _keyExtractor = (item, index) => item.objectId;
  _onPressItem(id: string)  {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };


  _renderItem = ({item}) => (

    <Job
      id={item.objectId}
      job={item}
      xmpp={this.props.screenProps.xmpp}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );


  render() {
    return (
      <View>
        <Text>{`Only the job with createdBy property are shown.`.toUpperCase()}</Text>
        <FlatList
          data={this.state.jobs}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

export default JobListView