import 'package:flutter/material.dart';
// import 'package:http/http.dart' as http;
import 'package:w3c_event_source/event_source.dart';

import 'dart:async';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter SSE',
      debugShowCheckedModeBanner: false,
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  String _name = '';
  String _message = '';

  @override
  void initState() {
    print('Init State');
    super.initState();
    _sse();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('SSE Notification'),
      ),
      body: Center(
        child: Text('$_message'),
      ),
    );
  }

  void _sse() {
    final source = EventSource(Uri.parse('http://10.0.2.2:3001/live/stream'));

    source.events.listen((event) {
      print(event.name);
      print(event.data);
      setState(() {
        _name = event.name;
        _message = event.data;
      });
    });
  }
}
