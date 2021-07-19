import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import EventSource from 'react-native-eventsource';

const App = () => {
  const [event, setEvent] = useState([]);

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = () => {
    const source = new EventSource('http://10.0.2.2:3001/live/stream');

    source.onopen = () => {
      console.log('open');
    };

    source.onmessage = e => {
      console.log(e.data);
      setEvent(e.data);
    };
  };

  return (
    <View>
      <Text>Hello World</Text>
      <Text>Hello Again!</Text>
      <Text>{event}</Text>
    </View>
  );
};

export default App;
